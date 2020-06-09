import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/games.service';
import { GameMetadataService } from 'src/app/game-metadata.service';

@Component({
  selector: 'gs-game-title',
  templateUrl: './game-title.component.html',
  styleUrls: ['./game-title.component.scss']
})
export class GameTitleComponent implements OnInit {

  @Input() game: Game;

  constructor(
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
  }

  public backgroundUrl(){
    return this.gameMetadataService.getBackgroundUrl(this.game);
  }

}
