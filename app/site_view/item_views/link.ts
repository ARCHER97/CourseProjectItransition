import { ItemView } from './item.view'

export class Link extends ItemView {

    public type = 'Link'

    constructor(public name: string,
                public text: string,
                public urlPage: string) {

        super(name)
    }

}