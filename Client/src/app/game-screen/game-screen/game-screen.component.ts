import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService, Game } from 'src/app/games.service';
import { Observable } from 'rxjs';
import { GameMetadataService } from 'src/app/game-metadata.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  public game$: Observable<Game>;
  public description$: Observable<string>;
  public credits$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      paramMap => {
        const id = Number(paramMap.get('id'));
        this.game$ = this.gameService.getGame(id);

        this.game$.subscribe(game => {
          this.description$ = this.gameMetadataService.getDescription(game);
          this.credits$ = this.gameMetadataService.getCredits(game);
        });
      }
    );
  }

}
