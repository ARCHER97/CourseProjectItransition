import { Component } from '@angular/core';
import { sites, activeId } from '../global/activeSite'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';

@Component({
  selector: 'site-preview-app',
  template: `
    <div *ngIf = "!sites.canChangeSite"  class="col-sm-12">
      <div  class="col-sm-8">
        <concret-site-preview-app></concret-site-preview-app>
      </div>
      <div  class="col-sm-4">
        <about-site-app></about-site-app>
      </div>
    </div>
    <div *ngIf = "sites.canChangeSite"  class="col-sm-12">
      <div  class="col-sm-8">
        <constructor-main-app></constructor-main-app>
      </div>
      <div  [ngClass]="{'col-sm-4': true, 'notPadingLeftAndRight': true}">
        <constructor-items-app></constructor-items-app>
      </div>
    </div>
  `,
  styles:[`
    .notPadingLeftAndRight{
        padding-left: 0px; 
        padding-right: 0px;
    }
  `]
})

export class SitePreviewComponent{
  sites = sites
  constructor(private http: Http){
      
      if(localStorage.getItem('profile') == null){
        activeId.activeId = null
      }else{
        activeId.setActiveId(JSON.parse(localStorage.getItem('profile')).user_id); 
      }
      console.log(activeId.activeId)
  }
  isLogged(){
      if(activeId.activeId == null){
          return false
      } 
      else{
          return true
      }
  }

  isAuthorSite(){
    if(this.isLogged){

    }

  }
  
  
}
