import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    
  },
 

  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  

  { path: '**', redirectTo: 'inicio' }, 
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
