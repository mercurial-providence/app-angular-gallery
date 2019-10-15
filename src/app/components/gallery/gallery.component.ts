import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Author } from 'src/app/models/author';
import { Form } from 'src/app/models/form';
import { Location } from 'src/app/models/location';
import { School } from 'src/app/models/school';
import { Timeframe } from 'src/app/models/timeframe';
import { Type } from 'src/app/models/type';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../nav/header/header.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private data: DataService, private titleService: Title) { }
  ngOnInit() {
    /* this.titleService.setTitle( "Gallery" ); */
  }
}
