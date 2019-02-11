import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../models/credentials.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginData } from '../models/login-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  counter = 0;

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted = false;
  credentials: Credentials = { email: '', password: '' };
  loginForm: FormGroup;
  loginData: LoginData;
  formSubmitted = false;

  constructor(private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: LoginData) {
    this.loginData = data;
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    if (this.loginData !== undefined
      && this.loginData !== null
      && this.loginData.isNewAccount
      && this.loginData.email.length > 0) {
      this.loginForm.get('email').setValue(this.loginData.email);
      this.brandNew = this.loginData.isNewAccount;
    }


    // subscribe to router event
    // this.subscription = this.activatedRoute.queryParams.subscribe(
    //   (param: any) => {
    //      this.brandNew = param['brandNew'];
    //      this.credentials.email = param['email'];
    //   });
  }

  login() {

    this.counter++;

    console.log('login   counter: ' + this.counter);
    console.log('formSubmitted: ' + this.formSubmitted);

    if (this.formSubmitted) {
      this.dialogRef.close();
      return;
    }

    this.isRequesting = true;
    this.errors = '';
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.auth.login(email, password)
        .subscribe(
          result => {
            if (result) {
              console.log('login result: ' + result);
              this.router.navigate(['/']);
            }
          },
          error => this.errors = error,
          () =>  {
            this.isRequesting = false;
            this.formSubmitted = true;
            this.dialogRef.close();
          });
    }
  }

  isInvalid(control) {
    return false;
  }

  getControlErrorMessage(control) {
    return 'error';
  }

  onLogin() {

    console.log('onLogin');

    this.login();
    // if (this.signUpForm.valid) {
    //   this.login();
    // }
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    // this.subscription.unsubscribe();
  }

}
