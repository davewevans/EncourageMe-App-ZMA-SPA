import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ISendMessageFormData } from '../../interfaces/ISendMessageFormData';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss']
})
export class SendMessageDialogComponent implements OnInit {

//form: FormGroup;
data: ISendMessageFormData;
message: string = '';

  constructor(private dialogRef: MatDialogRef<SendMessageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data: ISendMessageFormData) 
  { 
       this.data = data; 
  }

  ngOnInit() {
    //   fb: FormBuilder = new FormBuilder();
    //   this.form = this.fb.group({
    //       description: [this.description, []]
    //   });
  }


  // onConfirm() {
  //     this.dialogRef.close("confirm");
  // } 

  onCancel() {
      this.dialogRef.close("cancel");
  }

}
