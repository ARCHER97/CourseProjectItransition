import { ItemView } from './item_views/item.view'
import { Link } from './item_views/link'
import { Container } from './container'
export class NavbarContainer extends Container{
    public links: Array<Link> = new Array<Link>()
    constructor(public width: number) {
        super(width)
        this.type = "Navbar"
     }

}