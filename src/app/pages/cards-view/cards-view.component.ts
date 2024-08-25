import { Component } from '@angular/core';
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


  constructor(private marvelService: PersonajesService) {}


    ngOnInit(): void {
  //   this.marvelService.getCharacterImages(10).subscribe((response) => {
  //     console.log(response);
      
  //     this.characters = response;  
  //     this.isLoading = false;
      
  //   });

      this.characters = [
        {
            "id": 1011334,
            "name": "3-D Man",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
        },
        {
            "id": 1017100,
            "name": "A-Bomb (HAS)",
            "description": "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg"
        },
        {
            "id": 1009144,
            "name": "A.I.M.",
            "description": "AIM is a terrorist organization bent on destroying the world.",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec.jpg"
        },
        {
            "id": 1010699,
            "name": "Aaron Stack",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        },
        {
            "id": 1009146,
            "name": "Abomination (Emil Blonsky)",
            "description": "Formerly known as Emil Blonsky, a spy of Soviet Yugoslavian origin working for the KGB, the Abomination gained his powers after receiving a dose of gamma radiation similar to that which transformed Bruce Banner into the incredible Hulk.",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg"
        },
        {
            "id": 1016823,
            "name": "Abomination (Ultimate)",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        },
        {
            "id": 1009148,
            "name": "Absorbing Man",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/1/b0/5269678709fb7.jpg"
        },
        {
            "id": 1009149,
            "name": "Abyss",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"
        },
        {
            "id": 1010903,
            "name": "Abyss (Age of Apocalypse)",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/80/4c00358ec7548.jpg"
        },
        {
            "id": 1011266,
            "name": "Adam Destine",
            "description": "",
            "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        }
    ]

    this.isLoading = false
   }
}
