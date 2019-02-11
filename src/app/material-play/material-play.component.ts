import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-play',
  templateUrl: './material-play.component.html',
  styleUrls: ['./material-play.component.scss']
})
export class MaterialPlayComponent implements OnInit {

  constructor() { }
  isChecked = true;

  ngOnInit() {

  }

  onChange($event) {
    console.log($event);
  }

}
