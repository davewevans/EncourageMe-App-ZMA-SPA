import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DirectoryComponent implements OnInit {

  index = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to route params observable to get tab index
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['index'];
      });
  }

}
