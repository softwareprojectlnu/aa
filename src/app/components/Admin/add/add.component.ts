import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Product} from '../../../product';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  products: Product[];
  editState: boolean = false;
  itemToEdit: Product;

  prodCollection: AngularFirestoreCollection<Product>;
  pro: Observable<Product[]>;
  prodDoc: AngularFirestoreDocument<Product>;
/*
  prod: Product = {
    title: '',
    type: '',
    description: '',
    price: 0
  }
  */
title: string;
type: string;
description: string;
price: number;
photo: any;

  constructor(private postService: PostService, private afs: AngularFirestore) {
    afs.firestore.settings({timestampsInSnapshots: true});

  }

  ngOnInit() {
    this.postService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

add() {
  this.afs.collection('products').add({
    'title': this.title,
    'type': this.type,
    'price': this.price,
    'description': this.description,
    'photo': this.photo
  });
}
/*
  delete(event, prod: Product) {
    this.clear();
    this.postService.deleteProduct(prod);
  }

  editable(event, prod: Product) {
    this.editState = true;
    this.itemToEdit = prod;
  }

  update(prod: Product) {
    this.postService.updateProduct(prod);
    this.clear();
  }

  clear() {
    this.editState = false;
    this.itemToEdit = null;
  }
*/
  upload(event) {
    this.postService.uploadPicture(event);
  }

}
