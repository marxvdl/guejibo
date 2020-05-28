import { Component, OnInit, Input } from '@angular/core';
import { State } from '../waiting-list/waiting-list.component';

export interface WaitingUser {
  name: string,
  online: boolean,
  finished: boolean,
  score: number
}

@Component({
  selector: 'nr-waiting-user',
  templateUrl: './waiting-user.component.html',
  styleUrls: ['./waiting-user.component.scss']
})
export class WaitingUserComponent implements OnInit {
  @Input() user: WaitingUser;
  @Input() state: State;

  constructor() { }

  ngOnInit(): void {
    this.user.score = 0;
  }

  cssClass(): string[] {
    let css = ['status'];

    if (this.user.finished)
      css.push('done');
    else if(this.user.online)
      css.push( (this.state == State.Playing) ? 'score' : 'online' );        
    else
      css.push('offline');

    return css;
  }

  statusText(): string {
    if (this.user.finished) {
      return this.user.score + ' ✔';
    }
    else {
      if (this.user.online)
        return (this.state == State.Playing) ? this.user.score.toString() : 'online';
      else
        return (this.user.score == 0) ? 'offline' : this.user.score + ' (off)';
    }
  }

}
