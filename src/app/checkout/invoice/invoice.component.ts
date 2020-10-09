import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['serial number', 'name', 'category', 'price', 'quantity', 'total'];
  invoiceNumber = Math.floor(10000000 + Math.random() * 90000000);

  constructor(public dialogRef: MatDialogRef<InvoiceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data || []);
  }

  getTotalPrice = () => {
    let total = 0;
    if (!this.data) {
      return total;
    }
    this.data.forEach(element => {
      total += element.price * element.quantity;
    });
    return total;
  }

}
