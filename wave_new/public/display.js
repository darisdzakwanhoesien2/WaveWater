// public/js/display.js
$(function () {
    $("#nav-placeholder").load("navbar.html");
  });
  
  // Fetch daily consumption data and update the chart
  function fetchAndRenderData() {
    $.ajax({
      url: '/dashboard',
      type: 'GET',
      headers: { Authorization: localStorage.getItem('token') },
      success: function (data) {
        updateChart(data.dailyConsumptionData);
      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
    });
  }
  
  // Call the function to fetch and render daily consumption data
  fetchAndRenderData();
  
  // Function to create a bar chart
  function createBarChart(canvasId, labels, data, label) {
    const canvas = document.getElementById(canvasId);
  
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }
  
  // Update the daily consumption chart
  function updateChart(dailyConsumptionData) {
    createBarChart('dailyConsumptionChart', dailyConsumptionData.dates, dailyConsumptionData.consumption, 'Daily Consumption');
  }
  