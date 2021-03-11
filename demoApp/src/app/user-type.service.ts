import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor() { }

  subject = new Subject<string>();
  setUserType(userType : string){
    this.subject.next(userType);
  }
  getUserType():Observable<string>{
    return this.subject.asObservable();
  }
}
