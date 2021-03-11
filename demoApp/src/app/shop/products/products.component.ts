import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsdataService } from 'src/app/productsdata.service';
import { SearchService } from 'src/app/search.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductslistComponent implements OnInit {
  productsList:Array<Product>;
  isAdmin : boolean = true;
  category : string;
  searchword:string;
  constructor( productservice:ProductsdataService, activeroute:ActivatedRoute, private search : SearchService) { 
    //this.productsList = productservice.getProducts();
    this.search.getword().subscribe(newproduct=>{
      this.searchword = newproduct;
      this.productsList = productservice.searchproduct(this.searchword);
    });
    
    activeroute.params.subscribe(params=>{
      this.category = params['category'];
      this.productsList = productservice.findCategory(this.category);
      
    });
  }

  ngOnInit(): void {
  }
  // delete(pid:number):void{
  //   for(var i=0; i<this.productsList.length; i++){
  //     if(this.productsList[i].id == pid){
  //       this.productsList.splice(i,1);
  //     }
  //   }    
  // }
  
}
