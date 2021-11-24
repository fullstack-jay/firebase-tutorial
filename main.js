const rdb = firebase.database();

function kirimPesan() {

    var nama = document.getElementById('nama');
    var email = document.getElementById('email');
    var pesan = document.getElementById('pesan');

    var gabungan = {
        "Nama": nama.value,
        "Email": email.value,
        "Pesan": pesan.value
    }

    rdb.ref('Pesan').push().set(gabungan);

    nama.value = '';
    email.value = '';
    pesan.value = '';


    alert('Pesan Terkirim');
}