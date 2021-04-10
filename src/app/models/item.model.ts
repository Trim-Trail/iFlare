import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Item {
  constructor(
    public id: number,
    public name: string,
    public categoryId: string,
    public picture?: string,
    public price?: string,
    public actualPrice?: string,
    public save?: string,
    public buyItem?: string,
    public getItem?: string,
    public mainItem?: string,
    public subItem?: string,
    public description?: string,
    public displayOrder?: number
  ) { }
}

@Injectable()
export class ItemAdapter implements Adapter<Item>{

  adapt(item: any): Item {
    return new Item(item.id
      , item.name
      , item.categoryId
      , item.picture
      , item.price
      , item.actualPrice
      , item.save
      , item.buyItem
      , item.getItem
      , item.mainItem
      , item.subItem
      , item.description
      , item.displayOrder);
  }
}
