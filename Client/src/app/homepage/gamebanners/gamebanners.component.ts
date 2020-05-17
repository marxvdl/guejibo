import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../games.service';

@Component({
  selector: 'hp-gamebanners',
  templateUrl: './gamebanners.component.html',
  styleUrls: ['./gamebanners.component.scss']
})
export class GamebannersComponent implements OnInit {

  public games$;

  constructor(
    private gamesService : GamesService
  ) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames(); 
  }


}
