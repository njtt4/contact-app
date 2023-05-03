import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Contact } from '../../shared/contacts.type';
import { ContactService } from '../../shared/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  isUpdate = false;

  @Output() formSubmit = new EventEmitter<Contact>();

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.contactService.getData().subscribe((data) => {
      if (data) {
        this.contactForm = this.formBuilder.group({
          id: data.id,
          name: new FormControl(data.name, Validators.required),
          email: new FormControl(data.email, [
            Validators.required,
            Validators.email,
          ]),
          contact: new FormControl(data.contact, [
            Validators.required,
            Validators.pattern('^[0-9]{11}$'),
          ]),
        });
      }
    });

    this.contactService.getIsUpdate().subscribe((data) => {
      if (data) {
        this.isUpdate = data;
      }
    });
  }

  onSubmit(): void {
    const updateContact: Contact = {
      id: this.contactForm.value.id,
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      contact: this.contactForm.value.contact,
    };
    this.formSubmit.emit(updateContact);
    this.contactForm.reset();

    this.isUpdate = false;
  }
}
