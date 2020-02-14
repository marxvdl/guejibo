const jwtDecode = require('jwt-decode');

const BASEURL = 'http://localhost:3000/';
const WSURL = 'ws://localhost:8080/';

export let global = {};

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
                    })
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
};

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
            console.log(data);
            if (data.success) {
                $(`#success-code-${gameid}`).text((data.code));
                $(`#success-${gameid}`).fadeIn();
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
                    '<li>'
                    + gr.game.name
                    + (gr.timeStarted ? `Started at ' + ${gr.timeStarted}` : '')
                    + (gr.timeEnded ? `, ended at ' + ${gr.timeEnded}` : '')
                    + `, <a href="#" onclick="client.main.createGameRoomPanel(${gr.id})">${gr.numberOfMembers} members</a>
                        <ul id="room-members-${gr.id}"></ul>
                    </li>`
                );
            }
        }
    });
}

export function listRoomMembers(id) {
    console.log(id);
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom/' + id,
        success: data => {
            console.log(data);
            let mul = $(`#room-members-${id}`);
            mul.empty();
            for (let m of data.members) {
                console.log(mul, m);
                mul.append(`<li><strong>${m.name}</strong>, ${m.email}</li>`);
            }
        }
    });
}

export function createGameRoomPanel(id) {
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom/' + id,
        success: data => {
            //Create panel
            let panel = $(`<div class="panel" id="gr${id}"></div>`);
            panel.append(
                `<h1>${data.game.name} <span class="gr-code">(${data.code})</span></h1>`,
                `<p>Created by <strong>${data.owner.name}<strong></p>`,
                `<p>${data.members.length} users:</p>`
            );
            let ul = $('<ul></ul>');
            for (let m of data.members) {
                ul.append(`<li>${m.name}</li>`);
            }
            panel.append(ul);
            $('body').append(panel);

            //Open Web Socket connection
            wsConnect();
        }
    });
}


// Web sockets
export function wsConnect() {
    if (
        ('ws' in global) &&
        (global.ws.readyState == WebSocket.OPEN)
    ) {
        return;
    }

    global.ws = new WebSocket(WSURL + global.token);

    global.ws.onopen = () => {
        console.log('Abriu!');
    };

    global.ws.onclose = () => {
        console.log('Fechou!');
    };

    global.ws.onmessage = e => {
        console.log(e);
    }
}

export function wsDisconnect() {
    global.ws.close();
}

export function wsSend(msg) {
    global.ws.send(JSON.stringify(msg));
}
