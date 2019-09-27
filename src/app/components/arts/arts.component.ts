import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss']
})
export class ArtsComponent implements OnInit {

  artHandler:any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	this.artHandler = this.dataService.artHandler;
  	console.log(this.artHandler);
  }

}
