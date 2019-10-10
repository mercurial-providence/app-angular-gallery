import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FilterComponent } from './components/filter/filter.component';
import { ArtsComponent } from './components/arts/arts.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/home', pathMatch: 'full'},
  { path: 'gallery', component: GalleryComponent },
  { path: 'arts', component: ArtsComponent },
  { path: 'filter', component: FilterComponent },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

