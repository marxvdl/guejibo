import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hp-gamebanner',
  templateUrl: './gamebanner.component.html',
  styleUrls: ['./gamebanner.component.scss']
})
export class GamebannerComponent implements OnInit {

  @Input() name: String;
  
  constructor() { }

  ngOnInit(): void {
  }

}
