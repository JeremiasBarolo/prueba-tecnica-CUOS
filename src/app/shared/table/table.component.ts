import { Component, Input, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() isLoading: boolean = true;
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  paginatedData: any[] = []


  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.totalItems = this.dataSource.length;
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
    this.paginatedData = this.dataSource.slice(startIndex, endIndex);
  }
}
