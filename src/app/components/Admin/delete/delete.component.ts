import { Component, OnInit } from '@angular/core';
import {Product} from '../../../product';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  products: Product[];
  editState: boolean = false;
  itemToEdit: Product;

  file: File;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  delete( prod: Product) {
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

}
