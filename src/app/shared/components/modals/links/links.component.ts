import { Component, Input, OnInit } from '@angular/core';
import { Link } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})

export class LinksComponent implements OnInit {

  @Input() links: Link[];

  constructor() { }

  ngOnInit() {}

}
