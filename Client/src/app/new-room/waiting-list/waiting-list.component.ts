import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WaitingUser } from '../waiting-user/waiting-user.component';
import { WaitingListService } from 'src/app/waiting-list.service';

export enum State {
  Waiting, Playing
}

@Component({
  selector: 'nr-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {
  public StateEnum = State;
  
  public users: WaitingUser[];
  public state: State;  

  @Output() public gameStart = new EventEmitter<void>();

  constructor(
    private waitingListService: WaitingListService
  ) {
    this.state = State.Waiting;
  }

  ngOnInit(): void {
    this.users = this.waitingListService.getUsers();
  }

  getHeightClass(): string {
    if (!this.users)
      return '';

    if (this.users.length <= 30) {
      return 'height1';
    }
    else if (this.users.length <= 60) {
      return 'height2';
    }
    else if (this.users.length <= 93) {
      return 'height3';
    }
  }

  startGame() : void {
    this.state = State.Playing;
    this.gameStart.emit();
  }

}
