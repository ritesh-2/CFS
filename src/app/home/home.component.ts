import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { PdfService } from '../services/shared/pdf.service';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total']
  dataSource = [
    {
      "id": 1,
      "name": "Masala Tea",
      "category": "Tea",
      "quantity": "1",
      "price": 30,
      "total": 30
    }
  ];
  data = {
    "id": 2,
    "uuid": "b293855f-5ac4-476e-87b9-97e9b6634bbb",
    "name": "Ritesh",
    "email": "ritesh@gmail.com",
    "contactNumber": "8219481269",
    "paymentMethod": "Cash",
    "total": 30,
    "productDetails": "[{\"id\":1,\"name\":\"Masala Tea\",\"category\":\"Tea\",\"quantity\":\"1\",\"price\":30,\"total\":30}]",
    "createdBy": "ritesh@gmail.com"
  };


  constructor(
    private dialog: MatDialog, private router: Router,
    private userService: UserService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.checkToken().subscribe({
        next: (resp) => {
          this.router.navigate(['/cafe/dashboard'])
        },
        error: (err) => {
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
