import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../shared/contacts.type';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
})
export class ContactViewComponent implements OnInit {
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contact = this.route.snapshot.data['data'];
  }
}
