var dynamicTitleElement = document.querySelector('.title');

        function showOverview() {
            document.getElementById('overview').style.display = 'block';
            document.getElementById('details').style.display = 'none';
        }

        function showDetails() {
            document.getElementById('overview').style.display = 'none';
            document.getElementById('details').style.display = 'block';
        }

