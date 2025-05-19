const holup = document.getElementById('forecastChart').getContext('2d');
new Chart(holup, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Forecast Temps (°C)',
            data: [20, 22, 21, 23, 25, 24, 22],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    }
});