import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailIntroComponent } from './mail-intro.component';

describe('MailIntroComponent', () => {
  let component: MailIntroComponent;
  let fixture: ComponentFixture<MailIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailIntroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
