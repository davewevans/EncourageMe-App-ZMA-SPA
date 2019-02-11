import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { RegistrationResult } from 'src/app/auth/models/registration-result.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  openRegisterDialog() {


    console.log('openRegisterDialog invoked');

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '450px';
    // dialogConfig.height = '450px';

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (result: RegistrationResult) => {
        if (result.success) {
          // open login dialog if success
          // send result.email to login dialog
        }
        // else do nothing

        console.log(result);
      });

  }
}
