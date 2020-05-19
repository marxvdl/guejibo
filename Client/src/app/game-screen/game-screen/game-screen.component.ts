import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService, Game } from 'src/app/games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  public game$: Observable<Game>;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      paramMap => {
        const id = Number(paramMap.get('id'));
        this.game$ = this.gameService.getGame(id);
      }
    );
  }

}
