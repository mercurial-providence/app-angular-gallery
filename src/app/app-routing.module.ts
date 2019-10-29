import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FilterComponent } from './components/filter/filter.component';
import { ArtsComponent } from './components/arts/arts.component';
import { PasteComponent } from './components/plugins/paste/paste.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { ErrorComponent } from './components/error/error.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/info/about/about.component';
import { LegalComponent } from './components/info/legal/legal.component';
import { HelpComponent } from './components/info/help/help.component';
import { NehalComponent } from './components/info/nehal/nehal.component';
import { AuthorsComponent } from './components/gallery/authors/authors.component';
import { FormsComponent } from './components/gallery/forms/forms.component';
import { LocationsComponent } from './components/gallery/locations/locations.component';
import { SchoolsComponent } from './components/gallery/schools/schools.component';
import { TimeframesComponent } from './components/gallery/timeframes/timeframes.component';
import { TypesComponent } from './components/gallery/types/types.component';
import { FilterResolverService } from './resolvers/filter-resolver.service';
import { GFormResolverService } from './resolvers/gform-resolver.service';
import { GAuthorResolverService } from './resolvers/gauthor-resolver.service';
import { GLocationResolverService } from './resolvers/glocation-resolver.service';
import { GSchoolResolverService } from './resolvers/gschool-resolver.service';
import { GTypeResolverService } from './resolvers/gtype-resolver.service';
import { GTimeframeResolverService } from './resolvers/gtimeframe-resolver.service';
import { DataService } from './services/data.service';
import { ErrorhandlerService } from './services/errorhandler.service';
import { SidenavService } from './services/sidenav.service';
import { ArtsResolverService } from './resolvers/arts-resolver.service';
import { ShowcaseResolverService } from './resolvers/showcase-resolver.service';
import { GalleryResolverService } from './resolvers/gallery-resolver.service';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'gallery',
    children: [
      { path: '', component: GalleryComponent, resolve: { gallery: GalleryResolverService } },
      { path: 'authors', component: AuthorsComponent, resolve: { authors: GAuthorResolverService } },
      { path: 'forms', component: FormsComponent, resolve: { forms: GFormResolverService } },
      { path: 'locations', component: LocationsComponent, resolve: { locations: GLocationResolverService } },
      { path: 'schools', component: SchoolsComponent, resolve: { schools: GSchoolResolverService } },
      { path: 'timeframes', component: TimeframesComponent, resolve: { timeframes: GTimeframeResolverService } },
      { path: 'types', component: TypesComponent, resolve: { types: GTypeResolverService }},
    ]
  },
  {
    path: 'arts',
    children: [
      { path: '', component: NotfoundComponent },
      { path: 'author/:id', component: ArtsComponent, data: { name: "author" }, resolve: { arts: ArtsResolverService } },
      { path: 'form/:id', component: ArtsComponent, data: { name: "form" } ,resolve: { arts: ArtsResolverService } },
      { path: 'location/:id', component: ArtsComponent, data: { name: "location" } ,resolve: { arts: ArtsResolverService }},
      { path: 'school/:id', component: ArtsComponent, data: { name: "school" } ,resolve: { arts: ArtsResolverService }},
      { path: 'timeframe/:id', component: ArtsComponent, data: { name: "timeframe" } ,resolve: { arts: ArtsResolverService }},
      { path: 'type/:id', component: ArtsComponent, data: { name: "type" } ,resolve: { arts: ArtsResolverService }},
      { path: 'showcase/:id', component: ShowcaseComponent, resolve: { arts: ShowcaseResolverService } },
    ]
  },
  { path: 'filter', component: FilterComponent, resolve: { tableData: FilterResolverService } },
  { path: 'error', component: ErrorComponent },
  { path: 'paste', component: PasteComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'info',
    children: [
      { path: '', component: NotfoundComponent },
      { path: 'about', component: AboutComponent, data: { name: "about" } },
      { path: 'help', component: HelpComponent, data: { name: "help" } },
      { path: 'legal', component: LegalComponent, data: { name: "legal" } },
      { path: 'nehal', component: NehalComponent, data: { name: "nehal" } }
    ]
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: [
    DataService,
    ErrorhandlerService,
    SidenavService,
    FilterResolverService,
    GFormResolverService,
    GAuthorResolverService,
    GTypeResolverService,
    GTimeframeResolverService,
    GSchoolResolverService,
    GLocationResolverService,
    ArtsResolverService,
    ShowcaseResolverService]
})
export class AppRoutingModule { }

