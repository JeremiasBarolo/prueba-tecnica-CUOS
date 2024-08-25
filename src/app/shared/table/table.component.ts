import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class TableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() columnLabels: { [key: string]: string } = {}; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSourceMat = new MatTableDataSource<any>([]);
  searchTerm: string = '';
  pageSize: number = 20;

  statusOptions: string[] = [];
  speciesOptions: string[] = [];
  selectedStatus: string | null = null;
  selectedSpecies: string | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSourceMat.data = this.dataSource;
    this.extractFilterOptions();
    this.applyFilter(); 
  }

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
    this.dataSourceMat.sort = this.sort;
    this.applyFilter(); 
  }

  ngOnChanges() {
    this.dataSourceMat.data = this.dataSource;
    this.extractFilterOptions();
    this.applyFilter(); 
    this.dataSourceMat.paginator?.firstPage(); 
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim().toLowerCase();
    this.applyFilter();
  }

  onStatusChange(selectedStatus: string) {
    this.selectedStatus = selectedStatus;
    this.applyFilter();
  }

  onSpeciesChange(selectedSpecies: string) {
    this.selectedSpecies = selectedSpecies;
    this.applyFilter();
  }

  private applyFilter() {
    this.dataSourceMat.filterPredicate = (data: any, filter: string) => {
      const dataStr = (data.name || '').toLowerCase() +
                      (data.species || '').toLowerCase() +
                      (data.description || '').toLowerCase();
      const matchSearch = dataStr.includes(this.searchTerm.trim().toLowerCase());

      const matchStatus = this.selectedStatus ? data.status.toLowerCase() === this.selectedStatus.toLowerCase() : true;
      const matchSpecies = this.selectedSpecies ? data.species.toLowerCase() === this.selectedSpecies.toLowerCase() : true;

      return matchSearch && matchStatus && matchSpecies;
    };
    this.dataSourceMat.filter = ''; 
  }

  private extractFilterOptions() {
    const statuses = new Set<string>();
    const species = new Set<string>();

    this.dataSource.forEach(item => {
      if (item.status) statuses.add(item.status);
      if (item.species) species.add(item.species);
    });

    this.statusOptions = Array.from(statuses);
    this.speciesOptions = Array.from(species);
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
