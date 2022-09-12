regexJumlah = /^[0-9]{1}/;
regexSisi = /[0-9]+$/;

function getJumlahDadu(){
  tes = document.getElementById("jumlahDadu").value;
  //console.log(tes);
  return tes
}

function roller(jumlah, sisi){
  hasil=[]
  for(i=1;i<=jumlah;i++){
    hasil.push(Math.floor(Math.random() * sisi + 1));
  }
  return hasil
}

function singleRoll(masukan){
  masukan = getJumlahDadu();
  jumlahDadu = regexJumlah.exec(masukan);
  sisiDadu = regexSisi.exec(masukan);
  hasilRollnya =roller(jumlahDadu, sisiDadu);
  document.getElementById("hasilSingleRoll").innerHTML = hasilRollnya;
  totalRoll = hasilRollnya.reduce((partialSum, a) => partialSum + a, 0);
  document.getElementById("totalRoll").innerHTML = totalRoll
}

function batchRoll(masukan){

}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('cobaRoll').addEventListener('click', singleRoll, false);
}, false)