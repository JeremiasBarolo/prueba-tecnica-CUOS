import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonajesService } from 'src/app/services/personajes.service';
import { DetailsComponent } from '../details/details.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-episode',
  templateUrl: './detail-episode.component.html',
  styleUrls: ['./detail-episode.component.css']
})
export class DetailEpisodeComponent  {
  
  characters: any[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personajesService: PersonajesService
  ) {
    this.loadCharacterDetails();
  }

  loadCharacterDetails() {
    if (this.data.characters && this.data.characters.length > 0) {
      this.personajesService.getCharacterDetails(this.data.characters).pipe(takeUntil(this.destroy$)).subscribe(
        (characters:any) => {
          this.characters = characters;
          this.isLoading = false;
        },
        (error:any) => {
          console.error('Error fetching character details', error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
