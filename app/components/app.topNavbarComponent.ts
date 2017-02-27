import { Component, Input } from '@angular/core';
//import {  } from 'angular2/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt'
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
import { activeId } from '../global/activeSite'
import { sites } from '../global/activeSite'
import { Site } from '../site_view/site';
import { Page } from '../site_view/page';
import { Observable } from 'rxjs/Observable'
import { SiteService } from '../servise/app.activeSites.servise';
import { globalStyles } from '../global/globalStyles'
import { languages, lang } from '../global/languages'
declare var Auth0Lock;

@Component({
  selector: 'top-navbar-app',
  template: `
     <nav [ngClass]="{'navbar navbar-inverse': getVariantNavbar(1),
                      'navbar navbar-default': getVariantNavbar(2),
                      'navbar navbar-inverse': getVariantNavbar(3)}">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span> 
          </button>
          <a class="navbar-brand" href="#">{{languages.getLang(lang.lang,'topNavbar').get('nameofsite')}}</a>
        </div>
        <div  class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li class="active"><a [routerLink]="['/review']">{{languages.getLang(lang.lang,'topNavbar').get('menuElement1')}}</a></li>
            <li *ngIf="loggedIn()" [ngClass]="'dropdown'" dropdown >
                <a dropdown-open>{{languages.getLang(lang.lang,'topNavbar').get('menuOperation')}}</a>
                <ul class="dropdown-menu" dropdown-closable-zone>
                    <li><button type="button" class="col-sm-12" [routerLink]="['/creatorsite']">{{languages.getLang(lang.lang,'topNavbar').get('createsite')}}</button></li>
                    <li><button type="button" class="col-sm-12" [routerLink]="['/creatorpage']">{{languages.getLang(lang.lang,'topNavbar').get('createpage')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="savePage()" >{{languages.getLang(lang.lang,'topNavbar').get('savepage')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="deletePage()" >{{languages.getLang(lang.lang,'topNavbar').get('deletepage')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="deleteSite()" >{{languages.getLang(lang.lang,'topNavbar').get('deletesite')}}</button></li>
                </ul>
            </li>     
            <li [ngClass]="'dropdown'" dropdown >
                <a dropdown-open>{{languages.getLang(lang.lang,'topNavbar').get('stylenavbar')}}</a>
                <ul class="dropdown-menu" dropdown-closable-zone>
                    <li><button type="button" class="col-sm-12" (click)="setVariantNavbar(1)">{{languages.getLang(lang.lang,'topNavbar').get('stylenavbar1')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="setVariantNavbar(2)">{{languages.getLang(lang.lang,'topNavbar').get('stylenavbar2')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="setVariantNavbar(3)">{{languages.getLang(lang.lang,'topNavbar').get('stylenavbar3')}}</button></li>
                </ul>
            </li>     
            <li [ngClass]="'dropdown'" dropdown >
                <a dropdown-open>{{languages.getLang(lang.lang,'topNavbar').get('lang')}}</a>
                <ul class="dropdown-menu" dropdown-closable-zone>
                    <li><button type="button" class="col-sm-12" (click)="setLang('En')">{{languages.getLang("En",'topNavbar').get('concretlang')}}</button></li>
                    <li><button type="button" class="col-sm-12" (click)="setLang('Ru')">{{languages.getLang("Ru",'topNavbar').get('concretlang')}}</button></li>
                </ul>
            </li>
          </ul>
  
          <ul class="nav navbar-nav navbar-right">
            <li><a *ngIf="loggedIn()" [routerLink]="['/profile']">{{languages.getLang(lang.lang,'topNavbar').get('profile')}}</a></li>
            <li><a *ngIf="!loggedIn()" (click)="login()"><span class="glyphicon glyphicon-user"></span>{{languages.getLang(lang.lang,'topNavbar').get('login')}}</a></li>
            <li><a *ngIf="loggedIn()" [routerLink]="['/review']" (click)="logout()"><span class="glyphicon glyphicon-log-in"></span>{{languages.getLang(lang.lang,'topNavbar').get('logout')}}</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div *ngFor="let value of values" class="col-sm-12"><h1>You use site {{value}}</h1></div>
  `
})
export class TopNavbarAppComponent {
  lock = new Auth0Lock("B8j2pPjGOFqeyQvOwA3DPXu2xcgsMuJN", "arturik.auth0.com"
    , {
      theme: {
        primaryColor: "black"
      }
    });
  private data: Observable<number>;
  private finished: boolean;

  languages = languages
  langcomponentRu 
  langcomponentEn
  lang = lang

  variantNavbar = 2
  jwtHelper: JwtHelper = new JwtHelper();
  sites = sites
  errorMessage: string
  constructor(private http: Http, private siteService: SiteService) {

     this.errorMessage = "error"
     this.langcomponentRu = languages.getLang("Ru", "topNavbar")
     this.langcomponentEn = languages.getLang("En", "topNavbar")
  }
  setLang(lang) {
    this.lang.setLang(lang) 
  }
  getVariantNavbar(variant) {
    if (this.variantNavbar == variant) return true
    else return false
  }
  setVariantNavbar(variant) {
    this.variantNavbar = variant
  }
  setbgcolor(color) {
    globalStyles.setbgcolor(color)
  }

  getbgcolor() {
    return globalStyles.getbgcolor()
  }
  login() {
    var self = this;
    this.lock.show((err: string, profile: string, id_token: string) => {
      if (err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

      activeId.setActiveId(JSON.parse(localStorage.getItem('profile')).user_id); 
      activeId.setActiveName(this.getUserName(JSON.parse(localStorage.getItem('profile')).identities[0].provider))
      this.addUserRequest(activeId.activeId, activeId.activeName);

      console.log(
        this.jwtHelper.decodeToken(id_token),
        this.jwtHelper.getTokenExpirationDate(id_token),
        this.jwtHelper.isTokenExpired(id_token)
      );
      console.log("EndLoginFunction")
    });
    this.data = new Observable<number>(observer => {
      setTimeout(() => { }, 5000);
      setTimeout(() => { }, 7000);
      setTimeout(() => { }, 12000);
    });

    let subscription = this.data.subscribe(
      () => this.finished = true
    );
  }
  getUserName(typeSocial : any) : string{ 
    if(typeSocial === 'vkontakte') 
      return JSON.parse(localStorage.getItem('profile')).given_name + " "+ 
    JSON.parse(localStorage.getItem('profile')).family_name; 
    else if(typeSocial === 'twitter') 
      { 
        console.log("!! " + JSON.parse(localStorage.getItem('profile')).nickname) 
        return JSON.parse(localStorage.getItem('profile')).nickname 
      } 
    else{ 
      return JSON.parse(localStorage.getItem('profile')).email 
    } 
  }
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    activeId.setActiveId(null)
    sites.canChangeSite = false
    this.loggedIn();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  addUserRequest(id_param: string, user_name: string) {

    let body = JSON.stringify({ id: id_param, name: user_name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8888/user/loginUser', body, options)
      .subscribe();
  }

  deletePage() {
    if (sites.activeSite != null && sites.activePage != null) {
      let activeSite_id = sites.activeSite.ID;
      let body = JSON.stringify({ page_id: sites.activePage.ID });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      sites.activeSite.containers.splice(sites.activeSite.containers.indexOf(sites.activePage), 1)

      return this.http.delete('http://localhost:8888/page/deletePage/' + sites.activePage.ID, options).subscribe()
    }
  }
  deleteSite() {
    if (sites.activeSite != null) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      sites.sites.splice(sites.sites.indexOf(sites.activeSite), 1)
      return this.http.delete('http://localhost:8888/site/deleteSite/' + sites.activeSite.ID, options).subscribe()
    }
  }
  savePage() {
    if (sites.activeSite != null && sites.activePage != null) {
      let activeSite_id = sites.activeSite.ID;
      let body = JSON.stringify({
        page_id: sites.activePage.ID, site_id: activeSite_id,
        contentPage: JSON.stringify(sites.activePage.containers), page_name: sites.activePage.name
      });
      console.log("Body: " + body)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8888/page/updatePage', body, options).subscribe()
    }
  }
}
