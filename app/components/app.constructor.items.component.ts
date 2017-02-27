import { Component } from '@angular/core';

import { Link } from '../site_view/item_views/link'
import { TextField } from  '../site_view/item_views/text.field'
import { VideoItem } from '../site_view/item_views/video'
import { ItemView } from "../site_view/item_views/item.view";
import { Container } from '../site_view/container';
import { NavbarContainer } from '../site_view/navbar'

@Component({
  selector: 'constructor-items-app',
  template: `
      <div class="col-sm-12">

        <ul class="nav nav-tabs">
            <li style="width: 50%">
                <a data-toggle="tab" href="#itemsMenu">
                    Items
                </a>
            </li>
            <li class="active" style="width: 50%">
                <a data-toggle="tab" href="#containerMenu">
                    Contaners
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div id="itemsMenu" class="tab-pane fade" style="width: 100%">
                <div class="panel panel-success">
                    <div class="panel-body">
                        <div *ngFor="let item of items" class="panel panel-default"
                                    dnd-draggable [dragData]="item"  [dropZones]="['demo1']" 
                                    (onDragSuccess)="dragSuccess(item)">
                            <div class="panel-body">
                                <p *ngIf="item.type == 'TextField'">{{item.name}}</p>
                                <p *ngIf="item.type == 'Video'">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="containerMenu" class="tab-pane fade in active">
                <div class="panel panel-success" style="width: 100%">
                    <div class="panel-body">
                        <div *ngFor="let contanerComponent of availableContanerComponent" class="panel panel-default"
                                    dnd-draggable [dragData]="contanerComponent"  [dropZones]="['demo2']">
                            <div class="panel-body">
                                <div *ngIf="contanerComponent.type == 'Container'">
                                    {{ contanerComponent.width }} from 12 width<br>
                                </div>
                                <div *ngIf="contanerComponent.type == 'Navbar'">
                                    {{ contanerComponent.width }} width, Navbar<br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
  `,
  styles:[`
    .notPadingLeftAndRight{
        padding-left: 0px; 
        padding-right: 0px;
    }
  `]
})

export class ConstructorItemsComponent {

    items: Array<ItemView> = new Array<ItemView>()
    
    availableContanerComponent: Array<Container> = [
        new Container(12),
        new Container(6),
        new Container(4),
        new NavbarContainer(12)
    ];
    private itemCounter: number = 1

    constructor() {
        this.items.push(new TextField("Сustomizable text", "TextField"))
        this.items.push(new VideoItem("Video", "//www.youtube.com/embed/ePbKGoIGAXY"))
    }
    

    dragSuccess(item: ItemView) {
        // console.warn("dragSuccess " + JSON.stringify(item))
        // if (item.constructor.name == 'TextField') {

        //     this.items[0] = new TextField("TextField" + this.itemCounter, "TextField")
        // } else if (item.constructor.name == 'Link') {

        //     this.items[1] = new Link("Link" + this.itemCounter, "Text of link", "http://vk.com")
        // }
    }
}