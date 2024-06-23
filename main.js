"use strict";
const userOffenseDisplay = document.getElementById("userOffense");
const userDefenseDisplay = document.getElementById("userDefense");
const enemyOffenseDisplay = document.getElementById("enemyOffense");
const enemyDefenseDisplay = document.getElementById("enemyDefense");
const stageDisplay = document.getElementById("stage");
let game = {
    offense: 0,
    defense: 0,
    mana: 0,
    manaMulti: 0,
    fm: 1,
    stage: 1,
};
// Function to save game state to localStorage
function saveGame() {
    localStorage.setItem("gameState", JSON.stringify(game));
}
// Function to load game state from localStorage
function loadGame() {
    const savedGame = localStorage.getItem("gameState");
    if (savedGame) {
        game = JSON.parse(savedGame);
        updateThingies();
    }
}
function updateThingies() {
    if (userOffenseDisplay)
        userOffenseDisplay.innerHTML = `${game.offense.toFixed(1)}`;
    if (userDefenseDisplay)
        userDefenseDisplay.innerHTML = `${game.defense.toFixed(1)}`;
    if (enemyOffenseDisplay)
        enemyOffenseDisplay.innerHTML = `${(3 * 10 ** game.stage).toFixed(1)}`;
    if (enemyDefenseDisplay)
        enemyDefenseDisplay.innerHTML = `${(10 ** (game.stage - 1)).toFixed(1)}`;
    if (stageDisplay)
        stageDisplay.innerHTML = `Stage: ${game.stage}`;
}
function statUp(stat) {
    if (stat === "defense") {
        game.defense = Math.round((game.defense + 0.1 * game.fm) * 10) / 10;
    }
    else if (stat === "offense") {
        game.offense = Math.round((game.offense + game.fm) * 10) / 10;
    }
    saveGame(); // Save game state after updating
    updateThingies();
}
function fight() {
    if (game.offense > 3 * 10 ** game.stage ||
        game.defense > 10 ** (game.stage - 1)) {
        game.stage += 1;
        saveGame(); // Save game state after increasing stage
        updateThingies();
    }
}
// On page load, try to load saved game state
loadGame();
