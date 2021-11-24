const auth = firebase.auth();
const rdb = firebase.database();

function registerBtn() {

    var email = document.getElementById('register-email');
    var password = document.getElementById('register-password');
    var name = document.getElementById('register-name');
    var bio = document.getElementById('register-bio');


    var data = {
        "Nama": name.value,
        "Bio": bio.value,
        "Email": email.value,
        "Password": password.value
    }

    if (email.value == '' || password.value == '' || name.value == '' || bio.value == '') {
        alert('Harap isi semua bidang')
    } else {
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then(cred => {
                rdb.ref('users').child(cred.user.uid).set(data);
                alert("Berhasil Membuat Akun");
            })
            .catch(error => {
                alert(error.message);
            })
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        var nama = document.getElementById('profil-nama');
        var bio = document.getElementById('profil-bio');
        var email = document.getElementById('profil-email');

        rdb.ref('users').child(auth.currentUser.uid).on('value', data => {
            nama.innerHTML = data.val().Nama;
            email.innerHTML = data.val().Email;
            bio.innerHTML = data.val().Bio;
        })

        document.getElementById('auth').style.display = 'none';
        document.getElementById('profil').style.display = 'block';
    }
})

function loginBtn() {
    var email = document.getElementById('login-email');
    var password = document.getElementById('login-password');

    if (email.value == '' || password.value == '') {
        alert('Harap isi semua bidang!')
    } else {
        auth.signInWithEmailAndPassword(email.value, password.value)
            .catch(error => {
                alert(error.message);
            })
    }
}

function logout() {
    auth.signOut();
    alert('Berhasil keluar dari akun kamu');
    window.location.reload()
}