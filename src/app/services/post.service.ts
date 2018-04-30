import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
// import {AuthService} from './auth.service';
/*
interface Products {
  title;
  type;
  description;
  price;
}
*/
@Injectable()
export class PostService {

  userRoles: Array<string>;
  item: FirebaseListObservable<any[]>;
  details: FirebaseObjectObservable<any[]>;
/*
  constructor( private auth: AuthService, private db: AngularFireDatabase) {
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })
      .subscribe();
  }
  */
constructor() {}

  viewProducts() {
    // this.item =  this.db.list('/item') as FirebaseListObservable<Products[]>;
  }

  viewDetails(id) {
 //   return this.details = this.db.object('posts/' + id) as FirebaseObjectObservable<Products[]>;
  }

  addProduct(details) {
    if(this.canEdit) {
      const product = JSON.parse(JSON.stringify(this.details));
      console.log('Product - ', product);
      return this.item.push(product);
    }// else {
     // console.log('action prevented!');
   // }
  }

  deleteProduct(id) {
    return this.item.remove(id);
  }

  ////////// Authorization Login /////////

  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed);
  }

  get canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed);
  }

  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed);
  }


  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }
}
