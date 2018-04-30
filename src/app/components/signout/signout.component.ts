import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private appRoutes: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.appRoutes.navigate(['/signout']);
  }

}
