import Cookies from 'js-cookie';

export class GameConnection {

    test() {
        console.log("It works!!");
        console.log(Cookies.get('jwt'));
        console.log(Cookies.get('gameroom'));
    }
}