import { Component, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailEpisodeComponent } from '../detail-episode/detail-episode.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-episode',
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.css']
})
export class CardEpisodeComponent {
  @Input() dataSources: any[] = [];
  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
  paginatedData: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedSpecies: string = '';

  constructor(public dialog: MatDialog) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSources']) {
      this.totalItems = this.dataSources.length;
      this.updateFilteredData();
    }
  }

  showData(data: any): void {
    this.dialog.open(DetailEpisodeComponent, {
      data: data
    });
  }


  private updateFilteredData() {
    this.filteredData = this.dataSources.filter(data => {
      const matchesSearch = !this.searchTerm || 
        data.name.toLowerCase().includes(this.searchTerm) ||
        data.species.toLowerCase().includes(this.searchTerm) ||
        (data.description && data.description.toLowerCase().includes(this.searchTerm));
      const matchesStatus = !this.selectedStatus || data.status === this.selectedStatus;
      const matchesSpecies = !this.selectedSpecies || data.species === this.selectedSpecies;

      return matchesSearch && matchesStatus && matchesSpecies;
    });

    this.totalItems = this.filteredData.length;
    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  
}
