import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { adminUser } from './admin/adminUser';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private currentAdminUserSubject: BehaviorSubject<adminUser>;
  public currentAdminUser: Observable<adminUser>;
  isLoggedIn: boolean =true;

  constructor(private http: HttpClient) {
      this.currentAdminUserSubject = new BehaviorSubject<adminUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentAdminUser = this.currentAdminUserSubject.asObservable();
  }

  public get currentUserValue(): adminUser {
      return this.currentAdminUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/adminUsers/adminAuthenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentAdminUserSubject.next(user);
              this.isLoggedIn=true;
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentAdminUserSubject.next(null);
      this.isLoggedIn=false;
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
