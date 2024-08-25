import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CardsViewComponent } from './cards-view/cards-view.component';
import { TableViewComponent } from './table-view/table-view.component'
import {MatMenuModule} from '@angular/material/menu';
import { EpisodesComponent } from './episodes/episodes.component';



@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    CardsViewComponent,
    TableViewComponent,
    EpisodesComponent,
    


  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule
    
    
    
  ]
})
export class PagesModule { }
