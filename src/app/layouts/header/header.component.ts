import { Component } from '@angular/core';
import {  MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "Logout"
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (user) => {
        dialogRef.close()
        localStorage.clear()
        this.router.navigate(['/'])
      }
    )
  }

  
  changePassword(){

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data ={
    //   message:"change passsword"
    // };
    dialogConfig.width = "550px"
    this.dialog.open(ChangePasswordComponent,dialogConfig)
  }

}


