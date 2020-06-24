import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface Game {
  id: number,
  name: string,
  path: string
}

export interface GameRoom {
  success: boolean
  id: number,
  game: Game,
  code: string,
  token?: string
}
/**
 * Handles communication with the backend API that deals with games and game rooms.
 */
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getGamesList(): Observable<Game[]> {
    return <Observable<Game[]>>this.http.get(environment.apiUrl + 'api/games');
  }

  public getGame(id: number): Observable<Game> {
    return <Observable<Game>>this.http.get(environment.apiUrl + 'api/game/' + id);
  }

  public getNewGameRoom(gameId: number): Observable<GameRoom> {

    return <Observable<GameRoom>>(
      this.authService.isLoggedIn() ?
        this.http.post(
          environment.apiUrl + 'api/gameroom',
          { gameid: gameId },
          { headers: this.authService.getAuthHeaders() }
        )
        :
        this.http.post(
          environment.apiUrl + 'api/guest/gameroom',
          { gameid: gameId }
        )
    );

  }

  public static getGameUrl(game: Game): string {
    return environment.gamesPath + game.path + '/';
  }

}
