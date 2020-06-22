import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';
import { AuthService, User } from 'src/app/auth.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { WaitingListService } from 'src/app/waiting-list.service';
import { environment } from 'src/environments/environment';
import base64url from 'base64url';
import Cookies from 'js-cookie';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaitingUser } from 'src/app/new-room/waiting-user/waiting-user.component';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.scss']
})
export class JoinScreenComponent implements OnInit, OnDestroy {

  public code: string;
  public name: string = null;
  public joined = false;

  private gameRoomId: number;
  private intervalId;


  constructor(
    private webSocketService: WebSocketService,
    private waitingListService: WaitingListService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.waitingListService.initialize();
  }

  join() {
    if (!this.isLoggedIn)
      AuthService.token = 'unregistered_' + base64url(this.name);

    const wss = this.webSocketService;
    wss.connect();

    // When successfully joined, change interface to waiting list and
    // start sending "im-ready" messsages
    wss.registerResponseToCallback(
      'join',
      msg => {
        if (!msg.success) {
          if (isDevMode())
            console.log("Error trying to join");
        }
        else {
          this.gameRoomId = msg.gameroom.id;
          this.intervalId = setInterval(
            () => {
              wss.sendMessage(
                {
                  action: "im-ready",
                  gameroom: this.gameRoomId
                }
              );
            },
            GlobalConstants.TIMES.SHOUT_IM_HERE_INTERVAL
          );
          this.joined = true;
        }
      }
    );

    // When another player is ready, update its status on the waiting list
    wss.registerReqCallback(
      'player-is-ready',
      msg => {
        this.waitingListService.playerIsReady(msg.user);
      }
    );

    // When a 'game-started' message is received, start the game
    wss.registerReqCallback(
      'game-started',
      msg => {
        Cookies.set('gameroom', msg.gameroom, { path: '/' });

        if (!this.isLoggedIn)
          Cookies.set('jwt', msg.token, { path: '/' });

        window.open(environment.gamesPath + msg.path + '/index.html', '_self');
      }
    );

    // After registering all the above callbacks, 
    // send a message to the server asking to join the game
    wss.sendMessage(
      {
        action: "join",
        code: this.code
      }
    );
  }

  ngOnDestroy(): void {
    this.waitingListService.cleanUp();
    this.webSocketService.removeResponseToCallback('join');
    this.webSocketService.removeReqCallback('game-started');
    clearInterval(this.intervalId);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUser(): Observable<WaitingUser> {
    if (this.isLoggedIn) {
      return this.authService.getLoggedInUser().pipe(
        map(user => {
          return {
            name: user.name,
            online: true,
            finished: false,
            score: 0
          }
        })
      );
    }
    else {
      return of(
        {
          name: this.name,
          online: true,
          finished: false,
          score: 0
        }
      );
    }
  }

}
