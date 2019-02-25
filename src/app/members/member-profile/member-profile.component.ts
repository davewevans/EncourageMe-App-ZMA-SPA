import { Component, OnInit, Inject, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MemberProfile } from '../models/member-profile.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {

  memberProfile: MemberProfile;
  memberId: string;
  editMode = false;

  constructor(private dataService: DataService, private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.memberId = params['id'];
        if (this.memberId === undefined || this.memberId === null) {
          this.getLoggedInMemberProfile();
        } else {
          this.getMemberProfile(this.memberId);
        }
      });
  }

  getLoggedInMemberProfile() {
    this.dataService.getMemberProfile().subscribe(
      (result: MemberProfile) => {
        this.memberProfile = result;
        if (+this.memberProfile.memberId === +this.auth.memberId) {
          this.editMode = true;
        }
      }
    );
  }

  getMemberProfile(memberId: string) {
    this.dataService.getMemberProfile(memberId).subscribe(
      (result: MemberProfile) => {
        this.memberProfile = result;
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
