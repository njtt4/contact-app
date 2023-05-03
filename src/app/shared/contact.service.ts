import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  collectionData,
  Firestore,
  DocumentData,
  collection,
  CollectionReference,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';

import { Contact } from './contacts.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  private data = new BehaviorSubject<any>(null);
  private isUpdate = new BehaviorSubject<any>(null);

  private contactsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.contactsCollection = collection(this.firestore, 'contacts');
  }

  setData(data: Contact) {
    this.data.next(data);
  }

  getData() {
    return this.data.asObservable();
  }

  setIsUpdate(isUpdate: boolean) {
    this.isUpdate.next(isUpdate);
  }

  getIsUpdate() { 
    return this.isUpdate.asObservable();
  }

  upsertContact(contact: Contact) {
    if (!contact.id) {
      contact.id = new Date().getTime().toString();
    }
    const contactsDocumentReference = doc(
      this.firestore,
      `contacts/${contact.id}`
    );
    return setDoc(contactsDocumentReference, { ...contact });
  }

  async getContact(id: string) {
    const contactsDocumentReference = doc(this.firestore, `contacts/${id}`);
    const contactSnap = await getDoc(contactsDocumentReference);
    const contactData = contactSnap.data();
    return contactData;
  }

  getContacts() {
    return collectionData(this.contactsCollection, {
      idField: 'id',
    }) as Observable<Contact[]>;
  }

  deleteContact(contact: Contact) {
    const contactsDocumentReference = doc(
      this.firestore,
      `contacts/${contact.id}`
    );
    deleteDoc(contactsDocumentReference);
    return;
  }
}
