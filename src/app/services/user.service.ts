import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUserUrl = environment.apiUrl + '/user';
  constructor(private http: HttpClient,private router:Router) { }


  signUp = (data: any) => {
    return this.http.post(this.baseUserUrl + '/signup', data)
  }

  login = (data: any) => {
    return this.http.post(this.baseUserUrl + '/login', data)
  }

  forgotPassword = (data:any) =>{
    return this.http.post(this.baseUserUrl + '/forgotPassword',data)
  }

  checkToken = () =>{
    return this.http.get(this.baseUserUrl+'/checkToken');
  }

  changePassowrd = (data:any) =>{
    return this.http.post(this.baseUserUrl+'/changePassword',data)
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate['/'];
      return false;
    }else{
     return true;
    }
  }

  getusers(){
    return this.http.get(this.baseUserUrl+'/get')
  }

  update(data:any){
    return this.http.patch(this.baseUserUrl+'/update',data)
  }

}
