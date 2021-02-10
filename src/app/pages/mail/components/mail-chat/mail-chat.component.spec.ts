import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailChatComponent } from './mail-chat.component';

describe('MailChatComponent', () => {
  let component: MailChatComponent;
  let fixture: ComponentFixture<MailChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailChatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
