var accessToken = "4205ec8413af1fcea23cd043c67b6c89d835e5a7";
var deviceID = "270019000447363332363639"

var url_hum = "https://api.particle.io/v1/devices/" + deviceID + "/Humedad";
var url_pres = "https://api.particle.io/v1/devices/" + deviceID + "/Presion";
var url_temp = "https://api.particle.io/v1/devices/" + deviceID + "/Temperatura";
var url_plant = "https://api.particle.io/v1/devices/" + deviceID + "/Planta";


//TEMPERATURA
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

//HUMEDAD
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

//PRESION
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

//PLANTA
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


// -------------------------------------------------DE AQUI PARA ABAJO SON GRAFICAS---------------------------------------



//------------------------TEMA OSCURO PARA LAS GRAFICAS DE HIGHCHART-----------------------

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

//----------------------------HIGH CHART GRAFICA DE GAUGE-----------------------------------

var gaugeOptions = 
{
    chart: {
        type: 'solidgauge'
    },

    title: {
        text: 'Humedad del Suelo',
        style: {
            fontSize: '24px'
        }
    },

    pane: {
        center: ['50%', '85%'],
        size: '150%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#2B1B17',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // VALORES DE LOS EJES
    yAxis: {
        stops: [
            [0.1, '#0CCDD6'], // green
            [0.7, '#0CCDD6'], // yellow
            [0.9, '#0CCDD6'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// GRAFICA DE HUMEDAD DEL SUELO
var chartSpeed = Highcharts.chart('chart-temp', Highcharts.merge(gaugeOptions, 
{
    yAxis: 
    {
        min: 0,
        max: 150,
        title: 
        {
            text: 'Humedad'
        }
    },

    credits: 
    {
        enabled: false
    },

    series: 
    [{
        name: 'Humedad Suelo',
        data: [0],
        dataLabels: 
        {
            format: '<div style="text-align:center">' +
                '<span style="color: white; font-size:80px">{y}</span><br/>' + //TAMAÑO NUMERO DE ABAJO
                '<span style="color: white; font-size:42px;opacity:0.4">%</span>' + //tamaño unidades
                '</div>'
        },
        tooltip: 
        {
            valueSuffix: 'SUELO'
        }
    }]
}));


// ACTUALIZAR GRAFICA
setInterval(function() 
{
    var point,
        newVal,
        inc;

    if (chartSpeed) 
    {
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) 
        {
            newVal = point.y - inc;
        }
        getReading_planta();
        point.update(plant);
    }
}, 1000);


//------------------HIGHCHART GRAFICA DE ACTIVIDAD ---------------------------

var graf = Highcharts.chart('container', 
{
    chart: 
    {
        type: 'solidgauge',
        height: '110%',
    },

    credits: 
    {
        enabled: false
    },

    title: {
        text: 'Ambiente',
        style: {
            fontSize: '24px'
        }
    },

    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: 
        {
            fontSize: '12px' //tamaño de la letra
        },
        valueSuffix: '',
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [
        { // TEMPERATURA AMBIENTE
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, 
        { // Track for Exercise
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, 
        { // Track for Stand
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }]
    },

    yAxis: [{
        //circulo de afuera
        min: 0, //valor minimo 
        max: 50, // valor maximo
        lineWidth: 0,
        tickPositions: [],
    },
    {   //circulo del medio
        min: 0, //valor minimo 
        max: 200, // valor maximo
        lineWidth: 0,
        tickPositions: [],

    },
    {   //circulo mas chico
        min: 0, //valor minimo 
        max: 1500, // valor maximo
        lineWidth: 0,
        tickPositions: [],

    }],

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: [{
        name: 'Temperatura ºC',
        data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: 0
        }]
    }, {
        yAxis:1,
        name: 'Humedad %',
        data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: 0
        }]
    }, {
        yAxis:2,
        name: 'Presión Pa',
        data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: 0
        }]
    }]
});

// ACTUALIZAR GRAFICO DE TEMPERATURA
setInterval(function() {
    var point,
        newVal,
        inc;

    if (graf) {
        point = graf.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }
        getReading_temp();
        point.update(temp);
    }
}, 1000);

// ACTUALIZAR GRAFICO DE HUMEDAD
setInterval(function() {
    var point,
        newVal,
        inc;

    if (graf) {
        point = graf.series[1].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }
        getReading_humedad();
        point.update(hum);
    }
}, 1000);

// ACTUALIZAR GRAFICO DE PRESION
setInterval(function() {
    var point,
        newVal,
        inc;

    if (graf) {
        point = graf.series[2].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }
        getReading_presion();
        point.update(pres);
    }
}, 1000);



