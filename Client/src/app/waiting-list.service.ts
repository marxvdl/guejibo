import { Injectable } from '@angular/core';
import { User } from './auth.service';
import { WaitingUser } from './new-room/waiting-user/waiting-user.component';
import { GlobalConstants } from './common/global-constants';

interface TableEntry {
  user: User,
  position: number,
  lastSeem: number
}

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {
  private outputUsers: WaitingUser[];
  private waitingTable: { [index:number]: TableEntry }
  private intervalId;

  constructor() {
    this.outputUsers = [];
    this.waitingTable = {};
  }

  /**
   * Sets up the service. Must be called before everything else.
   */
  initialize() {
    this.intervalId = setInterval(
      () => { this.checkOfflineUsers(); },
      GlobalConstants.TIMES.CHECK_PLAYERS_ONLINE_INTERVAL
    );
  }

  /**
   * Marks as offline any user that hasn't sent a message in a while.
   */
  checkOfflineUsers() {
      let now = Date.now();

      for(let i in this.waitingTable){
        let entry = this.waitingTable[i];
        if(now - entry.lastSeem > GlobalConstants.TIMES.WAIT_FOR_PLAYER_SHOUT){
          this.outputUsers[entry.position].online = false;
        }
      }
  }

  /**
   * Called when a "player-is-ready" message is received from the server.
   * Adds new users to the user list or marks existing users as online.
   */
  playerIsReady(user: User): void {
    //updates an existing user
    if (user.id in this.waitingTable) {
      this.waitingTable[user.id].lastSeem = Date.now();
      this.outputUsers[this.waitingTable[user.id].position].online = true;
    }

    //adds a new user
    else {
      this.outputUsers.push(
        {
          name: user.name,
          online: true
        }
      );

      this.waitingTable[user.id] =
      {
        user: user,
        position: this.outputUsers.length - 1,
        lastSeem: Date.now()
      };
    }
  }

  /**  
   * Should be called when the service is no longer needed.
   */
  cleanUp() {
    clearInterval(this.intervalId);
  }

  getUsers(): WaitingUser[] {
    return this.outputUsers;
  }

}
