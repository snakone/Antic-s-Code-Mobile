import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataPickerComponent } from './data-picker.component';

describe('DataPickerComponent', () => {
  let component: DataPickerComponent;
  let fixture: ComponentFixture<DataPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPickerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
