import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
userList : Array<User>; //refactor to user type
  constructor(private userservice: UserService) { }

  
  ngOnInit(): void {
    this.userservice.getUsers().subscribe(userdata=>{
      this.userList = userdata;
    })
  }
  
}
