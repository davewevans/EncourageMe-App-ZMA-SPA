import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatRadioModule,
  MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatRadioModule,
    MatDialogModule
  ],
  exports: [

  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
