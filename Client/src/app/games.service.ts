import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  getGames() : Observable<any> {
    return of(['Code Clicker', 'Jogo da Nave', 'Stub', 'Jogo 4', 'Jogo 5']);
  }
}
