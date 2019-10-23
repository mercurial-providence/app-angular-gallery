import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Author } from '../models/author';
import { Resolve } from '@angular/router';
import { Form } from '../models/form';
import { GlobalVariables } from '../utils/globalvars';

@Injectable({
  providedIn: 'root'
})
export class GAuthorResolverService implements Resolve<RawImportData<Author>>  {

  constructor(private api: DataService) { }

  resolve() {
    return this.api.getInfoAPI<RawImportData<Author>>('author/a', '', '1', GlobalVariables.ARTS_PAGE_SIZE.toString());
    
  }
  
}
