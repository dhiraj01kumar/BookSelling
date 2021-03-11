import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userregisteration',
  templateUrl: './userregisteration.component.html',
  styleUrls: ['./userregisteration.component.css']
})
export class UserregisterationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  postForm(){
    alert('form Posted');
  }

}
