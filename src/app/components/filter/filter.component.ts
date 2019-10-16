import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Type } from 'src/app/models/type';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Form } from 'src/app/models/form';
import { School } from 'src/app/models/school';
import { Timeframe } from 'src/app/models/timeframe';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private data: DataService, private router:  Router) { }
  
  authors: RawImportData<Author> = new RawImportData();
  forms: RawImportData<Form> = new RawImportData();
  schools: RawImportData<School> = new RawImportData();
  timeframes: RawImportData<Timeframe> = new RawImportData();
  types: RawImportData<Type> = new RawImportData();
  locations: RawImportData<Location> = new RawImportData();

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  whatAmI:string = '';
  isLoading:boolean = true;


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.populateAuthor("", "1", "999999");

  }
  populateAuthor(id, page, limit){
   	this.data.getInfoAPI('author', id, page, limit).subscribe(
      (data: RawImportData<Author>)=>{
        this.authors=data;
        this.dataSource.data=data.records;
        this.isLoading = false;
        this.whatAmI = "Author";
        this.displayedColumns=['ID', 'AUTHOR', 'BORN_DIED', 'COUNT'];
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
      this.dataSource.data=data.records;
      this.whatAmI = "Location";
      this.displayedColumns=['ID', 'LOCATION', 'COUNT'];
    }); 
  } 
    populateSchool(id, page, limit){
    this.data.getInfoAPI('school', id, page, limit).subscribe((data: RawImportData<School>)=>{
      this.schools=data;
      this.dataSource.data=data.records;
      this.whatAmI = "School";
      this.displayedColumns=['ID', 'SCHOOL', 'COUNT'];
    }); 
  }   populateTimeframe(id, page, limit){
    this.data.getInfoAPI('timeframe', id, page, limit).subscribe((data: RawImportData<Timeframe>)=>{
      this.timeframes=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Timeframe";
      this.displayedColumns=['ID', 'TIMEFRAME', 'COUNT'];
    }); 
  }   populateType(id, page, limit){
    this.data.getInfoAPI('type', id, page, limit).subscribe((data: RawImportData<Type>)=>{
      this.types=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Type";
      this.displayedColumns=['ID', 'TYPE', 'COUNT'];
    }); 
  }   populateForm(id, page, limit){
    this.data.getInfoAPI('form', id, page, limit).subscribe((data: RawImportData<Form>)=>{
      this.forms=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Form";
      this.displayedColumns=['ID', 'FORM', 'COUNT'];
    }); 
  } 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
