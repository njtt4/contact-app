import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ContactService } from '../../shared/contact.service';
import { Contact } from '../../shared/contacts.type';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css'],
})
export class ContactTableComponent implements OnChanges {
  @Input() contacts: Contact[] = [];
  @Output() contact = new EventEmitter<Contact>();
  @Output() contactDelete = new EventEmitter<Contact>();

  dataSource = new MatTableDataSource<Contact>();

  displayedColumns: string[] = ['id', 'name', 'email', 'contact', 'actions'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contacts'] && changes['contacts'].currentValue) {
      this.dataSource.data = changes['contacts'].currentValue;
    }
  }

  deleteContact(item: Contact) {
    this.contactDelete.emit(item);
  }

  populateContactData(item: Contact) {
    this.contact.emit(item);
  }
}
