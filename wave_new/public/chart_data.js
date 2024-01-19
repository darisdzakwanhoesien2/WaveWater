// Sample user-specific data (you should replace this with actual data from your server)
const userSpecificData = {
  ebrw: [640, 680, 700],
  math: [680, 640, 750],
  total: [1320, 1320, 1400]
};

// ,
//   improvedSubject: 'Problem-Solving and Data Analysis',
//   confusedSubject: 'Expression of Ideas',

// Function to create a bar chart
function createBarChart(canvasId, labels, data, label) {
  const canvas = document.getElementById(canvasId);

  // Create the chart
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

// Update the user-specific data placeholders in the HTML
function updateUserDashboard(userData) {
  const dashboardContainer = document.getElementById('userDashboard');

  // Clear existing content
  dashboardContainer.innerHTML = '';

  // Create elements for each section
  const sections = ['ebrw', 'math', 'total'];
  sections.forEach(section => {
    const sectionContainer = document.createElement('div');
    sectionContainer.classList.add('col-sm');

    const chartCanvasId = `${section}Chart`;
    sectionContainer.innerHTML = `<canvas id="${chartCanvasId}"></canvas>`;

    dashboardContainer.appendChild(sectionContainer);

    // Create a chart for each section
    createBarChart(chartCanvasId, ['Test 1', 'Test 2', 'Test 3'], userData[section], section.toUpperCase());
  });
}

// Fetch user-specific data and update the charts and dashboard
function fetchAndRenderData() {
  // You should replace this with actual AJAX/fetch request to your server
  // to get user-specific data.
  // Here, we're using the sample data for demonstration purposes.
  updateUserDashboard(userSpecificData);
}

// Call the function to fetch and render user-specific data
fetchAndRenderData();
