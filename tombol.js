var loginPage = document.querySelector('.form-login');
var registerPage = document.querySelector('.form-register');
var forgotPage = document.querySelector('.form-forgot');

function loginBar() {
    loginPage.style.display = 'block';
    registerPage.style.display = 'none';
    forgotPage.style.display = 'none';

    document.getElementById('bar-login').style.background = '#c5c5c5';
    document.getElementById('bar-login').style.color = '#1b1b1b';
    document.getElementById('bar-register').style.background = 'none';
    document.getElementById('bar-register').style.color = '#1b1b1b';
    document.getElementById('bar-forgot').style.background = 'none';
    document.getElementById('bar-forgot').style.color = '#1b1b1b';
}

function registerBar() {
    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
    forgotPage.style.display = 'none';

    document.getElementById('bar-login').style.background = 'none';
    document.getElementById('bar-login').style.color = '#1b1b1b';
    document.getElementById('bar-register').style.background = '#c5c5c5';
    document.getElementById('bar-register').style.color = '#1b1b1b';
    document.getElementById('bar-forgot').style.background = 'none';
    document.getElementById('bar-forgot').style.color = '#1b1b1b';
}

function forgotBar() {
    loginPage.style.display = 'none';
    registerPage.style.display = 'none';
    forgotPage.style.display = 'block';

    document.getElementById('bar-login').style.background = 'none';
    document.getElementById('bar-login').style.color = '#1b1b1b';
    document.getElementById('bar-register').style.background = 'none';
    document.getElementById('bar-register').style.color = '#1b1b1b';
    document.getElementById('bar-forgot').style.background = '#c5c5c5';
    document.getElementById('bar-forgot').style.color = '#1b1b1b';
}

function switchNama() {
    var nama = document.getElementById('profil-nama');
    var inputNama = document.getElementById('input-nama');
    var submitNama = document.getElementById('submit-nama');

    nama.style.display = 'none';
    inputNama.style.display = 'inline';
    submitNama.style.display = 'inline';
}

function switchBio() {
    var bio = document.getElementById('profil-bio');
    var inputbio = document.getElementById('input-bio');
    var submitbio = document.getElementById('submit-bio');

    bio.style.display = 'none';
    inputbio.style.display = 'inline';
    submitbio.style.display = 'inline';
}