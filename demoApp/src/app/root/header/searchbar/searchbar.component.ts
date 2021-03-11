import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsdataService } from 'src/app/productsdata.service';
import { Product } from 'src/app/shop/products/product';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  products: Product[];
  searchword : string;

  constructor(productservice: ProductsdataService) {
      this.products = productservice.getProducts();
  }
  ngOnInit(): void {
  }
  @Output() searchcriteria = new EventEmitter<String>();
  searchThis() {
    this.searchcriteria.emit(this.searchword)

  }
}