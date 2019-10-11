import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl:string = 'http://localhost/api-slim-php/public/api';
  public dataServerURL:string = 'http://localhost/';

  constructor(private http: HttpClient) { }
  
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
    });
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
    });
  }

  public search(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim() && !isNaN(+id)) return this.http.get(this.apiUrl+'/search/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
}

