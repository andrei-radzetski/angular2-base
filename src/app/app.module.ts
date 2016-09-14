import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing,
    appRoutingProviders } from './app.routing';

import { AboutModule } from './about';
import { HomeModule } from './home';


@NgModule({
    imports: [
        BrowserModule,
        routing,
        HomeModule,
        AboutModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
