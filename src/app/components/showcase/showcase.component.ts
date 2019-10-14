import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Artdata } from 'src/app/models/artdata';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  activatedRouteArt: RawImportData<Artdata> = new RawImportData();
  activatedRouteID: number;
  artURL:string = "";
  
  constructor(private dataService: DataService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.activatedRouteID = +params.id;
    });
    this.fetchArts('all',this.activatedRouteID,'1','50');
  }
  fetchArts(route:string ='all', id:any, page:any, limit:any){
    this.dataService.getArtsAPI(route, id.toString(), page.toString(), limit.toString()).subscribe((data: RawImportData<Artdata>)=>{
      if(data) this.activatedRouteArt=data;
      this.artURL=this.dataService.dataServerURL+this.activatedRouteArt.records['0'].URL;
    }); 
  }
}
