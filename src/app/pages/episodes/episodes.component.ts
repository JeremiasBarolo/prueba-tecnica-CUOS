import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {
  data: any[] = [];  
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(private personajesService: PersonajesService) {}

  ngOnInit(): void {
    this.personajesService.getAllEpisodes().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
        console.log(data);
        
      },
      (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
