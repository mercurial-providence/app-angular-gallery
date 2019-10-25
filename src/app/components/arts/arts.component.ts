import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { ActivatedRoute } from '@angular/router';
import { trigger } from '@angular/animations';
import { fadeIn } from '../plugins/animations/animations';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})

export class ArtsComponent implements OnInit {

  private activeFilter: string;
  public activeSubFilter: string = 'All';
  arts: RawImportData<Artdata> = new RawImportData();
  infoLoading: boolean = true;
  artsLoading: boolean = true;
  breakpoint: number = 6;
  private artComData: ArtComponentData = new ArtComponentData();
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.artComData.pageID = +params.id;
      });
    this.route.data
      .subscribe(data => {
        this.artComData.pageRoute = data.name;
      });
    this.activeFilter = this.artComData.pageRoute.substr(0, 2) + '=' + this.artComData.pageID;
    this.route.data
      .subscribe(data => {
        this.arts = data.arts.arts;
        this.artComData.pageCurr = +this.arts.pagination.page;
        this.artComData.pageTotal = +this.arts.pagination.totalpages;
        this.artComData.totalElement = +this.arts.pagination.count;
        this.artComData.pageElement = +this.arts.records.length;
        this.artsLoading = false;

        this.artComData.pageRouteData = data.arts.info;
        this.infoLoading = false;

        this.breakpoint = (window.innerWidth <= 641) ? 3 : 6;

      },
        // Because of this, DataService is not throwing error.
        err => {
          this.artsLoading = false;
          throw ("Can't connect to Server.");
        }
        //err => console.error(err) 
        //err => {throw(err)}
      );

    //      this.getFilteredArts(this.activeFilter,this.artComData.pageCurr,this.artComData.pageSize)
    //      this.fetchDetailInfo(this.artComData.pageRoute,this.artComData.pageID,this.artComData.pageCurr,this.artComData.pageSize);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 641) ? 3 : 6;
  }

  fetchArts(route: string, id: number, page: number, limit: number) {
    this.artsLoading = true;
    this.dataService.getArtsAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
      .subscribe((data: RawImportData<Artdata>) => {
        this.arts = data;
        this.artComData.pageCurr = +data.pagination.page;
        this.artComData.pageTotal = +data.pagination.totalpages;
        this.artComData.totalElement = +data.pagination.count;
        this.artComData.pageElement = +data.records.length;
        this.artsLoading = false;

      },
        // Because of this, DataService is not throwing error.
        err => {
          this.artsLoading = false;
          throw ("Can't connect to Server.");
        }
        //err => console.error(err) 
        //err => {throw(err)}
      );

  }

  fetchInfo(route: string = 'all', id: any, page: any, limit: any) {
    this.infoLoading = true;
    if (route != 'all')
      this.dataService.getInfoAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
        .subscribe(
          (data: RawImportData<Artdata>) => {
            this.artComData.pageRouteData = data;
            this.infoLoading = false;
          },
          err => {
            this.infoLoading = false;
            throw ("Can't connect to Server.");
          }
        );
  }

  fetchDetailInfo(route: string = 'all', id: any, page: any, limit: any) {
    this.infoLoading = true;
    if (route != 'all')
      this.dataService.getDetailInfoAPI<RawImportData<Artdata>>(route, id.toString(), page.toString(), limit.toString())
        .subscribe(
          (data: RawImportData<Artdata>) => {
            this.artComData.pageRouteData = data;
            this.infoLoading = false;
          },
          err => {
            this.infoLoading = false;
            throw ("Can't connect to Server.");
          }
        );
  }

  getFilteredArts(query: string, page: number, limit: number) {
    this.activeFilter = query;
    this.artsLoading = true;
    this.dataService.filter<RawImportData<Artdata>>(query.toString(), page.toString(), limit.toString())
      .subscribe((data: RawImportData<Artdata>) => {
        this.arts = data;
        this.artComData.pageCurr = +data.pagination.page;
        this.artComData.pageTotal = +data.pagination.totalpages;
        this.artComData.totalElement = +data.pagination.count;
        this.artComData.pageElement = +data.records.length;
        this.artsLoading = false;
      },
        // Because of this, DataService is not throwing error.
        err => {
          this.artsLoading = false;
          throw ("Can't connect to Server.");
        }
        //err => console.error(err) 
        //err => {throw(err)}
      );
  }

  isInfoLoading(): boolean {
    return this.infoLoading;
  }
  isArtsLoading(): boolean {
    return this.artsLoading;
  }
  getDataserverURL(): string {
    return GlobalVariables.BASE_DATA_SERVER;
  }
  getPrevPage() {
    this.getFilteredArts(this.activeFilter, this.artComData.pageCurr - 1, this.artComData.pageSize);
  }
  getNextPage() {
    this.getFilteredArts(this.activeFilter, this.artComData.pageCurr + 1, this.artComData.pageSize);
  }
  getThisPage(page: number) {
    this.getFilteredArts(this.activeFilter, page, this.artComData.pageSize);
  }
  getFetchedData() {
    return this.artComData;
  }
  getPaginatorData(): string {
    var marker = (this.artComData.pageCurr - 1) * this.artComData.pageSize;
    return (marker + 1) + " - " + (marker + (this.artComData.pageElement)) + " of " + this.artComData.totalElement;
  }

  fetchFilteredArts(page: any, route: string = '', id: number = 0) {
    let base = this.artComData.pageRoute.substr(0, 2) + '=' + this.artComData.pageID;
    if (!!route.trim() && id > 0) base += '&' + route.substr(0, 2) + '=' + id;
    this.getFilteredArts(base, +page, this.artComData.pageSize)
  }
  onClick(event: string) {
    this.activeSubFilter = event;
  }

  compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}

export class ArtComponentData {
  pageID: number;
  pageRoute: string;
  pageRouteData: RawImportData<any>;
  pageSize: number = +GlobalVariables.ARTS_PAGE_SIZE; //If change pagesize, change also in ArtsResolver
  pageCurr: number = 1;
  pageTotal: number;
  pageElement: number;
  totalElement: number;
}
