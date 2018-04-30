
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Users} from '../Users';
import {Store} from '@ngrx/store';
import { UserService } from '../services/user.service';


// private userStore: Store<{ order: User}>
@Injectable()
export class AuthService {
  provider = new firebase.auth.GoogleAuthProvider();
  authState: any = null;

  user: Observable<firebase.User>;

  constructor (private afAuth: AngularFireAuth, private appRoutes: Router, private db: AngularFireDatabase, private userService: UserService) {
    //   this.user = this.afAuth.authState;
    // this.user = afAuth.authState;
    this.user = afAuth.authState;
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      'login_hint': 'user@example.com'
  }
  }
    /*

   const admin = require('firebase-admin');
   const functions = require('firebase-functions');
   admin.initializeApp(functions.config().firebase);
   var db = admin.firestore();
 */
/*
  loginWithGo() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (result) => {
        this.userService.save(result.user);
       // resolve(true);
      }
    );
   }
*/
  loginemail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.authState = value;
        this.appRoutes.navigateByUrl('clothes');
      })
      .catch(err => {
        console.log('Something went wrong: ', err);
        throw err;
      });
  }

  emailSignup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.authState = value;
        this.appRoutes.navigateByUrl('clothes');
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
        throw error;
      });
  }

  signout(){
    this.afAuth.auth.signOut();
    this.appRoutes.navigate(['']);
  }






  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }
/*
  login() {
    this.firebaseAuth
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
      this.userStore.dispatch(new UserActions.GetUser(response.user));
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut().then((res) => {
      this.userStore.dispatch(new UserActions.LogoutUser());
    });
  }
*/
}

