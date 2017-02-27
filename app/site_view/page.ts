import { Container } from './container'
import { UsersComment } from './usersComment'

export class Page {
    constructor(
        public ID: string,
        public name: string,
        public rating: number,
        public containers: Array<Container> = new Array<Container>(),
        public usersComments: Array<UsersComment> = new Array<UsersComment>()
    ){}
}

