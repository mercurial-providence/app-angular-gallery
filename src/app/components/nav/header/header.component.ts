import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { NavComponent } from '../nav.component';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  appTitle:string = "";

  ngOnInit() {
    this.appTitle = GlobalVariables.APP_TITLE;
  }
  toggleDrawer(){
    this.sidenavService.toggle();
  }

  public loading:boolean = false;
  constructor(router:Router,private sidenavService: SidenavService) {
    router.events.subscribe(event => {

      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:{
          this.loading = false;
          break;
        }
        default: break;
          
      }
    }
  )};
}
