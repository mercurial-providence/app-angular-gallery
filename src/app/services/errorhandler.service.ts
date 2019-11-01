import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService implements ErrorHandler {
  private errorMessage: string = "";

  constructor(private injector: Injector) { }
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);
    const dataService = this.injector.get(DataService);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        this.errorMessage = error.message ? error.message : error.toString();

      } else {
        // Handle Http Error (error.status === 403, 404...)
        this.errorMessage = error.message ? error.message : error.toString();
        //this.errorMessage = "Can't connect to Server."
        ngZone.run(() => router.navigate(['/error'], { queryParams: { error: this.errorMessage } })).then();
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      this.errorMessage = error.stack.toString();
      //this.errorMessage = error.message ? error.message : error.toString();
      //this.errorMessage="Possible application error."
      ngZone.run(() => router.navigate(['/error'], { queryParams: { error: this.errorMessage } })).then();
    }
    
    // Log the error anyway
    dataService.putLog('error', this.errorMessage).subscribe(
      data => {
        console.log("Logged.");
      },
      (err: HttpErrorResponse) => {
        console.log("Log Failed.");
      });
    console.error('It happens: ', error);
  }
}