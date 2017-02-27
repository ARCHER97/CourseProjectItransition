import { ItemView } from './item_views/item.view'

export class Container {
    public items: Array<ItemView> = new Array<ItemView>()
    public type = "Container"
    constructor(public width: number) { }

}