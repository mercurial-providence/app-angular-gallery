import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  arts: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  clickfunction(){
  	this.data.getData().subscribe(data=>{
  		this.arts=data;
  		console.log(this.arts);
  	});
  } 
}
