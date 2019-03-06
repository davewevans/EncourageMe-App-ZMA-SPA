import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InputTextarea } from 'primeng/inputtextarea';

@Component({
  selector: 'app-primeng-test',
  templateUrl: './primeng-test.component.html',
  styleUrls: ['./primeng-test.component.scss']
})
export class PrimengTestComponent implements OnInit {

  panelOpenState = false;
  step = 0;
  textareaData = '';
  emojiTest = ':skin-tone-5:';


  @ViewChild('textareaEmoji') textareaRef: ElementRef;

  constructor() { }

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

  togglePicker(event, op) {
    op.toggle(event);
    this.textareaRef.nativeElement.focus();
  }

  addEmoji(event) {

    // Create emoji element.
    // ex: <ngx-emoji emoji=":blush:" size="16" tooltip="true"></ngx-emoji>
    const emojiElOpen = '<ngx-emoji emoji="';
    const emojiElClose = '" size="16" tooltip="true"></ngx-emoji>';
    const emojiElParts = [emojiElOpen, event.emoji.colons, emojiElClose];
    const emojiEl = emojiElParts.join('');
    console.log('emojiEl: ' + emojiEl);

    // get the Unicode codepoint
    // codepoints with skin tone have multiple values separated by '-'
    let splitCodePoint: string[] = event.emoji.unified.split('-');
    console.log('splitCodePoint: ' + splitCodePoint);
    let codePoint = '';
    for (const i in splitCodePoint) {
      if (splitCodePoint[i] !== undefined && splitCodePoint[i] !== null) {
        codePoint += '&#x' + splitCodePoint[i] + ';';
      }
    }


    // insert emoji at carat position
    // const textarea = document.querySelector("textarea");
    const from = this.textareaRef.nativeElement.selectionStart;
    const to = this.textareaRef.nativeElement.selectionEnd;

    console.log('from: ' + from);
    console.log('to:' + to);
    console.log('innerHTML: ' + this.textareaRef.nativeElement.innerHTML);
    console.log('value: ' + this.textareaRef.nativeElement.value);
    console.log(this.textareaRef);
    console.log('codepoint:' + codePoint);
    console.log('new value 1: ' + this.textareaRef.nativeElement.value.slice(0, from) + codePoint);
    console.log('new value 2: ' + this.textareaRef.nativeElement.value.slice(to));

    // this.textareaRef.nativeElement.innerHTML = codePoint;

    console.log('colons:');
    console.log(event.emoji.colons);

    const firstPart = this.textareaRef.nativeElement.value.slice(0, from);
    const lastPart = this.textareaRef.nativeElement.value.slice(to);
    const textareaParts = [firstPart, emojiEl, lastPart];
    // this.textareaData = textareaParts.join('');

    const firstPartNode = document.createTextNode(firstPart);
    const lastPartNode = document.createTextNode(lastPart);

    // create emoji element with attributes
    const emojiElNode = document.createElement('ngx-emoji');
    emojiElNode.setAttribute('emoji', event.emoji.colons);
    emojiElNode.setAttribute('size', '16');
    emojiElNode.setAttribute('tooltip', 'true');

    console.log('emojiElNode:');
    console.log(emojiElNode);

    const divTest = document.getElementById('divTest');
    const divTest2 = document.getElementById('divTest2');
    // divTest2.insertAdjacentHTML('afterend', codePoint);

    const textareaEl = document.getElementById('textarea-emoji');
    // textareaEl.insertAdjacentHTML('afterend', codePoint);

    this.emojiTest = codePoint;
 
    // divTest.append(emojiElNode);
    this.textareaData = event.emoji.colons;

    // this.textareaRef.nativeElement.appendChild(firstPartNode);
    // this.textareaRef.nativeElement.appendChild(emojiElNode);
    // this.textareaRef.nativeElement.appendChild(lastPartNode);




    // put the cursor after the emoji
    // this.textareaRef.nativeElement.selectionStart =
    //   this.textareaRef.nativeElement.selectionEnd = from + 1;

    this.textareaRef.nativeElement.focus();
  }
}
