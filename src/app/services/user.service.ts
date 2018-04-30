import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Users} from '../Users';

@Injectable()
export class UserService {



 userCollections: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;


  constructor (private afs: AngularFirestore) {
    afs.firestore.settings({ timestampsInSnapshots: true });
    this.userCollections = this.afs.collection('users');
    this.users = this.userCollections.valueChanges();
/*
    this.users = this.userCollections.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Users;
        data.uid = a.payload.doc.id;
        return data;
      });
    });
    // take this to home component
       /*
    this.userService.getUsers().subscribe(users => {
     // console.log(users);
      this.users = users;
    });
    */
  }
  getUsers() {
    return this.users;
  }
 }

