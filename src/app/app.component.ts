import { Component, HostListener, ElementRef } from '@angular/core';

import { Router,NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {

  isShow: boolean;
  topPosToStartShowing = 100;
  goToTop(){
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
  }
}
