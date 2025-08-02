// ===================================================================================
// --- LOGICA DI GIOCO ---
// Questo file gestisce il funzionamento del gioco.
// ===================================================================================

// --- STATO DEL GIOCO ---
let gameState = {};
const maxMetricValue = 20;
const SAVE_KEY = 'lumberjackGameState';
const HOF_KEY = 'lumberjackHallOfFame';
const STARTING_CHAPTER = 'prologo';

// --- SISTEMA CONDIZIONI DI VITTORIA ---
function initializeConditionTracking() {
    gameState.conditionTracking = {
        roundsPlayed: 0,
        metricHistory: [],
        criticalStates: {},
        achievedWinConditions: [],
        triggeredLoseConditions: []
    };
}

function updateConditionTracking() {
    if (!gameState.conditionTracking) {
        initializeConditionTracking();
    }
    
    // Aggiorna round giocati
    gameState.conditionTracking.roundsPlayed++;
    
    // Salva snapshot delle metriche
    const currentMetrics = JSON.parse(JSON.stringify(gameState.player.metrics));
    gameState.conditionTracking.metricHistory.push(currentMetrics);
    
    // Mantieni solo ultimi 10 round di storia
    if (gameState.conditionTracking.metricHistory.length > 10) {
        gameState.conditionTracking.metricHistory.shift();
    }
}

function evaluateOperator(a, operator, b) {
    switch (operator) {
        case '>=': return a >= b;
        case '<=': return a <= b;
        case '>': return a > b;
        case '<': return a < b;
        case '==': return a == b;
        case '!=': return a != b;
        default: return false;
    }
}

function checkSingleCondition(condition) {
    const value = gameState.player.metrics[condition.metric];
    return evaluateOperator(value, condition.operator, condition.value);
}

function checkMultipleConditions(conditions, operator = 'AND') {
    if (operator === 'AND') {
        return conditions.every(condition => checkSingleCondition(condition));
    } else if (operator === 'OR') {
        return conditions.some(condition => checkSingleCondition(condition));
    }
    return false;
}

function checkBalancedMetrics(condition) {
    for (const metricKey of condition.metrics) {
        const value = gameState.player.metrics[metricKey];
        if (value < condition.min_value || value > condition.max_value) {
            return false;
        }
    }
    return true;
}

function checkProgressionGoal(condition) {
    const currentValue = gameState.player.metrics[condition.metric];
    const roundsPlayed = gameState.conditionTracking.roundsPlayed;
    
    return currentValue >= condition.target_value && roundsPlayed <= condition.max_rounds;
}

function checkMetricCritical(condition) {
    const tracking = gameState.conditionTracking;
    const metricKey = condition.metric;
    
    // Inizializza contatore se non esiste
    if (!tracking.criticalStates[metricKey]) {
        tracking.criticalStates[metricKey] = 0;
    }
    
    const currentValue = gameState.player.metrics[metricKey];
    const isCritical = evaluateOperator(currentValue, condition.operator, condition.value);
    
    if (isCritical) {
        tracking.criticalStates[metricKey]++;
        return tracking.criticalStates[metricKey] >= condition.rounds;
    } else {
        tracking.criticalStates[metricKey] = 0;
        return false;
    }
}

function checkCondition(condition) {
    switch (condition.type) {
        case 'survive_rounds':
            return gameState.conditionTracking.roundsPlayed >= condition.rounds;
            
        case 'metric_threshold':
            return checkSingleCondition(condition);
            
        case 'multiple_metrics':
            return checkMultipleConditions(condition.conditions, condition.operator);
            
        case 'balanced_metrics':
            return checkBalancedMetrics(condition);
            
        case 'progression_goal':
            return checkProgressionGoal(condition);
            
        case 'metric_critical':
            return checkMetricCritical(condition);
            
        case 'metric_combination':
            return checkMultipleConditions(condition.conditions, condition.operator);
            
        case 'forbidden_combination':
            return checkMultipleConditions(condition.conditions, 'AND');
            
        default:
            return false;
    }
}

function evaluateWinConditions(conditions) {
    if (!conditions) return null;
    
    for (const condition of conditions) {
        if (checkCondition(condition)) {
            return condition;
        }
    }
    return null;
}

function evaluateLoseConditions(conditions) {
    if (!conditions) return null;
    
    for (const condition of conditions) {
        if (checkCondition(condition)) {
            return condition;
        }
    }
    return null;
}

function evaluateWinLoseConditions() {
    const chapter = chapters[gameState.currentChapterId];
    
    // Aggiorna tracking
    updateConditionTracking();
    
    // Controlla condizioni di sconfitta (priorità)
    const loseResult = evaluateLoseConditions(chapter.loseConditions);
    if (loseResult) {
        return { type: 'lose', condition: loseResult };
    }
    
    // Controlla condizioni di vittoria
    const winResult = evaluateWinConditions(chapter.winConditions);
    if (winResult) {
        return { type: 'win', condition: winResult };
    }
    
    return null; // Continua gioco
}

// --- ELEMENTI DEL DOM ---
const backgroundContainer = document.getElementById('background-container');
const mainMenu = document.getElementById('main-menu');
const mainTitle = document.getElementById('main-title');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const manualScreen = document.getElementById('manual-screen');
const creditsScreen = document.getElementById('credits-screen');
const hofScreen = document.getElementById('hof-screen');
const newGameModal = document.getElementById('new-game-modal');
const cutsceneScreen = document.getElementById('cutscene-screen');
const metricsSummaryScreen = document.getElementById('metrics-summary-screen');

const newGameButton = document.getElementById('new-game-button');
const loadGameButton = document.getElementById('load-game-button');
const importGameButton = document.getElementById('import-game-button');
const manualButton = document.getElementById('manual-button');
const creditsButton = document.getElementById('credits-button');
const hofButton = document.getElementById('hof-button');
const exitButton = document.getElementById('exit-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeGameButton = document.getElementById('volume-game-button');
const volumeModal = document.getElementById('volume-modal');
const volumeGameSlider = document.getElementById('volume-game-slider');
const volumeModalClose = document.getElementById('volume-modal-close');
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
const hofClearButton = document.getElementById('hof-clear-button');
const hofClearModal = document.getElementById('hof-clear-modal');
const hofClearConfirm = document.getElementById('hof-clear-confirm');
const hofClearCancel = document.getElementById('hof-clear-cancel');
const importFileInput = document.getElementById('import-file-input');

const playerNameInput = document.getElementById('player-name-input');
const startGameButton = document.getElementById('start-game-button');

const cutsceneImage = document.getElementById('cutscene-image');
const cutsceneText = document.getElementById('cutscene-text');
let cutsceneContinueButton = document.getElementById('cutscene-continue-button');

const achievementScreen = document.getElementById('achievement-screen');
const achievementsScreen = document.getElementById('achievements-screen');
const achievementImage = document.getElementById('achievement-image');
const achievementName = document.getElementById('achievement-name');
const achievementDescription = document.getElementById('achievement-description');
const achievementContinueButton = document.getElementById('achievement-continue-button');
const achievementsButton = document.getElementById('achievements-button');
const achievementsBackButton = document.getElementById('achievements-back-button');
const achievementsClearButton = document.getElementById('achievements-clear-button');
const achievementsClearModal = document.getElementById('achievements-clear-modal');
const achievementsClearConfirm = document.getElementById('achievements-clear-confirm');
const achievementsClearCancel = document.getElementById('achievements-clear-cancel');
const achievementsList = document.getElementById('achievements-list');

// Elementi schermata riepilogo metriche
const completedChapterTitle = document.getElementById('completed-chapter-title');
const finalMetricsDisplay = document.getElementById('final-metrics-display');
const scenariosCompleted = document.getElementById('scenarios-completed');
const finalScoreSummary = document.getElementById('final-score-summary');
const gameDuration = document.getElementById('game-duration');
const endReason = document.getElementById('end-reason');
const metricsSummaryContinueButton = document.getElementById('metrics-summary-continue-button');


// --- FUNZIONI DI GESTIONE SFONDI ---
function updateBackground(screenName) {
    const imageUrl = backgrounds[screenName] || backgrounds.default;

    const tempImage = new Image();
    tempImage.onload = () => {
        backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;
        backgroundContainer.style.opacity = 1;
    };
    tempImage.onerror = () => {
        backgroundContainer.style.backgroundImage = '';
        backgroundContainer.style.backgroundColor = backgrounds.default;
        backgroundContainer.style.opacity = 1;
    };

    backgroundContainer.style.opacity = 0;
    setTimeout(() => {
        tempImage.src = imageUrl;
    }, 500);
}


// --- SISTEMA ACHIEVEMENT ---
function showAchievement(achievementId, callback) {
    const achievement = AchievementRegistry[achievementId];
    if (!achievement) {
        console.warn(`Achievement '${achievementId}' non trovato`);
        if (callback) callback();
        return;
    }
    
    achievementImage.src = achievement.image;
    achievementName.textContent = achievement.name;
    achievementDescription.textContent = achievement.description;
    
    const continueHandler = () => {
        achievementContinueButton.removeEventListener('click', continueHandler);
        if (callback) callback();
    };
    
    achievementContinueButton.addEventListener('click', continueHandler);
    showScreen(achievementScreen);
}

function displayAchievementsList() {
    achievementsList.innerHTML = '';
    
    const totalAchievements = getTotalAchievements();
    const unlockedCount = getUnlockedAchievements().length;
    const progress = getAchievementProgress();
    
    // Header con progresso
    const progressHeader = document.createElement('div');
    progressHeader.className = 'col-span-2 mb-4 p-4 bg-gray-800 rounded-lg';
    progressHeader.innerHTML = `
        <div class="text-lg font-bold text-orange-400">Progresso: ${unlockedCount}/${totalAchievements} (${progress}%)</div>
        <div class="w-full bg-gray-700 rounded-full h-3 mt-2">
            <div class="bg-orange-500 h-3 rounded-full" style="width: ${progress}%"></div>
        </div>
    `;
    achievementsList.appendChild(progressHeader);
    
    // Achievement cards
    for (const id in AchievementRegistry) {
        const achievement = AchievementRegistry[id];
        const rarity = AchievementRarity[achievement.rarity];
        const isUnlocked = achievement.unlocked;
        
        const card = document.createElement('div');
        card.className = `p-4 rounded-lg border-2 ${isUnlocked ? 'bg-gray-800' : 'bg-gray-900 opacity-60'}`;
        card.style.borderColor = rarity.border;
        
        const cardContent = `
            <div class="mb-3">
                <img src="${achievement.image}" alt="${achievement.name}" 
                     class="w-16 h-16 mx-auto rounded-lg object-cover ${isUnlocked ? '' : 'grayscale'}">
            </div>
            <h3 class="font-bold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}">${achievement.name}</h3>
            <p class="text-xs text-gray-400 mb-2">${achievement.description}</p>
            <div class="text-xs font-semibold" style="color: ${rarity.color}">${rarity.name}</div>
            ${achievement.unlockedAt ? `<div class="text-xs text-gray-500 mt-1">Sbloccato: ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>` : ''}
        `;
        
        card.innerHTML = cardContent;
        
        if (isUnlocked) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                showAchievement(id, () => showScreen(achievementsScreen));
            });
        }
        
        achievementsList.appendChild(card);
    }
    
    showScreen(achievementsScreen);
}

function processAchievements(newAchievements, callback) {
    if (newAchievements.length === 0) {
        if (callback) callback();
        return;
    }
    
    // Mostra il primo achievement della lista
    const achievementId = newAchievements[0];
    
    if (newAchievements.length > 1) {
        // Se ci sono più achievement, mostra gli altri dopo
        showAchievement(achievementId, () => {
            processAchievements(newAchievements.slice(1), callback);
        });
    } else {
        // Solo un achievement
        showAchievement(achievementId, callback);
    }
}

// --- FUNZIONI DI GESTIONE SCHERMATE ---
function showScreen(screen) {
    const screenMap = {
        'main-menu': 'mainMenu',
        'game-screen': 'game',
        'manual-screen': 'manual',
        'hof-screen': 'hallOfFame',
        'credits-screen': 'mainMenu',
        'end-screen': 'game',
        'cutscene-screen': 'game', // Cutscenes use the game background
        'metrics-summary-screen': 'game' // Metrics summary uses the game background
    };
    const screenName = screenMap[screen.id] || 'default';
    updateBackground(screenName);

    mainMenu.classList.add('hidden');
    gameScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    manualScreen.classList.add('hidden');
    creditsScreen.classList.add('hidden');
    hofScreen.classList.add('hidden');
    cutsceneScreen.classList.add('hidden');
    achievementScreen.classList.add('hidden');
    achievementsScreen.classList.add('hidden');
    metricsSummaryScreen.classList.add('hidden');
    screen.classList.remove('hidden');

    if (screen === mainMenu) {
        updateLoadButtonState();
    }
}

// --- LOGICA CUTSCENE ---
function showCutscene(cutscene, callback) {
    if (!cutscene) {
        callback();
        return;
    }

    // Supporta sia cutscene singole che multi-slide
    let slides = [];
    
    // Se è una cutscene multi-slide (array di slides)
    if (cutscene.slides && Array.isArray(cutscene.slides)) {
        slides = cutscene.slides;
    } 
    // Se è una cutscene singola (formato classico)
    else if (cutscene.image && cutscene.text) {
        slides = [{ image: cutscene.image, text: cutscene.text }];
    }
    // Se non è nessuno dei due formati, salta
    else {
        callback();
        return;
    }

    let currentSlideIndex = 0;

    function showCurrentSlide() {
        const slide = slides[currentSlideIndex];
        cutsceneImage.src = slide.image;
        cutsceneText.textContent = slide.text;
        
        // Aggiorna il testo del pulsante per indicare il progresso
        if (currentSlideIndex < slides.length - 1) {
            cutsceneContinueButton.textContent = `Continua... (${currentSlideIndex + 1}/${slides.length})`;
        } else {
            cutsceneContinueButton.textContent = 'Continua...';
        }
    }

    // Rimuovi qualsiasi listener precedente per evitare accumuli
    const oldContinueButton = cutsceneContinueButton.cloneNode(true);
    cutsceneContinueButton.parentNode.replaceChild(oldContinueButton, cutsceneContinueButton);
    cutsceneContinueButton = oldContinueButton;

    const continueHandler = () => {
        currentSlideIndex++;
        
        // Se ci sono ancora slide da mostrare
        if (currentSlideIndex < slides.length) {
            showCurrentSlide();
        } 
        // Se abbiamo finito tutte le slide
        else {
            cutsceneContinueButton.textContent = 'Continua...'; // Reset del testo
            showScreen(gameScreen);
            callback();
        }
    };

    cutsceneContinueButton.addEventListener('click', continueHandler);
    
    // Mostra la prima slide
    showCurrentSlide();
    showScreen(cutsceneScreen);
}

// --- SCHERMATA RIEPILOGO METRICHE ---
function showMetricsSummary(reason, state, finalScoreValue, callback) {
    // Popola il titolo del capitolo
    const currentChapter = chapters[gameState.currentChapterId];
    completedChapterTitle.textContent = `Capitolo: ${currentChapter.title}`;
    
    // Popola le metriche finali
    finalMetricsDisplay.innerHTML = '';
    
    // Usa direttamente getMetricInfo per ogni metrica del player
    for (const [metricKey, metricValue] of Object.entries(gameState.player.metrics)) {
        const metricInfo = getMetricInfo(metricKey);
        if (!metricInfo) {
            console.warn(`No metricInfo found for ${metricKey}`);
            continue;
        }
        
        const metricDiv = document.createElement('div');
        metricDiv.className = 'bg-[#2a2420] p-3 rounded-lg border border-[#4a3f37]';
        
        // Utilizza il sistema modulare per determinare il colore della barra
        const barColor = getMetricBarColor(metricKey, metricValue);
        
        metricDiv.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-semibold text-[#c8a27c]">${metricInfo.name}</span>
                <span class="text-sm font-bold text-white">${metricValue}/20</span>
            </div>
            <div class="w-full bg-[#1a1a1a] rounded-full h-2">
                <div class="h-2 rounded-full transition-all duration-300" 
                     style="width: ${(metricValue / 20) * 100}%; background-color: ${barColor}">
                </div>
            </div>
        `;
        
        finalMetricsDisplay.appendChild(metricDiv);
    }
    
    // Popola le statistiche
    scenariosCompleted.textContent = gameState.currentScenarioIndex;
    finalScoreSummary.textContent = finalScoreValue;
    
    // Calcola la durata della partita (se disponibile)
    if (gameState.startTime) {
        const duration = Math.floor((Date.now() - gameState.startTime) / 1000 / 60); // minuti
        gameDuration.textContent = `${duration} minuti`;
    } else {
        gameDuration.textContent = 'N/D';
    }
    
    // Determina e mostra il motivo della fine
    console.log('Debug showMetricsSummary - reason:', reason, 'state:', state);
    let endReasonText = '';
    if (reason === 'success') {
        endReasonText = 'Completato con Successo';
    } else if (reason) {
        const metricInfo = getMetricInfo(reason);
        if (metricInfo) {
            if (state === 'low') {
                endReasonText = `${metricInfo.name} troppo bassa (${gameState.player.metrics[reason]}/20)`;
            } else if (state === 'high') {
                endReasonText = `${metricInfo.name} troppo alta (${gameState.player.metrics[reason]}/20)`;
            }
        } else {
            endReasonText = reason;
        }
    } else {
        endReasonText = 'Motivo sconosciuto';
    }
    endReason.textContent = endReasonText;
    
    // Configura il pulsante per continuare
    metricsSummaryContinueButton.onclick = () => {
        callback();
    };
    
    showScreen(metricsSummaryScreen);
}

// La funzione getMetricInfo è già disponibile globalmente da metriche.js


// --- LOGICA HALL OF FAME ---
function getHighScores() {
    const scoresJSON = localStorage.getItem(HOF_KEY);
    return scoresJSON ? JSON.parse(scoresJSON) : [];
}

function saveHighScores(scores) {
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10);
    localStorage.setItem(HOF_KEY, JSON.stringify(topScores));
}

function checkAndAddHighScore(score) {
    const highScores = getHighScores();
    const lowestHighScore = highScores.length < 10 ? 0 : highScores[9].score;

    if (score > lowestHighScore) {
        const name = gameState.player.name || "AAA";
        const newScore = { name: name, score: score };
        highScores.push(newScore);
        saveHighScores(highScores);
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

function clearAllHighScores() {
    localStorage.removeItem(HOF_KEY);
    console.log('Hall of Fame cancellata completamente');
}

function clearAllAchievements() {
    // Resetta tutti gli achievement nel registry
    for (const achievementId in AchievementRegistry) {
        AchievementRegistry[achievementId].unlocked = false;
        AchievementRegistry[achievementId].unlockedAt = null;
    }
    
    // Rimuove la chiave dal localStorage
    localStorage.removeItem('lumberjackAchievements');
    
    // Salva lo stato vuoto per sincronizzare
    saveAchievements();
    
    console.log('Tutti gli achievement sono stati cancellati');
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
        
        // Cambia la musica per il capitolo corrente del save
        if (audioManager && gameState.currentChapterId) {
            console.log(`Caricando partita salvata - Capitolo: ${gameState.currentChapterId}`);
            audioManager.playChapterMusic(gameState.currentChapterId);
        } else {
            console.log('Caricando partita salvata - Nessun capitolo specificato, mantengo musica menu');
        }
        
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
    
    // Cambia la musica per il capitolo
    if (audioManager) {
        audioManager.playChapterMusic(chapterId);
    }

    const chapterCutscenes = cutscenes[chapterId];

    const startChapterLogic = () => {
        const playerName = gameState.player.name;
        const playerScore = gameState.player.score || 0;
        gameState.player = JSON.parse(JSON.stringify(initialPlayerState));
        gameState.player.name = playerName;
        gameState.player.score = playerScore;

        gameState.player.metrics = {};
        
        // Sistema automatico: usa il registry delle metriche
        const chapterMetrics = getChapterMetrics(chapter);
        for (const metricKey in chapterMetrics) {
            const startValue = getMetricStartValue(metricKey);
            gameState.player.metrics[metricKey] = startValue;
        }

        gameState.currentChapterId = chapterId;
        gameState.scenarios = [...chapter.scenarios].sort(() => Math.random() - 0.5);
        gameState.currentScenarioIndex = -1;
        
        // Inizializza tracking condizioni
        initializeConditionTracking();

        mainTitle.textContent = chapter.title;
        showScreen(gameScreen);
        nextScenario();
    };

    newGameModal.classList.add('hidden');
    
    if (chapterCutscenes && chapterCutscenes.start) {
        showCutscene(chapterCutscenes.start, startChapterLogic);
    } else {
        startChapterLogic();
    }
}

function getChapterMetrics(chapter) {
    // Supporta sia array che oggetto
    if (Array.isArray(chapter.metrics)) {
        // Formato array semplice: ["forza", "salute", "onore"]
        const metricsObj = {};
        chapter.metrics.forEach(metricKey => {
            const metricInfo = getMetricInfo(metricKey);
            metricsObj[metricKey] = metricInfo ? metricInfo.name : metricKey;
        });
        return metricsObj;
    } else {
        // Formato oggetto con possibili override
        const metricsObj = {};
        for (const key in chapter.metrics) {
            const override = chapter.metrics[key];
            if (override && override !== null) {
                // Usa l'override fornito
                metricsObj[key] = override;
            } else {
                // Usa il nome dal registry
                const metricInfo = getMetricInfo(key);
                metricsObj[key] = metricInfo ? metricInfo.name : key;
            }
        }
        return metricsObj;
    }
}

function updateUI() {
    const chapter = chapters[gameState.currentChapterId];
    const chapterMetrics = getChapterMetrics(chapter);
    metricsDisplay.innerHTML = '';
    
    for (const key in chapterMetrics) {
        const metricName = chapterMetrics[key];
        const value = gameState.player.metrics[key];
        const percentage = (value / maxMetricValue) * 100;
        
        // Usa il sistema modulare per ottenere il colore
        const barColor = getMetricBarColor(key, value);
        
        metricsDisplay.innerHTML += `
            <div>
                <span class="text-xs font-bold">${metricName} (${value}/${maxMetricValue})</span>
                <div class="w-full metric-bar-bg rounded-full h-2">
                    <div class="h-2 rounded-full" style="width: ${percentage}%; background-color: ${barColor};"></div>
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

function checkGameOverConditions() {
    const chapter = chapters[gameState.currentChapterId];
    
    // Usa il nuovo sistema se le condizioni sono definite
    if (chapter.winConditions || chapter.loseConditions) {
        return evaluateWinLoseConditions();
    }
    
    // Fallback al sistema legacy se non ci sono condizioni personalizzate
    for (const key in gameState.player.metrics) {
        const value = gameState.player.metrics[key];
        
        // Usa il sistema modulare per controllare game over
        const gameOverResult = checkMetricGameOver(key, value);
        if (gameOverResult) {
            return { type: 'lose', ...gameOverResult };
        }
    }
    
    return null; // Nessun game over
}

function selectChoice(choice) {
    const scenario = gameState.scenarios[gameState.currentScenarioIndex];
    if (!scenario) return;

    gameState.player.score += 10;

    const effects = scenario.choices[choice].effects;
    for (const key in effects) {
        if (gameState.player.metrics.hasOwnProperty(key)) {
            const effectValue = effects[key];
            
            // Usa il sistema modulare per controllare se l'effetto è permesso
            if (isEffectAllowed(key, effectValue)) {
                gameState.player.metrics[key] += effectValue;
            }
            // Se l'effetto non è permesso, viene automaticamente ignorato
            
            // Mantieni nei limiti 0-20
            gameState.player.metrics[key] = Math.max(0, Math.min(maxMetricValue, gameState.player.metrics[key]));
        }
    }
    
    // Controlla se lo scenario ha cutscenes (condizionali o neutre)
    if (scenario.cutscenes && scenario.cutscenes[choice]) {
        // Cutscenes condizionali - diverse per ogni scelta
        showCutscene(scenario.cutscenes[choice], () => {
            // Dopo la cutscene, controlla se il gioco deve finire
            const gameOverCheck = checkGameOverConditions();
            if (gameOverCheck) {
                if (gameOverCheck.type === 'win') {
                    endGame("success", null, gameOverCheck.condition);
                } else {
                    endGame(gameOverCheck.reason, gameOverCheck.state, gameOverCheck.condition);
                }
                return;
            }
            nextScenario();
        });
    } else if (scenario.cutscene) {
        // Cutscene neutra - stessa per entrambe le scelte
        showCutscene(scenario.cutscene, () => {
            // Dopo la cutscene, controlla se il gioco deve finire
            const gameOverCheck = checkGameOverConditions();
            if (gameOverCheck) {
                if (gameOverCheck.type === 'win') {
                    endGame("success", null, gameOverCheck.condition);
                } else {
                    endGame(gameOverCheck.reason, gameOverCheck.state, gameOverCheck.condition);
                }
                return;
            }
            nextScenario();
        });
    } else {
        // Se non c'è cutscene, procedi normalmente
        const gameOverCheck = checkGameOverConditions();
        if (gameOverCheck) {
            if (gameOverCheck.type === 'win') {
                endGame("success", null, gameOverCheck.condition);
            } else {
                endGame(gameOverCheck.reason, gameOverCheck.state, gameOverCheck.condition);
            }
            return;
        }
        nextScenario();
    }
}

function endGame(reason, state, condition = null) {
    const chapterCutscenes = cutscenes[gameState.currentChapterId];

    const showEndScreen = () => {
        const finalScoreValue = gameState.player.score;
        
        // Controllo achievement prima di mostrare la schermata finale
        let newAchievements = [];
        
        // Achievement di fine gioco
        newAchievements.push(...checkGameEndAchievements(reason, gameState.currentChapterId));
        
        // Achievement di punteggio
        newAchievements.push(...checkScoreAchievements(finalScoreValue));
        
        // Achievement di metriche
        newAchievements.push(...checkMetricAchievements(gameState.player.metrics));
        
        deleteSave();
        
        const showFinalScreen = () => {
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

            if (finalEnding.nextChapter) {
                continueButton.classList.remove('hidden');
                endScreenMenuButton.classList.add('hidden');
                continueButton.dataset.nextChapter = finalEnding.nextChapter;
            } else {
                checkAndAddHighScore(finalScoreValue);
                continueButton.classList.add('hidden');
                endScreenMenuButton.classList.remove('hidden');
            }
        };

        // Mostra prima la schermata di riepilogo metriche, poi gli achievement (se presenti), infine la schermata finale
        const showMetricsSummaryThenFinal = () => {
            showMetricsSummary(reason, state, finalScoreValue, () => {
                // Se ci sono achievement da mostrare, mostali dopo il riepilogo
                if (newAchievements.length > 0) {
                    processAchievements(newAchievements, showFinalScreen);
                } else {
                    showFinalScreen();
                }
            });
        };
        
        showMetricsSummaryThenFinal();
    };

    if (chapterCutscenes && chapterCutscenes.end && reason === "success") {
        showCutscene(chapterCutscenes.end, showEndScreen);
    } else {
        showEndScreen();
    }
}

// --- VARIABILI GLOBALI ---
let audioManager = null;

// --- FUNZIONI HELPER AUDIO ---
function showMainMenu() {
    if (audioManager) {
        audioManager.playChapterMusic('menu');
    }
    showScreen(mainMenu);
}

// --- INIZIALIZZAZIONE ---
function init() {
    audioManager = new AudioManager(chapterMusic, backgroundMusic);
    
    // Avvia la musica del menu principale
    audioManager.playChapterMusic('menu');

    // Listener Menu Principale
    newGameButton.addEventListener('click', () => {
        newGameModal.classList.remove('hidden');
        playerNameInput.focus();
    });

    const startNewGame = () => {
        const nameErrorMessage = document.getElementById('name-error-message');
        let playerName = playerNameInput.value.trim();
        
        // Validation: check if name has at least one letter
        if (!playerName || playerName.length === 0) {
            nameErrorMessage.classList.remove('hidden');
            playerNameInput.classList.add('border-red-500');
            return; // Stop execution
        }
        
        // Hide error message and reset border if validation passes
        nameErrorMessage.classList.add('hidden');
        playerNameInput.classList.remove('border-red-500');
        
        gameState = {};
        gameState.player = JSON.parse(JSON.stringify(initialPlayerState));
        gameState.player.name = playerName;
        gameState.startTime = Date.now(); // Timestamp di inizio partita
        startChapter(STARTING_CHAPTER);
    };

    startGameButton.addEventListener('click', startNewGame);
    
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startNewGame();
        }
    });
    
    // Hide error message when user starts typing
    playerNameInput.addEventListener('input', () => {
        const nameErrorMessage = document.getElementById('name-error-message');
        if (playerNameInput.value.trim().length > 0) {
            nameErrorMessage.classList.add('hidden');
            playerNameInput.classList.remove('border-red-500');
        }
    });

    loadGameButton.addEventListener('click', loadGame);
    importGameButton.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleFileImport);
    manualButton.addEventListener('click', () => showScreen(manualScreen));
    creditsButton.addEventListener('click', displayCredits);
    hofButton.addEventListener('click', displayHallOfFame);
    exitButton.addEventListener('click', () => window.close());

    // Listener Schermata di Gioco
    yesButton.addEventListener('click', () => selectChoice('yes'));
    noButton.addEventListener('click', () => selectChoice('no'));
    volumeGameButton.addEventListener('click', () => {
        volumeModal.classList.remove('hidden');
    });
    downloadGameButton.addEventListener('click', downloadSaveFile);
    returnToMenuButton.addEventListener('click', () => showMainMenu());

    // Listener Schermata Finale
    endScreenMenuButton.addEventListener('click', () => showMainMenu());
    continueButton.addEventListener('click', (e) => {
        const nextChapterId = e.target.dataset.nextChapter;
        if (nextChapterId) {
            startChapter(nextChapterId);
        }
    });

    // Listener Pulsanti "Indietro"
    manualBackButton.addEventListener('click', () => showMainMenu());
    creditsBackButton.addEventListener('click', () => showMainMenu());
    hofBackButton.addEventListener('click', () => showMainMenu());
    achievementsBackButton.addEventListener('click', () => showMainMenu());

    // Listener Volume Modal
    volumeModalClose.addEventListener('click', () => {
        volumeModal.classList.add('hidden');
    });

    // Listener Hall of Fame Cancellazione
    hofClearButton.addEventListener('click', () => {
        hofClearModal.classList.remove('hidden');
    });
    
    hofClearCancel.addEventListener('click', () => {
        hofClearModal.classList.add('hidden');
    });
    
    hofClearConfirm.addEventListener('click', () => {
        clearAllHighScores();
        hofClearModal.classList.add('hidden');
        displayHallOfFame(); // Aggiorna la visualizzazione
    });

    // Listener Achievement Cancellazione
    achievementsClearButton.addEventListener('click', () => {
        achievementsClearModal.classList.remove('hidden');
    });
    
    achievementsClearCancel.addEventListener('click', () => {
        achievementsClearModal.classList.add('hidden');
    });
    
    achievementsClearConfirm.addEventListener('click', () => {
        clearAllAchievements();
        achievementsClearModal.classList.add('hidden');
        displayAchievementsList(); // Aggiorna la visualizzazione immediata
    });
    
    // Chiudi modali cliccando fuori
    hofClearModal.addEventListener('click', (e) => {
        if (e.target === hofClearModal) {
            hofClearModal.classList.add('hidden');
        }
    });

    achievementsClearModal.addEventListener('click', (e) => {
        if (e.target === achievementsClearModal) {
            achievementsClearModal.classList.add('hidden');
        }
    });

    volumeModal.addEventListener('click', (e) => {
        if (e.target === volumeModal) {
            volumeModal.classList.add('hidden');
        }
    });

    // Listener Achievement
    achievementsButton.addEventListener('click', displayAchievementsList);

    // Listener Audio - Volume sempre 0 all'avvio per interazione fluida
    const defaultVolume = 0; // Sempre 0 all'avvio per evitare problemi autoplay
    volumeSlider.value = defaultVolume;
    audioManager.setVolume(defaultVolume);

    // Function to update volume slider fill effect
    const updateVolumeSliderFill = (value) => {
        const percentage = (value * 100).toFixed(1);
        volumeSlider.style.background = `linear-gradient(to right, #c8a27c 0%, #c8a27c ${percentage}%, #4a3f37 ${percentage}%, #4a3f37 100%)`;
    };
    
    // Function to update slider fill effect for both sliders
    const updateBothSlidersFill = (value) => {
        const percentage = (value * 100).toFixed(1);
        const fillStyle = `linear-gradient(to right, #c8a27c 0%, #c8a27c ${percentage}%, #4a3f37 ${percentage}%, #4a3f37 100%)`;
        volumeSlider.style.background = fillStyle;
        volumeGameSlider.style.background = fillStyle;
    };

    // Initialize both volume sliders
    volumeGameSlider.value = defaultVolume;
    updateBothSlidersFill(parseFloat(defaultVolume));
    
    // Function to sync both sliders and save volume
    const syncVolumeSliders = (newVolume) => {
        volumeSlider.value = newVolume;
        volumeGameSlider.value = newVolume;
        updateBothSlidersFill(newVolume);
        audioManager.setVolume(newVolume);
        localStorage.setItem('lumberjackVolume', newVolume);
    };
    
    // Listener per slider volume principale (menu)
    volumeSlider.addEventListener('input', (e) => {
        const newVolume = parseFloat(e.target.value);
        syncVolumeSliders(newVolume);
    });
    
    // Listener per slider volume in-game
    volumeGameSlider.addEventListener('input', (e) => {
        const newVolume = parseFloat(e.target.value);
        syncVolumeSliders(newVolume);
    });

    // Carica achievement all'avvio
    loadAchievements();

    showMainMenu();
}

window.onload = init;
