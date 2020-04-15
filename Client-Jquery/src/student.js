import Cookies from 'js-cookie';

export const TIMES = {
    // How often a player will send a "I'm here" message 
    // while waiting for a game to start
    SHOUT_IM_HERE_INTERVAL: 800, //must be the same value in gameslib.ts

    // How long the host will wait for the "I'm here" message 
    // before considering that the player is offline
    WAIT_FOR_PLAYER_SHOUT: 1200,

    // How often the host will check for "I'm here" messages
    CHECK_PLAYERS_ONLINE_INTERVAL: 1000,
};

const GAME_BASE_PATH = '../';

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
        let li = $(`<li>${user.name} 
            <span class="userstatus" id="gr${gameroomId}-user${user.id}"></span> 
            <span class="score" id="score-gr${gameroomId}-user${user.id}"></span> 
            <span class="finished" id="finished-gr${gameroomId}-user${user.id}"></span>
            </li>`
        );
        $(`#ul-gr${gameroomId}`).append(li);
        statusElement = $(statusQuery);
    }

    if (isOnline) {
        statusElement.text('online');
        statusElement.removeClass('failure').addClass('success');
    }
    else {
        statusElement.text('offline');
        statusElement.addClass('failure').removeClass('success');
    }

}

/*
 * Starting a game (from the player perspective)
 */
export function startGameAsPlayer(data) {
    clearInterval(imReadyIntervals[data.gameroom]); //stop shouting "I'm ready!"

    Cookies.set('jwt', client.main.global.token, { path: '/' });
    Cookies.set('gameroom', data.gameroom, { path: '/' });

    window.open(GAME_BASE_PATH + 'Games/' + data.path + '/index.html', '_self');
}

// https://stackoverflow.com/a/133997/641312
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function post(path, params, method = 'post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
