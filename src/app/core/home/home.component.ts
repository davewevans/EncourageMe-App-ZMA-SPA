import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('emojiPlay') emojiPlay: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  test() {

  }

  addEmoji(event) {
    console.log('addEmoji');
    console.log(event);
    console.log(event.emoji.name);
    console.log(event.emoji.text);
    console.log(event.emoji.unified);

  }

}
