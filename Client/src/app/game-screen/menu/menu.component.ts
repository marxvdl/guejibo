import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() gameId : number;

  constructor() { }

  ngOnInit(): void {
  }

}
