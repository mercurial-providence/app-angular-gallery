import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Type } from 'src/app/models/type';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  
  constructor(private data: DataService, private router:  Router) { }
  
  dataSource: MatTableDataSource<Type>;
  displayedColumns: string[] = [];
  whatAmI:string = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.populateAuthor();
  }
  populateAuthor(){
   	this.data.getInfoAuthors("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Author";
      this.displayedColumns=['ID', 'AUTHOR', 'BORN_DIED'];
    }); 
  } 
  populateLocation(){
    this.data.getInfoLocations("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Location";
      this.displayedColumns=['ID', 'LOCATION'];
    }); 
  } 
    populateSchool(){
    this.data.getInfoSchools("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "School";
      this.displayedColumns=['ID', 'SCHOOL'];
    }); 
  }   populateTimeframe(){
    this.data.getInfoTimeframes("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Timeframe";
      this.displayedColumns=['ID', 'TIMEFRAME'];
    }); 
  }   populateType(){
    this.data.getInfoTypes("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Type";
      this.displayedColumns=['ID', 'TYPE'];
    }); 
  }   populateForm(){
    this.data.getInfoForms("","0,999999","999999").subscribe((data: RawImportData)=>{
      this.dataSource.data=data.records;
      this.whatAmI = "Form";
      this.displayedColumns=['ID', 'FORM'];
    }); 
  } 




  onRowClicked(row) {
    this.router.navigate(['/gallery/arts']);
    this.data.artHandler = row;
    console.log('Row clicked');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
