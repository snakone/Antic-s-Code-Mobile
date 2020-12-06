import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleContentHeaderLeftComponent } from './single-content-header-left.component';

describe('SingleContentHeaderLeftComponent', () => {
  let component: SingleContentHeaderLeftComponent;
  let fixture: ComponentFixture<SingleContentHeaderLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleContentHeaderLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleContentHeaderLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
