import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  // { path: 'services', component: ServicesComponent },
  // { path: 'blog', component: BlogComponent },
  // { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
