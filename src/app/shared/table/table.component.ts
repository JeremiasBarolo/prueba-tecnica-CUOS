import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() columnLabels: { [key: string]: string } = {}; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSourceMat = new MatTableDataSource<any>([]);
  searchTerm: string = '';
  pageSize: number = 20;
  currentPage: number = 0;

  statusOptions: string[] = ['Mostrar todos'];
  speciesOptions: string[] = ['Mostrar todos'];
  selectedStatus: string | null = null;
  selectedSpecies: string | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.updateOptions();
    this.updateFilteredData();
  }

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
    this.dataSourceMat.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.updateOptions();
      this.updateFilteredData();
    }
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchTerm = input.value.toLowerCase();
      this.updateFilteredData();
    }
  }

  onStatusChange(status: string) {
    this.selectedStatus = status === 'Mostrar todos' ? null : status;
    this.updateFilteredData();
  }

  onSpeciesChange(species: string) {
    this.selectedSpecies = species === 'Mostrar todos' ? null : species;
    this.updateFilteredData();
  }

  private updateFilteredData() {
    const filteredData = this.dataSource.filter(data => {
      const matchesSearch = !this.searchTerm || 
        data.name.toLowerCase().includes(this.searchTerm) ||
        data.species.toLowerCase().includes(this.searchTerm) ||
        (data.description && data.description.toLowerCase().includes(this.searchTerm));
      const matchesStatus = !this.selectedStatus || data.status === this.selectedStatus;
      const matchesSpecies = !this.selectedSpecies || data.species === this.selectedSpecies;

      return matchesSearch && matchesStatus && matchesSpecies;
    });

    this.dataSourceMat.data = filteredData;
    this.dataSourceMat.paginator?.firstPage(); 
  }

  private updateOptions() {
    const statusSet = new Set<string>();
    const speciesSet = new Set<string>();

    this.dataSource.forEach(item => {
      if (item.status) statusSet.add(item.status);
      if (item.species) speciesSet.add(item.species);
    });

    this.statusOptions = ['Mostrar todos', ...Array.from(statusSet)];
    this.speciesOptions = ['Mostrar todos', ...Array.from(speciesSet)];
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      case 'unknown':
      default:
        return 'status-unknown';
    }
  }

  showData(data: any): void {
    this.dialog.open(DetailsComponent, {
      data: data
    });
  }
}
