import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-ckeditor-test',
  templateUrl: './ckeditor-test.component.html',
  styleUrls: ['./ckeditor-test.component.scss']
})
export class CkeditorTestComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {


    
  }

}
