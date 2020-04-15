import Cookies from 'js-cookie';

const WSURL = 'ws://localhost:8080/';
const SHOUT_IM_HERE_INTERVAL = 800;

/**
 * Represents a connection to the web socket server.
 * Authenticates automatically and can send and receive
 * messages.
 */
export class GameConnection {
    private jwt: string;
    private gameRoomId: number;
    private ws: WebSocket = undefined;

    /**
     * Creates a GameConnection object from data stored in cookies.
     */
    constructor() {
        this.jwt = Cookies.get('jwt');
        this.gameRoomId = parseInt(Cookies.get('gameroom'));
        this.connect();
    }

    /**
     * Creates a connection to the web socket server.
     */
    private connect() {
        if (
            (this.ws !== undefined) &&
            (this.ws.readyState == WebSocket.OPEN)
        ) {
            return;
        }

        this.ws = new WebSocket(WSURL + this.jwt);
        this.ws.onmessage = this.onmessage;
        this.ws.onopen = () => {
            setInterval(() => {
                this.ws.send(JSON.stringify(
                    {
                        action: 'im-ready',
                        gameroom: this.gameRoomId
                    }
                ));
            }, SHOUT_IM_HERE_INTERVAL);
        };
    }


    /**
     * Sends the current player score
     * @param score The current score
     * @param endgame If true, signals that the game has ended for this player
     */
    public sendScore(score : (number|string), endgame=false){
        this.ws.send(JSON.stringify(
            {
                action: 'update-score',
                gameroom: this.gameRoomId,
                score: (typeof score !== 'number')? parseInt(score) : score,
                endgame: endgame
            }
        ));
    }

    /**
     * What happens when a message is received.
     */
    private onmessage(ev: MessageEvent) {
        let data: object;

        try {
            data = JSON.parse(ev.data);
        }
        catch (e) {
            console.log(`Could not parse: ${ev.data}`);
            return;
        }

        console.log("This is what I received:");
        console.log(data);

    }

}
