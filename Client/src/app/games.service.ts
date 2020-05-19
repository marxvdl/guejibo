import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { GlobalConstants } from './common/global-constants';

export interface Game {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  public getGamesList(): Observable<Game[]> {
    return <Observable<Game[]>> ajax.getJSON(GlobalConstants.BASEURL + 'api/games');      
  }

  public getGame(id : number) : Observable<Game>{
    return <Observable<Game>> ajax.getJSON(GlobalConstants.BASEURL + 'api/game/' + id);
  }
}
