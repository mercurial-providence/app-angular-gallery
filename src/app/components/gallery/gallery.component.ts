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
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  
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
  links:string[] = ['One', 'Two', 'Three'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.populateAuthor("", "0,999999", "999999");
  }
  populateAuthor(id, page, limit){
   	this.data.getInfoAuthors(id, page, limit).subscribe((data: RawImportData<Author>)=>{
      this.authors=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Author";
      this.displayedColumns=['ID', 'AUTHOR', 'BORN_DIED'];
      console.log(this.authors);
    }); 
  } 
  populateLocation(id, page, limit){
    this.data.getInfoLocations(id, page, limit).subscribe((data: RawImportData<Location>)=>{
      this.locations=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Location";
      this.displayedColumns=['ID', 'LOCATION'];
      console.log(this.locations);
    }); 
  } 
    populateSchool(id, page, limit){
    this.data.getInfoSchools(id, page, limit).subscribe((data: RawImportData<School>)=>{
      this.schools=data;
      this.dataSource.data=data.records;
      this.whatAmI = "School";
      this.displayedColumns=['ID', 'SCHOOL'];
      console.log(this.schools);
    }); 
  }   populateTimeframe(id, page, limit){
    this.data.getInfoTimeframes(id, page, limit).subscribe((data: RawImportData<Timeframe>)=>{
      this.timeframes=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Timeframe";
      this.displayedColumns=['ID', 'TIMEFRAME'];
    }); 
  }   populateType(id, page, limit){
    this.data.getInfoTypes(id, page, limit).subscribe((data: RawImportData<Type>)=>{
      this.types=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Type";
      this.displayedColumns=['ID', 'TYPE'];
    }); 
  }   populateForm(id, page, limit){
    this.data.getInfoForms(id, page, limit).subscribe((data: RawImportData<Form>)=>{
      this.forms=data;
      this.dataSource.data=data.records;
      this.whatAmI = "Form";
      this.displayedColumns=['ID', 'FORM'];
    }); 
  } 




  onRowClicked(row) {
    this.router.navigate(['/gallery/arts']);
    console.log('Row clicked');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
