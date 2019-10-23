import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NehalComponent } from './nehal.component';

describe('NehalComponent', () => {
  let component: NehalComponent;
  let fixture: ComponentFixture<NehalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NehalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NehalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
