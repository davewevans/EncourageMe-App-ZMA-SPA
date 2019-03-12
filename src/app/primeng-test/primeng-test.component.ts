import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InputTextarea } from 'primeng/inputtextarea';
import { emojis } from '@ctrl/ngx-emoji-mart/ngx-emoji/esm5/public_api';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji/esm5/public_api';
import { EmojiSearch } from '@ctrl/ngx-emoji-mart';



// import EmbedJS from 'embed-js';
// import url from 'embed-plugin-url';
// import emoji from 'embed-plugin-emoji';


@Component({
  selector: 'app-primeng-test',
  templateUrl: './primeng-test.component.html',
  styleUrls: ['./primeng-test.component.scss']
})
export class PrimengTestComponent implements OnInit {

  panelOpenState = false;
  step = 0;
  textareaValue = '';
  emojiTest = ':skin-tone-5:';

  testValue = 'foo u';

  emojiAdded = false;

  counter = 0;

  @ViewChild('textareaEmoji') textareaRef: ElementRef;

  constructor(private emojiSearch: EmojiSearch, private emojiService: EmojiSearch) { }

  items: MenuItem[];

  ngOnInit() {

    this.items = [{
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-plus' },
        { label: 'Download', icon: 'pi pi-fw pi-download' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Add User', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Remove User', icon: 'pi pi-fw pi-user-minus' }
      ]
    }];
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
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
    this.textareaValue = textareaParts.join('');

    this.textareaRef.nativeElement.focus();

    // put the caret after the emoji
    selectionStart += e.emoji.native.length;
    selectionEnd += e.emoji.native.length;
    setTimeout(() => { // necessary to wait on browser
      this.textareaRef.nativeElement.setSelectionRange(selectionStart, selectionEnd);
    });
  }

  // convert hex code to emoji
  convertHexToEmoji(unified) {
    let emojiPic = '';
    if (unified.length <= 5) {
      const codePoint = +('0x' + unified);
      emojiPic = String.fromCodePoint(codePoint);
    } else {
      const unifiedSplit = unified.split('-');
      const codesArray = [];
      unifiedSplit.forEach(el => codesArray.push('0x' + el));
      emojiPic = String.fromCodePoint(...codesArray);
    }

    return emojiPic;
  }

  onFocus(e) {

  }

  appendEmojiToMessage(emoji) {


  }

  parseEmojis(message: string) {

  }

  test(e) {
    console.log('textareaValue:');
    console.log(this.textareaValue);

    // this.getEmojiData();

    // this.listEmojis();
    //const emojiWithColons = this.getEmojiColons(emojis[5]);
    //console.log('emojiNoColons:');


  }

  test2(e) {

    //
    // :::1F64E-200D-2642-FE0F:::
    // 1F64E-1F3FB-200D-2642-FE0F
    // 1F64E-1F3FC-200D-2642-FE0F
    // 1F64E-1F3FD-200D-2642-FE0F
    // 1F64E-1F3FE-200D-2642-FE0F
    // 1F64E-1F3FF-200D-2642-FE0F


    const unified1 = '1F64E-200D-2642-FE0F';
    const unified2 = '1F64E-1F3FB-200D-2642-FE0F';
    const unified3 = '1F64E-1F3FC-200D-2642-FE0F';
    const unified4 = '1F64E-1F3FD-200D-2642-FE0F';
    const unified5 = '1F64E-1F3FE-200D-2642-FE0F';
    const unified6 = '1F64E-1F3FF-200D-2642-FE0F';
    const emoji1 = this.convertHexToEmoji(unified1);
    const emoji2 = this.convertHexToEmoji(unified2);
    const emoji3 = this.convertHexToEmoji(unified3);
    const emoji4 = this.convertHexToEmoji(unified4);
    const emoji5 = this.convertHexToEmoji(unified5);
    const emoji6 = this.convertHexToEmoji(unified6);
    console.log('emoji1' + emoji1);
    console.log('emoji2' + emoji2);
    console.log('emoji3' + emoji3);
    console.log('emoji4' + emoji4);
    console.log('emoji5' + emoji5);
    console.log('emoji6' + emoji6);
  }

  test3(e) {
    console.log('test3');
    this.testValue = `<ngx-emoji emoji=':blush:' size="16" tooltip="true"></ngx-emoji>`;
    this.textareaValue = 'My name is <h1>Dave</h1>'; // `<ngx-emoji emoji=':blush:' size="16" tooltip="true"></ngx-emoji>`;
    
    
    // regex for finding emoji name with colon syntax
    // let regex = new RegExp('(^|\\s)(\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?)', 'g');

    // parse out colons and replace string with name
    // emojiIndex.emojis[string]


    // const colonsRegex = new RegExp('(^|\\s)(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)', 'g');
    // let newText = text;
  
    // let match;
    // while (match = colonsRegex.exec(text)) {
    //   let colons = match[2];
    //   let offset = match.index + match[1].length;
    //   let length = colons.length;
  
    //   console.log(colons, offset, length); 

    // this.textareaValue = `<ngx-emoji emoji=':blush:' size="16" tooltip="true"></ngx-emoji>`;
  }

  onChange(e) {

  }

  onModelChanged(e) {

  }

  listEmojis() {
    for (const i in emojis) {
      if (emojis[i]) {
        console.log(emojis[i]);
        console.log(emojis[i].colons);
      }
    }
  }

  getEmojiData() {
    const service = new EmojiService();
    console.log(service);
    console.log(service.emojis);
    // const result = emojiIndex.search('christmas').map((o) => o.native);
    // console.log(result);

  }

  getEmojiColons(emoji) {
    if (emoji === null) {
      return null;
    }
    let colons = ':' + emoji.shortName + ':';
    if (emoji.skinTone) {
      colons += ':skin-tone-' + emoji.skinTone + ':';
    }
    emoji.colons = colons;
  }

  onKeydown(e) {

    this.textareaValue += e.key;

    console.log('onKeyDown');
    console.log(e);
    if (e.key === "Enter") {
      console.log(e);
    }
  }


}
