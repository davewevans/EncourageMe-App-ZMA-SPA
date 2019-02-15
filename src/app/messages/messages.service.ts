import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { MessageSent } from './models/message-sent.model';
import { MessageReceived } from './models/message-received.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private BASE_URL = 'http://localhost:57544/api';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getReceivedMessages() {

    const mergedUrl = this.BASE_URL + '/messages' + '/receivedMessages';

    const memberId = localStorage.getItem(this.auth.MEMBER_ID_KEY);
    const token = localStorage.getItem(this.auth.TOKEN_KEY);

    return this.http.get<MessageReceived[]>(mergedUrl, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Access-Control-Allow-Origin', '*'),
      // observe: 'response',
      params: new HttpParams()
        .set('memberId', memberId)
    });
  }

  getSentMessages() {
    const mergedUrl = this.BASE_URL + '/messages' + '/sentMessages';

    const memberId = localStorage.getItem(this.auth.MEMBER_ID_KEY);
    const token = localStorage.getItem(this.auth.TOKEN_KEY);

    return this.http.get<MessageSent[]>(mergedUrl, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Access-Control-Allow-Origin', '*'),
      // observe: 'response',
      params: new HttpParams()
        .set('memberId', memberId)
    });
  }

}


