import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/app.profile'
//import { ConstructorMainComponent } from './app.constructor.main'
import { SitePreviewComponent } from './components/sitepreview.component'
import { CreatorSiteComponent } from './components/app.createsite.component'
import { CreatorPageComponent } from './components/app.createpage.component'
import { StartComponent }       from './components/app.start.component'
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'review',
    component: SitePreviewComponent
  },
  {
    path: 'creatorsite',
    component: CreatorSiteComponent
  },
  {
    path: 'creatorpage',
    component: CreatorPageComponent
  },
  {
    path: 'start',
    component: StartComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);