var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    gutil = require('gulp-util'),

    paths = {
        resources: ['src/**/*.html']
    },

    options = {
        browserify: {
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        },
        /* 
         * This is additional babelify option,
         * all options from http://babeljs.io/docs/usage/options/ 
         * needs to put in the .babelrc file
         */
        babelify: {
            extensions: ['.tsx', '.ts', '.js']
        }
    };

// Moves resources to dist folder
gulp.task('resources', function () {
    return gulp.src(paths.resources)
        .pipe(gulp.dest('dist'));
});

gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"})
        .pipe(gulp.dest("dist/lib"));
});

//Compile typescript
gulp.task('compile', function () {
    return browserify(options.browserify)
        .plugin(tsify)
        .transform(babelify, options.babelify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-app', ['compile', 'resources']);
gulp.task('default', ['libs', 'compile', 'resources']);
