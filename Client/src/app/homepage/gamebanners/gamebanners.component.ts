import { Component, OnInit } from '@angular/core';
import { GamesService, Game } from '../../games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hp-gamebanners',
  templateUrl: './gamebanners.component.html',
  styleUrls: ['./gamebanners.component.scss']
})
export class GamebannersComponent implements OnInit {

  public games$ : Observable<Game[]>;

  constructor(
    private gamesService : GamesService
  ) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getGamesList(); 
  }

}
