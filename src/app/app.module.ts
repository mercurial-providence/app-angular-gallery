import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AboutComponent } from './components/info/about/about.component';
import { HelpComponent } from './components/info/help/help.component';
import { LegalComponent } from './components/info/legal/legal.component';
import { MaterialModule } from './modules/material/material.module';
import { NehalComponent } from './components/info/nehal/nehal.component';
import { FormsComponent } from './components/gallery/forms/forms.component';
import { TypesComponent } from './components/gallery/types/types.component';
import { SchoolsComponent } from './components/gallery/schools/schools.component';
import { AuthorsComponent } from './components/gallery/authors/authors.component';
import { LocationsComponent } from './components/gallery/locations/locations.component';
import { TimeframesComponent } from './components/gallery/timeframes/timeframes.component';
import { ScrollingModule} from '@angular/cdk/scrolling';


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
    AboutComponent,
    HelpComponent,
    LegalComponent,
    NehalComponent,
    FormsComponent,
    TypesComponent,
    SchoolsComponent,
    AuthorsComponent,
    LocationsComponent,
    TimeframesComponent,
    
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
    FormsModule,
    ScrollingModule
  ],
  providers: [DataService, SidenavService, { provide: ErrorHandler, useClass: ErrorhandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
