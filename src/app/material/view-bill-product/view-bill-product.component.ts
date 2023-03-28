import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-product',
  templateUrl: './view-bill-product.component.html',
  styleUrls: ['./view-bill-product.component.css']
})
export class ViewBillProductComponent {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total']
  dataSource: any
  data: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductComponent>
  ) { 
    this.data = dialogData.data
    this.dataSource = JSON.parse(dialogData.data.productDetails)
  }

}
