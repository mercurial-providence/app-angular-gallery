import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { Location } from 'src/app/models/location';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class LocationsComponent implements OnInit {

  constructor(private data: DataService, private aRoute: ActivatedRoute) { }

  private pagesize:string = '18';
  private loLoaded:boolean = false;
  private locations: RawImportData<Location> = new RawImportData();

  ngOnInit() {
    //this.populateLocation("", "1", "25");
    this.aRoute.data
      .subscribe(data => {
        this.locations = data.locations;
        this.loLoaded=true;

    });
  }
  isLocationLoaded():boolean{
    return this.loLoaded;
  }
  getLocations(){
    return this.locations.records.filter((item) => +item.COUNT != 0);
   }
   getDataServerURL():string{
    return GlobalVariables.BASE_DATA_SERVER;
  }
   populateLocation(id:any, page:any, limit:any){
    this.data.getInfoAPI<RawImportData<Location>>('location', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Location>)=>{
      this.locations=data;
      this.loLoaded=true;
    },
    err => {throw("Can't connect to Server.")}); 
  } 
}
