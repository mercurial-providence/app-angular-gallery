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
import { transition, style, animate, trigger } from '@angular/animations';
import { fadeIn, slideInOut } from '../plugins/animations/animations';
import { GlobalVariables } from 'src/app/utils/globalvars';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class GalleryComponent implements OnInit {

  private authors: RawImportData<Author> = new RawImportData();
  private forms: RawImportData<Form> = new RawImportData();
  private schools: RawImportData<School> = new RawImportData();
  private timeframes: RawImportData<Timeframe> = new RawImportData();
  private types: RawImportData<Type> = new RawImportData();
  private locations: RawImportData<Location> = new RawImportData();
  private auLoaded: boolean = false;
  private foLoaded: boolean = false;
  private scLoaded: boolean = false;
  private tiLoaded: boolean = false;
  private tyLoaded: boolean = false;
  private loLoaded: boolean = false;
  private alphabets: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  private activatedAlpha: string = this.alphabets[0];
  private pagesize: string = '18';

  constructor(private data: DataService, private titleService: Title, private route: ActivatedRoute) { }
  ngOnInit() {
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
    /* this.titleService.setTitle( "Gallery" ); */
    /* 
        this.populateSchool("", "1", "10");
        this.populateTimeframe("", "1", "10");
        this.populateType("", "1", "10");
        this.populateForm("", "1", "10");
        this.populateLocation("", "1", "10");
    */

    this.route.data
      .subscribe(data => {
        this.forms = data.gallery.form;
        this.foLoaded = true;

        this.locations = data.gallery.location;
        this.loLoaded = true;

        this.schools = data.gallery.school;
        this.scLoaded = true;

        this.timeframes = data.gallery.timeframe;
        this.tiLoaded = true;

        this.types = data.gallery.type;
        this.tyLoaded = true;
      },
        // Because of this, DataService is not throwing error.
        err => {

          throw ("Can't connect to Server.");
        }
        //err => console.error(err) 
        //err => {throw(err)}
      );
  }

  populateAuthor(ele: string, id: any, page: any, limit: any) {
    this.activatedAlpha = ele;
    this.data.getInfoAPI<RawImportData<Author>>(ele ? 'author/' + ele : 'author', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Author>) => {
          this.authors = data;
          this.auLoaded = true;
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
          this.locations = data;
          this.loLoaded = true;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateSchool(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<School>>('school', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<School>) => {
          this.schools = data;
          this.scLoaded = true;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateTimeframe(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Timeframe>>('timeframe', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Timeframe>) => {
          this.timeframes = data;
          this.tiLoaded = true;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateType(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Type>>('type', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Type>) => {
          this.types = data;
          this.tyLoaded = true;
        },
        err => { throw ("Can't connect to Server.") });
  }
  populateForm(id: any, page: any, limit: any) {
    this.data.getInfoAPI<RawImportData<Form>>('form', id.toString(), page.toString(), limit.toString())
      .subscribe(
        (data: RawImportData<Form>) => {
          this.forms = data;
          this.foLoaded = true;
        },
        err => { throw ("Can't connect to Server.") });
  }

  getDataServerURL(): string {
    return GlobalVariables.BASE_DATA_SERVER;
  }
  getAlphabets(): string[] {
    return this.alphabets;
  }

  getAuthors() {
    return this.authors.records.filter((item) => +item.COUNT != 0);
  }
  getTimeframes() {
    return this.timeframes.records.filter((item) => +item.COUNT != 0);
  }
  getTypes() {
    return this.types.records.filter((item) => +item.COUNT != 0);
  }
  getLocations() {
    return this.locations.records.filter((item) => +item.COUNT != 0);
  }
  getSchools() {
    return this.schools.records.filter((item) => +item.COUNT != 0);
  }
  getForms() {
    return this.forms.records.filter((item) => +item.COUNT != 0);
  }
  getActivatedAlpha(): string {
    return this.activatedAlpha;
  }
  reqAuthorbyAlpha(alpha: string) {
    this.populateAuthor(alpha, '', '1', this.pagesize);
  }
  reqPrevPageAuthor() {
    this.populateAuthor(this.activatedAlpha, '', +this.authors.pagination.page - 1, this.pagesize)
  }
  reqNextPageAuthor() {
    this.populateAuthor(this.activatedAlpha, '', +this.authors.pagination.page + 1, this.pagesize)
  }


  isFirstPageAuthor(): boolean {
    return +this.authors.pagination.page == 1;
  }
  isLastPageAuthor(): boolean {
    return +this.authors.pagination.page == +this.authors.pagination.totalpages;
  }
  isAuthorLoaded(): boolean {
    return this.auLoaded;
  }
  isLocationLoaded(): boolean {
    return this.loLoaded;
  }
  isTypeLoaded(): boolean {
    return this.tyLoaded;
  }
  isFormLoaded(): boolean {
    return this.foLoaded;
  }
  isSchoolLoaded(): boolean {
    return this.scLoaded;
  }
  isTimeframeLoaded(): boolean {
    return this.tiLoaded;
  }
  everythingLoaded(): boolean {
    return this.isFormLoaded() && this.isTypeLoaded() && this.isSchoolLoaded() && this.isTimeframeLoaded();
  }

  scrollLeft(el: Element) {

    el.scrollBy({ top: 0, left: -400, behavior: 'smooth' });

  }

  scrollRight(el: Element) {

    el.scrollBy({ top: 0, left: 400, behavior: 'smooth' });

  }


}

