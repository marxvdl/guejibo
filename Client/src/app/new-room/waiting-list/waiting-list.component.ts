import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WaitingUser } from '../waiting-user/waiting-user.component';
import { WaitingListService } from 'src/app/waiting-list.service';
import { User } from 'src/app/auth.service';

@Component({
  selector: 'nr-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {

  public users: WaitingUser[];

  constructor(
    private waitingListService: WaitingListService
  ) { }

  ngOnInit(): void {
    this.users = this.waitingListService.getUsers();
  }

  getHeightClass(): string {
    if(!this.users)
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

}
