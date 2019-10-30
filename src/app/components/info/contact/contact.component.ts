import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactInfo: ContactInfo = new ContactInfo();

  constructor(private dataService: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    smoothscroll.polyfill();
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
  }

  summonTheDemon() {
    if (!this.contactInfo.value.trim()) {
      this._snackBar.open("Invalid Message.", "Ok", {
        duration: 2000,
      });
    }else if(!this.contactInfo.name.trim()){
      this._snackBar.open("Invalid Name.", "Ok", {
        duration: 2000,
      });
    }
    this.contactInfo.send(this.dataService, this._snackBar);
  }
}

export class ContactInfo {
  public category: string;
  public value: string;
  public name:string;
  constructor() {
    this.category = 'message';
    this.value = '';
    this.name='';
  }
  public send(dataService: DataService, _snackBar: MatSnackBar) {
    if (!!this.value.trim()&&!!this.name.trim()) {
      dataService.putLog(this.category, encodeURI(this.value.toString()));
      this.flush();
      _snackBar.open("Message Delivered.", "Ok", {
        duration: 5000,
      });
    }

  }
  public flush(){
    this.value='';
    this.category='message';
    this.name='';
  }
}