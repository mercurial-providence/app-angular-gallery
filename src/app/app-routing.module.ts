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



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'gallery', component: GalleryComponent },
  { path: 'arts', 
    children: [
      { path: '', component: NotfoundComponent},
      { path: 'author/:id', component: ArtsComponent, data :{ name:"author" }},
      { path: 'form/:id', component: ArtsComponent, data :{ name:"form" } },
      { path: 'location/:id', component: ArtsComponent, data :{ name:"location" } },
      { path: 'school/:id', component: ArtsComponent, data :{ name:"school" } },
      { path: 'timeframe/:id', component: ArtsComponent, data :{ name:"timeframe" } },
      { path: 'type/:id', component: ArtsComponent, data :{ name:"type" } },
      { path: 'showcase/:id', component: ShowcaseComponent },
    ]
  },
  { path: 'filter', component: FilterComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'paste', component: PasteComponent },
  { path: 'search', component: SearchComponent },
  { path: 'info', 
    children: [
      { path: '', component: NotfoundComponent},
      { path: 'about', component: AboutComponent, data :{ name:"about" }},
      { path: 'help', component: HelpComponent, data :{ name:"help" } },
      { path: 'legal', component: LegalComponent, data :{ name:"legal" } },
      { path: 'nehal', component: NehalComponent, data :{ name:"nehal" } }
    ]
  },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

