import { Injectable } from '@angular/core';
import { Game, GamesService } from './games.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Handles access to the information present in files in the 'meta' directory in each game.
 */
@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  constructor(
    private http: HttpClient
  ) { }

  public getDescription(game: Game): Observable<string> {
    return <Observable<string>>this.http.get(
      environment.gamesPath + game.path + '/meta/desc.html',
      { responseType: 'text' as 'json' }
    );
  }

  public getCredits(game: Game): Observable<string> {
    return <Observable<string>>this.http.get(
      environment.gamesPath + game.path + '/meta/credits.html',
      { responseType: 'text' as 'json' }
    );
  }

  public getBackgroundUrl(game: Game): string {
    return GamesService.getGameUrl(game) + 'meta/background.png'
  }

  public getBannerUrl(game: Game): string {
    return GamesService.getGameUrl(game) + 'meta/banner.png'
  }

  public getScreenshotUrl(game: Game): string {
    return GamesService.getGameUrl(game) + 'meta/screenshot.jpg'
  }

}
