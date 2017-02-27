import { Page } from './page'

export class Site {   
    constructor(
        public name: String,
        public ID: String,
        public authorName: String,
        public containers: Array<Page>){}
}

