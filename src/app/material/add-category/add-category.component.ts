import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = "Add";
  action = "add";
  responseMessage: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private categorySer: CategoryService,
    public loadingSer:LoadingService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private snackBar: SnackbarService

  ) {
    this.buildForm()
  }

  get name(){return this.categoryForm.get('name')}

  buildForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required]
    })
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit'
      this.action = 'Update'
      this.categoryForm.patchValue(this.dialogData)
    }
  }


  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit()
    } else {
      this.add()
    }
  }

  add() {
    let formData = this.categoryForm.value;
    let data = {
      name: formData.name
    }

    this.categorySer.add(data).subscribe({
      next: (resp: any) => {
        this.dialogRef.close()
        this.onAddCategory.emit()
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

  edit() {
    let formData = this.categoryForm.value;
    let data = {
      id:this.dialogData.data.id, 
      name: formData.name
    }

    this.categorySer.update(data).subscribe({
      next: (resp: any) => {
        this.dialogRef.close()
        this.onEditCategory.emit()
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
