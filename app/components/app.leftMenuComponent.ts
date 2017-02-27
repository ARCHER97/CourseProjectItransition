import { Component } from '@angular/core';
import { Site } from '../site_view/site';
import { Page } from '../site_view/page';
import { sites } from '../global/activeSite';
import { SiteService } from '../servise/app.activeSites.servise';
import { Container } from '../site_view/container'
import { UsersComment } from '../site_view/UsersComment'
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
import { activeId } from '../global/activeSite'
import { languages, lang } from '../global/languages'
import { Observable }     from 'rxjs/Observable';

@Component({
  selector: 'left-menu-app',
  template: `
<div class="col-sm-12">
    
    <div class="col-sm-12" style="padding: 0px">
        <p><input auto-complete [(ngModel)]="myData" [source]="mySource"/></p>
        <p>
            <button type="button" class="btn-success" style="wigth:50%" (click)="searchSiteByInfoFromDB(myData)">{{languages.getLang(lang.lang,'leftMenu').get('buttonfind')}}</button>
            <button type="button" class="btn-info" style="wigth:50%" (click)="getAllSiteFromDB()">{{languages.getLang(lang.lang,'leftMenu').get('buttonAllSite')}}</button>
        </p>
    </div>
    <ul class="nav nav-tabs">
        <li class="active" style="width: 50%">
            <a data-toggle="tab" href="#listSites">
                {{languages.getLang(lang.lang,'leftMenu').get('sites')}}
            </a>
        </li>
        <li style="width: 50%">
            <a data-toggle="tab" href="#listPages">
                {{languages.getLang(lang.lang,'leftMenu').get('pages')}}
            </a>
        </li>
    </ul>
    <div class="tab-content">
        <div id="listSites" class="tab-pane fade in active" style="width: 100%">
            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-success">
                        <div [ngClass]="'panel-body'">
                            <ul class="list-group" dnd-sortable-container [sortableData]="sites.sites">
                                <li *ngFor="let site of sites.sites;
                                    let i = index" class="list-group-item" 
                                    dnd-sortable [sortableIndex]="i"  (click)="redrowSite(site)"
                                    [ngClass]="{'activeElement': isActiveSite(site)}" 
                                    [routerLink]="['/start']">{{site.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="listPages" class="tab-pane fade" style="width: 100%">
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-success">
                    <div class="panel-body">
                        <ul class="list-group" dnd-sortable-container [sortableData]="sites.activeSite.containers">
                            <li *ngFor="let page of sites.activeSite.containers;let i = index"
                                dnd-sortable [sortableIndex]="i" (click)="redrowPage(page)"
                                [ngClass]="{'list-group-item': true, 'activeElement': isActivePage(page)}"
                                [routerLink]="['/review']">
                                    {{page.name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  `,
  styles:[`
    .activeElement{
        text-align: center;
        text-decoration: none;
        text-shadow: 0 -1px 1px #777;
        color: #fff;
        outline: none;
        border: 2px solid #F64C2B;
        border-radius: 5px;
        box-shadow: 0 0 0 60px rgba(0,0,0,0) inset, .1em .1em .2em #800;
        background: linear-gradient(#FB9575, #F45A38 48%, #EA1502 52%, #F02F17);
    }
    .notPadingLeftAndRight{
        padding-left: 0px; 
        padding-right: 0px;
    }
  `]
})
export class LeftMenuAppComponent{

    myData: string
    mySource: Array<String>
    
    sites = sites
    languages = languages  
    lang = lang
    langcomponentRu
    langcomponentEn
    httpsite
    errorMessage: String
    arrayIdNameSearch : Array<String>
    constructor(private siteService: SiteService, private http: Http){
        this.mySource = new Array<String>()
        this.getAllSiteFromDB()
        this.getAllTagsFromDB()
        this.errorMessage="error"
        this.langcomponentRu = languages.getLang("Ru", "leftMenu")
        this.langcomponentEn = languages.getLang("En", "leftMenu")
        
        this.langcomponentRu.set("sites","Сайты")
        this.langcomponentEn.set("sites","Sites")

        this.langcomponentRu.set("pages","Страницы")
        this.langcomponentEn.set("pages","Pages")

        this.langcomponentRu.set("buttonfind","Найти")
        this.langcomponentEn.set("buttonfind","Find")
        
        this.langcomponentRu.set("buttonAllSite","Все сайты")
        this.langcomponentEn.set("buttonAllSite","All sites")
    }
    
    getAllSiteFromDB(){
        this.siteService.getSitesHTTP()
                        .subscribe(
                            httpsite => {
                                sites.sites = httpsite
                                for(let site of httpsite){
                                    for(let str of site.name.split(' '))
                                        this.mySource.push(str) 
                                }
                            },
                            error =>  this.errorMessage = <any>error);
    }
    getAllTagsFromDB(){
        this.siteService.getTagsHttp()
                        .subscribe(
                            httpresponse => {
                                for(let tag of httpresponse){
                                   this.mySource.push(tag) 
                                }
                            })
    }
    redrowSite(site){
        sites.activeSite = site
        this.siteService.getPagesOfSites(site, activeId.activeId)
    }

    isActiveSite(site){
        if(site === sites.activeSite) return true
        else return false
    }
    isActivePage(page){
        if(page === sites.activePage) return true
        else return false
    }
    
    redrowPage(page){
        sites.activePage = page
    }

//anyType : any
    //'http://localhost:8888/search/suggest/page'
    //'http://localhost:8888/search/suggest/aaa'
    //'http://localhost:8888/search/suggest/tw'
    
    searchSiteByInfoFromDB(myData){
        console.log("hohoho")
        this.http.get('http://localhost:8888/fulltext').subscribe()
           
        console.log("ReceiveAddress")
        console.log(myData)
        this.siteService.ReceiveAddressServise(myData)
            .subscribe (something => this.arrayIdNameSearch = something)
     
        setTimeout(()=>{ 
            this.receiveDataSites()
        }, 1500)
     }

     receiveDataSites(){
        console.log("!!receiveDataSites")
        console.log(this.arrayIdNameSearch)
        //sites.sites = []
        let temps = new Array<Site>()
        for(let i = 0; i< this.arrayIdNameSearch.length; i++){
            this.siteService.getMySiteID(this.arrayIdNameSearch[i], this.arrayIdNameSearch[i+1])
                            .subscribe(returnPartArr => temps.push(returnPartArr))
            i++
        }
        sites.sites  = temps
        for(let i = 0; i<sites.sites.length; i++)
            console.log(sites.sites[i])

     }
    
}

