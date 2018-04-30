import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../services/firebase.service';
import {PostService} from '../../../services/post.service';
import {Product} from '../../../product';
import {Users} from '../../../Users';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  product: Product = <Product>{};
  user: FirebaseListObservable<Users[]>;
  title;
  type;
  description;
  price;
  prod;

  constructor(private fb: PostService, private appRoutes: Router, private db: AngularFireDatabase) { }

  ngOnInit() {
  }


  submitAdd() {
    this.prod = {
      title: this.title,
      type: this.type,
      description: this.description,
      price : this.price
  };

    this.prod = this.product;
    console.log('Product - ', this.prod);
    this.fb.addProduct(this.prod);
    this.user.push(this.prod);
  //  this.appRoutes.navigate(['add']);
  }


}
