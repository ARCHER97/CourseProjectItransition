import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { DndModule }               from 'ng2-dnd';
import { FormsModule, 
         ReactiveFormsModule }     from '@angular/forms';
import { HttpModule, 
         JsonpModule }             from '@angular/http';
import { RouterModule }            from '@angular/router';
import {DropdownModule}            from "ng2-dropdown/index";
import {CKEditorModule}            from 'ng2-ckeditor';
import {Ng2TagsInputModule}        from 'ng2-tagsinput';
import { DynamicComponentModule }  from 'angular2-dynamic-component'
import { Ng2Bs3ModalModule }       from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2AutoCompleteModule }   from 'ng2-auto-complete';

import { AppComponent }            from './components/app.component';
import {ConstructorMainComponent}  from './components/app.constructor.main';
import {ConstructorItemsComponent} from './components/app.constructor.items.component';
import { TopNavbarAppComponent }   from './components/app.topNavbarComponent';
import { LeftMenuAppComponent }    from './components/app.leftMenuComponent'
import { ProfileComponent }        from './components/app.profile'
import { SitePreviewComponent }    from './components/sitepreview.component'
import {ConcretSitePreviewComponent} from './components/app.concretsitepreview.component'
import { AboutSiteComponent }      from './components/app.aboutsite.component'
import { routing }                 from './app.routing';
import { CreatorSiteComponent }    from './components/app.createsite.component'
import { CreatorPageComponent }    from './components/app.createpage.component'
import { StartComponent }          from './components/app.start.component'
import { SanitizeHtml, SanitizeResourceUrl, SanitizeScript, SanitizeStyle, SanitizeUrl} from 'ng2-sanitize';


import { SiteService }             from './servise/app.activeSites.servise';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    HttpModule, 
    JsonpModule,
    RouterModule,
    routing,
    DropdownModule,
    CKEditorModule,
    ReactiveFormsModule,
    Ng2TagsInputModule,
    DynamicComponentModule,
    Ng2Bs3ModalModule,
    Ng2AutoCompleteModule
  ],

  declarations: [ 
    AppComponent, 
    ConstructorMainComponent,
    ConstructorItemsComponent,
    TopNavbarAppComponent,
    LeftMenuAppComponent,
    ProfileComponent,
    SitePreviewComponent,
    ConcretSitePreviewComponent,
    AboutSiteComponent,
    CreatorSiteComponent,
    CreatorPageComponent,
    StartComponent,
    SanitizeHtml, SanitizeResourceUrl, SanitizeScript, SanitizeStyle, SanitizeUrl
  ],
  providers: [
    SiteService,
  ],
  
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
