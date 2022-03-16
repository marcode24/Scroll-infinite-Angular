import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<ICharacter[]> {
    const url = `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`;
    return this.http.get<ICharacter[]>(url);
  }
}
