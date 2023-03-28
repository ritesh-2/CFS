import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { RouterModule, Routes } from '@angular/router';
import { MatImportModule } from '../mat-import/mat-import.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatImportModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
  constructor(){console.log("Dashboard module loaded")}
 }
