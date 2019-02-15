import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageSent } from '../models/message-sent.model';

@Component({
  selector: 'app-sent-messages',
  templateUrl: './sent-messages.component.html',
  styleUrls: ['./sent-messages.component.scss']
})
export class SentMessagesComponent implements OnInit {
  messages: MessageSent[];
  selectedMessages: string[];
  selectedMessage: MessageSent;

  constructor(private msgService: MessagesService, private auth: AuthService) { }

  ngOnInit() {

    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.msgService.getSentMessages().subscribe(
      (response: MessageSent[]) => {
        this.messages = response;
        this.messages.forEach(element => {
          // PrimeNG listbox requires a 'value' and 'icon' property
          element.value = element.body;
          element.icon = element.toMemberPicUri;
        });
      });
  }

}
