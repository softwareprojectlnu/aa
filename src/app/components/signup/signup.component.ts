import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import {Users} from '../../Users';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userCollections: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  form: FormGroup;

  email: string;
  password: string;
  isAdmin?: boolean;


  constructor(private fb: FirebaseService, private fm: FormBuilder, private appRoutes: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private authservice: AuthService) {
    afs.firestore.settings({timestampsInSnapshots: true});
    this.form = this.fm.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.userCollections = this.afs.collection('users');
    this.users = this.userCollections.valueChanges();
  }


  addUser() {
    this.afs.collection('users').add({
      'email': this.email,
      'password': this.password,
      // 'isAdmin': this.isAdmin
    });
    this.appRoutes.navigateByUrl('');
  }

  signup(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    this.authservice.emailSignup(this.form.controls.email.value, this.form.controls.password.value)
    this.appRoutes.navigateByUrl('');
  }


}
