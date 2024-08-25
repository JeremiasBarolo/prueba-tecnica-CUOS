import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { CardsComponent } from './cards/cards.component'
import {MatCardModule} from '@angular/material/card';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NoResponseComponent } from './no-response/no-response.component'
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { DetailsComponent } from './details/details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { GoBackButtonComponent } from './go-back-button/go-back-button.component';
import { EmpecemosButtonComponent } from './empecemos-button/empecemos-button.component';
import { DetailEpisodeComponent } from './detail-episode/detail-episode.component';
import { CardEpisodeComponent } from './card-episode/card-episode.component';


@NgModule({
  declarations: [
    TableComponent,
    CardsComponent,
    SpinnerComponent,
    NoResponseComponent,
    DetailsComponent,
    PageNotFoundComponent,
    MenuButtonComponent,
    GoBackButtonComponent,
    EmpecemosButtonComponent,
    DetailEpisodeComponent,
    CardEpisodeComponent,


  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule
  ],

  exports: [
    TableComponent,
    CardsComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    MenuButtonComponent,
    GoBackButtonComponent,
    EmpecemosButtonComponent,
    DetailEpisodeComponent,
    CardEpisodeComponent,

  ]
})
export class SharedModule { }
