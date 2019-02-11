import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembersGridComponent } from './members-grid/members-grid.component';
import { MemberDirectoryComponent } from './member-directory/member-directory.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberDirectorySidenavComponent } from './member-directory-sidenav/member-directory-sidenav.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,
            MatSidenavModule,
            MatProgressSpinnerModule,
            MatGridListModule,
            MatSortModule,
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
            MatRadioModule,
            MatDatepickerModule,
            MatNativeDateModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MembersRoutingModule } from './members-routing.module';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { MemberSettingsComponent } from './member-settings/member-settings.component';
import { MessagesModule } from '../messages/messages.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        MembersGridComponent,
        MemberDirectoryComponent,
        MemberTableComponent,
        MemberDirectorySidenavComponent,
        MemberProfileComponent,
        MemberSettingsComponent,
    ],
    imports: [
        CommonModule,
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
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        MembersRoutingModule,
        FileUploadModule,
        MessagesModule,
        MatSlideToggleModule,
        MatRadioModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class MembersModule {

}
