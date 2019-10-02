import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss']
})
export class ArtsComponent implements OnInit {

  arts: RawImportData<Artdata> = new RawImportData();

  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.fetchArts("",'1','50');
  }

  fetchArts(id:any, page:any, limit:any){
    this.dataService.getArts(id.toString(), page.toString(), limit.toString()).subscribe((data: RawImportData<Artdata>)=>{
      if(data) this.arts=data;
    }); 
  }

  cardClick(param){
    console.log(param);
  }
}
