    // Declare the score_test data
    const score_test = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      data1: [10, 20, 30],
      // data2: [15, 25, 35]
    };

    // Declare the score_test.db data
    const score_test_db = {
      labels: score_test.labels,
      data1: score_test.data1
      // data2: score_test.data2
    };

    // Get the canvas element
    const ebrwCanvas = document.getElementById('barChart');

    // Create the chart
    new Chart(ebrwCanvas, {
      type: 'bar',
      data: {
        labels: score_test_db.labels, // Use the labels from the score_test.db data
        datasets: [
          {
            label: 'Data 1',
            data: score_test_db.data1, // Use the data for Data 1 from the score_test.db data
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the bar color
            borderColor: 'rgba(75, 192, 192, 1)', // Customize the border color
            borderWidth: 1 // Customize the border width
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
