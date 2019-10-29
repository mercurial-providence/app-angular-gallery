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
import { Artdata } from 'src/app/models/artdata';
import { GlobalVariables } from 'src/app/utils/globalvars';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})

export class FilterComponent implements OnInit {

  constructor(public data: DataService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  private dataSource: MatTableDataSource<any>;
  public filterData: FilterData = new FilterData();


  private displayedColumns: string[] = [];
  public whatAmI: string = '';
  private isLoading: boolean = true;

  private debug: number = 0;
  breakpoint: number = 6;


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
      },
        // Because of this, DataService is not throwing error.
        err => { throw ("Can't connect to Server.") }
        //err => console.error(err) 
        //err => {throw(err)}
      );
  }

  ngAfterViewInit() {
    console.log("Yakiro");
    this.populateForm('', 1, 999);
    //this.populateLocation('', 1, 9999);
    this.populateSchool('', 1, 999);
    this.populateTimeframe('', 1, 999);
    this.populateType('', 1, 999);
    console.log(this.filterData);
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
    this.data.getInfoAPI<RawImportData<Location>>('location', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Location>) => {
          this.filterData.data.location = data;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateSchool(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<School>>('school', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<School>) => {
          this.filterData.data.school = data;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateTimeframe(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Timeframe>) => {
          this.filterData.data.timeframe = data;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateType(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Type>>('type', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Type>) => {
          this.filterData.data.type = data;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateForm(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Form>>('form', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Form>) => {
          this.filterData.data.form = data;
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
  getDataserverURL(): string {
    return GlobalVariables.BASE_DATA_SERVER;
  }
  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
  summonTheBeast() {
    console.log(this.filterData.filter);
    console.log(this.filterData.getQuery());

    this.filterData.fetchData(this.data, this._snackBar);

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 641) ? 3 : 6;
  }
}

export class FilterData {
  public data: {
    form: RawImportData<Form>;
    location: RawImportData<Location>;
    school: RawImportData<School>;
    timeframe: RawImportData<Timeframe>;
    type: RawImportData<Type>;
  }
  public filter: {
    form: number;
    location: number;
    school: number;
    timeframe: number;
    type: number;
  }
  public queryResult: RawImportData<Artdata>;

  constructor() {
    this.filter = {
      form: 0,
      location: 0,
      school: 0,
      timeframe: 0,
      type: 0
    }
    this.data = {
      form: new RawImportData<Form>(),
      location: new RawImportData<Location>(),
      school: new RawImportData<School>(),
      timeframe: new RawImportData<Timeframe>(),
      type: new RawImportData<Type>()
    }
    this.queryResult = null;
  }

  public getQuery(): string {
    return 'fo=' + this.filter.form + '&' +
      'lo=' + this.filter.location + '&' +
      'sc=' + this.filter.school + '&' +
      'ti=' + this.filter.timeframe + '&' +
      'ty=' + this.filter.type;
  }
  public isQueryValid(): boolean {
    if (+this.filter.form || +this.filter.location || +this.filter.school || +this.filter.timeframe || +this.filter.type) return true;
    else return false;
  }
  public fetchData(dataService: DataService, _snackBar: MatSnackBar): any {
    if (this.isQueryValid()) {
      dataService.filter<RawImportData<Artdata>>(this.getQuery(), '1', '48')
        .subscribe(
          (data: RawImportData<Artdata>) => {
            this.queryResult = data;
            if (!data) 
            _snackBar.open("No results found!", "Ok", {
              duration: 2000,
            });
          },
          err => {
            throw ("Can't connect to Server.");
          }
        );
      console.log(this);
    }
  }
  public getNextPage(dataService: DataService) {
    if (this.isQueryValid()) {
      dataService.filter<RawImportData<Artdata>>(this.getQuery(), (+this.queryResult.pagination.page + 1).toString(), this.queryResult.pagination.limit)
        .subscribe(
          (data: RawImportData<Artdata>) => {
            this.queryResult = data;
          },
          err => {
            throw ("Can't connect to Server.");
          }
        );
      console.log(this);
    }
  }
  public getPrevPage(dataService: DataService) {
    if (this.isQueryValid()) {
      dataService.filter<RawImportData<Artdata>>(this.getQuery(), (+this.queryResult.pagination.page - 1).toString(), this.queryResult.pagination.limit)
        .subscribe(
          (data: RawImportData<Artdata>) => {
            this.queryResult = data;
          },
          err => {
            throw ("Can't connect to Server.");
          }
        );
      console.log(this);
    }
  }
}