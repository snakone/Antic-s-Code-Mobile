import { Component, OnInit, ViewChild } from '@angular/core';
import { MailFacade } from '@store/mail/mail.facade';
import { Mail } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-mail-chat',
  templateUrl: './mail-chat.component.html',
  styleUrls: ['./mail-chat.component.scss'],
})

export class MailChatComponent implements OnInit {

  single$: Observable<Mail>
  message = '';
  @ViewChild('content') content: IonContent;

  constructor(private mailFacade: MailFacade) { }

  ngOnInit() {
    this.single$ = this.mailFacade.single$;
    this.scrollTo();
  }

  private scrollTo(): void {
    if (this.content) {
      this.content.scrollToBottom();
    } else {
      setTimeout(() => this.scrollTo(), 300);
    }
  }

  ionViewWillLeave() {
    this.mailFacade.resetSingle();
  }

  public send(): void {
    console.log(this.message);
    this.reset();
  }

  private reset(): void {
    this.message = '';
  }

}
