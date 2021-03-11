import { Injectable } from '@angular/core';
import { Product } from './shop/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsdataService {
  productsList: Product[];
  newList: Product[];

  constructor() { 
    this.productsList = new Array<Product>();
    let p1 = new Product(1, "Angular CookBook", "Technical",540,240,"assets/images/angularCookBook.jpg");
    let p2 = new Product(2, "Ajax For Dummies", "Technical",1030,640, "assets/images/ajaxForDummies.jpg");
    let p3 = new Product(3, "Life Rules", "Self Help",780,540, "assets/images/lifeRules.jpg");
    let p4 = new Product(4, "Tinkle", "Comic",340,140, "assets/images/tinkle.jpg");
    let p5 = new Product(5, "You can Win", "Self Help",640,440, "assets/images/youCanWin.jpg");
    let p6 = new Product(6, "Continuous Dilevery", "Technical",750,450,"assets/images/continuousDelivery.jpg")
    this.productsList.push(p1);
    this.productsList.push(p2);
    this.productsList.push(p3);
    this.productsList.push(p4);
    this.productsList.push(p5);
    this.productsList.push(p6);
    this.newList = new Array<Product>();
    
  }
  getProducts(){
    return this.productsList;
  }

  findCategory(category:string){
    var k : number = 0;
    this.newList = [];
    if(category==='AllBooks'){
      return this.getProducts();
    }else{
      for (var i = 0; i < this.productsList.length; i++) {
        if (this.productsList[i].category == category){
          this.newList.push(this.productsList[i]);
          k++;
        }
       
      }
      return this.newList;
    }
  }
  searchproduct(searchword:string){
    var k : number = 0;
    this.newList = [];
    var tobeSearched = searchword.toLowerCase();
      for (var i = 0; i < this.productsList.length; i++) {
        var productName = this.productsList[i].name.toLowerCase();
        if (productName.includes(tobeSearched)){
          this.newList.push(this.productsList[i]);
          k++;
        }
      }
      return this.newList;
  }

  findAll(): Product[] {
    return this.productsList;

}

find(id: number): Product {
    return this.productsList[this.getSelectedIndex(id)];
}


private getSelectedIndex(id: number) {
    for (var i = 0; i < this.productsList.length; i++) {
        if (this.productsList[i].id == id) {
            return i;
        }
    }
    return -1;
}
  
}
