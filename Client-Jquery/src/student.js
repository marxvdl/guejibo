let currentGameroom = null;

export function join(code) {
    client.main.wsSend({
        action: 'join',
        code: code
    });
}

export function doJoin(data) {
    if (data.success) {
        let gr = global.gameroom = data.gameroom;

        $('#status').text('Waiting...');
        $('#game-name').text(gr.game.name)
        $('#gr-owner').text(gr.owner.name);
        for (let user of gr.members) {
            $('#users').append(`<li id="user-${user.id}">${user.name}</li>`)
        }
        $('#gameroom-panel').fadeIn();

        currentGameroom = gr.id;
    }
    else {
        console.log(`Error: could not join game: data.error`)
    }
}

export function sayReady(data){
    if(currentGameroom == data.gameroom){
        client.main.wsSend({
            action: 'im-ready',
            gameroom: data.gameroom
        });
    }
}
