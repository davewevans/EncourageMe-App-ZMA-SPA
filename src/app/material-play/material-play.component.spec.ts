import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPlayComponent } from './material-play.component';

describe('MaterialPlayComponent', () => {
  let component: MaterialPlayComponent;
  let fixture: ComponentFixture<MaterialPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
