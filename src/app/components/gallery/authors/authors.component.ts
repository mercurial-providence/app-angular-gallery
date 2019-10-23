import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { fadeIn } from '../../plugins/animations/animations';
import { RawImportData } from 'src/app/models/common/raw-import-data';
import { Author } from 'src/app/models/author';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GlobalVariables } from 'src/app/utils/globalvars';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class AuthorsComponent implements OnInit {
  private authors: RawImportData<Author> = new RawImportData();
  private auLoaded:boolean = false;
  private alphabets:string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  private activatedAlpha:string = this.alphabets[0];                                
  private pagesize:string = GlobalVariables.ARTS_PAGE_SIZE.toString();

  constructor(private data: DataService,  private aRoute: ActivatedRoute) { }


  ngOnInit() {
    //this.populateAuthor("a", "", "1", this.pagesize);
    this.aRoute.data
      .subscribe(data => {
        this.authors = data.authors;
        this.activatedAlpha='a';
        this.auLoaded=true;
    });

  }

  populateAuthor(ele:string, id:any, page:any, limit:any){
    this.activatedAlpha=ele;
    this.data.getInfoAPI<RawImportData<Author>>(ele?'author/'+ele:'author', id.toString(), page.toString(), limit.toString())
    .subscribe(
     (data: RawImportData<Author>)=>{
       this.authors=data;
       this.auLoaded=true;
     } ,
        // Because of this, DataService is not throwing error.
        err => {throw("Can't connect to Server.")}
        //err => console.error(err) 
        //err => {throw(err)}
     ); 
 } 

 getAlphabets():string[]{
  return this.alphabets;
}
getAuthors(){
  return this.authors.records.filter((item) => +item.COUNT != 0);
 }
 getActivatedAlpha():string{
  return this.activatedAlpha;
}

getPaginatorData():string{
  var marker = (+this.authors.pagination.page-1)*+this.pagesize;
  return (marker+1)+" - "+(marker+(this.authors.records.length))+" of "+(+this.authors.pagination.count);
}
 reqAuthorbyAlpha(alpha:string){
  this.populateAuthor(alpha, '', '1', this.pagesize);
 }
 reqPrevPageAuthor(){
  this.populateAuthor(this.activatedAlpha, '', +this.authors.pagination.page -1, this.pagesize)
 }
 reqNextPageAuthor(){
  this.populateAuthor(this.activatedAlpha, '', +this.authors.pagination.page +1, this.pagesize)
 }

 isFirstPageAuthor():boolean{
  return +this.authors.pagination.page==1;
 }
 isLastPageAuthor():boolean{
  return +this.authors.pagination.page==+this.authors.pagination.totalpages;
 }
isAuthorLoaded():boolean{
 return this.auLoaded;
}
}
