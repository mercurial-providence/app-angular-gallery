import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl:string = 'http://localhost/api-slim/public/index.php/api/art/type/4';

  constructor(private http: HttpClient) { }
  
  getData() {
    return this.http.get(this.dataUrl);
  }

}
