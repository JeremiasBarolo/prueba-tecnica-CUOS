// cards.component.ts
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
  filteredData: any[] = [];
  searchTerm: string = '';

  ngOnInit() {    
    this.totalItems = this.dataSources.length;
    this.updateFilteredData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSources']) {
      this.totalItems = this.dataSources.length;
      this.updateFilteredData();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchTerm = input.value.toLowerCase();
      this.updateFilteredData();
    }
  }

  private updateFilteredData() {
    if (this.searchTerm) {
      this.filteredData = this.dataSources.filter(data =>
        data.name.toLowerCase().includes(this.searchTerm) ||
        data.species.toLowerCase().includes(this.searchTerm) ||
        (data.description && data.description.toLowerCase().includes(this.searchTerm))
      );
    } else {
      this.filteredData = [...this.dataSources];
    }
    this.totalItems = this.filteredData.length; // Actualizar el totalItems
    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }
}
