import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductslistComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    ProductslistComponent,
    CartComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    ProductslistComponent,
    CartComponent,
    CategoriesComponent
  ]
})
export class ShopModule { }
