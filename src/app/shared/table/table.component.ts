import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() columnLabels: { [key: string]: string } = {}; 

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  totalItems: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;
  paginatedData = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.paginatedData.data = this.dataSource;
    this.totalItems = this.dataSource.length;
  }

  ngAfterViewInit() {
    this.paginatedData.paginator = this.paginator;
    this.paginatedData.sort = this.sort;
  }

  onPageChange(event: PageEvent) {
    
    this.paginatedData.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginatedData.filter = filterValue.trim().toLowerCase();

    if (this.paginatedData.paginator) {
      this.paginatedData.paginator.firstPage();
    }
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
}
