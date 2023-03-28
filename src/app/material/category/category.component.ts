import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator:MatPaginator;

  dataSource: any;
  responseMessage: any;
  displayedColumns: string[] = ['name', 'edit']


  constructor(
    private categorySer: CategoryService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.categorySer.getCategory().subscribe({
      next: (resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator
      },
      error: (err: HttpErrorResponse) => {
        if (err?.error.message) {
          this.responseMessage = err?.error.message
        }
        else {
          this.responseMessage = GlobalConstants.genericError
        }
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig)
    //to close the modal on un authorised routes
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (resp) => {
        this.tableData();
      }
    )
  }

  handleEditAction(values: any) { 

    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      data:values,
      action: 'Edit'
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig)
    //to close the modal on un authorised routes
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (resp) => {
        this.tableData();
      }
    )

  }

}
