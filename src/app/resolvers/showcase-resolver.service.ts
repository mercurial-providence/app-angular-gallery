import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Author } from '../models/author';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Form } from '../models/form';
import { Type } from '../models/type';
import { Artdata } from '../models/artdata';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseResolverService implements Resolve<RawImportData<Artdata>>  {

  constructor(private api: DataService) { }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    return this.api.getArtsAPI<RawImportData<Artdata>>('all', route.params['id'].toString(),'1', '1');
    
  }
  
}
