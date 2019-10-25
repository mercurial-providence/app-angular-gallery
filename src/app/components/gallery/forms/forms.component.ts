import { Component, OnInit } from '@angular/core';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Form } from 'src/app/models/form';
import { DataService } from 'src/app/services/data.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class FormsComponent implements OnInit {

  constructor(private data: DataService, private aRoute: ActivatedRoute) { }

  private pagesize:string = '18';
  private foLoaded:boolean = false;
  private forms: RawImportData<Form> = new RawImportData();

  ngOnInit() {
    //this.populateForm("", "1", "999999");
    this.aRoute.data
      .subscribe(data => {
        this.forms = data.forms;
        this.foLoaded=true;

    });
  }
  
  populateForm(id:any, page:any, limit:any){
    this.data.getInfoAPI<RawImportData<Form>>('form', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Form>)=>{
      this.forms=data;
      this.foLoaded=true;
    },
    err => {throw("Can't connect to Server.")}); 
  }
  getForms(){
    return this.forms.records.filter((item) => +item.COUNT != 0);
  }
   isFormLoaded():boolean{
    return this.foLoaded;
  }
  getDataServerURL():string{
    return GlobalVariables.BASE_DATA_SERVER;
  }
}
