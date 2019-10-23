
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Resolve } from '@angular/router';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class GSchoolResolverService implements Resolve<RawImportData<School>>  {

  constructor(private api: DataService) { }

  resolve() {

    return this.api.getInfoAPI<RawImportData<School>>('school', '', '1', '99999');
    
  }
  
}
