import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { School } from 'src/app/models/school';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class SchoolsComponent implements OnInit {

  constructor(private data: DataService, private aRoute: ActivatedRoute) { }

  private pagesize:string = '18';
  private scLoaded:boolean = false;
  private schools: RawImportData<School> = new RawImportData();
  ngOnInit() {
    //this.populateSchool("", "1", "999999");
    this.aRoute.data
      .subscribe(data => {
        this.schools = data.schools;
        this.scLoaded=true;

    });

  }
  populateSchool(id:any, page:any, limit:any){
    this.data.getInfoAPI<RawImportData<School>>('school', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<School>)=>{
      this.schools=data;
      this.scLoaded=true;
    },
    err => {throw("Can't connect to Server.")}); 
  } 
  getSchools(){
    return this.schools.records.filter((item) => +item.COUNT != 0);
  }
   isSchoolLoaded():boolean{
    return this.scLoaded;
  }
  getDataServerURL():string{
    return this.data.dataServerURL; 
   }
}
