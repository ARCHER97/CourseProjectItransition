import { Component, ViewEncapsulation, } from '@angular/core';
import { globalStyles } from '../global/globalStyles'
import { activeId } from '../global/activeSite'

@Component({
  selector: 'my-app',
  template: `
<div>
    <div [ngClass]="{'col-sm-12':true, 'notPadingLeftAnfRight': true}">
      <top-navbar-app></top-navbar-app>
    </div>

    <div [ngClass]="{'col-sm-3':true, 'notPadingLeftAnfRight': true}">
      <left-menu-app></left-menu-app>
    </div>

    <div [ngClass]="{'col-sm-9':true, 'notPadingLeftAnfRight': true}" >
      <router-outlet></router-outlet>
    </div>
    
</div>
  `,
  styleUrls:[
    "bootswatch-gh-pages/cerulean/bootstrap.min.css"
  ],
  styles:[`
    .notPadingLeftAnfRight{
        padding-left: 1px; 
        padding-right: 1px"
    }
  `],
  encapsulation: ViewEncapsulation.None 
})

export class AppComponent{
  constructor(){
    if(localStorage.getItem('profile') == null){
        activeId.activeId = null
      }else{
        activeId.setActiveId(JSON.parse(localStorage.getItem('profile')).user_id); 
      }
      console.log(activeId.activeId)
  }
  getbgcolor(){
    return globalStyles.getbgcolor()
  }
}
