import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmData } from './confirm-model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  data: ConfirmData;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA) data: ConfirmData) {
       this.data = data;
  }

  ngOnInit() {
    this.data.accept = false;
  }

  onAccept() {
    this.data.accept = true;
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.data.accept = false;
    this.dialogRef.close(this.data);
  }

}
