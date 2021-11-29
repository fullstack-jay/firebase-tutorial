const auth = firebase.auth();
const rdb = firebase.database();
const stg = firebase.storage();


///////////////////////////////////////////////////////////
//// REGISTER
///////////////////////////////////////////////////////////
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

                var fotoLink = 'https://raw.githubusercontent.com/devanka761/firebase-tutorial/main/profil.jpg';
                var fotoPath = `users/${cred.user.uid}/profil.jpg`;

                fetch(fotoLink).then(res => {
                    return res.blob();
                }).then(blob => {
                    stg.ref(fotoPath).put(blob);
                })

                alert("Berhasil Membuat Akun");
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            })
            .catch(error => {
                alert(error.message);
            })
    }
}

///////////////////////////////////////////////////////////
//// CONNECTED
///////////////////////////////////////////////////////////
auth.onAuthStateChanged(user => {
    if (user) {
        var nama = document.getElementById('profil-nama');
        var bio = document.getElementById('profil-bio');
        var email = document.getElementById('profil-email');
        var foto = document.getElementById('profil-foto');

        var fotoPath = `users/${auth.currentUser.uid}/profil.jpg`;

        stg.ref(fotoPath).getDownloadURL().then(imgURL => {
            rdb.ref(`users`).child(auth.currentUser.uid).update({
                "Foto": imgURL
            });
        });

        rdb.ref('users').child(auth.currentUser.uid).on('value', data => {
            nama.innerHTML = `${data.val().Nama} <i style="color: #777; cursor: pointer" class="fas fa-edit" onclick="switchNama();"></i>`;
            email.innerHTML = data.val().Email;
            bio.innerHTML = `${data.val().Bio} <i style="color: #777; cursor: pointer;" class="fas fa-edit" onclick="switchBio();"></i>`;
            foto.style.backgroundImage = `url('${data.val().Foto}')`
        });

        document.getElementById('auth').style.display = 'none';
        document.getElementById('profil').style.display = 'block';
    }
})

///////////////////////////////////////////////////////////
//// LOGIN
///////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////
//// LUPA PASSWORD
///////////////////////////////////////////////////////////
function forgotBtn() {
    var email = document.getElementById('forgot-email');

    if (email.value == '') {
        alert('Harap isi semua bidang!');
    } else {
        auth.sendPasswordResetEmail(email.value)
            .then(() => {
                alert('Berhasil Mengirim Email Ganti Sandi');
            })
            .catch((error) => {
                alert(error.message);
            })
    }
}


///////////////////////////////////////////////////////////
//// SIGNOUT
///////////////////////////////////////////////////////////
function logout() {
    auth.signOut();
    alert('Berhasil keluar dari akun kamu');
    window.location.reload()
}

///////////////////////////////////////////////////////////
//// GANTI USERNAME
///////////////////////////////////////////////////////////
function submitNama(event) {
    var nama = document.getElementById('profil-nama');
    var inputNama = document.getElementById('input-nama');

    if (inputNama.value == '') {
        nama.style.display = 'block';
        inputNama.style.display = 'none';
        event.style.display = 'none';
        return;
    } else {
        rdb.ref(`users`).child(auth.currentUser.uid).update({
            "Nama": inputNama.value
        }).then(data => {
            nama.innerHTML = `${data.val().Nama} <i style="color: #ccc; cursor: pointer" class="fas fa-edit" onclick="switchNama();"></i>`;
        });
        alert('Berhasil Mengganti Nama');
        nama.style.display = 'block';
        inputNama.style.display = 'none';
        event.style.display = 'none';
    }
}

///////////////////////////////////////////////////////////
//// GANTI BIO
///////////////////////////////////////////////////////////
function submitBio(event) {
    var bio = document.getElementById('profil-bio');
    var inputBio = document.getElementById('input-bio');

    if (inputBio.value == '') {
        bio.style.display = 'block';
        inputBio.style.display = 'none';
        event.style.display = 'none';
        return;
    } else {
        rdb.ref(`users`).child(auth.currentUser.uid).update({
            "Bio": inputBio.value
        }).then(data => {
            bio.innerHTML = `${data.val().Bio} <i style="color: #ccc; cursor: pointer" class="fas fa-edit" onclick="switchBio();"></i>`;
        });
        alert('Berhasil Memperbarui Bio');
        bio.style.display = 'block';
        inputBio.style.display = 'none';
        event.style.display = 'none';
    }
}

///////////////////////////////////////////////////////////
//// GANTI FOTO PROFIL
///////////////////////////////////////////////////////////
function gantiFoto() {
    document.getElementById('cari-foto').click();
}
document.getElementById('cari-foto').onchange = function () {
    var foto = document.getElementById('cari-foto').files[0];
    var user = auth.currentUser.uid;
    var fotoRef = stg.ref(`users/${user}/profil.jpg`);
    var fotoProfil = document.getElementById('profil-foto');

    var fotoUp = fotoRef.put(foto);

    fotoUp.on('state_changed', () => {
        console.log('Mengupload');
    }, (error) => {
        alert(error.message);
    }, () => {
        fotoRef.getDownloadURL().then(imgURL => {
            rdb.ref(`users`).child(user).update({
                "Foto": imgURL
            }).then(data => {
                fotoProfil.style.backgroundImage = `url('${data.val().Foto}')`
            });
        })
        alert('Berhasil Memperbarui Foto Profil');
    })
}