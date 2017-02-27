import { Site } from '../site_view/site'
import { Page } from '../site_view/page'
import { UsersComment } from '../site_view/usersComment'
import { Container } from '../site_view/container'

export class SitesClass{
    sites: Array<Site> 
    activeSite: Site
    activePage: Page
    public canChangeSite: boolean 
    constructor(){
        this.sites = new Array<Site>()
        this.activePage = new Page("","",0,new Array<Container>(), new Array<UsersComment>())
       // this.activePage.usersComments.push(new UsersComment("Artur","Hello World"))
        this.activeSite = new Site("Example","0","0", new Array<Page>())
        this.activeSite.containers.push(this.activePage)
        this.sites.push(this.activeSite)
        this.canChangeSite = false
       
    }
}
export class ActiveId{
    activeId: any
    activeName: string
    constructor(){
        this.activeId = null
        this.activeName = ""
    }
    public setActiveId(activeId: any){
        this.activeId = activeId
    }
    public setActiveName(activeName: any){
        this.activeName = activeName
    }
}
export var sites = new SitesClass()
export var activeId = new ActiveId()