const jwtDecode = require('jwt-decode');

const BASEURL = 'http://localhost:3000/';

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
                        $("#games-panel").fadeIn(400, () => {
                            $("#rooms-panel").fadeIn();
                        });
                    }) 
                } );
            }
            else {
                console.log("Could not log in: " + data.error);
            }
        }
    });
};

const authHeader = xhr => { 
    xhr.setRequestHeader ("Authorization", "Bearer " + global.token); 
};

export function profile(){
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

export function loadGames(){
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/games',
        success: data => {
            $('#games-ul').empty();
            for(let game of data){                
                $('#games-ul').append( 
                    $(`
                    <li>
                        <strong>${game.name}</strong>: 
                        <a href="#" onclick="client.createRoom(${game.id})">Create room</a> 
                        <span id="success-${game.id}" class="msg success" style="display:none">Success!</span>
                        <span id="failure-${game.id}" class="msg failure" style="display:none">Failure</span>
                    </li>`) 
                );
            }
        }
    });
}

export function createRoom(gameid){
    $.ajax({
        type: 'POST',
        beforeSend: authHeader,
        url: BASEURL + 'api/gameroom',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            gameid: gameid
        }),
        success: data => {
            if(data.success){
                $(`#success-${gameid}`).fadeIn();
            }
            else{
                $(`#failure-${gameid}`).fadeIn();
            }
        }
    });
}

export function loadGameRooms(){
    $.ajax({
        type: 'GET',
        beforeSend: authHeader,
        url: BASEURL + 'api/mygamerooms',
        success: data => {
            $('#rooms-ul').empty();
            for(let gr of data){
                $('#rooms-ul').append(
                    '<li>'
                    + gr.game.name
                    + (gr.timeStarted? `Started at ' + ${gr.timeStarted}` : '')
                    + (gr.timeEnded? `, ended at ' + ${gr.timeEnded}` : '')
                    + `, ${gr.users.length} members`
                    +'</li>'
                );
            }
        }
    });
}