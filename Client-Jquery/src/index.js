const jwtDecode = require('jwt-decode');

const BASEURL = 'http://localhost:3000/';

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
                let jwt = jwtDecode(data.token);

                $("#top-email").text(jwt.email);
                $("#top-email").css('color', '#3aff3a');
                $("#login-panel").slideUp();
            }
            else {
                console.log("Could not log in: " + data.error);
            }
        }
    });

};

