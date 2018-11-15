import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/member';
import { MatSnackBar } from '@angular/material';
import { Subject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BASE_URL = "http://localhost:57544/api";

  constructor(private http: HttpClient, private sb: MatSnackBar) { }

  getMembers(filter = '', sortOrder = 'asc', pageNumber=0, pageSize=10) : Observable<Member[]>{
    return this.http.get<Member[]>(this.BASE_URL + '/members', {
      params: new HttpParams() 
      .set('filter', filter)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
    });
  }

  handleError(errorMsg, error){
    console.error(errorMsg, error)
    this.sb.open(errorMsg, "close", { duration: 2000 });
  }

}
