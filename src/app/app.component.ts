import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navlinks = [
      {path:'home', label:'Home'},
      {path:'about', label:'About'}
  ];  

  title = 'ZMA-SPA';
}


