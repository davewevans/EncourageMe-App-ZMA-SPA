import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { SendMessage } from '../models/send-message.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-send-message-sheet',
  templateUrl: './send-message-sheet.component.html',
  styleUrls: ['./send-message-sheet.component.scss']
})
export class SendMessageSheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: SendMessage,
  private bottomSheetRef: MatBottomSheetRef<SendMessageSheetComponent>,
  private dataService: DataService) { }

  ngOnInit() {

    console.log('sheet on init');
    console.log('name: ' + this.data.firstName);
  }

  sendMessage() {
    this.dataService.sendMessage(this.data).subscribe();
  }

  onSubmit(event) {
    console.log('onSubmit');
    console.log('msg: ' + this.data.message);
    console.log('from id: ' + this.data.fromMemberId);
    console.log('to id: ' + this.data.toMemberId);

    if (this.data.message !== '') {
      this.sendMessage();
    }

    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onCancel(event) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
