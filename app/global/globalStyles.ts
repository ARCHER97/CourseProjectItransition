export class GlobalStyles{
    
    backgroundColor: string = "lightblue"
    
    setbgcolor(color){
        this.backgroundColor = color;
    }
    
    getbgcolor(){
        return this.backgroundColor
    }
}
export var globalStyles = new GlobalStyles()