import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-card class="mat-spinner">
      <!-- <mat-progress-spinner 
        color="primary" 
        mode="indeterminate">
      </mat-progress-spinner> -->
      <mat-card-title><h5>We're fetching details, Please wait!</h5></mat-card-title>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      <!-- <mat-progress-bar mode="buffer"></mat-progress-bar> -->

    </mat-card>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
