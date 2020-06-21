var accessToken = "4205ec8413af1fcea23cd043c67b6c89d835e5a7";
var deviceID = "270019000447363332363639"

var url_hum = "https://api.particle.io/v1/devices/" + deviceID + "/hum_amb";
var url_pres = "https://api.particle.io/v1/devices/" + deviceID + "/pres_amb";
var url_temp = "https://api.particle.io/v1/devices/" + deviceID + "/temp_amb";
var url_plant = "https://api.particle.io/v1/devices/" + deviceID + "/hum_soil";


// TEMPERATURA AMBIENTE
function callback_temp(data, status) {
    if (status == "success") {
        temp = JSON.parse(data.result);
    } else {
        alert("There was a problem");
    }
}

function getReading_temp() {
    $.get(url_temp, { access_token: accessToken }, callback_temp);

}

// HUMEDAD AMBIENTE
function callback_humedad(data, status){
    if (status == "success") {
        hum = JSON.parse(data.result);
    }
    else {
        alert("There was a problem");
    }
}

function getReading_humedad(){
    $.get(url_hum, {access_token: accessToken}, callback_humedad);
}

// PRESION AMBIENTE
function callback_presion(data, status){
    if (status == "success") {
        pres = JSON.parse(data.result);
    }
    else {
        alert("There was a problem");
    }
}

function getReading_presion(){
    $.get(url_pres, {access_token: accessToken}, callback_presion);
}

// HUMEDAD PLANTA
function callback_planta(data, status){
  if (status == "success") {
    plant = JSON.parse(data.result);
  }
  else {
    alert("There was a problem");
  }
}

function getReading_planta(){
    $.get(url_plant, {access_token: accessToken}, callback_planta);
}

// TEMA OSCURO PARA LAS GRAFICAS

if (!Highcharts.theme) {
  Highcharts.setOptions({
    chart: {
      backgroundColor: '#2B1B17'
    },
    colors: ['#F62366', '#0CCDD6', '#9DFF02'],
    title: {
      style: {
        color: 'silver'
      }
    },
    tooltip: {
      style: {
        color: 'silver'
      }
    }
  });
}

