import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Type } from 'src/app/models/type';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Router, ActivatedRoute } from '@angular/router';
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
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})

export class FilterComponent implements OnInit {

  constructor(private data: DataService, private router: Router, private aRoute: ActivatedRoute) { }

  private dataSource: MatTableDataSource<any>;
  private displayedColumns: string[] = [];
  public whatAmI: string = '';
  private isLoading: boolean = true;

  private debug:number=0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    //this.populateAuthor("", "1", "9999");
    
    this.aRoute.data
      .subscribe(data => {
        this.dataSource.data = data.tableData.records;
        this.whatAmI = "Author";
        this.displayedColumns = ['ID', 'AUTHOR', 'BORN_DIED', 'SCHOOL', 'COUNT'];
        this.isLoading = false;
    
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    } ,
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
    ); 

    



  }


  populateAuthor(id: any, page: any, limit: any) {
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Author>>('author', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Author>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "Author";
        this.displayedColumns = ['ID', 'AUTHOR', 'BORN_DIED', 'SCHOOL', 'COUNT'];
        this.isLoading = false;
      },
      // Because of this, DataService is not throwing error.
      err => { throw ("Can't connect to Server.") }
      //err => console.error(err) 
      //err => {throw(err)}
    );
  }
  populateLocation(id: any, page: any, limit: any) {
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Location>>('location', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Location>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "Location";
        this.displayedColumns = ['ID', 'LOCATION', 'COUNT'];
        this.isLoading = false;

      },
      err => { throw ("Can't connect to Server.") });
  }
  populateSchool(id: any, page: any, limit: any) {
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<School>>('school', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<School>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "School";
        this.displayedColumns = ['ID', 'SCHOOL', 'COUNT'];
        this.isLoading = false;

      },
      err => { throw ("Can't connect to Server.") });
  }
  populateTimeframe(id: any, page: any, limit: any) {
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Timeframe>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "Timeframe";
        this.displayedColumns = ['ID', 'TIMEFRAME', 'COUNT'];
        this.isLoading = false;

      },
      err => { throw ("Can't connect to Server.") });
  }
  populateType(id: any, page: any, limit: any) {

    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Type>>('type', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Type>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "Type";
        this.displayedColumns = ['ID', 'TYPE', 'COUNT'];
        this.isLoading = false;

      },
      err => { throw ("Can't connect to Server.") });
  }
  populateForm(id: any, page: any, limit: any) {
    this.isLoading = true;

    this.data.getInfoAPI<RawImportData<Form>>('form', id.toString(), page.toString(), limit.toString())
    .subscribe(
      (data: RawImportData<Form>) => {
        this.dataSource.data = data.records;
        this.whatAmI = "Form";
        this.displayedColumns = ['ID', 'FORM', 'COUNT'];
        this.isLoading = false;

      },
      err => { throw ("Can't connect to Server.") });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isPageLoading(): boolean {
    return this.isLoading;
  }
  getDatasource(): MatTableDataSource<any> {
    return this.dataSource;
  }
  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
  tabClick(event: any) {
    switch (event.index) {
      case 0: 
      this.populateAuthor('','1','999999');
        break;
      case 1: 
      this.populateForm('','1','999999');
        break;
      case 2: 
      this.populateLocation('','1','999999');
        break;
      case 3: 
      this.populateSchool('','1','999999');
        break;
      case 4: 
      this.populateTimeframe('','1','999999');
        break;
      case 5: 
      this.populateType('','1','999999');
        break;

    }

  }
}
