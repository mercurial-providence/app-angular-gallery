import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, delay, retryWhen, take, concatMap, flatMap, delayWhen, tap, mergeMap, finalize } from 'rxjs/operators';
import { Observable, throwError, of, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  private apiUrl:string = 'http://localhost/api-slim-php/public/api';
  public dataServerURL:string = 'http://localhost/';
  
/* 
This function fetches all the info from API /info/{category}/{id}
category  : author    & id  : '' or 1,2,3... or a,b,c...
category  : form      & id  : '' or 1,2,3...
category  : location  & id  : '' or 1,2,3...
category  : school    & id  : '' or 1,2,3...
category  : timeframe & id  : '' or 1,2,3...
category  : type      & id  : '' or 1,2,3...
 */            
  public getInfoAPI(category:string, id:string = "", page:string = "1", limit:string = "10"){
    var callURL : string = '';

    if(!!id.trim() && !isNaN(+id)) callURL = this.apiUrl+'/info/'+category+'/'+id;
    else callURL = this.apiUrl+'/info/'+category;

    return this.http.get(callURL,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    }).pipe(
      retryWhen(genericRetryStrategy({maxRetryAttempts: 10, scalingDuration: 1000}))
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
  public getArtsAPI(category:string, id:string = "", page:string = "1", limit:string = "10"){
    var callURL : string = '';

    if(!!id.trim() && !isNaN(+id)) callURL = this.apiUrl+'/art/'+category+'/'+id;
    else callURL = this.apiUrl+'/art/'+category;

    return this.http.get(callURL,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
      }).pipe(
        retryWhen(genericRetryStrategy({maxRetryAttempts: 10, scalingDuration: 1000}))
      );
  }

  public search(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim() && !isNaN(+id)) return this.http.get(this.apiUrl+'/search/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
      }).pipe(
        retryWhen(genericRetryStrategy({maxRetryAttempts: 10, scalingDuration: 1000}))
      );
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
        console.log(error);
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};