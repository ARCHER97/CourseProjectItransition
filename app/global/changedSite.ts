import { Site } from '../site_view/site'
export class ChangedSites{
    changedSites: Array<Site>
    constructor(){
        this.changedSites = new Array<Site>()
    }
    addSite(changedSite){
        this.changedSites.push(changedSite) 
    }
}
export var changedSites = new ChangedSites()