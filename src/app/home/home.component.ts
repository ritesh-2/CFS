import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private router:Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.checkToken().subscribe({
        next: (resp)=>{
          this.router.navigate(['/cafe/dashboard'])
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }

  signupAction = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px'
    this.dialog.open(SignupComponent, dialogConfig)
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px'
    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }

  loginAction = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px'
    this.dialog.open(LoginComponent, dialogConfig)
  }

}
