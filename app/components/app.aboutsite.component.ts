import { Component } from '@angular/core';
import { sites, activeId } from '../global/activeSite';
import { SiteService } from '../servise/app.activeSites.servise';

import 'script.js'

@Component({
  selector: 'about-site-app',
  template: `
    <div class="col-sm-12">
        <div> 
            <h3>Active site's params</h3>
            autor: {{sites.activeSite.authorName}} <br>
        </div>
        <div>your rating:</div>
        <div class="rating">
          <span [ngClass]="{'activeRating': getActivRating(5)}" (click)="setRating(5)">☆</span>
          <span [ngClass]="{'activeRating': getActivRating(4)}" (click)="setRating(4)">☆</span>
          <span [ngClass]="{'activeRating': getActivRating(3)}" (click)="setRating(3)">☆</span>
          <span [ngClass]="{'activeRating': getActivRating(2)}" (click)="setRating(2)">☆</span>
          <span [ngClass]="{'activeRating': getActivRating(1)}" (click)="setRating(1)">☆</span>
        </div>
    </div>
  `,
  styles:[`
      .rating {
        text-size: 12px;
        unicode-bidi: bidi-override;
        direction: rtl;
        text-align: center;
      }
      .rating > span {
        display: inline-block;
        position: relative;
        width: 1.1em;
      }
      .rating > span:hover,
      .rating > span:hover ~ span {
        color: transparent;
      }
      .rating > span:hover:before,
      .rating > span:hover ~ span:before {
        content: "☆";
        position: absolute;
        left: 0; 
        color: gold;
      }
      .activeRating{
        content: "☆";
        position: absolute;
        left: 0; 
        color: gold;
      }
  `]
})

export class AboutSiteComponent{
  sites = sites
  rating: number = 0
  
  constructor(private siteService: SiteService){  }
  getActivRating(num){
    if(this.rating >= num){
      return true
    }else return false
  }
  setRating(num){
    console.log('Click')
    if(activeId.activeId != null){
      this.rating = num
      console.log("activId not null")
      this.siteService.isClickRating(activeId.activeId, num, sites.activePage.ID)
        .subscribe(numberRes => {
          this.rating = numberRes
          console.log("setRating")
          console.log(this.rating)
          
        })
      
    }
  }
}
