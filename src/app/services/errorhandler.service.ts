import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService implements ErrorHandler{
  private errorMessage:string = "";

  constructor(private injector: Injector) { }
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        this.errorMessage=error.message ? error.message : error.toString();

      } else {
        // Handle Http Error (error.status === 403, 404...)
        this.errorMessage=error.message ? error.message : error.toString();
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      //router.navigate(['/error'], { queryParams: {error: error} });
      this.errorMessage=error.message ? error.message : error.toString();
      ngZone.run(() => router.navigate(['/error'], { queryParams: {error: this.errorMessage} })).then();
    }
      // Log the error anyway
      console.error('It happens: ', error);
  }
}