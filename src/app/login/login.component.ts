import { Component } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoadingService } from '../services/shared/loading.service';
import { SnackbarService } from '../services/shared/snackbar.service';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog'
import { GlobalConstants } from '../constants/global.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  resonseMessage: string;
  constructor(
    public loadingSer:LoadingService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      password: [null, [Validators.required]],
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }


  handleSubmit = () => {
    try {
      // this.loadingSer.show();
      let formData = this.loginForm.value;
      let data = {
        email: formData.email,
        password: formData.password,
      }
      this.userService.login(data).subscribe({
        next: (resp: any) => {
          console.log(resp)
          this.dialogRef.close();
          // this.resonseMessage = resp.message;
          // this.snackbar.openSnackBar(this.resonseMessage, "Success");
          localStorage.setItem('token',resp.token)
          this.router.navigate(['/cafe/dashboard'])
        },
        error: (err: HttpErrorResponse) => {
          // this.loadingSer.hide();
          if (err.status == 0) this.snackbar.openSnackBar("Server down", 'error')
          else {
            this.snackbar.openSnackBar(err.error.message, 'error')
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
