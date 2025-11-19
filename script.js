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
      ZA WARUDOOO!
------------------------------ */
let enemyPaused = false; 

document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    const key = e.key.toLowerCase();

    // Za Warudo!
    if (key === "f" && !enemyPaused) {
        enemyPaused = true;
        setTimeout(() => { enemyPaused = false; }, 5000);
    }

    // Rodo rolla da!
    if (key === "r") {
        bar += 65; 
        enemyHP -= 20; 
        if (enemyHP < 0) enemyHP = 0;

        updateUI();
        checkEnd();
    }
});
/* ------------------------------
      ORA ORA ORA ORA!
------------------------------ */
setInterval(() => {
    if (!gameRunning) return;
      if(!enemyPaused)
    bar -= 0.4;  
    if (bar < 0) bar = 0;

    if (bar < 30) {
        playerHP -= 0.4;
        if (playerHP < 0) playerHP = 0;
    }

    updateUI();
    checkEnd();
}, 30);


/* ------------------------------
      MUDA MUDA!
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
        msgElem.textContent = "RETIRED!";
        endGame();
    }

    if (enemyHP <= 0) {
        msgElem.textContent = "This is the GREATEST HIGH!";
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
