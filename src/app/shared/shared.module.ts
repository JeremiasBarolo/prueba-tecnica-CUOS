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

@NgModule({
  declarations: [
    TableComponent,
    CardsComponent,
    SpinnerComponent,
    NoResponseComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule
  ],

  exports: [
    TableComponent,
    CardsComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
