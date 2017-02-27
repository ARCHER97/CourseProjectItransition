import { Component } from '@angular/core';
import { sites, activeId } from '../global/activeSite'
import { Site } from '../site_view/site'
import { Page } from '../site_view/page';
import { SiteService } from '../servise/app.activeSites.servise';
import { User } from '../global/user'

import { Observable }     from 'rxjs/Observable';

import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
@Component({
  selector: 'profile-app',
  template: `
<!--
  <div *ngIf="isAdmin()">
      <p><span>name: </span><span>{{activeId.activeName}}</span></p>
      <div *ngFor="let user of users">
        <div *ngIf="user.status != 'Admin'" class="panel panel-default">
          <div class="panel-heading">
              <span style="padding-right: 15px">{{user.name}}</span><span style="padding-right: 15px">{{user.status}}</span>
              <span style="float:right; padding-left: 5px; height: 100%"><button type="button" class="btn-warning" (click)="setBan(user)">Ban</button></span>
              <span style="float:right; padding-left: 5px; height: 100%"><button type="button" class="btn-danger" (click)="deleteUser(user)">Delete</button></span>
          </div>
        </div>
      </div>
  <div>
-->

  <div>
    <p><span>name: </span><span>{{activeId.activeName}}</span></p>
    <p><span>achive:</span></p>

    <div *ngFor="let site of mySites">
      <div class="panel panel-default">
        <div class="panel-heading">
          <a data-toggle="collapse" href="#collapse{{site.ID}}">
            {{site.name}}
          </a>
        </div>
        <div id="collapse{{site.ID}}" class="panel-collapse collapse" *ngFor="let page of site.containers">
          <div class="panel-body" (click)="setActiveSitePage(site,page)" [routerLink]="['/review']">
            {{page.name}}
          </div>
        </div>
      </div>
    </div>


  <!--  <img src = {{picture}}    class="img-circle" align="center" width="50%" height="50%" style="float: right">
    <img src = "./imgDog.jpg" class="img-circle" align="center" width="50%" height="50%">-->
  </div>
  `
})

export class ProfileComponent {
  users: Array<User>
  activeId = activeId
  mySites: Array<Site>
  boolAdmin = false
  picture = JSON.parse(localStorage.getItem('profile')).picture

  constructor(private http: Http, private siteService: SiteService) {
    this.users = new Array<User>()
      this.getAndSetMySites()
      setTimeout(()=>{
        for(let site of this.mySites){
          console.log(site)
          this.getPagesOfSites(site)
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          let body = JSON.stringify({ user_id: activeId.activeId, site_id: site.ID }); 
          this.http.post('http://localhost:8888/site/roots', body, options)
                          .subscribe(res => sites.canChangeSite = res.json())
        }
      },1000) 
  }
  getAndSetMySites() {
    this.siteService.getMySites(activeId.activeId)
      .subscribe(something => this.mySites = something)
  }

 
  setActiveSitePage(site,page){
    sites.activeSite = site
    sites.activePage = page
  }
  getPagesOfSites(site){
      this.siteService.getPagesBySiteID(site.ID)
          .subscribe(
            pages => site.containers = pages
          );
  }

  isAdmin(){
  
    let body = JSON.stringify({ user_id: activeId.activeId });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:8888/user/checkAdmin', body, options)
                    .subscribe(val => this.boolAdmin = val.json())
    
    console.log(this.boolAdmin)
    return this.boolAdmin
  }
  getUsersFromDB(){
    //записывается в users
    this.siteService.getUsers()
                .subscribe(
                    httpuser => this.users = httpuser);
  }
  setBan(user){

      if(user.status == "Bun") user.status = "Not bun"
      else user.status = "Bun"
      this.siteService.setBan(user.ID).subscribe()
             
  }
  deleteUser(user){

  }
}