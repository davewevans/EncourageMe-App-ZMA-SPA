import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../models/user-registration.model';
import { MatSnackBar, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { passwordMatchValidator } from '../validators/password-match-validator';
import { map } from 'rxjs/operators';
import { RegistrationResult } from '../models/registration-result.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { UniqueEmailValidator } from '../validators/unique-email-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  isRequesting: boolean;
  submitted = false;
  maxLength = 50;
  result: RegistrationResult;

  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      'gender': new FormControl('male'),
      'firstName': new FormControl(null,
        [Validators.required,
        Validators.maxLength(this.maxLength),
        this.forbiddenNames.bind(this)]),
      'lastName': new FormControl(null,
        [Validators.required,
        Validators.maxLength(this.maxLength)]),
      'email': new FormControl(null,
        [Validators.required,
        Validators.email],
        this.uniqueEmailValidator.bind(this)
      ),
      'password': new FormControl(null,
        [Validators.required,
        Validators.minLength(6)]),
      'passwordConfirm': new FormControl(null,
        [Validators.required, Validators.minLength(6)])
    }, { validators: passwordMatchValidator });

    this.signUpForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signUpForm.statusChanges.subscribe(
      (status) => console.log(status)
    );


    // this.signupForm.setValue({
    //   'userData': {
    //     'firstName': 'Max',
    //     'lastName' : 'Shwartz',
    //     'email': 'max@test.com',
    //   },
    //   'gender': 'male'
    // });
    // this.signupForm.patchValue({
    //   'userData': {
    //     'firstName': 'Anna',
    //   }
    // });
  }

  isInvalid(control: string): boolean {
    if (this.signUpForm.get(control).invalid
      && (this.signUpForm.get(control).touched)
      || this.signUpForm.get(control).dirty) {
      return true;
    }
  }

  isFormInvalid(): boolean {
    return this.signUpForm.invalid;
  }

  getControlErrorMessage(control: string) {
    switch (true) {
      case this.signUpForm.get(control).hasError('required'):
        return 'This field is required.';
      case this.signUpForm.get(control).hasError('nameIsForbidden'):
        return 'This name is forbidden.';
      case this.signUpForm.get(control).hasError('email'):
        return 'Please enter a valid email.';
      case this.signUpForm.get(control).hasError('emailTaken'):
        return 'Sorry, this email is taken.';
      case this.signUpForm.get(control).hasError('maxlength'):
        return this.maxLength + ' character limit.';
      default:
        return '';
    }
  }

  getFormErrorMessage() {
    if (this.signUpForm.hasError('mismatchPasswords')) {
      return 'Passwords do not match.';
    }
  }

  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signUpForm.get('hobbies')).push(control);
  // }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  isNameInvalid(control: FormControl): { [s: string]: boolean } {
    // return { 'nameIsInvalid': true };
    return null;
  }

  uniqueEmailValidator(control: FormControl): Promise<any> | Observable<any> {

    console.log('control.valid: ' + control.valid);

    console.log('touched: ' + control.touched);
    console.log('dirty: ' + control.dirty);

    return this.authService.isEmailTaken(control.value).pipe(
      map(res => {
        return res ? { emailTaken: true } : null;
      }));
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // passwordMatchValidator(): ValidatorFn {
  //   return this.signUpForm.get('password').value
  //     === this.signUpForm.get('passwordConfirm').value
  //     ? null : { 'mismatch': true };
  // }



  registerUser() {
    this.submitted = true;
    this.isRequesting = true;
    this.error = '';
    const genderNum =
      this.signUpForm.get('gender').value === 'male' ? 0 : 1;

    const userRegistration = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      gender: genderNum
    };

    this.authService.register(userRegistration)
      .subscribe(
        (result: UserRegistration) => {
          if (result !== undefined && result !== null) {
            this.result = {
              success: true,
              email: result.email
            };
            this.dialogRef.close(this.result);
          }
        },
        err => {

          console.log('registration error: ' + err);

          this.error = err;
          this.snackBar.open(err, 'close', { duration: 3000 });
          this.isRequesting = false;
          this.result = {
            success: false
          };
        },
        () => this.isRequesting = false);
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.registerUser();
    }
  }

  onCancel() {
      this.result = {
        success: false
      };

      this.dialogRef.close(this.result);
  }

}
