import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './shared/snackbar.service';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode'
import { GlobalConstants } from '../constants/global.constants';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray: any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');
    let tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token)
    } catch (err) {
      localStorage.clear();
      this.router.navigate['/']
      return false
    }

    let checkRole = false;
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated && checkRole) {
        return true
      }
      this.snackbar.openSnackBar(GlobalConstants.unauthorized, 'error');
      this.router.navigate(['cafe/dashboard'])
      return false
    }
    else {
      localStorage.clear()
      this.router.navigate['/']
      return false
    }

  }

}
