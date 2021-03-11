export class Product{ //only a model class not a component but product list is component which contains an array of product.
    id : number;
    name : string;
    imgPath:string;
    category : string;
    currentPrice : number;
    newPrice : number;

    constructor(id:number, name:string, category:string, currentPrice:number, newPrice : number, imgPath:string){
        this.id = id;
        this.name = name;
        this.imgPath = imgPath;
        this.currentPrice = currentPrice;
        this.newPrice = newPrice;
        this.category = category;
    }
}