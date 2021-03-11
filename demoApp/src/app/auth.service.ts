import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isLoggedIn: boolean =true;

  

  // @Input()
  // public set setstatus(status : boolean){
  //   this.isLoggedIn = status;
  // }

  // public get getstatus():boolean{
  //   return this.isLoggedIn;
  // }


  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  status(){
    if(this.currentUserValue){
      this.isLoggedIn=true;
    }
  }
  
  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              this.isLoggedIn = true;
              return user;
          }));
  }
  

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.isLoggedIn = false;
  }



  //************************************************************************** */
  subject = new Subject<string>();
  setUsername(username : string){
    this.subject.next(username);
  }
  getUsername():Observable<string>{
    return this.subject.asObservable();
  }
}
