import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent {
  displayColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  responseMessage: any;
  categorys: any = [];
  totalAmount: number = 0;
  products: any = [];
  manageOrderForm: FormGroup;
  _price: any;

  constructor(
    private fb: FormBuilder,
    private categorySer: CategoryService,
    private productSer: ProductService,
    private snackBar: SnackbarService,
    private bill: BillService,
    public loadingSer: LoadingService

  ) {
    this.buildForm();
    this.getcategory();
  }

  buildForm() {
    this.manageOrderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      conatctNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactnumber)]],
      paymentMethod: [null, Validators.required],
      product: [null, Validators.required],
      category: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      total: [0, Validators.required]
    })
  }

  get name() { return this.manageOrderForm.get('name') }
  get email() { return this.manageOrderForm.get('email') }
  get conatctNumber() { return this.manageOrderForm.get('conatctNumber') }
  get product() { return this.manageOrderForm.get('product') }
  get paymentMethod() { return this.manageOrderForm.get('paymentMethod') }
  get quantity() { return this.manageOrderForm.get('quantity') }
  get price() { return this.manageOrderForm.get('price') }
  get total() { return this.manageOrderForm.get('total') }


  getcategory() {
    this.categorySer.getCategory().subscribe({
      next: (resp: any) => {
        this.categorys = resp
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

  getProductByCategory(value: any) {
    this.productSer.getproductByCategory(value.id).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.products = resp
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue(0);
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })
  }

  getProductDetails(value: any) {
    this.productSer.getById(value.id).subscribe({
      next: (resp: any) => {
        this._price = resp.price
        this.manageOrderForm.controls['price'].setValue(resp.price);
        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this._price * 1);
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })

  }

  setQuantity(value: any) {
    let temp = this.quantity.value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.quantity.value * this.price.value)
    }
    else if (temp != '') {
      this.quantity.setValue('1')
      this.manageOrderForm.controls['total'].setValue(this.quantity.value * this.price.value)
    }
  }

  validateProductAddButton() {
    if (this.total.value === 0 || this.total.value === null || this.quantity.value <= 0) {
      return true
    }
    else return false;
  }

  validateSubmitButton() {
    if (this.totalAmount === 0 ||
      this.name.value === null ||
      this.email.value === null ||
      this.conatctNumber.value === null ||
      this.paymentMethod.value === null ||
      this.manageOrderForm.invalid
    ) return true
    else return false;
  }

  add() {
    let formData = this.manageOrderForm.value;
    let productName = this.dataSource.find((e: { id: number; }) => e.id === formData.product.id)
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total

      })

      this.dataSource = [...this.dataSource]
      this.snackBar.openSnackBar(GlobalConstants.PRODUCT_ADDED, GlobalConstants.SUCCESS)
      // this.manageOrderForm.reset();
    }
    else {
      this.snackBar.openSnackBar(GlobalConstants.PRODUCT_EXIST_ERROR, GlobalConstants.ERROR)
    }
  }

  handleDelteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount = element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource]

  }


  submitAction() {
    let formData = this.manageOrderForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.conatctNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource),
      createdBy:formData.email
    }

    this.bill.generateReport(data).subscribe({
      next: (resp: any) => {
        this.downloadFile(resp?.uuid);
        this.manageOrderForm.reset();
        this.dataSource = null;
        this.totalAmount = 0;
      },
      error: (err: HttpErrorResponse) => {
        this.responseMessage = err?.error.message ? err?.error.message : GlobalConstants.genericError
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.ERROR)
      }
    })

  }

  downloadFile(fileName: any) {
    let data = {
      uuid: fileName
    }

    this.bill.getPDF(data).subscribe({
      next:(resp)=>{
        saveAs(resp,fileName+'.pdf')
      }
    })

  }

}
