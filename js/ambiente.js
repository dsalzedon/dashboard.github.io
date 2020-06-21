// GRAFICA DEL SENSOR BME280, PARA INFO DEL AMBIENTE

var graf = Highcharts.chart('chart_amb',{
    chart: {
        type: 'solidgauge',
        height: '70%',
    },

    credits: {
        enabled: false
    },

    title: {
        text: 'Ambiente',
        style: {
            fontSize: '24px'
        }
    },
    exporting: {
        enabled: false
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style:{
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
        center: ['50%', '50%'],
        startAngle: 0,
        endAngle: 360,
        background: [{

            // CIRCULO TEMPERATURA
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        },{
            //  CIRCULO HUMEDAD
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        },{
            // CIRCULO DE PRESION
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
    },{
        //circulo del medio
        min: 0, //valor minimo
        max: 200, // valor maximo
        lineWidth: 0,
        tickPositions: [],

    },{
        //circulo mas chico
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

// ACTUALIZAR LOS VALORES

// ACTUALIZAR CIRCULO DE TEMPERATURA
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

// ACTUALIZAR CIRCULO DE HUMEDAD
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

// ACTUALIZAR CIRCULO DE PRESION
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
