import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Author } from '../models/author';
import { Resolve } from '@angular/router';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class GFormResolverService implements Resolve<RawImportData<Form>>  {

  constructor(private api: DataService) { }

  resolve() {

    return this.api.getInfoAPI<RawImportData<Form>>('form', '', '1', '99999');
    
  }
  
}
