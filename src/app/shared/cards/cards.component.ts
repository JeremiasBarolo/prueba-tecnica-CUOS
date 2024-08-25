import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnChanges, OnInit {
  

  
  @Input() dataSources: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() response: boolean = true;

  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
  paginatedData: any[] = [];

  ngOnInit() {    
    this.totalItems = this.dataSources.length;
    this.updatePaginatedData();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSources']) {
      this.totalItems = this.dataSources.length;
      this.updatePaginatedData();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.dataSources.slice(startIndex, endIndex);
  }

}
