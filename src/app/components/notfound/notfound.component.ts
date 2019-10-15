import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  currURL:string = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.currURL=this.router.url;
  }

}
