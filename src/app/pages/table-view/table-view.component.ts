import { Component } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  data: any[] = [];  
  isLoading: boolean = true;

  

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    
    this.personajesService.getAllCharacters().subscribe({
      next: (response: any[]) => {
        this.data = response;  
        this.isLoading = false;
        console.log(response);
          
      },
      error: (err: any) => {
        console.error('Error fetching data', err);
        this.isLoading = false;  
      }
    });


  }
}