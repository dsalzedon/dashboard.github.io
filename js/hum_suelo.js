// GRAFICA HUMEDAD DEL SUELO

var gaugeOptions = {
    chart: {
        type: 'solidgauge',
        height: '70%',
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
var chartSpeed = Highcharts.chart('chart_hum', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 150,
        title: {
            text: 'Humedad'
        }
    },
    credits: {
        enabled: false
    },

    series: [{
        name: 'Humedad Suelo',
        data: [0],
        dataLabels: {
            format: '<div style="text-align:center">' +
                '<span style="color: white; font-size:80px">{y}</span><br/>' + //TAMAÑO NUMERO DE ABAJO
                '<span style="color: white; font-size:42px;opacity:0.4">%</span>' + //tamaño unidades
                '</div>'
        },
        tooltip: {
            valueSuffix: 'SUELO'
        }
    }]
}));


// ACTUALIZAR GRAFICA HUMEDAD DEL SUELO
setInterval(function(){
    var point,
        newVal,
        inc;

    if (chartSpeed){
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200){
            newVal = point.y - inc;
        }
        getReading_planta();
        point.update(plant);
    }
}, 1000);
