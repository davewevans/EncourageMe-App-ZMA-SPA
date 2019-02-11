import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { MessagesModule } from '../messages/messages.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        AboutComponent,
        // RegisterComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        AngularFontAwesomeModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MessagesModule,
        LayoutModule,
        MatListModule,
        MatSidenavModule,
        FileUploadModule,
        AuthModule,
        MatIconModule
    ],
    exports: [AppRoutingModule,
        HeaderComponent],
    entryComponents: [
        RegisterComponent
    ]
})
export class CoreModule {

}
