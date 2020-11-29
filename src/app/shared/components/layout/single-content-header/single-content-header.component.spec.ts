import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleContentHeaderComponent } from './single-content-header.component';

describe('SingleContentHeaderComponent', () => {
  let component: SingleContentHeaderComponent;
  let fixture: ComponentFixture<SingleContentHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleContentHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleContentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
