import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { RawImportData } from '../models/common/raw-import-data';
import { Resolve } from '@angular/router';
import { School } from '../models/school';
import { Timeframe } from '../models/timeframe';

@Injectable({
  providedIn: 'root'
})
export class GTimeframeResolverService implements Resolve<RawImportData<Timeframe>>  {

  constructor(private api: DataService) { }

  resolve() {

    return this.api.getInfoAPI<RawImportData<Timeframe>>('timeframe', '', '1', '99999');
    
  }
  
}
