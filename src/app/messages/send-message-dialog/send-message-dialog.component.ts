import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SendMessageFormData } from '../models/send-message-form-data.model';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss']
})
export class SendMessageDialogComponent implements OnInit {

// form: FormGroup;
data: SendMessageFormData;
message = '';

  constructor(private dialogRef: MatDialogRef<SendMessageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data: SendMessageFormData) {
       this.data = data;
  }

  ngOnInit() {
    //   fb: FormBuilder = new FormBuilder();
    //   this.form = this.fb.group({
    //       description: [this.description, []]
    //   });

    this.data.sendMessage = false;
  }

  onSend() {
    this.data.sendMessage = true;
    this.dialogRef.close(this.data);
  }

  onCancel() {
      this.data.sendMessage = false;
      this.dialogRef.close(this.data);
  }

}
