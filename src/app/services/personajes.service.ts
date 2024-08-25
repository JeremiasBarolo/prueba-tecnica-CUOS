import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private baseUrl = 'https://gateway.marvel.com:443/v1/public';
  private publicKey = '966b885b7fc91f8befa0089fe63e98ff';
  private privateKey = '7b6dbb682995efa3d8288f496f3bb0bb82c1ce7f';

  constructor(private http: HttpClient) {}

  
  getCharacters(limit: number = 10): Observable<any> {
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + this.privateKey + this.publicKey); 

    const params = new HttpParams()
      .set('apikey', this.publicKey)
      .set('ts', timestamp)
      .set('hash', hash)
      .set('limit', limit.toString());

    return this.http.get(`${this.baseUrl}/characters`, { params });
  }


  getCharacterImages(limit: number = 10): Observable<any> {
    return this.getCharacters(limit).pipe(
      map(response => {
        
        return response.data.results.map((character: any) => ({
          id: character.id,
          name: character.name,
          description: character.description,
          thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`
        }));
      })
    );
  }
}
