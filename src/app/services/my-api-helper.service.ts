import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'; 

@Injectable({ 
  providedIn: 'root'
})
export class MyApiHelperService {

  apiUrl:any = 'http://localhost:5000';
  constructor(private http: HttpClient, private cookieService: CookieService) { }



 errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Get client-side error\n${error.error.message}`;
    } else {
      errorMessage = `Get server-side error\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
 
Register(data: any):any {
    return this.http.post(this.apiUrl + '/create', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', "12345678")
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
















}