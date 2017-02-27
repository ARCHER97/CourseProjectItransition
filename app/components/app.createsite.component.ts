import { Component } from '@angular/core';
import { sites } from '../global/activeSite';
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
import { activeId } from '../global/activeSite'
import { Site } from '../site_view/site';
import { Page } from '../site_view/page';
import { languages, lang } from '../global/languages'
import 'script.js'

@Component({
  selector: 'create-site-app',
  template: ` 
    <div class="col-sm-12">
        <div> 
          <div [ngClass]="{'form-group':true, 'col-sm-12': true}">
            <h3 class="col-sm-4 control-label">{{languages.getLang(lang.lang,'createsite').get('sitename')}}</h3>
            <div class="col-sm-8">
              <input [(ngModel)]="nameOfSite" class="form-control" id="sitesName" type="text" value="name of site">
            </div>
          </div>   
          <div>
            <tag-input placeholder="Add tags ..." 
                    (tagsChanged)="onTagsChange($event)" 
                    (tagsAdded)="onTagsAdded($event)"
                    (tagRemoved)="onTagRemoved($event)">
                    
            </tag-input>  
        	</div>
        </div>
        <div>
          <button class="btn-primary" (click)="createSite()">{{languages.getLang(lang.lang,'createsite').get('create')}}</button>
        </div>
    </div>

  `
})

export class CreatorSiteComponent{
  
  langcomponentRu
  langcomponentEn
  languages = languages 
  lang = lang
  tagsArray: any
  nameOfSite: String
  sites = sites
  constructor(private http: Http){
    this.sites.activeSite
    this.nameOfSite = ""

    this.langcomponentRu = languages.getLang("Ru", "createsite")
    this.langcomponentEn = languages.getLang("En", "createsite")
    
    this.langcomponentRu.set("sitename","Ведите имя сайта")
    this.langcomponentEn.set("sitename","Enter name of site")

    this.langcomponentRu.set("create","создать")
    this.langcomponentEn.set("create","create")
  }
  onTagsChange($event){
      this.tagsArray = $event
      console.log(this.tagsArray)
    }
    onTagsAdded($event){
    }
    onTagRemoved($event){
  }
  createSite(){ 
    if(this.nameOfSite == "" || this.nameOfSite == null){}
    else{
        console.log("addSiteDB") 
        
        let body = JSON.stringify({user_id: activeId.activeId, user_name: activeId.activeName, name: this.nameOfSite, arrayTag: this.tagsArray }); 
        console.log(activeId.activeName) 
        console.log("Body: " + body) 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 
        return this.http.post('http://localhost:8888/site/addSite', body, options) 
            .subscribe(this.myExtraDataCreateSite)
    }
  } 
  private myExtraDataCreateSite(res: Response){ 
        let body = res.json(); 
        sites.activeSite = new Site(body.name, body.ID, activeId.activeName, new Array<Page>()); 
        sites.sites.push(sites.activeSite); 
        return body.data || {}; 
  }
}
