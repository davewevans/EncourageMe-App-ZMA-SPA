import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { SendMessage } from '../models/send-message.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-send-message-sheet',
  templateUrl: './send-message-sheet.component.html',
  styleUrls: ['./send-message-sheet.component.scss']
})
export class SendMessageSheetComponent implements OnInit {

  @ViewChild('textareaEmoji') textareaRef: ElementRef;
  textareaValue = '';

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: SendMessage,
    private bottomSheetRef: MatBottomSheetRef<SendMessageSheetComponent>,
    private dataService: DataService) { }

  ngOnInit() {

  }

  test() {
    console.log('test');
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

  onClose(event) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  togglePicker(e, op) {
    op.toggle(e);
    this.textareaRef.nativeElement.focus();
  }

  addEmoji(e) {

    console.log(e.emoji);

    const emojiStr = '0x' + e.emoji.unified.toString();
    console.log('emoji pic: ' + emojiStr);
    console.log('emoji hex: ' + (+emojiStr));

    // get current caret position or selection
    let selectionStart = this.textareaRef.nativeElement.selectionStart;
    let selectionEnd = this.textareaRef.nativeElement.selectionEnd;

    // insert emoji at caret position
    const firstPart = this.textareaRef.nativeElement.value.slice(0, selectionStart);
    const lastPart = this.textareaRef.nativeElement.value.slice(selectionEnd);
    const textareaParts = [firstPart, e.emoji.native, lastPart];
    this.data.message = textareaParts.join('');

    this.textareaRef.nativeElement.focus();

    // put the caret after the emoji
    selectionStart += e.emoji.native.length;
    selectionEnd += e.emoji.native.length;
    setTimeout(() => { // necessary to wait on browser
      this.textareaRef.nativeElement.setSelectionRange(selectionStart, selectionEnd);
    });
  }


}
