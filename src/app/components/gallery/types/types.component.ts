import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Form } from 'src/app/models/form';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { Type } from 'src/app/models/type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class TypesComponent implements OnInit {



  constructor(private data: DataService, private aRoute: ActivatedRoute) { }

  private pagesize:string = '18';
  private tyLoaded:boolean = false;
  private types: RawImportData<Type> = new RawImportData();

  ngOnInit() {
    //this.populateType("", "1", "999999");
    this.aRoute.data
      .subscribe(data => {
        this.types = data.types;
        this.tyLoaded=true;

    });
  }
  
  populateType(id:any, page:any, limit:any){
    this.data.getInfoAPI<RawImportData<Type>>('type', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Type>)=>{
      this.types=data;
      this.tyLoaded=true;
    },
    err => {throw("Can't connect to Server.")}); 
  }  
  getTypes(){
    return this.types.records.filter((item) => +item.COUNT != 0);
  }
  isTypeLoaded():boolean{
    return this.tyLoaded;
  }
  getDataServerURL():string{
    return this.data.dataServerURL; 
   }
}
