import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { Subject } from 'rxjs';
import { GlobalConstants } from './common/global-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: Subject<any>;
  private reqCallbacks: object;
  private responseToCallbacks: object;

  constructor(private authService: AuthService) {
    this.reqCallbacks = {};
    this.responseToCallbacks = {};
  }

  /**
   * Connects to the web socket using the token read from AuthService.token.
   */
  public connect() {
    if (this.subject) {
      console.log('Already connected');
      return;
    }

    this.subject = webSocket(GlobalConstants.WSURL + AuthService.token);
    this.subject.subscribe(
      msg => {
        if('req' in msg){
          if(msg.req in this.reqCallbacks){
            this.reqCallbacks[msg.req](msg);
          }
        }
        else if('responseTo' in msg){
          if(msg.responseTo in this.responseToCallbacks){
            this.responseToCallbacks[msg.responseTo](msg);
          }
        }
      }
    );
  }

  /**
   * Sets up a callback that will be called when the web sockets receives
   * a specific string in the "req" field.
   * @param req Value of the "req" field in the incoming object
   * @param callback Function to be called
   */
  public registerReqCallback(req: string, callback: (obj: any) => void): void {
    this.reqCallbacks[req] = callback;
  }

  /**
   * Sets up a callback that will be called when the web sockets receives
   * a specific string in the "responseTo" field.
   * @param req Value of the "req" field in the incoming object
   * @param callback Function to be called
   */
  
  public registerResponseToCallback(responseTo: string, callback: (obj: any) => void): void {
    this.responseToCallbacks[responseTo] = callback;
  }

  /**
   * Removes a callback that was set up with registerReqCallback.
   * @param req 
   */
  public removeReqCallback(req: string): void {
    delete this.reqCallbacks[req];
  }

    /**
   * Removes a callback that was set up with registerResponseToCallback.
   * @param req 
   */
  public removeResponseToCallback(req: string): void {
    delete this.responseToCallbacks[req];
  }

  /**
   * Sends a message to the web socket server.
   * @param msg 
   */
  public sendMessage(msg) : void {
    this.subject.next(msg);
  }

}
