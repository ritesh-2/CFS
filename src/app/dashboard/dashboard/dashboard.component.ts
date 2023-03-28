import { HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoadingService } from 'src/app/services/shared/loading.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;

  constructor(private dashServcie: DashboardService,
    private loader: LoadingService,
    private snackBar: SnackbarService
  ) { 
    this.dashBoardData();
    console.log("Dashboard comp loaded..!")
  }

  ngAfterViewInit(): void {
    return null;
  }

  dashBoardData() {
    this.dashServcie.getDetails().subscribe({
      next: (resp) => {
        this.data = resp
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        if(err.status === 0) this.snackBar.openSnackBar(GlobalConstants.SERVER_DOWN,GlobalConstants.ERROR)
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.ERROR)
      }
    })
  }
}
