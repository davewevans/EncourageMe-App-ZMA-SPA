import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Member } from '../members/models/member.model';
import { MatSnackBar } from '@angular/material';
import { Subject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginationService } from './pagination.service';
import { AuthService } from '../auth/auth.service';
import { MemberProfile } from '../members/models/member-profile.model';
import { SendMessageFormData } from '../messages/models/send-message-form-data.model';
import { MemberSettings } from '../members/models/member-settings.model';
import { Group } from '../members/models/group.model';
import { SendMessage } from '../messages/models/send-message.model';
// import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers = new HttpHeaders();
  private BASE_URL = 'http://localhost:57544/api';

  constructor(private http: HttpClient, private sb: MatSnackBar,
    private paginationService: PaginationService, private auth: AuthService) {

      console.log('dataservice constructor');

    // this.headers = this.headers.set('Content-Type', 'application/json');
    // this.headers = this.headers.set('Accept', 'application/json');
   }

   getMemberProfile(id = null) {

    const memberId = id === null ? this.auth.memberId : id;

    // Allow CORS
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');

    const mergedUrl = this.BASE_URL + '/memberprofile/' + memberId;

    return this.http.get<MemberProfile>(mergedUrl, {
      headers: this.headers
    });
   }

  getMembers(filter = '', sortOrder = 'asc', pageNumber = 1, pageSize = 25)
  : Observable<HttpResponse<Member[]>> {
    console.log('getMembers filter: ' + filter);

    // Allow CORS
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');

    const mergedUrl = this.BASE_URL + '/members';

    return this.http.get<Member[]>(mergedUrl, {
      observe: 'response', // observe the whole http response (needed to read header)
      params: new HttpParams()
        .set('query', filter)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
      headers: this.headers});
  }

  getgroups(): Observable<Group[]> {
    const mergedUrl = this.BASE_URL + '/groups';
    return this.http.get<Group[]>(mergedUrl);
  }

  sendMessage(result: SendMessage) {
    console.log('sendMessage: ' + result.message);

    result.fromMemberId = this.auth.memberId;

    const messageData = {
      'toMemberId': result.toMemberId,
      'fromMemberId': result.fromMemberId,
      'body': result.message
    };

    return this.http.post(this.BASE_URL + '/messages', messageData);
  }

  getMemberSettings() {

    console.log('getMemberSettings() memberId: ' + this.auth.memberId);

    const memberId = this.auth.memberId;
    const mergedUrl = this.BASE_URL + '/membersettings/' + memberId;
    return this.http.get<MemberSettings>(mergedUrl);
  }

  updateMemberSettings(settings: MemberSettings) {
    const memberId = this.auth.memberId;
    const mergedUrl = this.BASE_URL + '/membersettings/' + memberId;
    return this.http.put(mergedUrl, settings);
  }


  handleError(errorMsg, error) {
    console.error(errorMsg, error);
    this.sb.open(errorMsg, 'close', { duration: 2000 });
  }

}
