import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryBaseURL = environment.apiUrl+'/category';

  constructor(private http:HttpClient) {}

  add(data:any){
    return this.http.post(this.categoryBaseURL+'/add',data)
  }

  update(data:any){
    return this.http.patch(this.categoryBaseURL+'/update',data);
  }

  getCategory(){
    return this.http.get(this.categoryBaseURL+'/get');
  }

}
