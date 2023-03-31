import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ManageProductComponent } from '../manage-product/manage-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = "Add";
  action = "add";
  responseMessage: any;
  categorys: any = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private categorySer: CategoryService,
    private productSer: ProductService,
    public loadingSer: LoadingService,
    public dialogRef: MatDialogRef<ManageProductComponent>,
    private snackBar: SnackbarService
  ) {
    this.buildForm()
    this.getCategorys();
  }

  buildForm() {
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit'
      this.action = 'Update'
      this.productForm.patchValue(this.dialogData)
    }
  }

  get name() {return this.productForm.get('name')}
  get categoryId() {return this.productForm.get('categoryId')}
  get price() {return this.productForm.get('price')}
  get description() {return this.productForm.get('description')}

  getCategorys() {
    this.categorySer.getCategory().subscribe({
      next: (resp: any) => this.categorys = resp,
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

  handleSubmit(){
    if (this.dialogAction === "Edit") {
      this.edit()
    } else {
      this.add()
    }
  }


  edit() {
    let formData = this.productForm.value;
    let data = {
      id:this.dialogData.id, 
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.name
    }
    this.productSer.update(data).subscribe({
      next: (resp: any) => {
        this.dialogRef.close()
        this.onEditProduct.emit()
        this.responseMessage = resp.message
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.SUCCESS)
      },
      error: (err: HttpErrorResponse) => {
        this.dialogRef.close();
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

add(){
  let formData = this.productForm.value;
  let data = {
    name: formData.name,
    categoryId: formData.categoryId,
    price: formData.price,
    description: formData.description,

  }

  this.productSer.add(data).subscribe({
    next: (resp: any) => {
      this.dialogRef.close()
      this.onAddProduct.emit()
      this.responseMessage = resp.message
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.SUCCESS)
    },
    error: (err: HttpErrorResponse) => {
      this.dialogRef.close();
      this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
    }
  })
}

}
