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
import { trigger } from '@angular/animations';
import { fadeIn } from '../plugins/animations/animations';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class FilterComponent implements OnInit {

  constructor(private data: DataService, private router:  Router) { }

  private dataSource: MatTableDataSource<any>;
  private displayedColumns: string[] = [];
  private whatAmI:string = '';
  private isLoading:boolean = true;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.populateAuthor("", "1", "9999");

  }
  populateAuthor(id:any, page:any, limit:any){
    this.isLoading = true;

   	this.data.getInfoAPI<RawImportData<Author>>('author', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<Author>)=>{
        this.dataSource.data=data.records;
        this.whatAmI = "Author";
        this.displayedColumns=['ID', 'AUTHOR', 'BORN_DIED', 'COUNT'];
        this.isLoading = false;
      }  ,
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
      ); 
  } 
  populateLocation(id:any, page:any, limit:any){
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Location>>('location', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<Location>)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Location";
      this.displayedColumns=['ID', 'LOCATION', 'COUNT'];
      this.isLoading = false;

    },
    err => {throw("Can't connect to Server.")}); 
  } 
  populateSchool(id:any, page:any, limit:any){
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<School>>('school', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<School>)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "School";
      this.displayedColumns=['ID', 'SCHOOL', 'COUNT'];
      this.isLoading = false;

    },
    err => {throw("Can't connect to Server.")}); 
  }   
  populateTimeframe(id:any, page:any, limit:any){
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<Timeframe>)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Timeframe";
      this.displayedColumns=['ID', 'TIMEFRAME', 'COUNT'];
      this.isLoading = false;

    },
    err => {throw("Can't connect to Server.")}); 
  }   
  populateType(id:any, page:any, limit:any){
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Type>>('type', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<Type>)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Type";
      this.displayedColumns=['ID', 'TYPE', 'COUNT'];
      this.isLoading = false;

    },
    err => {throw("Can't connect to Server.")}); 
  }   
  populateForm(id:any, page:any, limit:any){
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Form>>('form', id.toString(), page.toString(), limit.toString()).subscribe(
      (data: RawImportData<Form>)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Form";
      this.displayedColumns=['ID', 'FORM', 'COUNT'];
      this.isLoading = false;

    },
    err => {throw("Can't connect to Server.")}); 
  } 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
