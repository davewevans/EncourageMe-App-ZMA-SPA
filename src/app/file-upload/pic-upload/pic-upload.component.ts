import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-pic-upload',
  templateUrl: './pic-upload.component.html',
  styleUrls: ['./pic-upload.component.scss']
})
export class PicUploadComponent implements OnInit, OnDestroy {

  progressValue = new Subject<number>();
  private subscription = new Subscription();

  color = 'primary';
  mode = 'determinate';
  value = 0;
  bufferValue = 0;

  selectedFile: File = null;
  url = 'http://localhost:57544/api/memberphotos/postprofilepic';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.subscription = this.progressValue
      .subscribe(
        progress => this.value = progress);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.value = 0;
  }

  onUpload() {

    console.log('onUpload');

    // TODO check file type and size
    // ex this.selectedFile.type
    const memberId = localStorage.getItem('member-id');
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    if (memberId !== null && memberId !== undefined) {
      fd.append('memberId', memberId);
    }

    this.http.post(this.url, fd,  {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round(event.loaded / event.total * 100);
          console.log('Upload progress ' +  progress + '%');
          this.progressValue.next(progress);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
