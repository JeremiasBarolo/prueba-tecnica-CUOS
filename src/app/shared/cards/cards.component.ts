import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnChanges, OnInit {
  @Input() dataSources: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() response: boolean = true;

  statusOptions: string[] = ['Mostrar todos'];
  speciesOptions: string[] = ['Mostrar todos'];

  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
  paginatedData: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedSpecies: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {    
    this.totalItems = this.dataSources.length;
    this.updateOptions();
    this.updateFilteredData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSources']) {
      this.totalItems = this.dataSources.length;
      this.updateOptions();
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

  onStatusChange(status: string) {
    this.selectedStatus = status === 'Mostrar todos' ? '' : status;
    this.updateFilteredData();
  }

  onSpeciesChange(species: string) {
    this.selectedSpecies = species === 'Mostrar todos' ? '' : species;
    this.updateFilteredData();
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

  private updateOptions() {
    const statusSet = new Set<string>();
    const speciesSet = new Set<string>();

    this.dataSources.forEach(item => {
      if (item.status) statusSet.add(item.status);
      if (item.species) speciesSet.add(item.species);
    });

    this.statusOptions = ['Mostrar todos', ...Array.from(statusSet)];
    this.speciesOptions = ['Mostrar todos', ...Array.from(speciesSet)];
  }

  showData(data: any): void {
    this.dialog.open(DetailsComponent, {
      data: data
    });
  }
}
