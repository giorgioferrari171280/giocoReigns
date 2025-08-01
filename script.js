// ===================================================================================
// --- LOGICA DI GIOCO ---
// Questo file gestisce il funzionamento del gioco.
// ===================================================================================

// --- STATO DEL GIOCO ---
let gameState = {};
const maxMetricValue = 10;
const SAVE_KEY = 'lumberjackGameState';
const HOF_KEY = 'lumberjackHallOfFame';
const STARTING_CHAPTER = 'gildaDeiBoschi';

// --- ELEMENTI DEL DOM ---
const mainMenu = document.getElementById('main-menu');
const mainTitle = document.getElementById('main-title');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const manualScreen = document.getElementById('manual-screen');
const creditsScreen = document.getElementById('credits-screen');
const hofScreen = document.getElementById('hof-screen');

const newGameButton = document.getElementById('new-game-button');
const loadGameButton = document.getElementById('load-game-button');
const importGameButton = document.getElementById('import-game-button');
const manualButton = document.getElementById('manual-button');
const creditsButton = document.getElementById('credits-button');
const hofButton = document.getElementById('hof-button');
const volumeSlider = document.getElementById('volume-slider');
const backgroundMusic = document.getElementById('background-music');

const scoreDisplay = document.getElementById('score-display');
const metricsDisplay = document.getElementById('metrics-display');
const scenarioImage = document.getElementById('scenario-image');
const scenarioDescription = document.getElementById('scenario-description');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const downloadGameButton = document.getElementById('download-game-button');
const returnToMenuButton = document.getElementById('return-to-menu-button');

const endImage = document.getElementById('end-image');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');
const finalScore = document.getElementById('final-score');
const continueButton = document.getElementById('continue-button');
const endScreenMenuButton = document.getElementById('end-screen-menu-button');

const manualBackButton = document.getElementById('manual-back-button');
const creditsBackButton = document.getElementById('credits-back-button');
const hofBackButton = document.getElementById('hof-back-button');
const importFileInput = document.getElementById('import-file-input');


// --- FUNZIONI DI GESTIONE SCHERMATE ---
function showScreen(screen) {
    mainMenu.classList.add('hidden');
    gameScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    manualScreen.classList.add('hidden');
    creditsScreen.classList.add('hidden');
    hofScreen.classList.add('hidden');
    screen.classList.remove('hidden');
    if (screen === mainMenu) {
        updateLoadButtonState();
    }
}

// --- LOGICA HALL OF FAME ---
function getHighScores() {
    const scoresJSON = localStorage.getItem(HOF_KEY);
    return scoresJSON ? JSON.parse(scoresJSON) : [];
}

function saveHighScores(scores) {
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 5);
    localStorage.setItem(HOF_KEY, JSON.stringify(topScores));
}

function checkAndAddHighScore(score) {
    const highScores = getHighScores();
    const lowestHighScore = highScores.length < 5 ? 0 : highScores[4].score;

    if (score > lowestHighScore) {
        const name = prompt("Nuovo record! Inserisci il tuo nome (3 lettere):", "AAA");
        if (name && name.trim()) {
            const newScore = { name: name.slice(0, 3).toUpperCase(), score: score };
            highScores.push(newScore);
            saveHighScores(highScores);
        }
    }
}

function displayHallOfFame() {
    const highScores = getHighScores();
    const hofList = document.getElementById('hof-list');
    hofList.innerHTML = '';
    if (highScores.length === 0) {
        hofList.innerHTML = '<li class="text-gray-400">Nessun punteggio registrato.</li>';
    } else {
        highScores.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="w-1/3 text-left">${index + 1}. ${entry.name}</span> <span class="w-2/3 text-right">${entry.score}</span>`;
            li.className = 'flex justify-between px-4';
            hofList.appendChild(li);
        });
    }
    showScreen(hofScreen);
}

// --- LOGICA CREDITS ---
function displayCredits() {
    document.getElementById('dev-name').textContent = developer.name;
    document.getElementById('dev-image').src = developer.image;
    document.getElementById('dev-message').textContent = developer.message;
    const devLink = document.getElementById('dev-link');
    devLink.href = developer.link;
    if(!developer.link) devLink.classList.add('hidden');
    else devLink.classList.remove('hidden');

    showScreen(creditsScreen);
}


// --- LOGICA DI SALVATAGGIO/CARICAMENTO/IMPORT/EXPORT ---
function saveGame() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    updateLoadButtonState();
}

function loadGame() {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
        gameState = JSON.parse(savedData);
        showScreen(gameScreen);
        updateUI();
        displayCurrentScenario();
    }
}

function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
    updateLoadButtonState();
}

function updateLoadButtonState() {
    loadGameButton.disabled = !localStorage.getItem(SAVE_KEY);
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.player && importedData.player.metrics && importedData.scenarios && importedData.hasOwnProperty('currentChapterId')) {
                gameState = importedData;
                saveGame();
                loadGame();
            } else {
                alert('File di salvataggio non valido o corrotto.');
            }
        } catch (error) {
            alert('Impossibile leggere il file di salvataggio.');
        }
    };
    reader.readAsText(file);
    importFileInput.value = '';
}

function downloadSaveFile() {
    if (!gameState || !gameState.player) return;
    const dataStr = JSON.stringify(gameState);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salvataggio_gilda.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- LOGICA DEL GIOCO ---
function startChapter(chapterId) {
    const chapter = chapters[chapterId];
    if (!chapter) {
        console.error(`Capitolo non trovato: ${chapterId}`);
        return;
    }

    if (!gameState.player) {
         gameState.player = JSON.parse(JSON.stringify(initialPlayerState));
    }

    gameState.player.metrics = {};
    for (const metricKey in chapter.metrics) {
        gameState.player.metrics[metricKey] = 5;
    }

    gameState.currentChapterId = chapterId;
    gameState.scenarios = [...chapter.scenarios].sort(() => Math.random() - 0.5);
    gameState.currentScenarioIndex = -1;

    mainTitle.textContent = chapter.title;
    showScreen(gameScreen);
    nextScenario();
}

function updateUI() {
    const chapter = chapters[gameState.currentChapterId];
    metricsDisplay.innerHTML = '';
    for (const key in chapter.metrics) {
        const metricName = chapter.metrics[key];
        const value = gameState.player.metrics[key];
        const percentage = (value / maxMetricValue) * 100;
        metricsDisplay.innerHTML += `
            <div>
                <span class="text-sm font-bold">${metricName}</span>
                <div class="w-full metric-bar-bg rounded-full h-2.5">
                    <div class="metric-bar-fill h-2.5 rounded-full" style="width: ${percentage}%"></div>
                </div>
            </div>`;
    }
    scoreDisplay.textContent = `Punteggio: ${gameState.player.score}`;
}

function displayCurrentScenario() {
    const scenario = gameState.scenarios[gameState.currentScenarioIndex];
    scenarioImage.src = scenario.image;
    scenarioImage.alt = `Immagine per: ${scenario.description}`;
    scenarioDescription.textContent = scenario.description;
    yesButton.textContent = scenario.choices.yes.text;
    noButton.textContent = scenario.choices.no.text;
}

function nextScenario() {
    gameState.currentScenarioIndex++;
    if (gameState.currentScenarioIndex >= gameState.scenarios.length) {
        endGame("success");
        return;
    }
    displayCurrentScenario();
    updateUI();
    saveGame();
}

function selectChoice(choice) {
    const scenario = gameState.scenarios[gameState.currentScenarioIndex];
    if (!scenario) return;

    gameState.player.score += 10;

    const effects = scenario.choices[choice].effects;
    for (const key in effects) {
        if (gameState.player.metrics.hasOwnProperty(key)) {
            gameState.player.metrics[key] += effects[key];
            gameState.player.metrics[key] = Math.max(0, Math.min(maxMetricValue, gameState.player.metrics[key]));
        }
    }
    for (const key in gameState.player.metrics) {
        if (gameState.player.metrics[key] <= 0) { endGame(key, 'low'); return; }
        if (gameState.player.metrics[key] >= maxMetricValue) { endGame(key, 'high'); return; }
    }
    nextScenario();
}

function endGame(reason, state) {
    const finalScoreValue = gameState.player.score;
    deleteSave();
    showScreen(endScreen);

    const chapterEndings = chapters[gameState.currentChapterId].endings;
    let finalEnding;

    if (reason === "success") {
        finalEnding = chapterEndings.success;
    } else {
        finalEnding = chapterEndings[reason] ? chapterEndings[reason][state] : { title: "Fine Improvvisa", message: "Il tuo percorso si interrompe qui.", image: "https://placehold.co/400x400/000000/ffffff?text=?"};
    }

    endTitle.textContent = finalEnding.title;
    endMessage.textContent = finalEnding.message;
    endImage.src = finalEnding.image;
    endImage.alt = `Immagine finale: ${finalEnding.title}`;
    finalScore.textContent = `Punteggio Finale: ${finalScoreValue}`;

    checkAndAddHighScore(finalScoreValue);

    if (finalEnding.nextChapter) {
        continueButton.classList.remove('hidden');
        endScreenMenuButton.classList.add('hidden');
        continueButton.dataset.nextChapter = finalEnding.nextChapter;
    } else {
        continueButton.classList.add('hidden');
        endScreenMenuButton.classList.remove('hidden');
    }
}

// --- INIZIALIZZAZIONE ---
function init() {
    // Listener Menu Principale
    newGameButton.addEventListener('click', () => {
        gameState = {};
        startChapter(STARTING_CHAPTER);
    });
    loadGameButton.addEventListener('click', loadGame);
    importGameButton.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleFileImport);
    manualButton.addEventListener('click', () => showScreen(manualScreen));
    creditsButton.addEventListener('click', displayCredits);
    hofButton.addEventListener('click', displayHallOfFame);

    // Listener Schermata di Gioco
    yesButton.addEventListener('click', () => selectChoice('yes'));
    noButton.addEventListener('click', () => selectChoice('no'));
    downloadGameButton.addEventListener('click', downloadSaveFile);
    returnToMenuButton.addEventListener('click', () => showScreen(mainMenu));

    // Listener Schermata Finale
    endScreenMenuButton.addEventListener('click', () => showScreen(mainMenu));
    continueButton.addEventListener('click', (e) => {
        const nextChapterId = e.target.dataset.nextChapter;
        if (nextChapterId) {
            startChapter(nextChapterId);
        }
    });

    // Listener Pulsanti "Indietro"
    manualBackButton.addEventListener('click', () => showScreen(mainMenu));
    creditsBackButton.addEventListener('click', () => showScreen(mainMenu));
    hofBackButton.addEventListener('click', () => showScreen(mainMenu));

    // Listener Audio
    const savedVolume = localStorage.getItem('lumberjackVolume');
    volumeSlider.value = savedVolume ? savedVolume : 0.5;
    backgroundMusic.volume = volumeSlider.value;
    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value;
        localStorage.setItem('lumberjackVolume', e.target.value);
    });
    backgroundMusic.play().catch(() => {});

    // Listener Tastiera
    document.addEventListener('keydown', (e) => {
        if (!gameScreen.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') {
                yesButton.click();
                yesButton.classList.add('scale-105');
                setTimeout(() => yesButton.classList.remove('scale-105'), 150);
            } else if (e.key === 'ArrowLeft') {
                noButton.click();
                noButton.classList.add('scale-105');
                setTimeout(() => noButton.classList.remove('scale-105'), 150);
            }
        }
    });

    showScreen(mainMenu);
}

window.onload = init;
