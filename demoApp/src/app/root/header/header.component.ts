import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/admin-auth.service';
import { adminUser } from 'src/app/admin/adminUser';
import { AuthService } from 'src/app/auth.service';
import { SearchService } from 'src/app/search.service';
import { UserTypeService } from 'src/app/user-type.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username : string = 'Guest';
usertype : string;
searchword : string;
  currentUser: User;
  currentAdminUser : adminUser;
  constructor(private authService:AuthService, 
    private search :SearchService, 
    private router:Router,
    private adminauthService : AdminAuthService,
    private userType:UserTypeService
    
    ) {

    //subscribe to get new user name from login
    this.authService.getUsername().subscribe(newname=>{
      this.username = newname;
    });
    //subscribe to distinguish between general and admin users
    this.userType.getUserType().subscribe(newUsertype=>{
      this.usertype = newUsertype;
    });

    if(this.usertype == "admin"){
      this.adminauthService.currentAdminUser.subscribe(x=>this.currentAdminUser = x);
    }
    else if(this.usertype == "general"){
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

   }
  get isLoggedIn():boolean{
    if(this.usertype=="admin"){
      return this.adminauthService.isLoggedIn;
    }
    else if(this.usertype=="general"){
      return this.authService.isLoggedIn;
    }
    
  }
  logOut(){
    if(this.usertype=="general"){
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    else if(this.usertype=="admin"){
      this.adminauthService.logout();
      this.router.navigate(['/adminLogin'])
    }
    
  }

  ngOnInit(): void {
  }
  searchthis(){
    this.search.setword(this.searchword);
  }
  

  }
