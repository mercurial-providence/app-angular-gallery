import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { ActivatedRoute } from '@angular/router';
import { trigger } from '@angular/animations';
import { fadeIn } from '../plugins/animations/animations';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})

export class ArtsComponent implements OnInit {

  private activeFilter:string;
  arts: RawImportData<Artdata> = new RawImportData();
  infoLoading:boolean = true;
  artsLoading:boolean = true;
  private artComData:ArtComponentData = new ArtComponentData();
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params
      .subscribe(params => {
        this.artComData.pageID = +params.id;
      });
      this.route.data
      .subscribe(data => {
        this.artComData.pageRoute = data.name;
      });
      this.activeFilter=this.artComData.pageRoute.substr(0, 2)+'='+this.artComData.pageID;
      //this.fetchArts(this.artComData.pageRoute,this.artComData.pageID,this.artComData.pageCurr,this.artComData.pageSize);
      //this.fetchInfo(this.artComData.pageRoute,this.artComData.pageID,this.artComData.pageCurr,this.artComData.pageSize);
      this.getFilteredArts(this.activeFilter,this.artComData.pageCurr,this.artComData.pageSize)
      this.fetchDetailInfo(this.artComData.pageRoute,this.artComData.pageID,this.artComData.pageCurr,this.artComData.pageSize);
  }

  fetchArts(route:string, id:number, page:number, limit:number){
    this.artsLoading=true;
    this.dataService.getArtsAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
    .subscribe((data: RawImportData<Artdata>)=>{
        this.arts=data;
        this.artComData.pageCurr = +data.pagination.page;
        this.artComData.pageTotal = +data.pagination.totalpages;
        this.artComData.totalElement = +data.pagination.count;
        this.artComData.pageElement = +data.records.length;
        this.artsLoading = false;
      
    } ,
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
    ); 

  }

  fetchInfo(route:string ='all', id:any, page:any, limit:any){
    this.infoLoading=true;
    if(route != 'all')
    this.dataService.getInfoAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Artdata>)=>{
        this.artComData.pageRouteData = data;
        this.infoLoading = false;
      },
      err => {throw("Can't connect to Server.")}
    ); 
  }

  fetchDetailInfo(route:string ='all', id:any, page:any, limit:any){
    this.infoLoading=true;
    if(route != 'all')
    this.dataService.getDetailInfoAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Artdata>)=>{
        this.artComData.pageRouteData = data;
        this.infoLoading = false;
        console.log(this.artComData.pageRouteData.records[0]);
      },
      err => {throw("Can't connect to Server.")}
    ); 
  }

  getFilteredArts(query:string, page:number, limit:number){
    this.activeFilter=query;
    this.artsLoading=true;
    this.dataService.filter<RawImportData<Artdata>>(query.toString(), page.toString(), limit.toString())
    .subscribe((data: RawImportData<Artdata>)=>{
        this.arts=data;
        this.artComData.pageCurr = +data.pagination.page;
        this.artComData.pageTotal = +data.pagination.totalpages;
        this.artComData.totalElement = +data.pagination.count;
        this.artComData.pageElement = +data.records.length;
        this.artsLoading = false;
    } ,
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
    ); 

  }

}

export class ArtComponentData {
  pageID: number;
  pageRoute: string;
  pageRouteData: RawImportData<any>;
  pageSize:number = 25;
  pageCurr: number = 1;
  pageTotal: number;
  pageElement: number;
  totalElement:number;
}