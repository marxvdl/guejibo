import Cookies from 'js-cookie';
let data = JSON.parse(Cookies.get('tmpuser'));

const BASEURL = 'http://localhost:3000/';

$(document).ready(function () {
    $('#name').val(data.name);
});

export function completeRegistration() {
    $.ajax({
        type: 'POST',
        url: BASEURL + 'auth/register',
        contentType: 'application/json',
        data: JSON.stringify({
            id: data.id,
            email: $('#email').val(),
            password: $('#password').val(),
            name: $('#name').val(),
        }),
        success: data => {
            console.log("Registration complete");
            console.log(data);
        }
    });
}