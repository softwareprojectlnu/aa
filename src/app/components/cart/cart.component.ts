import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  title;
  type;
  description;
  price;
  prod;

  constructor(private fb: PostService, private appRoutes: Router) { }

  ngOnInit() {
  }



  submitAdd() {
    this.prod = {
      title: this.title,
      type: this.type,
      description: this.description,
      price : this.price
    };

    console.log('Product - ', this.prod);
    this.fb.addProduct(this.prod);
    this.appRoutes.navigate(['add']);
  }


}
