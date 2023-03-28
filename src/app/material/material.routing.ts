import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { CategoryComponent } from './category/category.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewBillComponent } from './view-bill/view-bill.component';

const routes: Routes = [
  {
     path: 'category',
     component:CategoryComponent,
     canActivate:[RouteGuardService],
     data:{
      expectedRole:['admin']
     }
   },
  {
     path: 'product',
     component:ManageProductComponent,
     canActivate:[RouteGuardService],
     data:{
      expectedRole:['admin']
     }
   },
  {
     path: 'order',
     component:ManageOrderComponent,
     canActivate:[RouteGuardService],
     data:{
      expectedRole:['admin','user']
     }
   },
  {
     path: 'bill',
     component:ViewBillComponent,
     canActivate:[RouteGuardService],
     data:{
      expectedRole:['admin','user']
     }
   },
  {
     path: 'user',
     component:ManageUserComponent,
     canActivate:[RouteGuardService],
     data:{
      expectedRole:['admin']
     }
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
