import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';
import { AuthService } from 'src/app/auth.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { WaitingListService } from 'src/app/waiting-list.service';
import base64url from 'base64url';
import Cookies from 'js-cookie';
import { environment } from 'src/environments/environment';

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
    private waitingListService: WaitingListService
  ) { }

  ngOnInit(): void {
    this.waitingListService.initialize();
  }

  join() {
    let payload = { name: this.name };
    console.log(payload);

    AuthService.token = 'unregistered_' + base64url(this.name);

    const wss = this.webSocketService;
    wss.connect();

    // When successfully joined, change interface to waiting list and
    // start sending "im-ready" messsages
    wss.registerResponseToCallback(
      'join',
      msg => {
        if (!msg.success) {
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
        Cookies.set('jwt', msg.token, { path: '/' });
        Cookies.set('gameroom', msg.gameroom, { path: '/' });
    
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

}
