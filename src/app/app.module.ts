import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FilterComponent } from './components/filter/filter.component';
import { ArtsComponent } from './components/arts/arts.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { PasteComponent } from './components/plugins/paste/paste.component';
import { ImageViewerModule } from 'ng2-image-viewer';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { HeaderComponent } from './components/nav/header/header.component';
import { DataService } from './services/data.service';
import { SidenavService } from './services/sidenav.service';
import { SpinnerComponent } from './components/plugins/spinner/spinner.component';
import { ErrorhandlerService } from './services/errorhandler.service';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    NotfoundComponent,
    NavComponent,
    FilterComponent,
    ArtsComponent,
    PasteComponent,
    ShowcaseComponent,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    ErrorComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NgxMasonryModule,
    ImageViewerModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DataService , SidenavService, {provide: ErrorHandler, useClass: ErrorhandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
