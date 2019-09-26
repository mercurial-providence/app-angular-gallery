import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Type } from 'src/app/models/type';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  dataSource: MatTableDataSource<Type>;
  constructor(private data: DataService) { }
  displayedColumns: string[] = ['ID', 'TYPE'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clickfunction();
  }
  clickfunction(){
   	this.data.getData().subscribe((data: TypeData)=>{
      this.dataSource.data=data.records;
      console.log(this.dataSource);
    }); 
  } 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
 export class TypeData{
    records: Type[];
    pagination: {
      count: string;
      page: string;
      limit: string;
      totalpages: string;
    }

 }