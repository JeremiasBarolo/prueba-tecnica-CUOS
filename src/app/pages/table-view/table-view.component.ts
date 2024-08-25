import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  data: any[] = [];  
  isLoading: boolean = true;
  columnLabels = {
    name: 'Nombre',
    image: 'Imagen',
    species: 'Especie',
    status: 'Estado'
  };
  private destroy$ = new Subject<void>();
  

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    
    this.personajesService.getAllCharacters().pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}