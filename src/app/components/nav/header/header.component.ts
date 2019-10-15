import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavComponent } from '../nav.component';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  appTitle:string = "";
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.appTitle = AppComponent.appTitle();
  }
  toggleDrawer(){
    this.sidenavService.toggle();
  }
}
