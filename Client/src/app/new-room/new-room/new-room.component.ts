import { Component, OnInit } from '@angular/core';
import { GamesService, NewGameRoomGuest as NewGameRoomGuest } from 'src/app/games.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {

  public newGameRoomGuest$: Observable<NewGameRoomGuest>;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      paramMap => {
        const gameid = Number(paramMap.get('gameid'));
        this.newGameRoomGuest$ = this.gameService.getNewGameRoomGuest(gameid);
      }
    );
  }
}
