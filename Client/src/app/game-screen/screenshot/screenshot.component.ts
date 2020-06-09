import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/games.service';
import { GameMetadataService } from 'src/app/game-metadata.service';

@Component({
  selector: 'gs-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

  @Input() game: Game;

  constructor(
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
  }

  public screenshotUrl() {
    return this.gameMetadataService.getScreenshotUrl(this.game);
  }

}
