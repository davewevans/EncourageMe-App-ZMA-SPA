import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data = '<b>This text is bold</b> and this one is <i>italics</i>';

  navlinks = [
      {path: 'home', label: 'Home'},
      {path: 'about', label: 'About'}
  ];

  title = 'ZMA-SPA';
}


