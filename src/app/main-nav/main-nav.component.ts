import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RegistrationResult } from '../auth/models/registration-result.model';
import { RegisterComponent } from '../auth/register/register.component';
import { MatDialogConfig, MatDialog, MatMenuItem, MatMenu } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { SelectItem, MenuItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private auth: AuthService, private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  @ViewChild('dropdown') dropdown: Dropdown;
  @ViewChild('menu') menu: Menu;
  @ViewChild('memberMenu') memberMenu: MatMenu;

  memberOptions: SelectItem[];
  items: MenuItem[];
  accountOptions: MatMenuItem[];

  ngOnInit(): void {
    this.loadMenuOptions();

    this.items = [
      { label: 'Profile', icon: 'fa fa-user-circle', routerLink: ['/member-profile'] },
      { label: 'Settings', icon: 'fa fa-gear', routerLink: ['/member-settings'] },
      {
        label: 'Sign-out', icon: 'fa fa-sign-out', command: () => {
          this.signout();
        }
      }];
  }

  signout() {
    this.auth.logout();
  }

  test1(event) {
    console.log('test1');
    this.menu.toggle(event);
  }
  test2() {
    console.log('test2');
  }

  loadMenuOptions() {

    // this.accountOptions = [{
    //   'item': 'item 1',
    // }];



    // this.memberOptions =
    // [{'label' : 'Profile', 'value': 'profile', 'icon': 'fa fa-user-circle'},
    //   {'label' : 'Settings', 'value': 'settings', 'icon': 'fa fa-gear'},
    // {'label' : 'Sign-out', 'value': 'sign-out', 'icon': 'fa fa-sign-out'}];
  }
  onOptionSelected(event: Event, option) {
    console.log('onOptionSelected: ' + option);
    console.log('event: ' + event);

    this.dropdown.selectedOption = null;

    switch (option) {
      case 'settings':
        if (this.auth.isLoggedIn) {
          this.router.navigate(['member-settings'], { relativeTo: this.route });
        }
        break;
      case 'profile':
        if (this.auth.isLoggedIn) {
          this.router.navigate(['member-profile'], { relativeTo: this.route });
        }
        break;
      case 'sign-out':
        this.auth.logout();
        break;
    }

  }

  onShowDropDown() {
    console.log('onShowDropDown invoked');
    this.dropdown.selectedOption = null;
  }
  onBlur() {
    console.log('onBlur');
    this.dropdown.selectedOption = null;
  }

  onFocus() {
    console.log('onFocus');
    this.dropdown.selectedOption = null;
  }

  onHide() {
    console.log('onHide');
    this.dropdown.selectedOption = null;
  }

  hasMemberPhotoUri() {
    return this.auth.memberPhotoUri !== undefined
      && this.auth.memberPhotoUri !== ''
      && this.auth.memberPhotoUri !== null;
  }

  openLoginDialog(email: string = '') {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '400px';
    // dialogConfig.height = '450px';

    if (email.length > 0) {
      dialogConfig.data = { 'email': email, 'isNewAccount': true };
    }

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result);
      });
  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    // dialogConfig.width = '450px';
    // dialogConfig.height = '450px';

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (result: RegistrationResult) => {
        if (result !== undefined && result.success) {
          this.openLoginDialog(result.email);
        }

        console.log(result);
      });

  }

}
