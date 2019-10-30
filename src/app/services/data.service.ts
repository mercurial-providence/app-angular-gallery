import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retryWhen, mergeMap, finalize, share, shareReplay, retry, catchError } from 'rxjs/operators';
import { Observable, throwError, of, timer, observable } from 'rxjs';
import { GlobalVariables } from '../utils/globalvars';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

/*   private apiUrl: string = 'http://localhost/api-slim-php/public/api';
  public dataServerURL: string = 'http://localhost/';
  public domainAddress: string = 'https://providenceart.000webhostapp.com'; */

  private apiUrl: string = GlobalVariables.BASE_API_URL;
  public dataServerURL: string = GlobalVariables.BASE_DATA_SERVER;
  public domainAddress: string = GlobalVariables.BASE_DOMAIN_ADDRS;

  /* 
  This function fetches all the info from API /info/{category}/{id}
  category  : author    & id  : '' or 1,2,3... or a,b,c...
  category  : form      & id  : '' or 1,2,3...
  category  : location  & id  : '' or 1,2,3...
  category  : school    & id  : '' or 1,2,3...
  category  : timeframe & id  : '' or 1,2,3...
  category  : type      & id  : '' or 1,2,3...
   */
  public getInfoAPI<T>(category: string, id: string = "", page: string = "1", limit: string = "10") {
    var callURL: string = '';

    if (!!id.trim()) {
      //id: something is set
      if (isNaN(+id) || +id <= 0) {
        //id: Invalid value, can not continue
        return throwError("API Parameter is invalid.");
      } else {
        //id: Valid vallue, a positive integer
        callURL = this.apiUrl + '/info/' + category + '/' + id;
      }
    } else {
      //id: empty string
      callURL = this.apiUrl + '/info/' + category;
    }
    return this.http.get<T>(callURL, {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    }).pipe(
      retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
      shareReplay(1)
    );

  }

  /* 
  This function fetches all the info from API /info/{category}/{id}
  category  : author    & id  : '' or 1,2,3... or a,b,c...
  category  : form      & id  : '' or 1,2,3...
  category  : location  & id  : '' or 1,2,3...
  category  : school    & id  : '' or 1,2,3...
  category  : timeframe & id  : '' or 1,2,3...
  category  : type      & id  : '' or 1,2,3...
   */
  public getDetailInfoAPI<T>(category: string, id: string = "", page: string = "1", limit: string = "10") {
    var callURL: string = '';

    if (!!id.trim()) {
      //id: something is set
      if (isNaN(+id) || +id <= 0) {
        //id: Invalid value, can not continue
        return throwError("API Parameter is invalid.");
      } else {
        //id: Valid vallue, a positive integer
        callURL = this.apiUrl + '/detailinfo/' + category + '/' + id;
      }
    } else {
      //id: empty string
      callURL = this.apiUrl + '/detailinfo/' + category;
    }
    return this.http.get<T>(callURL, {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    }).pipe(
      retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
      shareReplay(1)
    );

  }


  /* 
  This function fetches all the info from API /info/{category}/{id}
  category  : all       & id  : '' or 1,2,3...
  category  : author    & id  : 1,2,3... 
  category  : form      & id  : 1,2,3... 
  category  : location  & id  : 1,2,3... 
  category  : school    & id  : 1,2,3... 
  category  : timeframe & id  : 1,2,3... 
  category  : type      & id  : 1,2,3... 
   */
  public getArtsAPI<T>(category: string, id: string = "", page: string = "1", limit: string = "10") {
    var callURL: string = '';

    if (!!id.trim()) {
      //id: something is set
      if (isNaN(+id) || +id <= 0) {
        //can not continue
        return throwError("API Parameter is invalid.");
      } else {
        //id: a positive integer
        callURL = this.apiUrl + '/art/' + category + '/' + id;
      }
    } else {
      //id: empty string
      callURL = this.apiUrl + '/art/' + category;
    }
    return this.http.get<T>(callURL, {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    }).pipe(
      retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
      shareReplay(1)
    );
  }

  public search<T>(query: string, page: string = "1", limit: string = "10") {
    if (!!query.trim()) {
      //id: something is set
      return this.http.get<T>(this.apiUrl + '/search', {
        params: new HttpParams()
          .set('q', query)
          .set('page', page)
          .set('limit', limit)
      }).pipe(
        retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
        shareReplay(1)
      );
    }
  }

  public filter<T>(
    query: string = "0",
    page: string = "1",
    limit: string = "10") {
    if (!!query.trim()) {
      //id: something is set
      return this.http.get<T>(this.apiUrl + '/filter?' + query, {
        params: new HttpParams()
          .set('page', page)
          .set('limit', limit)
      }).pipe(
        retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
        shareReplay(1)
      );
    }
  }

  /* This function is not throwing error because I am catching this error in it's 
  observable in HomeComponent */
  public getRandomArt<T>() {
    return this.http.get<T>(this.apiUrl + '/random')
      .pipe(
        retryWhen(genericRetryStrategy({ maxRetryAttempts: 5, scalingDuration: 100 })),
        shareReplay(1)
      );
  }

  public putLog(category: string, value: string) {
    //  You can add new argument in header like,
    //  httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    const body = JSON.stringify({ category: category, value: value });

    return this.http.put<any>(this.apiUrl + '/log', body, httpOptions)
      .subscribe(
        data => {
          console.log('PUT Request is successful.');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
            
          }
        });

  }
}

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
        scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    shareReplay(1)
  );
};