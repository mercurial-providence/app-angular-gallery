import { Injectable } from '@angular/core';
import { Artdata } from '../models/artdata';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RawImportData } from '../models/common/raw-import-data';
import { DataService } from '../services/data.service';
import { GlobalVariables } from '../utils/globalvars';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryResolverService implements Resolve<any>  {

  constructor(private data: DataService) { }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return forkJoin(
      this.data.getInfoAPI<RawImportData<Location>>('location', '', '1', '10'),
      this.data.getInfoAPI<RawImportData<Location>>('school', '', '1', '10'),
      this.data.getInfoAPI<RawImportData<Location>>('timeframe', '', '1', '10'),
      this.data.getInfoAPI<RawImportData<Location>>('type', '', '1', '10'),
      this.data.getInfoAPI<RawImportData<Location>>('form', '', '1', '10')
      ).pipe(
        map((allResponses) => {
          return {
            location: allResponses[0],
            school: allResponses[1],
            timeframe: allResponses[2],
            type: allResponses[3],
            form: allResponses[4]
          };
        })
     );
  }

}