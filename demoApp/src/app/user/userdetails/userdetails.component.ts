import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  userid : number;
  user : any;
  constructor(private activeroute : ActivatedRoute, private userservice:UserService) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe( params=>{
      this.userid = parseInt( params['id']);
      this.userservice.getUser(this.userid).subscribe(userdata=>{
        this.user = userdata;
      }) 
    });
  }

}
