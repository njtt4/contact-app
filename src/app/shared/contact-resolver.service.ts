import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { ContactService } from './contact.service';

import { DocumentData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ContactResolver implements Resolve<DocumentData | undefined> {
  constructor(private contactService: ContactService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const contact = await this.contactService.getContact(
      route.paramMap.get('contactId')!
    );
    return contact;
  }
}
