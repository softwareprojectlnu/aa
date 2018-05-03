
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {Users} from '../Users';
import { UserService } from '../services/user.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';


// private userStore: Store<{ order: User}>
@Injectable()
export class AuthService {
  provider = new firebase.auth.GoogleAuthProvider();
  authState: any = null;

  user: Observable<firebase.User>;

  constructor (private afAuth: AngularFireAuth, private appRoutes: Router, private db: AngularFirestore, private userService: UserService) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.user = afAuth.authState.switchMap(users => {
      if (users) {
        return this.db.doc<Users>('users/ + {users.uid}').valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const data: Users = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true });
  }


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


}

