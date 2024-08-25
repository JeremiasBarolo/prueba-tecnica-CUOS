import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, concatMap, forkJoin, map, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/character/${id}`);
  }

  getEpisodes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/episode`);
  }

  getEpisode(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/episode/${id}`);
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/location`);
  }

  getLocation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/location/${id}`);
  }

  getCharacters(page: number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/character?page=${page}`).pipe(
      map(response => response.results)
    );
  }

  getAllCharacters(): any {
    return this.getCharacters(1).pipe(
      concatMap(firstPage => {
        const totalPages = 42;
        const pageRequests = [];
        
        for (let page = 2; page <= totalPages; page++) {
          pageRequests.push(this.getCharacters(page));
        }
        
        return forkJoin(pageRequests).pipe(
          map(pages => [firstPage, ...pages].flat())
        );
      }),
      catchError(error => {
        console.error('Error fetching characters:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
}
