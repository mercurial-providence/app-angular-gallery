import { Component, OnInit } from '@angular/core';
import { Timeframe } from 'src/app/models/timeframe';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { DataService } from 'src/app/services/data.service';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timeframes',
  templateUrl: './timeframes.component.html',
  styleUrls: ['./timeframes.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class TimeframesComponent implements OnInit {

  constructor(private data: DataService, private aRoute: ActivatedRoute) { }

  private pagesize:string = '18';
  private tiLoaded:boolean = false;
  private timeframes: RawImportData<Timeframe> = new RawImportData();
  ngOnInit() {
    //this.populateTimeframe("", "1", "999999");
    this.aRoute.data
      .subscribe(data => {
        this.timeframes = data.timeframes;
        this.tiLoaded=true;

    });
  }
  populateTimeframe(id:any, page:any, limit:any){
    this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Timeframe>)=>{
      this.timeframes=data;
      this.tiLoaded=true;
    },
    err => {throw("Can't connect to Server.")}); 
  } 
  getTimeframes(){
    return this.timeframes.records.filter((item) => +item.COUNT != 0);
  }
  isTimeframeLoaded():boolean{
    return this.tiLoaded;
  }
  getDataServerURL():string{
    return this.data.dataServerURL; 
  }
}
