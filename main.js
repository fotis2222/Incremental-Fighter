"use strict";
var fighter;
(function (fighter) {
    const userOffenseDisplay = document.getElementById("userOffense");
    const userDefenseDisplay = document.getElementById("userDefense");
    const enemyOffenseDisplay = document.getElementById("enemyOffense");
    const enemyDefenseDisplay = document.getElementById("enemyDefense");
    const stageDisplay = document.getElementById("stage");
    const localStorageKey = "fighterGameState";
    let gameData = {
        offense: 0,
        defense: 0,
        mana: 0,
        manaMulti: 0,
        fm: 1,
        stage: 1,
    };
    console.log("Initial gameData:", gameData);
    console.log("userOffenseDisplay:", userOffenseDisplay);
    console.log("userDefenseDisplay:", userDefenseDisplay);
    console.log("enemyOffenseDisplay:", enemyOffenseDisplay);
    console.log("enemyDefenseDisplay:", enemyDefenseDisplay);
    console.log("stageDisplay:", stageDisplay);
    // Function to save game state to localStorage
    function saveGame() {
        localStorage.setItem(localStorageKey, JSON.stringify(gameData));
    }
    // Function to load game state from localStorage
    function loadGame() {
        const savedGame = localStorage.getItem(localStorageKey);
        console.log("Saved game data:", savedGame);
        if (savedGame) {
            try {
                gameData = JSON.parse(savedGame);
                console.log("Loaded gameData:", gameData);
                updateThingies();
            }
            catch (e) {
                console.error("Failed to parse saved game data:", e);
            }
        }
    }
    function updateThingies() {
        console.log("Updating display with gameData:", gameData);
        if (userOffenseDisplay)
            userOffenseDisplay.innerHTML = `${gameData.offense}`;
        if (userDefenseDisplay)
            userDefenseDisplay.innerHTML = `${gameData.defense}`;
        if (enemyOffenseDisplay)
            enemyOffenseDisplay.innerHTML = `${3 * 10 ** gameData.stage}`;
        if (enemyDefenseDisplay)
            enemyDefenseDisplay.innerHTML = `${10 ** (gameData.stage - 1)}`;
        if (stageDisplay)
            stageDisplay.innerHTML = `Stage: ${gameData.stage}`;
    }
    function statUp(stat) {
        if (stat === "defense") {
            gameData.defense =
                Math.round((gameData.defense + 0.1 * gameData.fm) * 10) / 10;
        }
        else if (stat === "offense") {
            gameData.offense = Math.round((gameData.offense + gameData.fm) * 10) / 10;
        }
        saveGame(); // Save game state after updating
        updateThingies();
    }
    fighter.statUp = statUp;
    function fight() {
        if (gameData.offense > 3 * 10 ** gameData.stage ||
            gameData.defense > 10 ** (gameData.stage - 1)) {
            gameData.stage += 1;
            saveGame(); // Save game state after increasing stage
            updateThingies();
        }
    }
    fighter.fight = fight;
    // On page load, try to load saved game state
    window.addEventListener("load", loadGame);
})(fighter || (fighter = {}));
