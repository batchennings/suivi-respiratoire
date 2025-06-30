import Chart from 'chart.js/auto';
// charger les données externes
// lancer une
// lancer le rendu du graph
const sourceData = '../../data/data.json'; // la source de données
let curveData = []; // la donnée qui s'implémente au fur et à mesure
let t = 0;
const refreshRate = 90; // tx de rafraichissement en millisecondes
const visible = 60000;  // quantité visible à l'écrans en millisecondes
const isDynamic = true;
let labels = [];
let values = [];

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const chart = new Chart(
    document.getElementById('myChart'),
    {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "toto",
                    xAxisID: 'xAxis',
                    yAxisID: 'yAxis',
                    data: values,
                    borderColor: '#FFFFFF'
                }
            ]
        },
        options : {
            animation: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                xAxis: {
                    backgroundColor: '#181820',
                    grid: {
                        color: '#181820'
                    },
                    ticks: {
                        color: '#181820'
                    }
                },
                yAxis: {
                    grid: {
                        color: '#343A40'
                    },
                    ticks: {
                        padding: 25,
                        color: '#FFFFFF',
                        font: {
                            size: 22,
                            family: 'IBM Plex Sans',
}
}
                }
            },
            elements: {
                point: {
                    pointStyle : false
                }
            }
        }
    }
);

const data = await getData(sourceData);

////////
// START
////////
(async function() {
    if (isDynamic){
        let intrv = setInterval(updateData, refreshRate);
    } else {
        createStaticChart();
    }
})();

async function updateData() {
    chart.data.labels.unshift(data[t].label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.unshift(data[t].value);
    });
    if (t*refreshRate > visible) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
    }
    chart.update();
    t++;
    // console.log(t+" / "+t*refreshRate+" ms / "+t*refreshRate/1000+" sec.");
}
function createStaticChart(){
    data.forEach(e => {
        chart.data.labels.unshift(e.label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.unshift(e.value);
        });
    });
    // console.log(chart.data.labels);
    chart.update();
}
