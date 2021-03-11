import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchbarComponent } from './header/searchbar/searchbar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    SearchbarComponent
  ]
})
export class RootModule {
}
