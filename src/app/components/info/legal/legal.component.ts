import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  getDomainAddress():string{
    return this.dataService.domainAddress;
  }
}
