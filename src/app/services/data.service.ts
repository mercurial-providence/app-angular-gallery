import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl:string = 'http://localhost/api-slim/public/index.php/api';
  artHandler:any = [];

  constructor(private http: HttpClient) { }
  
  //INFORMATION STREAM
  public getInfoAuthors(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/author/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/author',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getInfoForms(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/form/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/form',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getInfoLocations(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/location/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/location',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getInfoSchools(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/school/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/school',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getInfoTimeframes(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/timeframe/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/timeframe',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getInfoTypes(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/info/type/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/info/type',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }

  //ARTDATA STREAM
  public getArts(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
    return this.http.get(this.apiUrl+'/art',{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsAuthor(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/author/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsForm(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/form/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsLocation(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/location/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsSchool(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/school/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsTimeframe(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/timeframe/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
  public getArtsType(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/art/type/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }

  public search(id:string = "", page:string = "1", limit:string = "10") {
    if(!!id.trim()) return this.http.get(this.apiUrl+'/search/'+id,{
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
    });
  }
}

