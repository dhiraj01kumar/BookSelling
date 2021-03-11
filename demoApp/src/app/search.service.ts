import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  subject = new Subject<string>();
  constructor() { }
  setword(word:string){
    this.subject.next(word);
  }
  getword():Observable<string>{
    return this.subject.asObservable();
  }
}
