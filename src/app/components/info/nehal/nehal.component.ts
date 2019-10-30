import { Component, OnInit } from '@angular/core';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-nehal',
  templateUrl: './nehal.component.html',
  styleUrls: ['./nehal.component.scss']
})
export class NehalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
  }

}
