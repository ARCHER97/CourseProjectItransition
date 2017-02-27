import { ItemView } from './item.view'

export class VideoItem extends ItemView {

    public type = 'Video'
    public class = ["embed-responsive embed-responsive-16by9",
                    "embed-responsive embed-responsive-4by3"]
    constructor(name: string, public urlVideo: string) {
        super(name)
    }

}