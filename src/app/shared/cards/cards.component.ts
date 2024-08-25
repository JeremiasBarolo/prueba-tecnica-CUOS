import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  

  
  @Input() dataSources: any[] = [];
  @Input() isLoading: boolean = true;

  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  paginatedData: any[] = [];

  ngOnInit() {
    this.totalItems = this.dataSources.length;
    this.updatePaginatedData();
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
