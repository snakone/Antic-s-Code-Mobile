import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Mail, MailMessage, User } from '@shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';
import { CrafterService } from '@services/crafter/crafter.service';
import { MailService } from '@services/mail/mail.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { MailFacade } from '@store/mail/mail.facade';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})

export class NewMessageComponent implements OnInit, OnDestroy {

  @Input() friend: string;
  subjects$: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();
  form: FormGroup;
  custom = false;

  constructor(
    private userSrv: UserService,
    private mailSrv: MailService,
    private crafter: CrafterService,
    private modalCtrl: ModalController,
    private mailFacade: MailFacade
  ) { }

  get receiver() { return this.form.get('receiver'); }
  get subject() { return this.form.get('subject'); }
  get message() { return this.form.get('message'); }

  ngOnInit() {
    this.getFriendById();
    this.subjects$ = this.mailFacade.byFriend$
      .pipe(map(res => res.reduce((acc, curr) => [...acc, curr.subject], [])));
  }

  private getFriendById(): void {
    if (!this.friend) { return; }
    this.userSrv.getUserById(this.friend)
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe((res: User) => {
       this.newMessageForm(res);
     });
  }

  private newMessageForm(friend: User): void {
    this.form = new FormGroup({
      receiver: new FormControl({
         value: friend.name || null,
         disabled: true
       }, [Validators.required]),
       subject: new FormControl('' || null, [
         Validators.required
       ]),
       message: new FormControl('' || null, [
         Validators.required
       ]),
    });
  }

  public onSubmit() {
    if (this.form.invalid) { return; }
    const { message, subject } = this.form.value;

    const newMessage: MailMessage = {
      sender: this.userSrv.getUser(),
      receiver: this.friend,
      subject,
      message,
      date: moment().format('D/MM/YY, h:mm')
    };

    this.mailSrv.send(newMessage)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(_ => {
      this.crafter.toast('MESSAGE.SENDED');
      this.modalCtrl.dismiss();
      this.mailFacade.getByFriend(this.friend);
    });
  }

  public change(option: string): void {
    if (option === 'custom') {
      this.custom = true;
      this.subject.patchValue('');
      setTimeout(() => {
        this.subject.setErrors(null);
      }, 100);
    }
  }

  public back(): void {
    this.custom = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
