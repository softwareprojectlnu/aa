import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Users} from '../../Users';
import {User} from 'firebase';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCollections: AngularFirestoreCollection<Users>;
//  users: Observable<Users[]>;
  userDoc: AngularFirestoreDocument<Users>;
  users: any;


  title: string;
  type: string;
  description: string;
  price: number;


  // constructor(public userService: UserService) { }
  constructor(private afs: AngularFirestore) {
    afs.firestore.settings({timestampsInSnapshots: true});
  }

  ngOnInit() {
    this.userCollections = this.afs.collection('users');
    this.users = this.userCollections.valueChanges();

  }

  addProduct() {
    this.afs.collection('products').add({
      'title': this.title,
      'type': this.type,
      'price': this.price,
      'description': this.description});
  }

  getProduct(productId) {
    /*
    this.users = this.userCollections.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Users;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
      */
    this.userDoc = this.afs.doc('products/' + productId);
    this.users = this.userDoc.valueChanges();
  }

  getProductList() {
      return this.users;
  }
}
