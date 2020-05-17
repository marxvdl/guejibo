import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { GlobalConstants } from './common/global-constants';

interface Game {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  public getGames(): Observable<Game[]> {
    return <Observable<Game[]>> ajax.getJSON(GlobalConstants.BASEURL + 'api/games');      
  }
}
