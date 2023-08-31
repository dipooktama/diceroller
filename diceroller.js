const regexSisi = /[0-9]+$/; // sisi dadunya, e.g. d4, d6, d8, d10, d20
const regexJumlah = /[0-9]{1,3}d/; // jumlah dadu yg di-roll
const regexBatch = /^[0-9]{1,3} /; // jumlah batchnya

function getJumlahDadu(){
    const jumlahDadu = document.getElementById("jumlahDadu").value;
    //console.log(tes);
    return jumlahDadu
}

function roller(jumlah, sisi){
    const hasil=[];
    for(let i=1;i<=jumlah;i++){
        hasil.push(Math.floor(Math.random() * sisi + 1));
    }
    return hasil
}

function singleRoll(){
    const masukan = getJumlahDadu();
    const parseJumlahDadu = regexJumlah.exec(masukan); // hasil: ['3d']
    const parseSisiDadu = regexSisi.exec(masukan); // hasil: ['6']
    let jumlahDadu = 1; // default jumlah dadu, kalo inputnya cuman d6, d20
    if(Object.is(parseJumlahDadu, null) == false) {
        jumlahDadu = parseInt(parseJumlahDadu[0].split('d')); // hasil: 3
    }
    const sisiDadu = parseInt(parseSisiDadu[0]);
    const hasilRollnya =roller(jumlahDadu, sisiDadu);
    document.getElementById("hasilSingleRoll").innerText = hasilRollnya;
    const totalRoll = hasilRollnya.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById("totalRoll").innerHTML = totalRoll;
}

function batchRoll(){
    const batch = [];
    const batchTotal = [];
    const masukan = getJumlahDadu();
    
    const parseJumlahDadu = regexJumlah.exec(masukan);
    let jumlahDadu = 1;
    if(Object.is(parseJumlahDadu, null) == false) {
        jumlahDadu = parseInt(parseJumlahDadu[0].split('d'));
    }

    const parseSisiDadu = regexSisi.exec(masukan);
    const sisiDadu = parseInt(parseSisiDadu[0]);

    const parseJumlahBatch = regexBatch.exec(masukan);
    const jumlahBatch = parseInt(parseJumlahBatch);

    for(let j=1; j<=jumlahBatch; j++){
        batch.push(roller(jumlahDadu, sisiDadu));
        batchTotal.push(batch[j-1].reduce((partialSum, a) => partialSum + a, 0));
    }

    // document.getElementById('hasilBatchRoll').innerHTML = batch;
    const resBatch = document.querySelector('#hasilBatchRoll');
    resBatch.innerHTML = null;
    batch.forEach(isiBatch => {
        const baris = document.createElement('p');
        baris.innerText = isiBatch;
        baris.style = 'margin: 0';
        resBatch.appendChild(baris);
    });

    const totalRoll = batchTotal.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById("totalRoll").innerHTML = totalRoll;
}

function advDisadvRoll(isAdv) {
    let sortedRoll = [];
    const masukan = getJumlahDadu();
    const jumlahDadu = 2; //jumlah dadu selalu dua buat advantage/disadvantage roll
    const parseSisiDadu = regexSisi.exec(masukan);
    const sisiDadu = parseInt(parseSisiDadu[0]);

    const hasilRollnya = roller(jumlahDadu, sisiDadu);
    // tampilin hasil rollnya (dari 2 dadu)
    document.getElementById("hasilSingleRoll").innerText = hasilRollnya;
    // sort dadunya, ascending.
    if (hasilRollnya[0] > hasilRollnya[1]) {
        sortedRoll[0] = hasilRollnya[1];
        sortedRoll[1] = hasilRollnya[0];
    } else {
        sortedRoll = hasilRollnya;
    }
    // ambil dadu sesuai adv (ambil gede) ato disadv (ambil kecil)
    document.getElementById("hasilRollAdvDisadv").innerText = isAdv ? sortedRoll[1] : sortedRoll[0];
}

function advantageRoll(){
    const isAdv = true;
    advDisadvRoll(isAdv);
}

function disadvantageRoll(){
    const isAdv = false;
    advDisadvRoll(isAdv);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('cobaRoll').addEventListener('click', singleRoll, false);
    document.getElementById('batchRoll').addEventListener('click', batchRoll, false);
    document.getElementById('advRoll').addEventListener('click', advantageRoll, false);
    document.getElementById('disadvRoll').addEventListener('click', disadvantageRoll, false);
}, false)
