import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { SentMessagesComponent } from './sent-messages/sent-messages.component';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';
import { SendMessageDialogComponent } from './send-message-dialog/send-message-dialog.component';
import { ListboxModule } from 'primeng/listbox';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Expansion } from '@angular/compiler';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { SendMessageComponent } from './send-message/send-message.component';
import { SendMessageSheetComponent } from './send-message-sheet/send-message-sheet.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    MatTooltipModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    InputTextareaModule,
    ButtonModule,
    CustomDirectivesModule,
    PickerModule,
    OverlayPanelModule
  ],
  declarations: [
    ReceivedMessagesComponent,
    SentMessagesComponent,
    SendMessageDialogComponent,
    SendMessageComponent,
    SendMessageSheetComponent    
  ],
  exports: [
    ReceivedMessagesComponent,
    SentMessagesComponent
  ],
  entryComponents: [
    SendMessageDialogComponent,
    SendMessageComponent,
    SendMessageSheetComponent
  ]
})
export class MessagesModule { }
