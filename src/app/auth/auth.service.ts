import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { UserRegistration } from './models/user-registration.model';
import { BaseService } from './base.service';
import { map, catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AuthResponse } from './models/auth-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:57544/api';

  // private backing field for memberId property
  private _memberId = '';
  MEMBER_ID_KEY = 'member-id';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  ROLES_KEY = 'roles';
  FIRST_NAME_KEY = 'first-name';
  MEMBER_PHOTO_URI = 'member-photo-uri';

  // Roles:
  public ROLE_ADMIN = 'admin';
  public ROLE_MEMBER = 'member';
  public ROLE_API_USER = 'api-user';


  // Observable navItem source
  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this.authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {
    // super();
    this.loggedIn = !!localStorage.getItem(this.TOKEN_KEY);
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this.authNavStatusSource.next(this.loggedIn);
  }

  openSnackBar(message) {
    // this.snackBar.openFromComponent(PizzaPartyComponent, {
    //   duration: 500,
    // });

    this.snackBar.open('Error: ' + message, 'close', { duration: 2000 });

  }

  register(userRegistration: UserRegistration ) {

    const body = JSON.stringify({
      firstName: userRegistration.firstName,
      lastName: userRegistration.lastName,
      email: userRegistration.email,
      password: userRegistration.password,
      gender: userRegistration.gender
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UserRegistration>(this.BASE_URL + '/accounts/register', body, httpOptions);

  }

  login(userName, password) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    const url = this.BASE_URL + '/auth/login';
    console.log('login url: ' + url);

    return this.http
      .post<AuthResponse>(
        this.BASE_URL + '/auth/login',
        JSON.stringify({ userName, password }), httpOptions
      ).pipe(
        map(res => {
          this._memberId = res.memberId;
          // todo: member id should not be stored in local storage
          localStorage.setItem(this.MEMBER_ID_KEY, this._memberId);

          localStorage.setItem(this.TOKEN_KEY, res.auth_token);
          localStorage.setItem(this.NAME_KEY, res.userName);
          localStorage.setItem(this.FIRST_NAME_KEY, res.firstName);
          localStorage.setItem(this.MEMBER_PHOTO_URI, res.memberPhotoUri);
          localStorage.setItem(this.ROLES_KEY, JSON.stringify(res.roles));
          this.loggedIn = true;
          this.authNavStatusSource.next(true);

          return true;
        })
      );

  }

  logout() {
    // todo: member id should not be stored in local storage
    localStorage.removeItem(this.MEMBER_ID_KEY);

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.FIRST_NAME_KEY);
    localStorage.removeItem(this.MEMBER_PHOTO_URI);
    localStorage.removeItem(this.ROLES_KEY);
    this.loggedIn = false;
    this.authNavStatusSource.next(false);
  }

  isLoggedIn() {
    if (this.loggedIn === undefined) {
      return false;
    }
    return this.loggedIn;
  }

   get memberId() {
    // todo: member id should not be stored in local storage
    // this is for dev only. Variables are wiped out every compile
    return localStorage.getItem(this.MEMBER_ID_KEY);
    // return this._memberId;
  }

  get userName() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get firstName() {
    return localStorage.getItem(this.FIRST_NAME_KEY);
  }

   get memberPhotoUri() {
    return localStorage.getItem(this.MEMBER_PHOTO_URI);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  updateProfilePhotoUri(memberId) {
    const mergedUrl = this.BASE_URL + '/memberprofile/GetPhotoPath/' + memberId;
    this.http.get<string>(mergedUrl).subscribe(
      result => {
        localStorage.removeItem(this.MEMBER_PHOTO_URI);
        localStorage.setItem(this.MEMBER_PHOTO_URI, result);
        console.log('pic uri: ' + result);
      }
    );
  }

  isInRole(role: string) {

  }

  isEmailTaken(email: string): Observable<boolean> {

    console.log('isEmailTaken param: ' + email);
    const mergedUrl = this.BASE_URL + '/accounts/EmailExistsAsync/' + email;
    return this.http.get<boolean>(mergedUrl);
  }

  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: string[] = JSON.parse(localStorage.getItem(this.ROLES_KEY));

    // console.log('user roles: ' + userRoles);

    if (!userRoles) {
      return false;
    }

    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
      }
    });
    return isMatch;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);

    console.log('msg: ' + errorMessage);
    console.log('status: ' + error.status);
    this.snackBar.open('Error: ' + errorMessage);

    return throwError(errorMessage);
  }


  facebookLogin(accessToken: string) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    const body = JSON.stringify({ accessToken });
    return this.http
      .post(
        this.BASE_URL + '/externalauth/facebook', body, httpOptions)
      .pipe(
        map(res => {
          // localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          this.authNavStatusSource.next(true);
          return true;
        }),
        catchError(this.handleError)
      );
  }

  test() {
    // console.log('roles match: ' + this.roleMatch([this.ROLE_ADMIN]));
    window.onerror('TestError: Hello world', window.location.href);

    console.log('auth test()');

  }
}
