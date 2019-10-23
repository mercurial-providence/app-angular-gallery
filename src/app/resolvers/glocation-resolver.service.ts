import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Resolve } from '@angular/router';
import { School } from '../models/school';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class GLocationResolverService implements Resolve<RawImportData<Location>>  {

  constructor(private api: DataService) { }

  resolve() {

    return this.api.getInfoAPI<RawImportData<Location>>('location', '', '1', '25');
    
  }
  
}
