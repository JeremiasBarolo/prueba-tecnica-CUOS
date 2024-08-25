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

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSourceMat.data = this.dataSource;
    this.applyFilter(); 
  }

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
    this.dataSourceMat.sort = this.sort;
    this.applyFilter(); 
  }

  ngOnChanges() {
    
    this.dataSourceMat.data = this.dataSource;
    this.applyFilter(); 
    this.dataSourceMat.paginator?.firstPage(); 
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim().toLowerCase();
    this.applyFilter();
  }

  private applyFilter() {
    this.dataSourceMat.filterPredicate = (data: any, filter: string) => {
      const dataStr = (data.name || '').toLowerCase() +
                      (data.species || '').toLowerCase() +
                      (data.description || '').toLowerCase();
      return dataStr.includes(filter);
    };
    this.dataSourceMat.filter = this.searchTerm.trim().toLowerCase();
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
