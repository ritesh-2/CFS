import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

import { FlexLayoutModule } from '@angular/flex-layout';

const matModules:any = [
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatTableModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  FlexLayoutModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matModules
  ],
  exports:[
    matModules
  ]
})
export class MatImportModule { }
