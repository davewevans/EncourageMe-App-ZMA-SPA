import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicUploadComponent } from './pic-upload/pic-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material';
import { ProgressBarModule } from 'primeng/progressbar';

// import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
    declarations: [
        PicUploadComponent
    ],
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatCardModule,
        ProgressBarModule
        // MatFileUploadModule
    ],
    exports: [
        PicUploadComponent
    ]
})
export class FileUploadModule {

}
