import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemesComponent } from './color-schemes.component';

describe('ColorSchemesComponent', () => {
  let component: ColorSchemesComponent;
  let fixture: ComponentFixture<ColorSchemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSchemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
