import { Component, OnInit } from '@angular/core';
import { ProductsdataService } from 'src/app/productsdata.service';
import { Product } from 'src/app/shop/products/product';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productsList:Array<Product>;
  // isAdmin : boolean = true;
  constructor(productservice:ProductsdataService) { 
    this.productsList = productservice.getProducts();
  }

  delete(pid:number):void{
    for(var i=0; i<this.productsList.length; i++){
      if(this.productsList[i].id == pid){
        this.productsList.splice(i,1);
      }
    }    
  }
  ngOnInit(): void {
  }
  setNewPrice(newprice:number, pid:number){
    for(var i = 0; i<this.productsList.length;i++){
      if(this.productsList[i].id==pid){
        this.productsList[i].newPrice = newprice;
      }
    }
  }

}
