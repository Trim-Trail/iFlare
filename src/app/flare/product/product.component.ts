import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('item') item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
