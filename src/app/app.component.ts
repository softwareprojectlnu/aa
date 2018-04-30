import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase} from 'angularfire2/database';
import {Users} from './Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'webshop';
}
