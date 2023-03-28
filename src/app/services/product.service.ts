import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseProductUrl = environment.apiUrl + '/product'

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post(this.baseProductUrl + '/add', data)
  }

  update(data: any) {
    return this.http.patch(this.baseProductUrl + '/update', data)
  }

  getProducts() {
    return this.http.get(this.baseProductUrl + '/get')
  }

  updateStatus(data: any) {
    return this.http.patch(this.baseProductUrl + '/updateStatus', data)
  }

  delete(id: any) {
    return this.http.delete(this.baseProductUrl + '/delete/' + id)
  }

  getproductByCategory(id: any) {
    return this.http.get(this.baseProductUrl + '/getByCategory/' + id)
  }

  getById(id: any) {
    return this.http.get(this.baseProductUrl + '/getById/' + id)
  }

}
