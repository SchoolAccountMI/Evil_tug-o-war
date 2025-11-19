let bar = 50;         
let playerHP = 100;
let enemyHP = 100;

const playerHPDisplay = document.getElementById("playerHP");
const enemyHPDisplay  = document.getElementById("enemyHP");
const barElem         = document.getElementById("bar");
const msgElem         = document.getElementById("message");
const restartBtn      = document.getElementById("restart");
const clickBtn        = document.getElementById("click-btn");

let gameRunning = true;

/* ------------------------------
      ENEMY PRESSURE LOOP
------------------------------ */
setInterval(() => {
    if (!gameRunning) return;

    bar -= 0.4;  
    if (bar < 0) bar = 0;

    // If enemy is dominating < 30%
    if (bar < 30) {
        playerHP -= 0.4;
        if (playerHP < 0) playerHP = 0;
    }

    updateUI();
    checkEnd();
}, 30);


/* ------------------------------
      PLAYER CLICK = PUSH BAR
------------------------------ */
clickBtn.addEventListener("click", () => {
    if (!gameRunning) return;

    bar += 3.3;
    if (bar > 100) bar = 100;

    // If winning > 70%
    if (bar > 70) {
        enemyHP -= 0.6;
        if (enemyHP < 0) enemyHP = 0;
    }

    updateUI();
    checkEnd();
});


/* ------------------------------
      UPDATE UI
------------------------------ */
function updateUI() {
    barElem.style.width = bar + "%";
    playerHPDisplay.textContent = Math.round(playerHP);
    enemyHPDisplay.textContent  = Math.round(enemyHP);
}


/* ------------------------------
      CHECK WIN/LOSS
------------------------------ */
function checkEnd() {
    if (playerHP <= 0) {
        msgElem.textContent = "You Lost!";
        endGame();
    }

    if (enemyHP <= 0) {
        msgElem.textContent = "You Won!";
        endGame();
    }
}

function endGame() {
    gameRunning = false;
    restartBtn.style.display = "inline-block";
}


/* ------------------------------
      RESTART
------------------------------ */
restartBtn.addEventListener("click", () => {
    bar = 50;
    playerHP = 100;
    enemyHP = 100;
    gameRunning = true;
    msgElem.textContent = "";
    restartBtn.style.display = "none";
    updateUI();
});


updateUI();
