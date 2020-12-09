import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormErrorComponent } from './ngrx-form-error.component';

describe('NgrxFormErrorComponent', () => {
  let component: NgrxFormErrorComponent;
  let fixture: ComponentFixture<NgrxFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
