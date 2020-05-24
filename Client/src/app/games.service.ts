import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { GlobalConstants } from './common/global-constants';
import { HttpClient } from '@angular/common/http';

export interface Game {
  id: number,
  name: string
}

export interface NewGameRoomGuest {
  id: number,
  game: {
    id: number,
    name: string
  },
  code: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  public getGamesList(): Observable<Game[]> {
    return <Observable<Game[]>>this.http.get(GlobalConstants.BASEURL + 'api/games');
  }

  public getGame(id: number): Observable<Game> {
    return <Observable<Game>>this.http.get(GlobalConstants.BASEURL + 'api/game/' + id);
  }

  public getNewGameRoomGuest(gameId: number): Observable<NewGameRoomGuest> {
    return <Observable<NewGameRoomGuest>>this.http.post(
      GlobalConstants.BASEURL + 'api/guest/gameroom',
      { gameid: gameId }
    );
  }

}
