import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Author } from '../models/author';
import { Resolve } from '@angular/router';
import { Form } from '../models/form';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class GTypeResolverService implements Resolve<RawImportData<Type>>  {

  constructor(private api: DataService) { }

  resolve() {

    return this.api.getInfoAPI<RawImportData<Type>>('type', '', '1', '99999');
    
  }
  
}
