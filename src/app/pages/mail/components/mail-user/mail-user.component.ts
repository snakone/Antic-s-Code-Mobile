import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mail-user',
  templateUrl: './mail-user.component.html',
  styleUrls: ['./mail-user.component.scss'],
})

export class MailUserComponent implements OnInit {

  name: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.name = params.id);
  }

}
