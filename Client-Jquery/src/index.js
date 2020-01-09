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
                $("#login-panel").slideUp(400, () => { $("#perfil-panel").fadeIn() } );
            }
            else {
                console.log("Could not log in: " + data.error);
            }
        }
    });
};

export function profile(){
    $.ajax({
        type: 'GET',
        beforeSend: xhr => {
            xhr.setRequestHeader ("Authorization", "Bearer " + global.token);
        },
        url: BASEURL + 'auth/profile',
        success: data => {
            $('#perfil-nome').text(data.name);
            $('#perfil-email').text(data.email);
            $('#perfil-id').text(data.id);            
        }
    });
};