import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterialTestComponent } from './ng-material-test.component';

describe('NgMaterialTestComponent', () => {
  let component: NgMaterialTestComponent;
  let fixture: ComponentFixture<NgMaterialTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMaterialTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
