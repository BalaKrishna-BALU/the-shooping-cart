import { Component, OnInit } from '@angular/core';

import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  filter = {
    name: 'All',
    isChecked: true,
    categories: [
      { name: 'Men Accessories', isChecked: true },
      { name: 'Women Accessories', isChecked: true },
      { name: 'Children Accessories', isChecked: true },
      { name: 'Sports Accessories', isChecked: true }
    ]
  };
  applyAllFilters = true;
  items = [];
  allProducts = [];
  itemsAddedToCart = [];
  sortFilter: number;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.allProducts = this.service.getAllProducts();
    this.items = [...this.allProducts];
    const cartItems = this.service.getCartItems();
    cartItems.forEach(item => {
      this.itemsAddedToCart.push(item.id);
    });
  }

  updateAllFilters(isChecked: boolean, category: string): void {
    this.applyAllFilters = this.filter.categories != null && this.filter.categories.every(t => t.isChecked);
    if (isChecked) {
      this.addNewCategory(category);
    } else {
      this.removeCategory(category);
    }
    this.sortItems();
  }

  applySomeFilters(): boolean {
    if (this.filter.categories == null) {
      return false;
    }
    return this.filter.categories.filter(t => t.isChecked).length > 0 && !this.applyAllFilters;
  }

  setAll(isChecked: boolean): void {
    this.applyAllFilters = isChecked;
    if (this.filter.categories == null) {
      return;
    }
    this.filter.categories.forEach(t => t.isChecked = isChecked);
    this.setAllItems(isChecked);
    this.sortItems();
  }

  setAllItems = (isChecked: boolean) => {
    if (isChecked) {
      this.items = [...this.allProducts];
    } else {
      this.items = [];
    }
  }

  addNewCategory = (category: string) => {
    const newCategoryItems = this.allProducts.filter(item => {
      return item.category === category;
    });
    this.items = this.items.concat(newCategoryItems);
  }

  removeCategory = (category: string) => {
    this.items = this.items.filter(item => {
      return item.category !== category;
    });
  }

  addToCart = (item: any) => {
    this.itemsAddedToCart.push(item.id);
    this.service.addToCart(item);
  }

  sortItems = () => {
    if (this.sortFilter) {
      this.items.sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      this.items.sort((a, b) => {
        return a.price - b.price;
      });
    }
  }

}
