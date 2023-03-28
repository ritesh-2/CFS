import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changepasswordFrom: FormGroup;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    public loadingSer: LoadingService,
    private user: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbar:SnackbarService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.changepasswordFrom = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{ validator: this.confirmPasswordValidator })
  }

 confirmPasswordValidator: ValidatorFn = (control: FormGroup): {[key: string]: any} | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
  
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return {'confirmPasswordd': true};
    }
  
    return null;
  };

  get oldPassword() { return this.changepasswordFrom.get('oldPassword') }
  get newPassword() { return this.changepasswordFrom.get('newPassword') }
  get confirmPassword() { return this.changepasswordFrom.get('confirmPassword') }

  handleSubmit() {
    let formData = this.changepasswordFrom.value;
    let data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }

    this.user.changePassowrd(data).subscribe({
      next: (resp: any) => {
        this.responseMessage = resp?.message;
        this.dialogRef.close();
        this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.SUCCESS)
      },
      error: (err:HttpErrorResponse)=>{
        console.log(err)
        if(err.status === 0) this.snackbar.openSnackBar(GlobalConstants.SERVER_DOWN,GlobalConstants.ERROR);
      this.responseMessage = GlobalConstants.genericError;
      this.snackbar.openSnackBar(GlobalConstants.genericError,GlobalConstants.ERROR)
       
      }
    })
  }

}
