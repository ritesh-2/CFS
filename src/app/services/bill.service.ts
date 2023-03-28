import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseBillurl = environment.apiUrl + '/bill';
  constructor(private http:HttpClient) { }

  generateReport(data:any){
    return this.http.post(this.baseBillurl+'/generateReport',data)
  }

  getPDF(data:any):Observable<Blob>{
    return this.http.post(this.baseBillurl+'/getPdf',data,{responseType:'blob'});

  }

  getBills(){
    return this.http.get(this.baseBillurl+'/getBills')
  }

  delete(id:any){
    return this.http.delete(this.baseBillurl+'/delete/'+id)
  }

}
