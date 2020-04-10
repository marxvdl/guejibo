const jwtDecode = require('jwt-decode');

const BASEURL = 'http://localhost:3000/';
const WSURL = 'ws://localhost:8080/';

import * as student from './student';

export let global = { myGameRooms: {} };

export function login() {
    $.ajax({
        type: 'POST',
        url: BASEURL + 'auth/login',
        contentType: 'application/json',
        data: JSON.stringify({
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }),
        success: data => {

            if (data.success === true) {
                console.log("Logged in");

                global.token = data.token;
                global.payload = jwtDecode(data.token);

                $("#top-email").text(global.payload.email);
                $("#top-email").css('color', '#3aff3a');
                $("#login-panel").slideUp(400, () => {
                    $("#perfil-panel").fadeIn(400, () => {
                        loadGames();
                        loadGameRooms();
                    });
                    $("#games-panel").fadeIn(400, () => {
                        $("#rooms-panel").fadeIn();
                    });
                });
            }
            else {
                console.log("Could not log in: " + data.error);
            }
        }
    });
}

const authHeader = xhr => {
    xhr.setRequestHeader("Authorization", "Bearer " + global.token);
};

export function profile() {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'auth/profile',
        success: data => {
            $('#perfil-nome').text(data.name);
            $('#perfil-email').text(data.email);
            $('#perfil-id').text(data.id);
        }
    });
}

export function loadGames() {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/games',
        success: data => {
            $('#games-ul').empty();
            for (let game of data) {
                $('#games-ul').append(
                    $(`
                    <li>
                        <strong>${game.name}</strong>: 
                        <a href="#" onclick="client.main.createRoom(${game.id})">Create room</a> 
                        <span id="success-${game.id}" class="msg" style="display:none">
                            <span class="success">Success!</span>
                            Code: <span class="code" id="success-code-${game.id}"></span>
                        </span>
                        <span id="failure-${game.id}" class="msg failure" style="display:none">Failure</span>
                    </li>`)
                );
            }
        }
    });
}

export function createRoom(gameid) {
    $.ajax({
        type: 'POST',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            gameid: gameid
        }),
        success: data => {
            if (data.success) {
                $(`#success-code-${gameid}`).text((data.code));
                $(`#success-${gameid}`).fadeIn();
                createGameRoomPanel(data.id);
            }
            else {
                $(`#failure-${gameid}`).fadeIn();
            }
        }
    });
}

export function loadGameRooms() {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/mygamerooms',
        success: data => {
            $('#rooms-ul').empty();
            for (let gr of data) {
                $('#rooms-ul').append(
                    '<li>' +
                    gr.game.name +
                    (gr.timeStarted ? `Started at ' + ${gr.timeStarted}` : '') +
                    (gr.timeEnded ? `, ended at ' + ${gr.timeEnded}` : '') +
                    `, <a href="#" onclick="client.main.createGameRoomPanel(${gr.id})">${gr.numberOfMembers} members</a>
                        <ul id="room-members-${gr.id}"></ul>
                    </li>`
                );
            }
        }
    });
}

export function listRoomMembers(id) {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom/' + id,
        success: data => {
            let mul = $(`#room-members-${id}`);
            mul.empty();
            for (let m of data.members) {
                mul.append(`<li><strong>${m.name}</strong>, ${m.email}</li>`);
            }
        }
    });
}

export const gameRoomMembers = {};

export function createGameRoomPanel(id) {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom/' + id,
        success: data => {
            if (!(id in gameRoomMembers)) {
                gameRoomMembers[id] = {};
            }

            //Create panel
            let panel = $(`<div class="panel" id="gr${id}"></div>`);
            panel.append(
                `<h1>${data.game.name} <span class="gr-code">(${data.code})</span></h1>`,
                `<p>Created by <strong>${data.owner.name}<strong></p>`,
                `<p>${data.members.length} users:</p>`
            );
            let ul = $(`<ul id="ul-gr${id}"></ul>`);
            for (let m of data.members) {
                ul.append(`<li>${m.name} <span class="userstatus failure" id="gr${id}-user${m.id}">offline</span></li>`);
                gameRoomMembers[id][m.id] = m;
                gameRoomMembers[id][m.id].online = false;
            }
            panel.append(ul);
            panel.append(`<button onclick="client.main.startGameAsCreator(${id})">Start</button>`);
            panel.append(
                `<div class="subpanel" id="running${id}" style="display:none">
                <p>Started on <span id="timestart${id}" class="timestamp"></span><br>
                <p>Ended on <span id="timeend${id}" class="timestamp"></span></p>
                </div>`
            );
            $('body').append(panel);

            //Periodically check players online status
            student.initPlayersReady(id);
        }
    });
}

/*
 * Starts a new game (from the game room creator perspective)
 */
export function startGameAsCreator(gameRoomId){
    global.myGameRooms[gameRoomId] = true;

    wsSend(
        {     
            action: "start-game",
            gameroom: gameRoomId
        }
    );
}

/*
 * Start monitoring a game once its start has been confirmed by the server.
 */
export function startMonitoringGame(data){
    const localTime = new Date(data.startTime).toLocaleTimeString();

    $(`#timestart${data.gameroom}`).text(localTime);
    $(`#running${data.gameroom}`).fadeIn();
}

let finishedUsers = { };
/*
 * Updates the value of the score in the game room panel.
 */
function updateScore(data){
    if(finishedUsers[data.gameroom] && finishedUsers[data.gameroom][data.user])
        return;

    $(`#score-gr${data.gameroom}-user${data.user}`).text(data.score);

    if(data.endgame === true){
        $(`#finished-gr${data.gameroom}-user${data.user}`).text("Finished!");

        if(data.gameroom in finishedUsers === false)
            finishedUsers[data.gameroom] = {};

        finishedUsers[data.gameroom][data.user] = true;

        const numberOfFinished = Object.keys(finishedUsers[data.gameroom]).length;
        const totalUsers = Object.keys(student.lastSeemOnline[data.gameroom]).length;
        
        if(numberOfFinished === totalUsers){
            console.log("Game Over!");
            
        }
    }
}

// Web sockets
export function wsConnect(onopen = null) {
    if (
        ('ws' in global) &&
        (global.ws.readyState == WebSocket.OPEN)
    ) {
        return;
    }

    global.ws = new WebSocket(WSURL + global.token);

    if(onopen !== null)
        global.ws.onopen = onopen;

    global.ws.onclose = () => {
        console.log('Fechou!');
    };

    global.ws.onmessage = msg => {
        let data;
        try {
            data = JSON.parse(msg.data);
        }
        catch (e) {
            console.log(`Could not parse: ${msg.data}`);
            return;
        }

        //Receive a response to a previously sent request
        if (data.responseTo) {
            switch (data.responseTo) {
                case 'join':
                    student.doJoin(data);
                    return;
            }
        }

        //Receive a new unprompted request from the server
        else if (data.req) {
            switch (data.req) {
                case 'player-is-ready':
                    student.markPlayerAsReady(data.user, data.gameroom);
                    return;

                case 'game-started':
                    if(data.gameroom in client.main.global.myGameRooms)
                        startMonitoringGame(data);
                    else
                        student.startGameAsPlayer(data);
                    return;

                case 'update-score':
                    updateScore(data);
                    return;
            }
        }

    };
}

export function wsDisconnect() {
    global.ws.close();
}

export function wsSend(msg) {
    let func = () => { global.ws.send(JSON.stringify(msg)); };

    if (global.ws && global.ws.readyState === WebSocket.OPEN)
        func();
    else
        wsConnect(func);
}
