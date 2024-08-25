import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css']
})
export class CardsViewComponent {
  data: any[] = [];  
  isLoading: boolean = true;
  personajesService: any;
  characters: any[] = [];
  response: boolean = true
  private destroy$ = new Subject<void>();


  constructor(private marvelService: PersonajesService) {}


    ngOnInit(): void {
    this.marvelService.getAllCharacters().pipe(takeUntil(this.destroy$)).subscribe((response: any[]) => {
        this.characters = response;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
        this.isLoading = false;
        this.response = false
        
      }
    );

  
   }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

 