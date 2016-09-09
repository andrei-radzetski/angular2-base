import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AboutComponent } from './about';
import { HomeComponent } from './home';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: '',
                component: HomeComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
