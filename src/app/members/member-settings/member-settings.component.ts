import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSlideToggle } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { MemberSettings } from '../models/member-settings.model';


@Component({
  selector: 'app-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.scss']
})
export class MemberSettingsComponent implements OnInit {

  settingsForm: FormGroup;
  memberSettings: MemberSettings;
  maxLength: 50;
  genders = ['male', 'female'];
  color = 'accent';
  editMode = false;
  buttonsDisabled = true;
  @ViewChild('editSlide')
  matSlideToggle: MatSlideToggle;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      'gender': new FormControl('male'),
      'firstName': new FormControl(null,
        [Validators.required,
        Validators.maxLength(this.maxLength)]),
      'lastName': new FormControl(null,
        [Validators.required,
        Validators.maxLength(this.maxLength)]),
      'email': new FormControl(null, // TODO add async validator
        [Validators.required, Validators.email]),
      'mobilePhoneNumber': new FormControl(null),
      'birthdate': new FormControl(null, Validators.required),
      'weddingDate': new FormControl(null),
      'joinZionDate': new FormControl(null),
      'activeAccount': new FormControl(null),
      'receiveEmail': new FormControl(null),
      'receiveTextMessages': new FormControl(null),
      'birthdayNotificationsOptIn': new FormControl(null),
      'pray4MeOptIn': new FormControl(null),
      'informMeOptIn': new FormControl(null),
      'showBirthdate': new FormControl(null),
    });

    this.disableFormControls();
    // this.memberSettings.birthdate = new Date();
    // this.memberSettings.weddingDate = new Date();
    // this.memberSettings.joinZionDate = new Date();
    this.getMemberSettings();
  }

  getMemberSettings() {
    this.dataService.getMemberSettings().subscribe(
      (result: MemberSettings) => {
        this.memberSettings = result;
        this.memberSettings.birthdate = new Date(result.birthdate);
        this.memberSettings.weddingDate = new Date(result.weddingDate);
        this.memberSettings.joinZionDate = new Date(result.joinZionDate);
        this.setInitialValues();
      }
    );
  }

  updateMemberSettings() {

    const newSettings: MemberSettings = {
      gender: this.settingsForm.get('gender').value === 'male' ? 0 : 1,
      firstName: this.settingsForm.get('firstName').value,
      lastName: this.settingsForm.get('lastName').value,
      email: this.settingsForm.get('email').value,
      mobilePhoneNumber: this.settingsForm.get('mobilePhoneNumber').value,
      birthdate: this.settingsForm.get('birthdate').value,
      weddingDate: this.settingsForm.get('weddingDate').value,
      joinZionDate: this.settingsForm.get('joinZionDate').value,
      activeAccount: this.settingsForm.get('activeAccount').value,
      receiveEmail: this.settingsForm.get('receiveEmail').value,
      receiveTextMessages: this.settingsForm.get('receiveTextMessages').value,
      birthdayNotificationsOptIn: this.settingsForm.get('birthdayNotificationsOptIn').value,
      pray4MeOptIn: this.settingsForm.get('pray4MeOptIn').value,
      informMeOptIn: this.settingsForm.get('informMeOptIn').value,
      showBirthdate: this.settingsForm.get('showBirthdate').value
    };

    this.dataService.updateMemberSettings(newSettings).subscribe();
  }

  setInitialValues() {
    if (this.memberSettings === undefined || this.memberSettings == null) {
      return;
    }

    const genderStr = this.memberSettings.gender === 0 ? 'male' : 'female';
    this.settingsForm.get('gender').setValue(genderStr);
    this.settingsForm.get('firstName').setValue(this.memberSettings.firstName);
    this.settingsForm.get('lastName').setValue(this.memberSettings.lastName);
    this.settingsForm.get('email').setValue(this.memberSettings.email);
    this.settingsForm.get('mobilePhoneNumber').setValue(this.memberSettings.mobilePhoneNumber);
    // this.settingsForm.get('birthdate').setValue(this.memberSettings.birthdate.toLocaleDateString());
    // this.settingsForm.get('weddingDate').setValue(this.memberSettings.weddingDate.toLocaleDateString());
    // this.settingsForm.get('joinZionDate').setValue(this.memberSettings.joinZionDate.toLocaleDateString());
    this.settingsForm.get('activeAccount').setValue(this.memberSettings.activeAccount);
    this.settingsForm.get('receiveEmail').setValue(this.memberSettings.receiveEmail);
    this.settingsForm.get('receiveTextMessages').setValue(this.memberSettings.receiveTextMessages);
    this.settingsForm.get('birthdayNotificationsOptIn').setValue(this.memberSettings.birthdayNotificationsOptIn);
    this.settingsForm.get('pray4MeOptIn').setValue(this.memberSettings.pray4MeOptIn);
    this.settingsForm.get('informMeOptIn').setValue(this.memberSettings.informMeOptIn);
    this.settingsForm.get('showBirthdate').setValue(this.memberSettings.showBirthdate);
  }

  getBirthdate() {
    if (this.memberSettings !== undefined) {
      return this.memberSettings.birthdate;
    } else {
      return null;
    }
  }

  getWeddingDate() {
    if (this.memberSettings !== undefined) {
      return this.memberSettings.weddingDate;
    } else {
      return null;
    }
  }

  getJoinZionDate() {
    if (this.memberSettings !== undefined) {
      return this.memberSettings.joinZionDate;
    } else {
      return null;
    }
  }

  onEditToggleChange(value) {


    console.log('edit mode: ' + this.editMode);

    this.matSlideToggle.toggle();

    if (this.editMode) {
      this.enableFormControls();
    } else {
      this.disableFormControls();
    }
  }

  disableFormControls() {
    this.settingsForm.get('gender').disable();
    this.settingsForm.get('firstName').disable();
    this.settingsForm.get('lastName').disable();
    this.settingsForm.get('email').disable();
    this.settingsForm.get('mobilePhoneNumber').disable();
    this.settingsForm.get('birthdate').disable();
    this.settingsForm.get('weddingDate').disable();
    this.settingsForm.get('joinZionDate').disable();
    this.settingsForm.get('activeAccount').disable();
    this.settingsForm.get('receiveEmail').disable();
    this.settingsForm.get('receiveTextMessages').disable();
    this.settingsForm.get('birthdayNotificationsOptIn').disable();
    this.settingsForm.get('pray4MeOptIn').disable();
    this.settingsForm.get('informMeOptIn').disable();
    this.settingsForm.get('showBirthdate').disable();
    this.buttonsDisabled = true;
  }

  enableFormControls() {
    this.settingsForm.get('gender').enable();
    this.settingsForm.get('firstName').enable();
    this.settingsForm.get('lastName').enable();
    this.settingsForm.get('email').enable();
    this.settingsForm.get('mobilePhoneNumber').enable();
    this.settingsForm.get('birthdate').enable();
    this.settingsForm.get('weddingDate').enable();
    this.settingsForm.get('joinZionDate').enable();
    this.settingsForm.get('activeAccount').enable();
    this.settingsForm.get('receiveEmail').enable();
    this.settingsForm.get('receiveTextMessages').enable();
    this.settingsForm.get('birthdayNotificationsOptIn').enable();
    this.settingsForm.get('pray4MeOptIn').enable();
    this.settingsForm.get('informMeOptIn').enable();
    this.settingsForm.get('showBirthdate').enable();
    this.buttonsDisabled = false;
  }

  onSubmit() {
    this.updateMemberSettings();
  }

  onCancel() {

  }

  getControlErrorMessage(control) {
    return 'error';
  }

  isInvalid(control) {
    return false;
  }

  isFormInvalid() {
    return false;
  }

}
