import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { CardsViewComponent } from './cards-view/cards-view.component';
import { TableViewComponent } from './table-view/table-view.component';
import { EpisodesComponent } from './episodes/episodes.component';




const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'cards-view', component: CardsViewComponent },
      { path: 'table-view', component: TableViewComponent },
      { path: 'episodes', component: EpisodesComponent },
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
