import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';

@Component({
  selector: 'app-ng-material-test',
  templateUrl: './ng-material-test.component.html',
  styleUrls: ['./ng-material-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgMaterialTestComponent implements OnInit {

  title = 'app';
  text: string = '';
  openPopup: Function;

  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }

  constructor() { }

  ngOnInit() {

  }

  onClose() {
    console.log('onClose');
  }

}
