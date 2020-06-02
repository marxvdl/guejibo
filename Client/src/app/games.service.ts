import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { GlobalConstants } from './common/global-constants';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Game {
  id: number,
  name: string
}

export interface NewGameRoomAsGuest {
  success: boolean
  id: number,
  game: Game,
  code: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  public getGamesList(): Observable<Game[]> {
    return <Observable<Game[]>>this.http.get(environment.apiUrl + 'api/games');
  }

  public getGame(id: number): Observable<Game> {
    return <Observable<Game>>this.http.get(environment.apiUrl + 'api/game/' + id);
  }

  public getNewGameRoomAsGuest(gameId: number): Observable<NewGameRoomAsGuest> {
    return <Observable<NewGameRoomAsGuest>>this.http.post(
      environment.apiUrl + 'api/guest/gameroom',
      { gameid: gameId }
    );
  }

}
