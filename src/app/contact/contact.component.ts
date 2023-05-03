import { Component, OnInit } from '@angular/core';

import { Contact } from '../shared/contacts.type';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  addContact(contact: Contact) {
    this.contactService.upsertContact(contact);
    this.contacts.push(contact);
  }

  populateDate(contact: Contact) {
    this.contactService.setData(contact);
    // this.contactService.setIsUpdate(true);
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }
}
