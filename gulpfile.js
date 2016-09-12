var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    gulpif = require('gulp-if'),
    config = require('./config.json');

// Moves resources to dist folder
gulp.task('resources', function () {
    return gulp.src(config.resourcesPaths)
        .pipe(gulp.dest(config.distFolderName));
});

gulp.task("libs", function () {
    return gulp.src(config.libsPaths,
        { cwd: "node_modules/**" })
        .pipe(gulp.dest(config.distLibsFolderName));
});

//Compile typescript
gulp.task('compile', function () {
    return browserify(config.browserify)
        .plugin(tsify)
        /* 
         * Options like "extensions" is additional babelify 
         * option, see "config.json",
         * all options from http://babeljs.io/docs/usage/options/ 
         * needs to put in the .babelrc file
         */
        .transform(babelify, config.babelify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source(config.bundleJSFileName))

        .pipe(gulpif(config.prod, buffer()))
        .pipe(gulpif(config.prod, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(config.prod, uglify()))
        .pipe(gulpif(config.prod, sourcemaps.write('./')))

        .pipe(gulp.dest(config.distJSFolderName));
});

gulp.task('watch', function () {
    gulp.watch(config.tsPaths, ['compile']);
    gulp.watch(config.resourcesPaths, ['resources']);
});

gulp.task('build:app', ['compile', 'resources']);
gulp.task('build:all', ['libs', 'build:app']);
gulp.task('default', ['build:all']);
