import {DomSanitizer} from "@angular/platform-browser";
export abstract class ItemView {

    constructor(public name: string) { console.log("constructor")}

   // abstract generateHtml(): string

    type: string
    
}