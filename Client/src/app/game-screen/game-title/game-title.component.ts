import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/games.service';
import { GameMetadataService } from 'src/app/game-metadata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'gs-game-title',
  templateUrl: './game-title.component.html',
  styleUrls: ['./game-title.component.scss']
})
export class GameTitleComponent implements OnInit {

  @Input() game: Game;
  public credits$: Observable<string>;

  constructor(
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
    this.credits$ = this.gameMetadataService.getCredits(this.game);
  }

   public backgroundUrl(){
    return this.gameMetadataService.getBackgroundUrl(this.game);
  }

  public logoUrl(){
    return this.gameMetadataService.getLogoUrl(this.game);
  }

}
