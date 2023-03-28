import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/shared/snackbar.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { GlobalConstants } from '../constants/global.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  resonseMessage: string;
  constructor(
    public loadingSer:LoadingService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactnumber)]],
      password: [null, [Validators.required]],
    })
  }

  get name() { return this.signupForm.get('name') }
  get email() { return this.signupForm.get('email') }
  get contactNumber() { return this.signupForm.get('contactNumber') }
  get password() { return this.signupForm.get('password') }


  handleSubmit = () => {
    try {
      // this.loadingSer.show();
      let formData = this.signupForm.value;
      let data = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
      }
      this.userService.signUp(data).subscribe({
        next: (resp: any) => {
          console.log(resp)
          this.dialogRef.close();
          this.resonseMessage = resp.message;
          this.snackbar.openSnackBar(this.resonseMessage, "Success");
          this.router.navigate(['/'])
        },
        error: (err: HttpErrorResponse) => {
          // this.loadingSer.hide();
          if (err.status == 0) this.snackbar.openSnackBar("Server down", 'error')
          else {
            this.snackbar.openSnackBar(err.statusText, 'error')
            console.log(err);
          }
        }
      })
    }
    catch (err) {
      console.log(err)
    }

  }

}
