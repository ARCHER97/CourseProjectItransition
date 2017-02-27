import { ItemView } from './item.view'

export class TextField extends ItemView {

    public type = 'TextField'

    constructor(name: string, public text: string) {
        super(name)
    }

}