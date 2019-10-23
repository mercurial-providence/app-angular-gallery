import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Artdata } from 'src/app/models/artdata';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchQueryData:SearchQueryData = new SearchQueryData;
  private searchGroup:any;

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  apiSearch(query:string, page:number, pageSize:number){
    if(!!query.trim()){
      this.searchQueryData.searchQuery = query.trim().slice(0, 50); 
      this.searchQueryData.inProgress = true;
      this.searchQueryData.nullResult = false;
      this.dataService.search<RawImportData<SearchRawData>>(
        encodeURIComponent(this.searchQueryData.searchQuery), 
        page.toString(), 
        pageSize.toString())
      .subscribe(
        (res: RawImportData<SearchRawData>) => {
          if(res && res.records.length){
            this.searchQueryData.searchData = res;
            this.searchQueryData.totalElement = +res.pagination.count;
            this.searchQueryData.pageElement = res.records.length;
            this.searchQueryData.pageTotal = +res.pagination.totalpages;
            this.searchQueryData.pageCurr = +res.pagination.page;            
            this.searchQueryData.inProgress = false;
            
/*             this.searchGroup = groupBy(this.searchQueryData.searchData.records, obj => obj.FOUND_IN);
            console.log(this.searchGroup); */
          } else{
            this.searchQueryData.nullResult = true;
            this.searchQueryData.totalElement = 0;
            this.searchQueryData.inProgress = false;

          }
        },
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
      );
    }
  }

  getDataServerURL():string{
    return this.dataService.dataServerURL;
  }
}
export class SearchRawData extends Artdata{
  FOUND_IN:string;
}
export class SearchQueryData {
  searchQuery:string; //Search Query
  searchData: RawImportData<SearchRawData>;
  pageSize:number = +GlobalVariables.SEARCH_PAGE_SIZE; //Total elements in a Page to fetch
  pageCurr: number =  1;  //Current Page Number
  pageTotal: number = 0;  //Total Pages Found
  pageElement: number = 0;  //Total elements found in page
  totalElement:number = 0;  //Total elements found in query
  inProgress:boolean = false; //Current status of Query
  nullResult:boolean = false; //Whether the query returned 201: No content
}

function groupBy<T extends any, K extends keyof T>(array: T[], key: K | { (obj: T): string }): Record<string, T[]> {
  const keyFn = key instanceof Function ? key : (obj: T) => obj[key]
  return array.reduce(
    (objectsByKeyValue, obj) => {
      const value = keyFn(obj)
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    },
    {} as Record<string, T[]>
  )
}