import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss']
})

export class ArtsComponent implements OnInit {

  arts: RawImportData<Artdata> = new RawImportData();
  activatedRouteID: number;
  activatedRoute: string;
  infoLoading:boolean = true;
  artsLoading:boolean = true;
  private pagination:Pagination = new Pagination();
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params
      .subscribe(params => {
        this.pagination.pageID = +params.id;
      });
      this.route.data
      .subscribe(data => {
        this.pagination.pageRoute = data.name;
      });
      this.fetchArts(this.pagination.pageRoute,this.pagination.pageID,'1',this.pagination.pageSize);
      this.fetchInfo(this.pagination.pageRoute,this.pagination.pageID,'1',this.pagination.pageSize);
  }

  fetchArts(route:string ='all', id:any, page:any, limit:any){
    this.artsLoading=true;
    this.dataService.getArtsAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
    .subscribe((data: RawImportData<Artdata>)=>{
        this.arts=data;
        this.pagination.pageCurr = +data.pagination.page;
        this.pagination.pageTotal = +data.pagination.totalpages;
        this.pagination.totalElement = +data.pagination.count;
        this.pagination.pageElement = +data.records.length;
        this.artsLoading = false;
      
    }); 

  }

  fetchInfo(route:string ='all', id:any, page:any, limit:any){
    this.infoLoading=true;
    if(route != 'all')
    this.dataService.getInfoAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
    .subscribe((data: RawImportData<Artdata>)=>{
        this.pagination.pageRouteData = data;
        this.infoLoading = false;
    
    }); 
  }


}

export class Pagination {
  pageID: number;
  pageRoute: string;
  pageRouteData: RawImportData<any>;
  pageSize:number = 50;
  pageCurr: number;
  pageTotal: number;
  pageElement: number;
  totalElement:number;
}