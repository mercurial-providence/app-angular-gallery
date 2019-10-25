import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { DataService } from 'src/app/services/data.service';
import { retryWhen, delay, take, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { trigger } from '@angular/animations';
import { fadeIn } from '../plugins/animations/animations';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class HomeComponent implements OnInit {
  private displayImage:RawImportData<Artdata> = new RawImportData();
  private isLoading:boolean = true;
  private retryCount:number = 5;
  constructor(private http:HttpClient, private dataService:DataService) { }

  ngOnInit() {
      this.dataService.getRandomArt<RawImportData<Artdata>>()
      .subscribe(
        (res: RawImportData<Artdata>) => {
          if(res){
            this.displayImage = res;
            this.isLoading=false;
          }
        },
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
      ); 
  } 
  getdataServerURL():string{
    return GlobalVariables.BASE_DATA_SERVER;
  }
  isPageLoading():boolean{
    return this.isLoading;
  }
  getFetchedArts():RawImportData<Artdata>{
    return this.displayImage;
  }
}
