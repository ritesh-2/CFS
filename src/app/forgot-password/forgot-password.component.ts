import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../services/user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../services/shared/snackbar.service';
import { GlobalConstants } from '../constants/global.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/shared/loading.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup
  responseMessage: string;
  constructor(
    public loadingSer:LoadingService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private snackbarSer: SnackbarService
  ) {
    this.buildForgotForm();
   }

  buildForgotForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]]
    })
  }

  get email() { return this.forgotPasswordForm.get('email') }

  handleSubmit() {
    let formData = this.forgotPasswordForm.value;
    let data = {
      email: formData.email
    }

    this.userService.forgotPassword(data).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.responseMessage = resp.message;
        this.dialogRef.close();
        this.snackbarSer.openSnackBar(this.responseMessage, 'success')
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 0) this.snackbarSer.openSnackBar("Server down", 'error')
        else {
          this.snackbarSer.openSnackBar(err.statusText, 'error')
          console.log(err);
        }
      }
    })
  }
}
