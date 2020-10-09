import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { InvoiceComponent } from './invoice/invoice.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  itemsInCart = [];
  totalAmount = 0;

  constructor(private service: CartService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.itemsInCart = this.service.getCartItems();
    this.calculateTotalAmount();
  }

  deleteItem = (id: number) => {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.itemsInCart = this.service.deleteItem(id);
        this.calculateTotalAmount();
      }
    });
  }

  increaseQuantity = (id: number) => {
    const index = this.itemsInCart.findIndex(item => {
      return item.id === id;
    });
    if (index > -1) {
      this.itemsInCart[index].quantity++;
      this.calculateTotalAmount();
    }
  }

  decreaseQuantity = (id: number) => {
    const index = this.itemsInCart.findIndex(item => {
      return item.id === id;
    });
    if (index > -1 && this.itemsInCart[index].quantity !== 1) {
      this.itemsInCart[index].quantity--;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount = () => {
    let total = 0;
    this.itemsInCart.forEach(item => {
      total += item.quantity * item.price;
    });
    this.totalAmount = total;
  }

  buyNow = () => {
    this.dialog.open(ConfirmDialogComponent, { data: { content: 'Do you wish to buy the products?' } }).afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.dialog.open(InvoiceComponent, {
          data: this.itemsInCart,
          width: 'calc(100vw - 10%)'
        }).afterClosed().subscribe(() => {
          this.service.resetCartItems();
          this.router.navigate(['']);
        });
      }
    });
  }

}
