import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-priceupdater',
  templateUrl: './priceupdater.component.html',
  styleUrls: ['./priceupdater.component.css']
})
export class PriceupdaterComponent implements OnInit {
  @Input()  // means the value will be fetched by the parent
  pricevalue : number;
  //custom event
  @Output() // means the value will be emitted to the parent
  update = new EventEmitter<number>();

  constructor() { }
  
  updateprice(){
    this.update.emit(this.pricevalue);
  }
  ngOnInit(): void {
  }

}
