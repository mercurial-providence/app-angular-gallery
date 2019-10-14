import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavComponent } from '../nav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appTitle:string = "";
  constructor() { }

  ngOnInit() {
    this.appTitle = AppComponent.appTitle();    
  }

}
