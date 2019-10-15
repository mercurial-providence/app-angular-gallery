import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FilterComponent } from './components/filter/filter.component';
import { ArtsComponent } from './components/arts/arts.component';
import { PasteComponent } from './components/paste/paste.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { ErrorComponent } from './components/error/error.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/home', pathMatch: 'full'},
  { path: 'gallery', component: GalleryComponent },
  { path: 'arts', 
    children: [
      { path: '', component: ArtsComponent, data :{ name:"all" } },
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
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

