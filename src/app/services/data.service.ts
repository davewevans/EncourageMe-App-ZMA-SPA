import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Member } from '../shared/models/member.model';
import { MatSnackBar } from '@angular/material';
import { Subject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginationService } from './pagination.service';
import { ISendMessageFormData } from '../shared/interfaces/ISendMessageFormData';
// import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers = new HttpHeaders();
  private BASE_URL = 'http://localhost:57544/api';

  constructor(private http: HttpClient, private sb: MatSnackBar, 
    private paginationService: PaginationService) {

      console.info('dataservice constructor');

    // this.headers = this.headers.set('Content-Type', 'application/json');
    // this.headers = this.headers.set('Accept', 'application/json');
   }  

  getMembers(filter = '', sortOrder = 'asc', pageNumber=1, pageSize=25)
  : Observable<HttpResponse<Member[]>>
  {
    console.info("getMembers filter: " + filter);

    const mergedUrl = this.BASE_URL + '/members';
    return this.http.get<Member[]>(mergedUrl, {
      observe: 'response', // observe the whole http response (needed to read headers)
      params: new HttpParams() 
      .set('query', filter)
      .set('sortOrder', sortOrder)
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString())
    });  
  }

  sendMessage(result: ISendMessageFormData){
    console.info("sendMessage: " + result.message);

    let messageData = {
	    "toMemberId": result.memberId,
	    "body": result.message
    }

    return this.http.post(this.BASE_URL + '/messages', messageData);
  }

  handleError(errorMsg, error){
    console.error(errorMsg, error)
    this.sb.open(errorMsg, "close", { duration: 2000 });
  }

}
