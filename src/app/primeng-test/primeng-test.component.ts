import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-primeng-test',
  templateUrl: './primeng-test.component.html',
  styleUrls: ['./primeng-test.component.scss']
})
export class PrimengTestComponent implements OnInit {

    panelOpenState = false;
    step = 0;

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
      this.items = [{
          label: 'File',
          items: [
              {label: 'New', icon: 'pi pi-fw pi-plus'},
              {label: 'Download', icon: 'pi pi-fw pi-download'}
          ]
      },
      {
          label: 'Edit',
          items: [
              {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
              {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
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

}
