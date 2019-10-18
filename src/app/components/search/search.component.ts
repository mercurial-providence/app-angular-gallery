import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Artdata } from 'src/app/models/artdata';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searchQueryData:SearchQueryData = new SearchQueryData;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    
  }

  apiSearch(query:string, page:number, pageSize:number){
    if(!!query.trim()){
      this.searchQueryData.searchQuery = query.trim().slice(0, 50); 
      this.searchQueryData.inProgress = true;
      this.searchQueryData.nullResult = false;
      this.dataService.search<RawImportData<Artdata>>(
        encodeURIComponent(this.searchQueryData.searchQuery), 
        page.toString(), 
        pageSize.toString())
      .subscribe(
        (res: RawImportData<Artdata>) => {
          if(res && res.records.length){
            this.searchQueryData.searchData = res;
            this.searchQueryData.totalElement = +res.pagination.count;
            this.searchQueryData.pageElement = res.records.length;
            this.searchQueryData.pageTotal = +res.pagination.totalpages;
            this.searchQueryData.pageCurr = +res.pagination.page;            
            this.searchQueryData.inProgress = false;

          } else{
            this.searchQueryData.nullResult = true;
            this.searchQueryData.inProgress = false;
            this.searchQueryData.totalElement = 0;

          }
        },
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
      );
    }
  }


}
export class SearchQueryData {
  searchQuery:string; //Search Query
  searchData: RawImportData<Artdata>;
  pageSize:number = 50; //Total elements in a Page to fetch
  pageCurr: number =  1;  //Current Page Number
  pageTotal: number = 0;  //Total Pages Found
  pageElement: number = 0;  //Total elements found in page
  totalElement:number = 0;  //Total elements found in query
  inProgress:boolean = false; //Current status of Query
  nullResult:boolean = false;
}