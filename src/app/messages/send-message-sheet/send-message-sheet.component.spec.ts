import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageSheetComponent } from './send-message-sheet.component';

describe('SendMessageSheetComponent', () => {
  let component: SendMessageSheetComponent;
  let fixture: ComponentFixture<SendMessageSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMessageSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
