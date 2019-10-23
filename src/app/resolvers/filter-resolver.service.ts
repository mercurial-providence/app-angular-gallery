import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Author } from '../models/author';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterResolverService implements Resolve<RawImportData<Author>>  {

  constructor(private api: DataService) { }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return this.api.getInfoAPI<RawImportData<Author>>('author', '', '1', '9999');
  }

}
