import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  getUsers() : Observable<any>{
    return this.http.get('http://jsonplaceholder.typicode.com/users');
  }
  addUser(userObj : any):Observable<any>{
    return this.http.post('http://jsonplaceholder.typicode.com/users',userObj);
  }
  getUser(id:number) : Observable<any>{
    return this.http.get('http://jsonplaceholder.typicode.com/users/'+id);
  }
  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
}
  
}
