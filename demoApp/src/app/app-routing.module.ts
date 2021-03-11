import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ViewproductComponent } from './admin/viewproduct/viewproduct.component';
import { CartComponent } from './shop/cart/cart.component';
import { ProductslistComponent } from './shop/products/products.component';
import { LoginComponent } from './user/login/login.component';
import { UserregisterationComponent } from './user/userregisteration/userregisteration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewuserComponent } from './admin/viewuser/viewuser.component';
import { UserdetailsComponent } from './user/userdetails/userdetails.component';
import { CategoriesComponent } from './shop/categories/categories.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'categories/products/AllBooks',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    // children:[
    //   {
    //     path : 'register',
    //     component : UserregisterationComponent
    //   }
    // ]
  },
  {
    path : 'categories',
    //canActivate : [AuthGuard],
    component : CategoriesComponent,
    children :[
      {
        path : 'products/:category',
        component : ProductslistComponent,
        
      }
    ]
  },
  {
    path : 'inventory',
    //canActivate : [UsergaurdService],
    component : InventoryComponent
  },
  {
    path : 'register',
    component : UserregisterationComponent
  },
  {
    path : 'cart',
    canActivate : [AuthGuard],
    component : CartComponent
  },
  {
    path : 'viewproduct',
    component : ViewproductComponent
  },
  {
    path : 'adminLogin',
    component : AdminLoginComponent
  },
  {
    path : 'viewuser',
    component : ViewuserComponent,
    children:[
      {
        path :'userdetails/:id',// 'userdetails/:id/:namelikewise
        component : UserdetailsComponent
      }
    ]
  },
  {
    path : '**',
    component : PagenotfoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
