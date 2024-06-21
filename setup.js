document.getElementById('setupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dimensions = document.getElementById('dimensions').value;
    const holeCount = document.getElementById('holeCount').value;
    const positions = document.getElementById('positions').value.split(',');

    localStorage.setItem('dimensions', dimensions);
    localStorage.setItem('holeCount', holeCount);
    localStorage.setItem('positions', JSON.stringify(positions));

    window.location.href = "juego.html"; // Redirige al jugador a la página de juego
});
