import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Artdata } from 'src/app/models/artdata';
import { DataService } from 'src/app/services/data.service';
import { GlobalVariables } from 'src/app/utils/globalvars';
import smoothscroll from 'smoothscroll-polyfill';

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
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
    this.route.params.subscribe(params => {
      this.activatedRouteID = +params.id;
    });
    //this.fetchArts('all',this.activatedRouteID,'1','1');

    this.route.data.subscribe(data => {
        this.activatedRouteArt=data.arts;
        this.artURL=GlobalVariables.BASE_DATA_SERVER+'art/'+this.activatedRouteArt.records['0'].URL;
        },
        // Because of this, DataService is not throwing error.
        err => {
          throw("Can't connect to Server.");
        }
        //err => console.error(err) 
        //err => {throw(err)}
    );
  }
  
  fetchArts(route:string, id:any, page:any, limit:any){
    this.dataService.getArtsAPI(route, id.toString(), page.toString(), limit.toString())
    .subscribe((data: RawImportData<Artdata>)=>{
      if(data){
        this.activatedRouteArt=data;
        this.artURL=this.dataService.dataServerURL+this.activatedRouteArt.records['0'].URL;
      }
    }); 
  }
}
