import { Injectable }     from '@angular/core';
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http'
import { Site }           from '../site_view/site';
import { Page }           from '../site_view/page';
import { Observable }     from 'rxjs/Observable';
import { sites }          from '../global/activeSite'
import { Container } from '../site_view/container'
import { UsersComment } from '../site_view/userscomment'
import { User } from '../global/user'
import 'rxjs/Rx';

@Injectable()
export class SiteService {
  private sitesUrl = 'http://localhost:8888/site';  // URL to web API

  constructor (private http: Http) {
  }
  getSitesHTTP(): Observable<Array<Site>>{
     return this.http.get(this.sitesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getTagsHttp() : Observable<Array<string>>{
    return this.http.get(this.sitesUrl +'/tags')
                    .map(this.extractDataTags)
                    .catch(this.handleError);
  }
  getUsers() : Observable<Array<User>>{
      return this.http.get('http://localhost:8888/user/')
                    .map(this.extractDataUsers)
                    .catch(this.handleError);
  }
  getPagesBySiteID(ID : any) : Observable<Array<Page>> { 
    console.log(ID+" id site")
    return this.http.get('http://localhost:8888/page/' + ID) 
      .map(this.extractDataPage) 
      .catch(this.handleError); 
  } 

  setBan(userID){
    let body = JSON.stringify({ user_id: userID});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8888/user/Bunning', body, options)
  }

  private extractDataTags(res: Response) {
    let tags = new Array<string>()
    
    for(let i = 0; i< res.json().length; i++)
    {
       tags.push(res.json()[i].textTag)
       console.log(res.json()[i].textTag)
    }
    return tags
  }
  private extractDataUsers(res: Response) {
    let user = new Array<User>()
    
    for(let i = 0; i< res.json().length; i++)
    {
       user.push(new User(res.json()[i].user_name, res.json()[i].ID, res.json()[i].status))
       //console.log(res.json()[i].textTag)
    }
    return user
  }

  getPagesOfSites(site, actID){
      this.getPagesBySiteID(site.ID)
          .subscribe(
            pages => site.containers = pages
          );

        let body = JSON.stringify({ user_id: actID, site_id: site.ID });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8888/site/roots', body, options)
                    .subscribe(something => sites.canChangeSite = something.json())
 }


  getMySites(actID : any): Observable<Array<Site>> {
    let body = JSON.stringify({ user_id: actID });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8888/site/receiveUserSite', body, options)
      .map(this.extractDataRoots)
  }
  
  
  ReceiveAddressServise(searchText : String) : Observable<Array<String>>{
    console.log("ReceiveAddressServise")
    console.log(searchText)
        return this.http.get('http://localhost:8888/search/suggest/' + searchText)
                        .map(this.extractDataSearch)
                        .catch(this.handleError)
    }
  getMySiteID(siteID : any, nameSite : any): Observable<Site> {
    let body = JSON.stringify({ site_id: siteID, name: nameSite});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8888/site/receiveConcreteSites', body, options)
                .map(this.extractDataSite)
  }
  isClickRating(userID, rating, pageID) : Observable<number> {
    let body = JSON.stringify({ user_id: userID, rating: rating, page_id: pageID });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8888/rating/access/', body, options)
                      .map(this.extractDataRating)
  }
  private extractDataRating(res: Response) {
    console.log(res.json())
    return res.json()
  }
  private extractDataSearch(res:Response){
        console.log("Full-text-search") 
        let body = res.json(); 
        /*console.log("res.json AddSite"+body) 
        console.log(body.docsuggest) */

        let arrSearchSite = new Array<string>()
        for(let i = 0; i<body.docsuggest[0].options.length; i++){

            //Сами объекты
            console.log(body.docsuggest[0].options[i])
            console.log(body.docsuggest[0].options[i].text)
            console.log(body.docsuggest[0].options[i].payload.titleURL) 

            arrSearchSite.push(body.docsuggest[0].options[i].payload.titleURL)
            arrSearchSite.push(body.docsuggest[0].options[i].text)
            
           /* let tempsite
            let a = body.docsuggest[0].options[i].text
            let b = body.docsuggest[0].options[i].payload.titleURL
            this.getMySiteID(b, a).subscribe(something => tempsite = something)
            
            arrSearchSite.push(tempsite)  */         
        }
        console.log("@@@")
        console.log(arrSearchSite)
        return arrSearchSite
    }
  
  private extractDataSite(res: Response) {
    let body = res.json()
    let tempSites = new Site(res.json()[0].name, res.json()[0].ID, res.json()[0].user_name, new Array<Page>())
    return tempSites
  }
  private extractDataRoots(res: Response) {
    let body = res.json()
    let tempSites = new Array<Site>()
    for (let i = 0; i < res.json().length; i++) {
      tempSites.push(new Site(res.json()[i].name, res.json()[i].ID, res.json()[i].user_name, new Array<Page>()))
    }
    return tempSites
  }
 
  private extractData(res: Response) {
    let body = res.json();
    let tempSites = new  Array<Site>()
    
    for(let i = 0; i< res.json().length; i++)
    {
       tempSites.push(new Site(res.json()[i].name, res.json()[i].ID, res.json()[i].user_name, new Array<Page>()))
    }
    console.log("extradata")
    sites.sites = tempSites;
    return sites.sites
  }
  
  private extractDataPage(res: Response) { 
    let tempPage= new Array<Page>() 

    for(let i = 0; i< res.json().length; i++) 
    { 
      console.log("i: " + i)
      tempPage.push(new Page(res.json()[i].ID, res.json()[i].page_name, res.json()[i].rating, JSON.parse(res.json()[i].contentPage)))  
    } 

    console.log("extradatapage")
    console.log(tempPage)
    return tempPage
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
