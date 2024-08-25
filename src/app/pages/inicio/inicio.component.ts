import { Component } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  data: any[] = [];  
  isLoading: boolean = true;
  personajesService: any;
  

  constructor(private marvelService: PersonajesService) {}

  ngOnInit(): void {
    
    this.marvelService.getCharacters().subscribe({
      next: (response) => {
        this.data = response.data.results;  
        this.isLoading = false;
        console.log(this.data);
          
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.isLoading = false;  
      }
    });


  }

  
}
