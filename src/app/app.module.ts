import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, Injectable, Injector, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
// import * as Rollbar from 'rollbar';

import {
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDialogModule,
  MAT_DIALOG_DATA, MatListModule, MatDatepickerModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { MaterialPlayComponent } from './material-play/material-play.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogExampleComponent, DialogOverviewExampleDialog } from './dialog-example/dialog-example.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MembersModule } from './members/members.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MessagesModule } from './messages/messages.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PicUploadComponent } from './file-upload/pic-upload/pic-upload.component';
import { FileUploadModule } from './file-upload/file-upload.module';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { PrimengTestComponent } from './primeng-test/primeng-test.component';
import { MatMenuModule } from '@angular/material/menu';

// Rollbar config
// https://rollbar.com/helloworldsuperdave/encourageme
const rollbarConfig = {
  accessToken: '3032fada97884aa4b4d74fad3fe2d527',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    // const rollbar = this.injector.get(RollbarService);
    // rollbar.error(err.originalError || err);
  }
}

// export function rollbarFactory() {
//     return new Rollbar(rollbarConfig);
// }

// export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    DialogOverviewExampleDialog,
    AdminDashboardComponent,
    ForbiddenComponent,
    MainNavComponent,
    PrimengTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    AngularFontAwesomeModule,
    MembersModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    MessagesModule,
    LayoutModule,
    MatListModule,
    FileUploadModule,
    DropdownModule,
    SplitButtonModule,
    MenuModule,
    ButtonModule,
    MatMenuModule,
    
  ],
  providers: [
     // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
     {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
      },
      // Rollbar error handler providers
      // { provide: ErrorHandler, useClass: RollbarErrorHandler },
      // { provide: RollbarService, useFactory: rollbarFactory }
  ],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
