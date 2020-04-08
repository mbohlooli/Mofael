import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerComponent } from './school-manager.component';

describe('SchoolManagerComponent', () => {
  let component: SchoolManagerComponent;
  let fixture: ComponentFixture<SchoolManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
