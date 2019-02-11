import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDirectorySidenavComponent } from './member-directory-sidenav.component';

describe('MemberDirectorySidenavComponent', () => {
  let component: MemberDirectorySidenavComponent;
  let fixture: ComponentFixture<MemberDirectorySidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDirectorySidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDirectorySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
