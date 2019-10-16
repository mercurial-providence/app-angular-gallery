import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Author } from 'src/app/models/author';
import { Form } from 'src/app/models/form';
import { Location } from 'src/app/models/location';
import { School } from 'src/app/models/school';
import { Timeframe } from 'src/app/models/timeframe';
import { Type } from 'src/app/models/type';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../nav/header/header.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private authors: RawImportData<Author> = new RawImportData();
  private forms: RawImportData<Form> = new RawImportData();
  private schools: RawImportData<School> = new RawImportData();
  private timeframes: RawImportData<Timeframe> = new RawImportData();
  private types: RawImportData<Type> = new RawImportData();
  private locations: RawImportData<Location> = new RawImportData();
  private whatAmI:string = '';
  private auLoaded:boolean = false;
  private foLoaded:boolean = false;
  private scLoaded:boolean = false;
  private tiLoaded:boolean = false;
  private tyLoaded:boolean = false;
  private loLoaded:boolean = false;
  


  constructor(private data: DataService, private titleService: Title) { }
  ngOnInit() {
    /* this.titleService.setTitle( "Gallery" ); */
    //this.populateAuthor("", "1", "999999");
    //this.populateLocation("", "1", "999999");
    this.populateSchool("", "1", "999999");
    this.populateTimeframe("", "1", "999999");
    this.populateType("", "1", "999999");
    this.populateForm("", "1", "999999");

  }

  populateAuthor(id, page, limit){
    this.data.getInfoAPI('author', id, page, limit).subscribe(
     (data: RawImportData<Author>)=>{
       this.authors=data;
       this.whatAmI = "Author";
       this.auLoaded=true;
     }/* ,
     error => {
        console.log("I am capable of handling errors here, \
                   but i don't have to, as because my DataService is doing it for me"
                   +error); 
     } */
     ); 
 } 
   populateLocation(id, page, limit){
   this.data.getInfoAPI('location', id, page, limit).subscribe((data: RawImportData<Location>)=>{
     this.locations=data;
     this.whatAmI = "Location";
     this.loLoaded=true;
   }); 
 } 
   populateSchool(id, page, limit){
   this.data.getInfoAPI('school', id, page, limit).subscribe((data: RawImportData<School>)=>{
     this.schools=data;
     this.whatAmI = "School";
     this.scLoaded=true;
   }); 
 }   
    populateTimeframe(id, page, limit){
   this.data.getInfoAPI('timeframe', id, page, limit).subscribe((data: RawImportData<Timeframe>)=>{
     this.timeframes=data;
     this.whatAmI = "Timeframe";
     this.tiLoaded=true;
   }); 
 }   
    populateType(id, page, limit){
   this.data.getInfoAPI('type', id, page, limit).subscribe((data: RawImportData<Type>)=>{
     this.types=data;
     this.whatAmI = "Type";
     this.tyLoaded=true;
   }); 
 }   
    populateForm(id, page, limit){
   this.data.getInfoAPI('form', id, page, limit).subscribe((data: RawImportData<Form>)=>{
     this.forms=data;
     this.whatAmI = "Form";
     this.foLoaded=true;
   }); 
 }
}
