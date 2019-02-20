import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { SentMessagesComponent } from './sent-messages/sent-messages.component';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';
import { SendMessageDialogComponent } from './send-message-dialog/send-message-dialog.component';
import { ListboxModule } from 'primeng/listbox';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Expansion } from '@angular/compiler';


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    ListboxModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  declarations: [
    ReceivedMessagesComponent,
    SentMessagesComponent,
    SendMessageDialogComponent
  ],
  exports: [
    ReceivedMessagesComponent,
    SentMessagesComponent
  ],
  entryComponents: [
    SendMessageDialogComponent
  ]
})
export class MessagesModule { }
