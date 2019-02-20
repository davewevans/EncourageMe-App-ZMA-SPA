import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-directory',
  templateUrl: './group-directory.component.html',
  styleUrls: ['./group-directory.component.scss']
})
export class GroupDirectoryComponent implements OnInit {

  groups$: Observable<Group[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groups$ = this.dataService.getgroups();
  }

  hasGroupPhotoUri(group: Group) {
    if (group.groupPhotoUri === undefined
      || group.groupPhotoUri === ''
      || group.groupPhotoUri === null) {
      return false;
    } else {
      return true;
    }
  }


}
