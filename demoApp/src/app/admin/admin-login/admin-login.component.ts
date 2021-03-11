import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminAuthService } from 'src/app/admin-auth.service';
import { UserTypeService } from 'src/app/user-type.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  username : string;
  adminloginForm : FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private adminauthService: AdminAuthService,
      private userType: UserTypeService
  ) { 
      // redirect to home if already logged in
      if (this.adminauthService.currentUserValue) { 
          this.router.navigate(['/inventory']);
          this.adminauthService.isLoggedIn=true;
      }
  }

  ngOnInit() {
      this.adminloginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.adminloginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.adminloginForm.invalid) {
          return;
      }

      this.loading = true;
      this.adminauthService.setUsername(this.username);
      this.userType.setUserType("admin");
      this.adminauthService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from route parameters or default to '/'
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inventory';
                  this.router.navigate([returnUrl]);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}