import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/constants/global.constants';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {

  @ViewChild(MatPaginator) paginator:MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status']
  dataSource: any;
  responseMesage: any;

  constructor(
    private sanckBar: SnackbarService,
    private userSer: UserService
  ) {
    this.tableData()
    
  }


  tableData() {
    this.userSer.getusers().subscribe({
      next: (resp: any) => {
        this.dataSource = new MatTableDataSource(resp)
        this.dataSource.paginator = this.paginator
      },
      error: (err: HttpErrorResponse) => {
        this.responseMesage = err.error.message ? err.error.message : GlobalConstants.genericError;
        this.sanckBar.openSnackBar(this.responseMesage, GlobalConstants.ERROR)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status: any, id: any) {
    let data = {
      status: status.toString(),
      id:id
    }

    this.userSer.update(data).subscribe({
      next:(resp:any)=>{
        this.responseMesage = resp.message
        this.sanckBar.openSnackBar(this.responseMesage,GlobalConstants.SUCCESS)
      },
      error: (err: HttpErrorResponse) => {
        this.responseMesage = err.error.message ? err.error.message : GlobalConstants.genericError;
        this.sanckBar.openSnackBar(this.responseMesage, GlobalConstants.ERROR)
      }
    })
  }

}
