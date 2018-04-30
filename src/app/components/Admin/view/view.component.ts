import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  allProducts: any;

  constructor(private pos: PostService, private appRoutes: Router) { }

  ngOnInit() {
 /*  this.pos.viewProducts().subscribe(products => {
      this.allProducts = products;
    })*/
  }

}
