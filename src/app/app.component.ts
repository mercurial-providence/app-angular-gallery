import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  static title: string= 'Mercurial Gallery of Art';
  static appTitle(): string {
    return this.title;
  }

}
