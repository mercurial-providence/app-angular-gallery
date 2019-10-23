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
export class ArtsResolverService implements Resolve<any>  {

  constructor(private api: DataService) { }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    var artComData;
    artComData = route.data['name'].substr(0, 2)+'='+route.params['id'];
    //return this.api.filter<RawImportData<Artdata>>(artComData, '1', GlobalVariables.ARTS_PAGE_SIZE.toString());
    return forkJoin(
      this.api.filter<RawImportData<Artdata>>(artComData, '1', GlobalVariables.ARTS_PAGE_SIZE.toString()),
      this.api.getDetailInfoAPI<RawImportData<Artdata>>(route.data['name'], route.params['id'].toString(), '1', GlobalVariables.ARTS_PAGE_SIZE.toString())
      ).pipe(
        map((allResponses) => {
          return {
            arts: allResponses[0],
            info: allResponses[1]         
          };
        })
     );
  }

}