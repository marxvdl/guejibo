import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  getGames() {
    return ['Code Clicker', 'Jogo da Nave', 'Stub', 'Jogo 4', 'Jogo 5'];
  }
}
