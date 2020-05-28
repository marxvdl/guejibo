import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesService, NewGameRoomAsGuest } from 'src/app/games.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { WaitingUser } from '../waiting-user/waiting-user.component';
import { WaitingListService } from 'src/app/waiting-list.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit, OnDestroy {

  private newGameRoomAsGuest$: Observable<NewGameRoomAsGuest>;
  public newGameRoomAsGuest: NewGameRoomAsGuest;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private webSocketService: WebSocketService,
    private waitingListService: WaitingListService
  ) { }

  ngOnInit(): void {

    this.waitingListService.initialize();

    this.route.paramMap.subscribe(
      paramMap => {
        const gameid = Number(paramMap.get('gameid'));
        const outer = this;
        this.newGameRoomAsGuest$ = this.gameService.getNewGameRoomAsGuest(gameid);
        this.newGameRoomAsGuest$.subscribe({
          next(gr: NewGameRoomAsGuest) {
            outer.newGameRoomAsGuest = gr;

            if (!gr.success) {
              console.log("Server error when creating game room");
              return;
            }

            AuthService.token = gr.token;
            outer.webSocketService.connect();
            outer.webSocketService.registerReqCallback(
              'player-is-ready',
              msg => { outer.waitingListService.playerIsReady(msg.user); }
            );
          }
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.webSocketService.removeReqCallback('player-is-ready');
    this.webSocketService.removeReqCallback('update-score');
    this.waitingListService.cleanUp();
  }

  gameStart() {
    this.webSocketService.registerReqCallback(
      'update-score',
      msg => { this.waitingListService.updateScore(msg.user, msg.score, msg.endgame); }
    );

    this.webSocketService.sendMessage(
      {
          action: "start-game",
          gameroom: this.newGameRoomAsGuest.id
      }
    );    
    
  }
}
