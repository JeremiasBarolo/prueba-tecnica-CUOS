import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { CardsViewComponent } from './cards-view/cards-view.component';




const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'cards', component: CardsViewComponent },
      { path: '**', redirectTo: '' },
    
    ]

  }

    


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
