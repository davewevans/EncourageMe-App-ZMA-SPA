import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SelectItem } from 'primeng/api';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material';


interface City {
  id?: number;
  name: string;
  code: string;
}

export class MessageReceived implements SelectItem {
  messageId: number;
  fromName: string;
  subject: string;
  body: string;
  fromMemberPicUri?: string;

  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

 // styleUrls: ['./received-messages.component.scss']
@Component({
  selector: 'app-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.scss']
})
export class ReceivedMessagesComponent implements OnInit {

  messages: MessageReceived[];
  selectedMessages: string[];
  selectedMessage: MessageReceived;

  constructor(private msgService: MessagesService, private auth: AuthService) {

  }

  ngOnInit() {


    console.log('isLoggedIn: ' + this.auth.isLoggedIn());

    if (!this.auth.isLoggedIn()) {
      return;
    }

    this.msgService.getReceivedMessages().subscribe(
      (response: MessageReceived[]) => {
        this.messages = response;
        this.messages.forEach(element => {
          // PrimeNG listbox requires a 'value' and 'icon' property
          element.value = element.body;
          element.icon = element.fromMemberPicUri;
        });
      });
  }

}
