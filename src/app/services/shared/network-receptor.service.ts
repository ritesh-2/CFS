import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkReceptorService implements HttpInterceptor {

  constructor(private loadingser: LoadingService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingser.show();
    const token = localStorage.getItem('token')
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(req).pipe(
      catchError((err:any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.url)
          if (err.status === 401 || err.status === 402) {
            if (this.router.url === '/') { }
            else {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
       return throwError( ()=> err);
      }),
      finalize(() => {
        this.loadingser.hide()
        console.log()

      })
    );
  }
}
