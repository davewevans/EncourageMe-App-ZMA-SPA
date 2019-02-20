import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDirectoryComponent } from './group-directory.component';

describe('GroupDirectoryComponent', () => {
  let component: GroupDirectoryComponent;
  let fixture: ComponentFixture<GroupDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
