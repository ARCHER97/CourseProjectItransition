import { Component } from '@angular/core';
import { Page } from "../site_view/page";
import { Container } from "../site_view/container"
import { Site } from '../site_view/site'
import { ItemView } from '../site_view/item_views/item.view';
import { Link } from '../site_view/item_views/link'
import { TextField } from '../site_view/item_views/text.field'
import { sites } from '../global/activeSite';
import { changedSites } from '../global/changedSite'
import { SanitizeHtml, SanitizeResourceUrl, SanitizeScript, SanitizeStyle, SanitizeUrl} from 'ng2-sanitize';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import 'script.js'

@Component({
  selector: 'concret-site-preview-app',
  template: `
        <div class="panel panel-info" style="min-height: 100px">
        <div [ngClass]="{'panel-body':true, 'borderVisibleNone': true }" style="min-height: 100px">
            <div *ngFor="let container of sites.activePage.containers">
                <!------------------------------------------------------------------------->
                <div class="col-sm-{{container.width}}">
                    <div [ngClass]="{'panel panel-info': true,'borderVisibleNone': true}">
                        
                        <div [ngClass]="{'panel-body':true}">
                            <div *ngFor="let item of container.items" >
                                <div *ngIf="item.type == 'TextField'" >                                   
                                    <div [innerHTML]="item.text | sanitizeHtml"></div>
                                </div>
                                
                                <div *ngIf="item.type == 'Video'">                                   

    <div class="col-sm-12">
        <div class="{{item.class[0]}}">
            <iframe class="embed-responsive-item" [src]="getSafeResourceUrl(item.urlVideo)" alt="video"></iframe>
        </div>
    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
                <!------------------------------------------------------------------------->
            <div *ngIf="container.type =='Navbar'" class="col-sm-{{container.width}}">

                    
                    <nav class="navbar navbar-default">
                        <div class="container">

                            <ul class="nav navbar-nav" *ngFor="let link of container.links">
                                <li (click)="determineEffectOfTheLink(link)"><a>{{link.name}}</a></li>
                            </ul>

                        </div>
                    </nav>
                    
                    
                </div>    
            </div>
        </div> 
    </div>
    <div *ngFor="let usersComment of sites.activePage.usersComments" class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">{{usersComment.usersName}}</div>
            <div class="panel-body"><pre>{{usersComment.textUsersComment}}</pre></div>
        </div>
    </div> 

  `,
  styles:[`
    .borderVisibleNone{
        border: none;
    }
    .border-color-red{
        border: 1px solid;
        border-color: red;
    }
    .panel.panel-info {
        margin-bottom: 1px;
        padding: 1px;
    }
  `]
})

export class ConcretSitePreviewComponent{
    public url:SafeResourceUrl;
    public getSafeResourceUrl(urlVideo){
         return this.url = this.sanitationService.bypassSecurityTrustResourceUrl(urlVideo);
    }

    activTextField: TextField
    activContainer: Container
    sites = sites
    resetingComponent: ItemView
    visibleBorder: boolean
    changedSites = changedSites
    ckeditorContent: any
    tagsArray: String[]
    constructor(private sanitationService:DomSanitizer) {
        this.ckeditorContent = `<p>My HTML</p>`;
        this.visibleBorder = false
        this.activTextField = null
        this.activContainer = null
    }
    determineEffectOfTheLink(link){
        for (let page of sites.activeSite.containers){
            if(page.name == link.urlPage){
                sites.activePage = page
            }
        }   
    }
}
