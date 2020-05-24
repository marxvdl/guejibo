import { Component, OnInit, Input } from '@angular/core';
import { WaitingUser } from '../waiting-user/waiting-user.component';

@Component({
  selector: 'nr-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {

  @Input() users: WaitingUser[];

  constructor() { }

  ngOnInit(): void {
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
