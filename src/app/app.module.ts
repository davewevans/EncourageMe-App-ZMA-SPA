import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { FormBuilderModule } from '@angular/forms';
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
  MAT_DIALOG_DATA
} from '@angular/material';
import { AppComponent } from './app.component';
import { MaterialPlayComponent } from './material-play/material-play.component';
import { MemberDirectoryComponent } from './components/member-directory/member-directory.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberTableComponent } from './components/member-table/member-table.component';
import { MembersGridComponent } from './components/members-grid/members-grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberDirectorySidenavComponent } from './components/member-directory-sidenav/member-directory-sidenav.component';
import { SendMessageDialogComponent } from './components/send-message-dialog/send-message-dialog.component';
import { DialogExampleComponent, DialogOverviewExampleDialog } from './dialog-example/dialog-example.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'members', component: MembersGridComponent },
  { path: 'dialogtest', component: DialogOverviewExampleDialog },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavComponent,
    MemberDirectoryComponent,
    MemberTableComponent,
    MembersGridComponent,
    MemberDirectorySidenavComponent,
    SendMessageDialogComponent,
    DialogExampleComponent,
    DialogOverviewExampleDialog   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
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
    NgbModule.forRoot()
  ],
  providers: [
     // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [SendMessageDialogComponent, DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
