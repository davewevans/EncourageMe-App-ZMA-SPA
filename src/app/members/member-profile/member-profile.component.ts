import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MemberProfile } from '../models/member-profile.model';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {

  memberProfile: MemberProfile;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getMemberProfile();
  }

  getMemberProfile() {
    this.dataService.getMemberProfile().subscribe(
      (result: MemberProfile) => {
        this.memberProfile = result;
        // console.log('photo uri: ' + this.memberProfile.primaryPhotoUri);
      }
    );
  }

  getFullName() {
    if (this.memberProfile !== null || this.memberProfile !== undefined) {
      return this.memberProfile.firstName + ' ' + this.memberProfile.lastName;
    }
  }

  getGender() {
    if (this.memberProfile !== null || this.memberProfile !== undefined) {
      return this.memberProfile.gender === 0 ? 'male' : 'female';
    }
  }

}
