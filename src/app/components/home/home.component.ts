import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artdata } from 'src/app/models/artdata';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { DataService } from 'src/app/services/data.service';
import { retryWhen, delay, take, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { trigger } from '@angular/animations';
import { fadeIn } from '../plugins/animations/animations';
import { GlobalVariables } from 'src/app/utils/globalvars';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class HomeComponent implements OnInit {
  private tempRand: RawImportData<Artdata> = new RawImportData<Artdata>();


  public displayImage: RawImportData<Artdata> = new RawImportData();
  private isLoading: boolean = true;
  private retryCount: number = 5;
  public isSlide: boolean = false;
  public status: boolean = false;
  public quotes: Quotes[] = [
    {quote:'Everything you can imagine is real.',author:'Pablo Picasso'},
    {quote:'Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.',author:'Leonardo da Vinci'},
    {quote:'Every child is an artist. The problem is how to remain an artist once he grows up.',author:'Pablo Picasso'},
    {quote:'You must have chaos within you to give birth to a dancing star.',author:'Friedrich Nietzsche'},
    
  ];
  public index:number = 0;
  randomQ: Quotes = this.quotes[0];


  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });

    this.fillRandomArt();
    setInterval(() => {
      if (this.isSlide) this.fillRandomArt();
    }, 15000);

    setInterval(() => {
      this.randomQuote();
    }, 10000);
  }
  getdataServerURL(): string {
    return GlobalVariables.BASE_DATA_SERVER;
  }
  isPageLoading(): boolean {
    return this.isLoading;
  }
  getFetchedArts(): RawImportData<Artdata> {
    return this.displayImage;
  }

  fillRandomArt() {
    this.dataService.getRandomArt<RawImportData<Artdata>>()
      .subscribe(
        (res: RawImportData<Artdata>) => {
          if (res) {
            this.displayImage = res;
            this.isLoading = false;
          }
        },
        // Because of this, DataService is not throwing error.
        err => { throw ("Can't connect to Server.") }
        //err => console.error(err) 
        //err => {throw(err)}
      );
  }

  public async fetchRandomArt(): Promise<RawImportData<Artdata>> {
    const data = await this.dataService.getRandomArt<RawImportData<Artdata>>().toPromise();
    this.isLoading = false;
    console.log(data);
    return data;
  }

  showSlide() {
    
    document.querySelector('#small-slide-show').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.home-item').scrollIntoView({ behavior: 'smooth' });
  }

  randomQuote(){
    this.randomQ  = this.quotes[(this.index++)%this.quotes.length];
  }
}

export class Quotes {
  quote: string;
  author: string;
  constructor(quote:string, author:string) {
    this.quote = quote;
    this.author = author;
  }
}