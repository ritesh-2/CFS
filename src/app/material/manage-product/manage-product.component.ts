import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ManageProductComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private productSer: ProductService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.tableData();
  }

  tableData() {
    this.productSer.getProducts().subscribe({
      next: (resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator

      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddProduct.subscribe(resp => this.tableData())
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: values.id,
      action: 'Edit'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditProduct.subscribe(resp => this.tableData())
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' product'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((resp) => {
      this.deleteProduct(values.id);
      dialogRef.close()
    })
  }

  onChange(status: any, id: any) {
    let data = {
      status: status.toString(),
      id: id
    }

    this.productSer.updateStatus(data).subscribe({
      next: (resp: any) => {
        this.tableData();
        this.responseMessage = resp.message;
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.SUCCESS)
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)

      }
    })
  }

  deleteProduct(id) {
    this.productSer.delete(id).subscribe({
      next: (resp: any) => {
        this.tableData();
        this.responseMessage = resp.message
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.SUCCESS)
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

}
