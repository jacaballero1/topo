let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 2000); // Every 1 second call setMole
    setInterval(setPlant, 1700); // Every 2 seconds call setPlant
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
        currMoleTile.classList.remove("pop-down");
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.classList.add("game-item");

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
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
    plant.src = "./piranha-plant.png";
    plant.classList.add("game-item");

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
    currPlantTile.classList.add("pop-up");
    plant.style.bottom = "-100%"; 
    setTimeout(() => {
        currPlantTile.classList.remove("pop-up");
        plant.style.bottom = "0"; 
    }, 1000);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // Update score HTML
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "LO SIENTO PERDISTE!: " + score.toString(); // Update score HTML
        gameOver = true;
    }
}
