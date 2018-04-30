import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Users} from '../../Users';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  authState: any = null;

  email: string;
  password: string;

  constructor(public fire: FirebaseService, private fm: FormBuilder, private appRoutes: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService) {
    afs.firestore.settings({timestampsInSnapshots: true});
    this.form = this.fm.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
  }

  signin() {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    this.authService.loginemail(this.form.controls.email.value, this.form.controls.password.value)
      this.appRoutes.navigate(['clothes']);
  }

}
