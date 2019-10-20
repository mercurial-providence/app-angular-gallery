import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  private currURL:string = "";
  public quote:Quotes;
  constructor(private router: Router, private http:HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.quote={
      content:'',
      author:''
    };
    this.currURL=this.router.url;
    this.http.get<Quotes>('https://api.quotable.io/random').subscribe((res: Quotes) => {
      this.quote = res;
    });
    this.dataService.putLog('404', this.currURL.toString());
  }

}
export interface Quotes {
  content: string;
  author: string;
};