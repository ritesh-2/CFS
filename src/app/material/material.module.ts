import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatImportModule } from '../mat-import/mat-import.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { MaterialRoutingModule } from './material.routing';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillProductComponent } from './view-bill-product/view-bill-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';




@NgModule({
  declarations: [
    ViewBillComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    CategoryComponent,
    AddCategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillProductComponent,
    ManageUserComponent,

  ],
  imports: [
   ReactiveFormsModule,
    CommonModule,
    MatImportModule,
    MaterialRoutingModule
  ],
  providers :[
  ]
})
export class MaterialModule { }
