import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { RouterModule } from '@angular/router';
import { PriceupdaterComponent } from './priceupdater/priceupdater.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';



@NgModule({
  declarations: [
    InventoryComponent,
    ViewproductComponent,
    PriceupdaterComponent,
    ViewuserComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    InventoryComponent,
    ViewproductComponent,
    PriceupdaterComponent,
    ViewuserComponent,
    AdminLoginComponent
  ]
})
export class AdminModule { }
