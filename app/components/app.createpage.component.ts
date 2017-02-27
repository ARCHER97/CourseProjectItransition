import { Component } from '@angular/core';
import { sites } from '../global/activeSite';
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
import { activeId } from '../global/activeSite'
import { Site } from '../site_view/site';
import { Page } from '../site_view/page';
import { Container } from '../site_view/container'
import { UsersComment } from '../site_view/userscomment'
import { languages, lang } from '../global/languages'
import 'script.js'

@Component({
  selector: 'create-page-app',
  template: `
    <div class="col-sm-12">
        <div> 
          <div [ngClass]="{'form-group':true, 'col-sm-12': true}">
            <h3 class="col-sm-4 control-label">{{languages.getLang(lang.lang,'createpage').get('pagename')}}</h3>
            <div class="col-sm-8">
              <input [(ngModel)]="nameOfPage" class="form-control" id="sitesName" type="text" value="name of site">
            </div>
          </div>  
        </div>
        <button class="btn-primary" (click)="createPage()">{{languages.getLang(lang.lang,'createpage').get('create')}}</button>
    </div>
  `
})

export class CreatorPageComponent{

  languages = languages
  lang = lang
  langcomponentRu
  langcomponentEn
    
  nameOfPage: String
  sites = sites

  constructor(private http: Http){
    this.sites.activeSite
    this.nameOfPage = ""

    this.langcomponentRu = languages.getLang("Ru", "createpage")
    this.langcomponentEn = languages.getLang("En", "createpage")
    
    this.langcomponentRu.set("pagename","Введите имя страницы")
    this.langcomponentEn.set("pagename","Enter name of page")

    this.langcomponentRu.set("create","создать")
    this.langcomponentEn.set("create","create")
  
  }
 
  createPage(){ 
        if(this.nameOfPage == "" || this.nameOfPage == null){}
        else{
          console.log("addPageDB") 
          let activeSite_id = sites.activeSite.ID;
          let arrayContainer = JSON.stringify(new Array<Container>())
          let body = JSON.stringify({site_id: activeSite_id, contentPage: arrayContainer, page_name: this.nameOfPage, rating: 0}); 
          console.log("Body: " + body) 
          let headers = new Headers({ 'Content-Type': 'application/json' }); 
          let options = new RequestOptions({ headers: headers }); 
          return this.http.post('http://localhost:8888/page/addPage', body, options) 
                    .subscribe(this.myExtraDataPage)
        }
  } 


  private myExtraDataPage(res: Response){ 
        let body = res.json(); 
        console.log("Body: "+ body)
        let page: Page = new Page(body.ID, body.name, body.rating, 
            new Array<Container>(), new Array<UsersComment>());
        sites.activePage = page
        sites.activeSite.containers.push(sites.activePage); 
        return body.data || {}; 
  }
}
