import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframesComponent } from './timeframes.component';

describe('TimeframesComponent', () => {
  let component: TimeframesComponent;
  let fixture: ComponentFixture<TimeframesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeframesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
