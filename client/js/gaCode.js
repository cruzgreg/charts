/**
 * Created by cruz on 9/25/15.
 */


google.setOnLoadCallback(drawChart);

var myArrary = [
    ['Date', 'Pageviews', 'Users'],
    ['2015-08-01',  50,      4],
    ['2015-08-02',  40,      5],
    ['2015-08-03',  60,       12],
    ['2015-08-04',  66,       20],
    ['2015-08-05',  55,       11],
    ['2015-08-06',  50,       10],
    ['2015-08-07',  70,       11],
    ['2015-08-08',  50,       12],
    ['2015-08-09',  66,       15],
    ['2015-08-10',  60,       11],
    ['2015-08-11',  60,       12],
    ['2015-08-12',  65,       10],
    ['2015-08-13',  60,       20],
    ['2015-08-14',  66,       10],
    ['2015-08-15',  50,      15]
];

function drawChart() {
    var data = google.visualization.arrayToDataTable(myArrary);

    var options = {
        title: 'Users And Pageviews Over Time',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { showTextEvery: 3,
            slantedText: true,
            slantedTextAngle: 45
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}
