import { Injectable } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {
  AngularFirestoreModule,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore/';
import { Observable, map } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clinetsDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('data', (ref) =>
      ref.orderBy('lastname', 'asc')
    );
  }
  getClients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes: any[]) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }
  
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
}
