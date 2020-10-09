import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private allProducts: Item[] = [{
    id: 1,
    name: 'Winter Jacket',
    category: 'Men Accessories',
    price: 20,
    image: 'jacket.png'
  }, {
    id: 2,
    name: 'Wrist Watch',
    category: 'Men Accessories',
    price: 30,
    image: 'watch.png'
  }, {
    id: 3,
    name: 'Wrist Band',
    category: 'Women Accessories',
    price: 5,
    image: 'band.png'
  }, {
    id: 4,
    name: 'Hand bag',
    category: 'Women Accessories',
    price: 20,
    image: 'bag.png'
  }, {
    id: 5,
    name: 'Shoes',
    category: 'Children Accessories',
    price: 20,
    image: 'shoes.png'
  }, {
    id: 6,
    name: 'Kids Scraf',
    category: 'Children Accessories',
    price: 10,
    image: 'scraf.png'
  }, {
    id: 7,
    name: 'Soccer Ball',
    category: 'Sports Accessories',
    price: 20,
    image: 'soccerball.png'
  }, {
    id: 8,
    name: 'Base Ball',
    category: 'Sports Accessories',
    price: 15,
    image: 'baseball.png'
  }];
  private itemsInCart: Item[] = [];

  constructor() { }

  getAllProducts = (): Item[] => {
    return this.allProducts;
  }

  addToCart = (item: Item) => {
    item.quantity = 1;
    this.itemsInCart.push(item);
  }

  getCartItems = (): Item[] => {
    return this.itemsInCart;
  }

  deleteItem = (id: number) => {
    this.itemsInCart = this.itemsInCart.filter(item => {
      return item.id !== id;
    });
    return this.itemsInCart;
  }

  resetCartItems = () => {
    this.itemsInCart = [];
  }
}
