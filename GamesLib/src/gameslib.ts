import Cookies from 'js-cookie';

export class GameConnection {

    public test() {
        console.log("This is TypeScript!");
        console.log(Cookies.get('jwt'));
        console.log(Cookies.get('gameroom'));
    }
}