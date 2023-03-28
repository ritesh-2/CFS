import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashBaseurl = environment.apiUrl + '/dashboard';

  constructor(private http:HttpClient) { }

  getDetails (){
    return this.http.get(this.dashBaseurl+'/details')
  }
}
