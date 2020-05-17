import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gs-game-title',
  templateUrl: './game-title.component.html',
  styleUrls: ['./game-title.component.scss']
})
export class GameTitleComponent implements OnInit {

  @Input() gameName : string;

  constructor() { }

  ngOnInit(): void {
  }

}
