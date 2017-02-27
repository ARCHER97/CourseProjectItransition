import { Component, Pipe , PipeTransform } from '@angular/core';
import { Page } from "../site_view/page";
import { Container } from "../site_view/container"
import { Site } from '../site_view/site'
import { ItemView } from '../site_view/item_views/item.view';
import { UsersComment } from '../site_view/usersComment'
import { Link } from '../site_view/item_views/link'
import { TextField } from '../site_view/item_views/text.field'
import { sites } from '../global/activeSite';
import { changedSites } from '../global/changedSite'
import { activeId } from '../global/activeSite'
import { NavbarContainer } from '../site_view/navbar'
import { VideoItem } from '../site_view/item_views/video'
import 'rxjs/add/Observable/interval'
import 'script.js'
import { ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {DynamicComponent} from 'angular2-dynamic-component'
import { SanitizeHtml, SanitizeResourceUrl, SanitizeScript, SanitizeStyle, SanitizeUrl} from 'ng2-sanitize';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { languages, lang } from '../global/languages'

@Component({
  selector: 'constructor-main-app',
  template: `

<div class="col-sm-12">

    <div class="btn-group btn-group-justified" role="group" aria-label="...">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" (click)="setView()" >{{languages.getLang(lang.lang,'constructor').get('buttonreview')}}</button>
        </div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" (click)="removeFromContainer()" >{{languages.getLang(lang.lang,'constructor').get('buttondeleteelement')}}</button>
        </div>
    </div>
    <div class="btn-group btn-group-justified" role="group" aria-label="...">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" (click)="removeActiveContaner()" >{{languages.getLang(lang.lang,'constructor').get('buttondeletecontainer')}}</button>
        </div>
    </div>

    <div dnd-droppable (onDropSuccess)="addContainer($event)" 
                    [dropZones]="['demo2']" class="panel panel-info" [ngClass]="{'nullpadding':true}" style="min-height: 100px">
    
        <div dnd-sortable-container [dropZones]="['contaners-zone']" [sortableData]="sites.activePage.containers"
                     [ngClass]="{'panel-body':true, 'borderVisibleNone': getVisibleBorder(), 'nullpadding':true }" style="min-height: 100px">
            <div *ngFor="let container of sites.activePage.containers; let i = index"  dnd-sortable [sortableIndex]="i">
                <!------------------------------------------------------------------------->
                <div *ngIf="container.type == 'Container'" class="col-sm-{{container.width}}"
                         (click)="setActivContaner(container)">
                  <div [ngClass]="{'border-color-red': isActivContainer(container),'borderVisibleNone':getVisibleBorder()}">
                    <div dnd-droppable (onDropSuccess)="addItemToContainer($event, container)" 
                            [dropZones]="['demo1']"  
                            [ngClass]="{'panel panel-info': true,'borderVisibleNone': getVisibleBorder()}">
                        
                        <div dnd-sortable-container [dropZones]="['component-zone']" [sortableData]="container.items"
                                [ngClass]="{'panel-body':true, 'borderVisibleNone': getVisibleBorder()}">
                            <div *ngFor="let item of container.items; let i = index" dnd-sortable [sortableIndex]="i" >

                                <div *ngIf="item.type == 'TextField'"
                                    (click)="setActivElement(item, container)" [ngClass]="{'border-color-red': isActivElement(item)}">                                   
                                        
                                    <div [innerHTML]="item.text | sanitizeHtml"></div>
 
                                </div>
                                <div *ngIf="item.type == 'Video'"
                                     [ngClass]="{'border-color-red': isActivElement(item)}">                                   

<div class="col-sm-12" (click)="determineLinkOfVideo(item)">
    <div class="{{item.class[0]}}">
        <iframe class="embed-responsive-item" [src]="getSafeResourceUrl(item.urlVideo)" alt="video"></iframe>
    </div>
</div>


<modal (onClose)="closed()"
    (onOpen)="opened()" #validationModalVideo>
    <form #modalForm="ngForm">
        <modal-body>
            <div class="form-group">
                <label for="name">{{languages.getLang(lang.lang,'constructor').get('linkofvideo')}}</label>
                <input type="text" class="form-control" required [(ngModel)]="item.urlVideo" name="url" id="urlVideo">
            </div>
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-primary" [disabled]="!modalForm.valid" (click)="validationModalVideo.close()">
                {{languages.getLang(lang, 24)}}
            </button>
        </modal-footer>
    </form>
</modal>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>     
                <!------------------------------------------------------------------------->
                <div *ngIf="container.type =='Navbar'" class="col-sm-{{container.width}}">

                    
                    <nav class="navbar navbar-default" style="margin-bottom: 1px">
                        <div class="container">

                            <ul class="nav navbar-nav" *ngFor="let link of container.links">
                                <li (click)="determineEffectOfTheLink(link)"><a>{{link.name}}</a></li>
<modal (onClose)="closed()"
    (onOpen)="opened()" #validationModal>
    <form #modalForm="ngForm">
        <modal-body>
            <div class="form-group">
                <label for="name">{{languages.getLang(lang.lang,'constructor').get('nameoflink')}}</label>
                <input type="text" class="form-control" required [(ngModel)]="link.name" name="name" id="name">
            </div>
            <div class="form-group">
                <label for="firstName">{{languages.getLang(lang.lang,'constructor').get('addlinknavbar')}}</label>
                <input type="text" class="form-control" required [(ngModel)]="link.urlPage" name="urlPage" id="urlPage">
            </div>
        </modal-body>
        <modal-footer>
            <button type="button" class="btn btn-primary" [disabled]="!modalForm.valid" (click)="validationModal.close()">{{languages.getLang(lang, 24)}}</button>
        </modal-footer>
    </form>
</modal>
                            </ul>
                            <button type="button" [ngClass]="{'btn btn-default':true, 'isVisible':getVisibleBorder()}" 
                                        aria-label="Left Align"
                                        (click)="removeLinkFromNavbar(container)">
                                <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                            </button>
                            
                            <button type="button" [ngClass]="{'btn btn-default':true, 'isVisible':getVisibleBorder()}" 
                                        aria-label="Left Align"
                                        (click)="addLinkInNavbar(container)">
                                <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                            </button>

                        </div>
                    </nav>
                    
                    
                </div>     
                <!--------------------------------------------------------------------------->
            </div>
        </div>
        <ckeditor *ngIf="this.activTextField != null" [(ngModel)]="activTextField.text" debounce="500"> 
        </ckeditor>    
    </div>

    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <span>{{activeId.activeName}}</span> 
                <button type="button" class="btn btn-default" (click)="addComment()">{{languages.getLang(lang.lang,'constructor').get('addcomment')}}</button>
            </div>
            <div class="panel-body">
                <textarea [(ngModel)]="textComment"
                    name="styled-textarea" id="styled" onfocus="this.value=''; 
                    setbg('#e5fff3');" onblur="setbg('white')">
                </textarea>
            </div>
        </div>
    </div> 

    <div *ngFor="let usersComment of sites.activePage.usersComments" class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">{{usersComment.usersName}}</div>
            <div class="panel-body"><pre>{{usersComment.textUsersComment}}</pre></div>
        </div>
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
    .isVisible{
        visibility: hidden;
    }
    .nullpadding{
        padding: 0px;
    }
    textarea#styled {
        width: 100%;
        height: 60px;
        border: 3px solid #cccccc;
        padding: 5px;
        font-family: Tahoma, sans-serif;
        background-image: url(bg.gif);
        background-position: bottom right;
        background-repeat: no-repeat;   
        resize: none;
    }
  `]
})

export class ConstructorMainComponent { 
    public url:SafeResourceUrl;
    public getSafeResourceUrl(urlVideo){
         return this.url = this.sanitationService.bypassSecurityTrustResourceUrl(urlVideo);
    }


    @ViewChild('validationModal')   
    validationModal: ModalComponent;
    closed() {
    }
    opened() {
    }

    @ViewChild('validationModalVideo')
    validationModalVideo: ModalComponent;
    


    langcomponentRu
    langcomponentEn

    activeId = activeId
    textComment = ""
    content
    languages = languages  
    lang = lang
    namePage: string = ""
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
        this.activContainer = new Container(12)
        this.content = '<div>Angular2<div>'

        this.langcomponentRu = languages.getLang("Ru", "constructor")
        this.langcomponentEn = languages.getLang("En", "constructor")
        
        this.langcomponentRu.set("addcomment","Добавить коментарий ")
        this.langcomponentEn.set("addcomment","Add comment")

        this.langcomponentRu.set("addlinknavbar","Введите имя страницы")
        this.langcomponentEn.set("addlinknavbar","Enter name of page")

        this.langcomponentRu.set("nameoflink","Имя ссылки")
        this.langcomponentEn.set("nameoflink","Name of link")

        this.langcomponentRu.set("linkofvideo","Ссылка на видео")
        this.langcomponentEn.set("linkofvideo","The link of video")

        this.langcomponentRu.set("buttonreview","Просмотр")
        this.langcomponentEn.set("buttonreview","reView")

        this.langcomponentRu.set("buttondeleteelement","Удалить компонент")
        this.langcomponentEn.set("buttondeleteelement","Delete component")

        this.langcomponentRu.set("buttondeletecontainer","Удалить контейнер")
        this.langcomponentEn.set("buttondeletecontainer","Delete containet")
    }
    determineLinkOfVideo(item){
        if(!this.visibleBorder) this.validationModalVideo.open()
    }
    addComment(){
        sites.activePage.usersComments.push(new UsersComment(this.activeId.activeName, this.textComment))
    }
    addLinkInNavbar(container){
        container.links.push(new Link("Link","Link",null))
    }
    removeLinkFromNavbar(container){
        container.links.pop()
    }
    determineEffectOfTheLink(link){
        if(!this.visibleBorder) this.validationModal.open()
        else {
            for (let page of sites.activeSite.containers){
                if(page.name == link.urlPage){
                    sites.activePage = page
                    console.log(page)
                }
            }
        }    
    }

    getCommentFromDB(){

    }

    setView(){
        this.activTextField = null
        this.activContainer = null
        this.visibleBorder = !this.visibleBorder
        console.log(JSON.stringify(sites.activePage))
        console.log(this.generateHtml(sites.activePage))
    }
    removeActiveContaner(){
        sites.activePage.containers.splice(sites.activePage.containers.indexOf(this.activContainer), 1)
        this.activTextField = null
        this.activContainer = null
    }
    removeFromContainer(){
        this.activContainer.items.splice(this.activContainer.items.indexOf(this.activTextField), 1)
        this.activTextField = null
        this.activContainer = new Container(12)
    }
    addContainer($event) {
        if($event.dragData.type == "Container")
            sites.activePage.containers.push(new Container($event.dragData.width))
        else
            sites.activePage.containers.push(new NavbarContainer($event.dragData.width))
        this.addChangedSites(sites.activeSite)
    }
    removeContainer($event){
        console.log("remove")
        sites.activePage.containers.splice(sites.activePage.containers.indexOf($event.dragData), 1)
    }
    getVisibleBorder(){
        return this.visibleBorder
    }
    addItemToContainer($event, container: Container) {

        if ($event.dragData.type == 'Video') {
            container.items.push(new VideoItem(
                $event.dragData.name,
                $event.dragData.urlVideo))
        } else if ($event.dragData.type == 'TextField') {
            container.items.push(new TextField(
                $event.dragData.name,
                $event.dragData.text))
        }
        let page = JSON.parse(JSON.stringify(sites.activePage))
        this.addChangedSites(sites.activeSite)
    }


    setActivContaner(container){
        this.activContainer = container
    }
    setActivElement(item, container){
        this.activTextField = item
        this.activContainer = container
    }
    isActivContainer(container){
        if(this.activContainer === container) return true
        else return false
    }
    isActivElement(item){
        if(this.activTextField === item) return true
        else return false
    }

    addChangedSites(changedSite){
        changedSites.addSite(changedSite)
    }
    generateHtml(page: Page){
        let htmlCod: string
            
        htmlCod += "<html><head>"
        htmlCod += "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">"
        htmlCod += " <script src=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js\"></script>"
        htmlCod += "</head><body>"
        for(let container of page.containers){
            if(container.type == "Container"){
                htmlCod += "<div class=\"col-sm-"+container.width+"\">"
                    for(let item of container.items){
                            if(item instanceof TextField){
                                htmlCod += "<div>" + item.text   
                            }
                            if(item instanceof VideoItem){
                                htmlCod += "<div class=\"col-sm-12\"><div class=\"{{item.class[0]}}\">"
                                htmlCod += "<iframe class=\"embed-responsive-item\" src="
                                htmlCod += "\""+item.urlVideo+"\" alt=\"video\"></iframe></div></div>"
                            }
                        htmlCod += "</div>" 
                    }
                htmlCod += "</div>"
            } else if(container.type == "Navbar"){
                
            }
        }
        htmlCod += "</body></html>"
        return htmlCod
    }
}
