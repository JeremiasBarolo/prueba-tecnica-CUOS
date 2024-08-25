import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    
  },
 

  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },

  {
    path: '404',
    component: PageNotFoundComponent,
  },
  

  { path: '**', redirectTo: '404' }, 
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [], 
  exports: [RouterModule],
})

export class AppRoutingModule { }
