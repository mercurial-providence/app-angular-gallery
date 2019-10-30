import { Component, OnInit } from '@angular/core';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
  }

}
