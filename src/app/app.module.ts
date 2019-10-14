import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { PasteComponent } from './components/paste/paste.component';
import { ImageViewerModule } from 'ng2-image-viewer';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { HeaderComponent } from './components/nav/header/header.component';
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
    HeaderComponent
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
    ImageViewerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
