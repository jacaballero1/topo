// Variables globales
let gridDivsX;
let gridDivsY;
const holeCount = localStorage.getItem('holeCount');
const positions = JSON.parse(localStorage.getItem('positions'));
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let selectedPositions = []; // Para almacenar las posiciones seleccionadas por el usuario

// Función para establecer el juego
function setup() {
  const dimensions = localStorage.getItem('dimensions');
  const [rowCount, colCount] = dimensions.split('x');
  gridDivsX = parseInt(colCount);
  gridDivsY = parseInt(rowCount);
  setGame();
  setInterval(setMole, 2000); // Llama a setMole cada segundo
  setInterval(setPlant, 1700); // Llama a setPlant cada 2 segundos
}

// Función para establecer el juego
// Modify the setGame function
function setGame() {
  const board = document.getElementById("board");
  board.innerHTML = ''; // Clear any previous content

  for (let row = 0; row < gridDivsY; row++) {
    for (let col = 0; col < gridDivsX; col++) {
      let tile = document.createElement("div");
      tile.id = `${row}-${col}`; // Use row-col to identify each tile
      tile.addEventListener("click", selectTile);
      board.appendChild(tile);
    }
  }

  // Set the grid template columns and rows based on the values entered by the administrator
  board.style.gridTemplateColumns = `repeat(${gridDivsX}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gridDivsY}, 1fr)`;

  // Show the holes at the selected positions by the administrator
  positions.forEach(pos => {
    const [row, col] = pos.split(',').map(Number);
    const tile = document.getElementById(`${row}-${col}`);
    if (tile) {
      tile.innerHTML = `<img src="./monty-mole.png" class="game-item">`;
    }
  });
}


// Función para seleccionar una posición
function selectTile() {
  if (gameOver) {
    return;
  }
  if (this.querySelector("img") && this.querySelector("img").src.includes("piranha-plant.png")) {
    document.getElementById("score").innerText = "PERDISTE " + score.toString();
    gameOver = true;
    createRestartButton(); // Create the restart button        
  } else if (this.querySelector("img") && this.querySelector("img").src.includes("monty-mole.png")) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
    let mole = this.querySelector("img");
    mole.src = "topo golpeado.png"; // Reemplaza esto con la ruta correcta a la imagen golpeada
  }
}

// Funciones setMole y setPlant
function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
    currMoleTile.classList.remove("pop-down");
  }
  let mole = document.createElement("img");
  mole.src = "./monty-mole.png"; // Asegúrate de que la ruta a la imagen sea correcta
  mole.classList.add("game-item");

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  if (!currMoleTile) return; // Verifica si currMoleTile existe
  currMoleTile.appendChild(mole);
  currMoleTile.classList.add("pop-up");
  mole.style.bottom = "-100%"; 
  setTimeout(() => {
    currMoleTile.classList.remove("pop-up");
    mole.style.bottom = "0"; 
  }, 1000);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
    currPlantTile.classList.remove("pop-down");
  }
  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png"; // Asegúrate de que la ruta a la imagensea correcta
  plant.classList.add("game-item");

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  if (!currPlantTile) return; // Verifica si currPlantTile existe
  currPlantTile.appendChild(plant);
  currPlantTile.classList.add("pop-up");
  plant.style.bottom = "-100%"; 
  setTimeout(() => {
    currPlantTile.classList.remove("pop-up");
    plant.style.bottom = "0"; 
  }, 1000);
}

// Función getRandomTile
function getRandomTile() {
  const row = Math.floor(Math.random() * gridDivsY);
  const col = Math.floor(Math.random() * gridDivsX);
  return `${row}-${col}`;
}

// Funciones createRestartButton y restartGame
function createRestartButton() {
  let restartButton = document.createElement("button");
  restartButton.id = "restart-button";
  restartButton.textContent = "Reiniciar";
  document.getElementById("container").appendChild(restartButton);
  restartButton.addEventListener("click", restartGame);
}

function restartGame(){
  gameOver = false;
  score = 0;
  document.getElementById("score").innerText = "0";
  document.getElementById("restart-button").remove(); // Remove the restart button
  setGame(); // Restart the game
}

// Event listener para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', setup);