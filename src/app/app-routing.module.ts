import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlareComponent } from './flare/flare.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { PrimaryLayoutComponent } from './layout/primary-layout/primary-layout.component';
import { ItemResolverService } from './services/item-resolver.service';

const routes: Routes = [
  {
    path: '', component: PrimaryLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent,
        resolve:
        {
          ItemResolverService
        }
      }
    ]
  },
  { path: 'flare', component: FlareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ItemResolverService
  ]
})
export class AppRoutingModule { }
