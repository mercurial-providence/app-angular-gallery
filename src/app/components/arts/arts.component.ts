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
  activatedRouteData: RawImportData<any> = new RawImportData();
  isLoading:boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.activatedRouteID = +params.id; // (+) converts string 'id' to a number
      });
      this.route.data.subscribe(data => {
        this.activatedRoute = data.name;
      });
      this.fetchArts(this.activatedRoute,this.activatedRouteID,'1','50');
  }

  fetchArts(route:string ='all', id:any, page:any, limit:any){
    this.dataService.getArtsAPI(route, id.toString(), page.toString(), limit.toString()).subscribe((data: RawImportData<Artdata>)=>{
      if(data) {
        this.arts=data;
        this.isLoading = false;
      }
    }); 
    if(route != 'all')
    this.dataService.getInfoAPI(route, id.toString(), page.toString(), limit.toString()).subscribe((data: RawImportData<Artdata>)=>{
      if(data) {
        this.activatedRouteData=data;
        this.isLoading = false;
      }
    }); 
  }

}
