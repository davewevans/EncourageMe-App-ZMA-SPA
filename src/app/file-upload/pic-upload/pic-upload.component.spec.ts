import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicUploadComponent } from './pic-upload.component';

describe('PicUploadComponent', () => {
  let component: PicUploadComponent;
  let fixture: ComponentFixture<PicUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
