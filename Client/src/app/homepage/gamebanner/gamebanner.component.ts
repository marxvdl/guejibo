import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { Game } from 'src/app/games.service';
import { GameMetadataService } from 'src/app/game-metadata.service';

@Component({
  selector: 'hp-gamebanner',
  templateUrl: './gamebanner.component.html',
  styleUrls: ['./gamebanner.component.scss']
})
export class GamebannerComponent implements OnInit {

  @Input() game: Game;
  
  constructor(
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
  }

  public bannerUrl(): string {
    if(isDevMode())
      console.log(this.gameMetadataService.getBannerUrl(this.game));
    return this.gameMetadataService.getBannerUrl(this.game);    
  }

}
