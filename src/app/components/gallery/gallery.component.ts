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
  private alphabets:string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  private activatedAlpha:string = this.alphabets[0];                                
  private pagesize:string = '24';

  constructor(private data: DataService, private titleService: Title) { }
  ngOnInit() {
    this.pagesize='24';
    /* this.titleService.setTitle( "Gallery" ); */
    this.populateAuthor("a", "", "1", this.pagesize);
    //this.populateLocation("", "1", "999999");
    this.populateSchool("", "1", "999999");
    this.populateTimeframe("", "1", "999999");
    this.populateType("", "1", "999999");
    this.populateForm("", "1", "999999");

  }

  populateAuthor(ele, id, page, limit){
    this.activatedAlpha=ele;
    this.data.getInfoAPI<RawImportData<Author>>(ele?'author/'+ele:'author', id, page, limit)
    .subscribe(
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
   this.data.getInfoAPI<RawImportData<Location>>('location', id, page, limit)
   .subscribe(
     (data: RawImportData<Location>)=>{
     this.locations=data;
     this.whatAmI = "Location";
     this.loLoaded=true;
   }); 
 } 
   populateSchool(id, page, limit){
   this.data.getInfoAPI<RawImportData<School>>('school', id, page, limit)
   .subscribe(
     (data: RawImportData<School>)=>{
     this.schools=data;
     this.whatAmI = "School";
     this.scLoaded=true;
   }); 
 }   
    populateTimeframe(id, page, limit){
   this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id, page, limit)
   .subscribe(
     (data: RawImportData<Timeframe>)=>{
     this.timeframes=data;
     this.whatAmI = "Timeframe";
     this.tiLoaded=true;
   }); 
 }   
    populateType(id, page, limit){
   this.data.getInfoAPI<RawImportData<Type>>('type', id, page, limit)
   .subscribe(
     (data: RawImportData<Type>)=>{
     this.types=data;
     this.whatAmI = "Type";
     this.tyLoaded=true;
   }); 
 }   
    populateForm(id, page, limit){
   this.data.getInfoAPI<RawImportData<Form>>('form', id, page, limit)
   .subscribe(
     (data: RawImportData<Form>)=>{
     this.forms=data;
     this.whatAmI = "Form";
     this.foLoaded=true;
   }); 
 }

 getAuthors(){
  return this.authors.records.filter((item) => +item.COUNT != 0);
 }
 getTimeframes(){
  return this.timeframes.records.filter((item) => +item.COUNT != 0);
 }
 getTypes(){
  return this.types.records.filter((item) => +item.COUNT != 0);
 }
 getLocations(){
  return this.locations.records.filter((item) => +item.COUNT != 0);
 }
 getSchools(){
  return this.schools.records.filter((item) => +item.COUNT != 0);
 }
 getForms(){
  return this.forms.records.filter((item) => +item.COUNT != 0);
 }
}
