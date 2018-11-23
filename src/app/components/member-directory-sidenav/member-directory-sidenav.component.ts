import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-member-directory-sidenav',
  templateUrl: './member-directory-sidenav.component.html',
  styleUrls: ['./member-directory-sidenav.component.scss']
})
export class MemberDirectorySidenavComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  shouldRun: boolean = true;

  constructor() {  }

  ngOnInit() {
  }
  

}
