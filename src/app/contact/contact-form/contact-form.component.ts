import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Contact } from '../../shared/contacts.type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactForm: FormGroup;

  isUpdate = false;

  @Input() contact: Contact | undefined;

  @Output() formSubmit = new EventEmitter<Contact>();

  contactData: Contact | undefined = undefined;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const contactFormData = changes['contact'].currentValue;

    this.contactForm = this.formBuilder.group({
      id: contactFormData?.id,
      name: new FormControl(contactFormData?.name, Validators.required),
      email: new FormControl(contactFormData?.email, [
        Validators.required,
        Validators.email,
      ]),
      contact: new FormControl(contactFormData?.contact, [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
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
