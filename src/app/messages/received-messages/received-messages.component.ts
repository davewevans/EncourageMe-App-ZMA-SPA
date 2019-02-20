import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SelectItem } from 'primeng/api';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { MessageReceived } from '../models/message-received.model';
import { Status } from '../models/status.enum';


interface City {
  id?: number;
  name: string;
  code: string;
}

// export class MessageReceived implements SelectItem {
//   messageId: number;
//   fromName: string;
//   subject: string;
//   body: string;
//   fromMemberPicUri?: string;

//   label?: string;
//   value: any;
//   styleClass?: string;
//   icon?: string;
//   title?: string;
//   disabled?: boolean;
// }

// styleUrls: ['./received-messages.component.scss']
@Component({
  selector: 'app-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceivedMessagesComponent implements OnInit {

  messages: MessageReceived[];
  selectedMessage: MessageReceived;
  panelOpenState = false;

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
          element.value = element.messageId;
          element.icon = element.fromMemberPicUri;

          console.log('date created: ' + element.dateCreated);

        });
      });
  }

  openMessage(message: MessageReceived) {
    this.toggleMessageState(message);
    message.messageHasOpened = true;
    message.status = Status.Read;
  }

  closeMessage(message: MessageReceived) {
    this.toggleMessageState(message);
  }

  toggleMessageState(message: MessageReceived) {
    message.messageOpen = message.messageOpen ? false : true;
  }

  showNotReadIcon(message: MessageReceived) {
    return message.status !== Status.Read
      && message.status !== Status.Archived
      && message.status !== Status.Flagged;
  }

  showArchiveIcon(message: MessageReceived) {
    return message.messageHasOpened || message.status === Status.Read;
  }

  showFlagIcon(message: MessageReceived) {
    return message.messageHasOpened || message.status === Status.Read;
  }

  isSelected(message: MessageReceived) {
    if (message === undefined || message === null) {
      return false;
    }
    if (this.selectedMessage === undefined || this.selectedMessage === null) {
      return false;
    }
    console.log('message id: ' + message.messageId);
    console.log(this.selectedMessage.fromName);
    console.log('selectedMessage.messageId: ' + this.selectedMessage.messageId);
    return message.messageId === this.selectedMessage.messageId;
    // return true;
  }

  handleListChange(event) {
    console.log('onchange event triggered');
    console.log(this.selectedMessage);

  }

  getNotReadClass(memberId: number) {
    if (memberId === +this.selectedMessage) {
      return 'fa fa-envelope read-status-icon-selected';
    } else {
      return 'fa fa-envelope read-status-icon-unselected';
    }
  }

  getReadClass(memberId: number) {
    if (memberId === +this.selectedMessage) {
      return 'fa fa-envelope-open read-status-icon-selected';
    } else {
      return 'fa fa-envelope-open read-status-icon-unselected';
    }
  }

}
