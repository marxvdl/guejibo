export const TIMES = {
    // How often a player will send a "I'm here" message 
    // while waiting for a game to start
    SHOUT_IM_HERE_INTERVAL: 800,

    // How long the host will wait for the "I'm here" message 
    // before considering that the player is offline
    WAIT_FOR_PLAYER_SHOUT: 1200,

    // How often the host will check for "I'm here" messages
    CHECK_PLAYERS_ONLINE_INTERVAL: 1000,
};

export function join(code) {
    client.main.wsSend({
        action: 'join',
        code: code
    });
}

let imReadyIntervals = [];

export function doJoin(data) {
    if (data.success) {
        let gr = data.gameroom;
        const ulgrid = `ul-gr${gr.id}`;

        $('#status').text('Waiting...');
        $('#game-name').text(gr.game.name);
        $('#gr-owner').text(gr.owner.name);
        $('#usersdiv').append($(`<ul id="${ulgrid}"></ul>`));     
           
        $(`#${ulgrid}`).append($(`<li>${client.main.global.payload.name}<span class="userstatus success">online</span></li>`));
        for (let user of gr.members) {
            $(`#${ulgrid}`).append(`<li>${user.name}<span class="userstatus" id="gr${gr.id}-user${user.id}"></span></li>`);
        }
        $('#gameroom-panel').fadeIn();

        initPlayersReady(gr.id);
        client.main.gameRoomMembers[gr.id] = [];

        imReadyIntervals[data.gameroom.id] =
            setInterval(() => {
                client.main.wsSend({
                    action: 'im-ready',
                    gameroom: data.gameroom.id
                });
            }, TIMES.SHOUT_IM_HERE_INTERVAL);
    }
    else {
        console.log(`Error: could not join game: data.error`);
    }
}

export let lastSeemOnline = {};

export function initPlayersReady(gameroomId) {
    client.main.wsConnect();

    lastSeemOnline[gameroomId] = {};

    setInterval(() => {
        const now = Date.now();

        for (let userId in lastSeemOnline[gameroomId]) {
            let info = lastSeemOnline[gameroomId][userId];

            let howLong = now - info.when;
            let isOnline = howLong <= TIMES.WAIT_FOR_PLAYER_SHOUT;

            displayPlayerOnlineOffline(gameroomId, info.user, isOnline);
        }
    }, TIMES.CHECK_PLAYERS_ONLINE_INTERVAL);
}

export function markPlayerAsReady(user, gameroomId) {
    lastSeemOnline[gameroomId][user.id] = {
        user: user,
        when: Date.now(),
    };
}

function displayPlayerOnlineOffline(gameroomId, user, isOnline) {
    if (gameroomId in client.main.gameRoomMembers === false)
        return;

    const gr = client.main.gameRoomMembers[gameroomId];

    if (user.id in gr === false)
        gr[user.id] = user;

    gr[user.id].online = true;
    let statusQuery = `#gr${gameroomId}-user${user.id}`;
    let statusElement = $(statusQuery);

    if (!statusElement.length) {
        let li = $(`<li>${user.name} <span class="userstatus" id="gr${gameroomId}-user${user.id}"></span></li>`);
        $(`#ul-gr${gameroomId}`).append(li);
        statusElement = $(statusQuery);
    }

    if(isOnline){
        statusElement.text('online');
        statusElement.removeClass('failure').addClass('success');
    }
    else{
        statusElement.text('offline');
        statusElement.addClass('failure').removeClass('success');
    }
    
}

/*
 * Starting a game (from the player perspective)
 */
export function startGameAsPlayer(gameRoomId){
    clearInterval(imReadyIntervals[gameRoomId]); //stop shouting "I'm ready!"
}