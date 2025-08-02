# 🏆 GUIDA STEP-BY-STEP: Sistema Achievement

## 📋 COSA SONO GLI ACHIEVEMENT

Gli achievement sono **ricompense virtuali** che i giocatori sbloccano completando specifiche azioni o raggiungendo determinati obiettivi nel gioco:
- **15+ achievement** predefiniti con diverse rarità
- **Sistema automatico** di sblocco basato su eventi
- **Persistenza** nel localStorage del browser
- **UI dedicata** per visualizzare progresso e dettagli
- **5 livelli di rarità** con colori e bordi distintivi

---

## 🚀 STEP 1: COMPRENDERE IL SISTEMA

### **🎯 Tipi di Achievement Disponibili:**

#### **🥉 Prime Volte (Common/Uncommon):**
- `first_victory` - Prima vittoria in un capitolo
- `first_defeat` - Prima sconfitta (imparare dagli errori)

#### **📊 Basati su Metriche (Uncommon/Rare):**
- `max_growth_metric` - Portare metrica crescita a 20
- `min_decay_metric` - Lasciare metrica deterioramento a 0  
- `perfect_balance` - Tenere tutte le metriche bilanciate (8-12) per 5 round

#### **🎭 Specifici per Capitolo (Rare):**
- `lumberjack_master` - Completare Gilda Taglialegna con tutte metriche >15
- `blacksmith_legend` - Completare Gilda Maniscalchi senza perdere operai

#### **⚡ Performance (Epic):**
- `survival_master` - Sopravvivere 15+ round in un capitolo
- `speed_runner` - Completare capitolo in <5 round

#### **💎 Collezione e Storia (Rare/Epic):**
- `story_enthusiast` - Attivare 10+ cutscene in una partita
- `chapter_collector` - Completare 3+ capitoli diversi
- `ending_explorer` - Sbloccare 10+ finali diversi

#### **🌟 Punteggio (Uncommon/Legendary):**
- `high_scorer` - Raggiungere 500+ punti
- `score_legend` - Raggiungere 1000+ punti

#### **🔍 Segreti (Legendary):**
- `secret_finder` - Trovare easter egg nascosti

### **🎨 Sistema Rarità:**
```
🔘 Common (Grigio) - Facili da ottenere
🟢 Uncommon (Verde) - Richiedono impegno  
🔵 Rare (Blu) - Difficili da raggiungere
🟣 Epic (Viola) - Molto impegnativi
🟡 Legendary (Oro) - Estremamente rari
```

---

## 🚀 STEP 2: AGGIUNGERE NUOVI ACHIEVEMENT

### **Metodo 1: Modifica achievements.js**

**1.** Apri il file `achievements.js`

**2.** Aggiungi il tuo achievement nel `AchievementRegistry`:
```javascript
const AchievementRegistry = {
    // ... achievement esistenti ...
    
    mio_nuovo_achievement: {
        id: 'mio_nuovo_achievement',
        name: 'Nome Achievement',
        description: 'Descrizione di cosa bisogna fare per sbloccarlo',
        image: 'https://placehold.co/300x300/COLORE/TESTO?text=EMOJI',
        rarity: 'rare',  // common, uncommon, rare, epic, legendary
        unlocked: false
    }
};
```

**3.** **Template per Immagini Achievement:**
```javascript
// Common (Grigio)
image: 'https://placehold.co/300x300/9CA3AF/FFFFFF?text=🎯'

// Uncommon (Verde)  
image: 'https://placehold.co/300x300/10B981/FFFFFF?text=⭐'

// Rare (Blu)
image: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=💎'

// Epic (Viola)
image: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=👑'

// Legendary (Oro)
image: 'https://placehold.co/300x300/F59E0B/000000?text=🏆'
```

### **Metodo 2: Achievement con Logica Personalizzata**

**1.** Aggiungi la definizione in `achievements.js`

**2.** Crea la funzione di controllo in `achievements.js`:
```javascript
/**
 * Controllo personalizzato per achievement specifici
 */
function checkCustomAchievements(gameData) {
    let newAchievements = [];
    
    // Esempio: Achievement per aver scelto sempre "No"
    if (gameData.allChoicesWereNo && unlockAchievement('contrarian')) {
        newAchievements.push('contrarian');
    }
    
    // Esempio: Achievement per tempo di gioco
    if (gameData.playTimeMinutes >= 60 && unlockAchievement('dedicated_player')) {
        newAchievements.push('dedicated_player');
    }
    
    return newAchievements;
}
```

**3.** Aggiungi la chiamata in `script.js` nella funzione `endGame()`:
```javascript
// Achievement personalizzati
newAchievements.push(...checkCustomAchievements({
    allChoicesWereNo: gameState.allChoicesWereNo,
    playTimeMinutes: gameState.playTimeMinutes
}));
```

---

## 🚀 STEP 3: ACHIEVEMENT AUTOMATICI (GIÀ FUNZIONANTI)

Il sistema **controlla automaticamente** questi achievement:

### **🎯 Achievement di Fine Gioco:**
```javascript
// In endGame() - Controllo automatico
if (reason === 'success') {
    // Sblocca "Prima Vittoria" se è la prima volta
    unlockAchievement('first_victory');
    
    // Achievement specifici per capitolo
    if (chapterId === 'gildaDeiBoschi') {
        unlockAchievement('lumberjack_master');
    }
}
```

### **📊 Achievement di Punteggio:**
```javascript
// Controllo automatico in endGame()
if (finalScore >= 500) unlockAchievement('high_scorer');
if (finalScore >= 1000) unlockAchievement('score_legend');
```

### **⚖️ Achievement di Metriche:**
```javascript
// Controllo automatico per ogni metrica
for (const metricKey in metrics) {
    const value = metrics[metricKey];
    const type = determineMetricType(metricKey);
    
    // Achievement per massimi/minimi
    if (type === MetricTypes.GROWTH && value >= 20) {
        unlockAchievement('max_growth_metric');
    }
    if (type === MetricTypes.DECAY && value <= 0) {
        unlockAchievement('min_decay_metric');
    }
}
```

---

## 🚀 STEP 4: ACHIEVEMENT MANUALI

Per achievement che richiedono logica specifica:

### **1. Tracciamento Dati nel GameState**
```javascript
// In startChapter() - Inizializza tracking
gameState.achievementTracking = {
    cutscenesSeen: 0,
    consecutiveNos: 0,
    chaptersCompleted: [],
    endingsUnlocked: [],
    balancedRoundsCount: 0
};
```

### **2. Aggiorna Tracking Durante il Gioco**
```javascript
// In showCutscene() - Conta cutscene
gameState.achievementTracking.cutscenesSeen++;

// In selectChoice() - Conta scelte consecutive
if (choice === 'no') {
    gameState.achievementTracking.consecutiveNos++;
} else {
    gameState.achievementTracking.consecutiveNos = 0;
}

// In updateUI() - Controlla balance perfetto
const allBalanced = Object.values(gameState.player.metrics)
    .every(value => value >= 8 && value <= 12);
if (allBalanced) {
    gameState.achievementTracking.balancedRoundsCount++;
}
```

### **3. Controllo Achievement Manuali**
```javascript
// In endGame() - Aggiungi prima degli altri controlli
function checkManualAchievements() {
    let newAchievements = [];
    
    // Story Enthusiast
    if (gameState.achievementTracking.cutscenesSeen >= 10) {
        if (unlockAchievement('story_enthusiast')) {
            newAchievements.push('story_enthusiast');
        }
    }
    
    // Perfect Balance
    if (gameState.achievementTracking.balancedRoundsCount >= 5) {
        if (unlockAchievement('perfect_balance')) {
            newAchievements.push('perfect_balance');
        }
    }
    
    return newAchievements;
}

// Usa nella funzione endGame()
newAchievements.push(...checkManualAchievements());
```

---

## 🚀 STEP 5: PERSONALIZZARE L'UI ACHIEVEMENT

### **Modifica Colori Rarità:**
```javascript
// In achievements.js - Personalizza AchievementRarity
const AchievementRarity = {
    common: { name: 'Comune', color: '#9CA3AF', border: '#6B7280' },
    legendary: { name: 'Mitico', color: '#FF6B35', border: '#E85D04' } // Arancione custom
};
```

### **Modifica Layout Schermata:**
```css
/* In style.css - Personalizza griglia achievement */
#achievements-list {
    grid-template-columns: repeat(3, 1fr); /* 3 colonne invece di 2 */
    gap: 6; /* Spazio maggiore */
}
```

### **Achievement con Immagini Personalizzate:**
```javascript
// Usa le tue immagini invece di placeholder
secret_achievement: {
    image: 'images/achievements/secret_crown.png', // Tua immagine locale
    // oppure  
    image: 'https://esempio.com/crown.jpg' // Immagine online
}
```

---

## 🚀 STEP 6: TESTARE GLI ACHIEVEMENT

### **1. Reset Achievement per Test:**
```javascript
// Nel console del browser
localStorage.removeItem('lumberjackAchievements');
location.reload();
```

### **2. Sblocca Achievement Manualmente:**
```javascript
// Nel console del browser  
unlockAchievement('first_victory');
```

### **3. Visualizza Stato Achievement:**
```javascript
// Nel console del browser
console.log(AchievementRegistry);
console.log('Sbloccati:', getUnlockedAchievements());
console.log('Progresso:', getAchievementProgress() + '%');
```

### **4. Testa Tutti i Trigger:**
- ✅ Completa un capitolo (vittoria/sconfitta)
- ✅ Raggiungi punteggi alti (500, 1000)
- ✅ Porta metriche ai limiti (0, 20)
- ✅ Guarda molte cutscene
- ✅ Gioca per lungo tempo

---

## 🚀 STEP 7: ACHIEVEMENT AVANZATI

### **Achievement con Condizioni Multiple:**
```javascript
master_strategist: {
    id: 'master_strategist',
    name: 'Stratega Supremo',
    description: 'Completa 3 capitoli senza mai andare sotto 5 in nessuna metrica',
    rarity: 'legendary'
}

// Logica di controllo
function checkStrategistAchievement() {
    const neverBelowFive = gameState.achievementTracking.chaptersCompleted
        .every(chapter => chapter.minMetricValue >= 5);
    
    if (gameState.achievementTracking.chaptersCompleted.length >= 3 && neverBelowFive) {
        return unlockAchievement('master_strategist');
    }
    return false;
}
```

### **Achievement Segreti/Easter Egg:**
```javascript
// Aggiungi codice segreto da qualche parte nel gioco
if (playerName === "KONAMI" || inputSequence === "↑↑↓↓←→←→BA") {
    unlockAchievement('secret_finder');
}

// Achievement per azioni specifiche
if (gameState.player.metrics.onore === 13 && gameState.currentScenarioIndex === 7) {
    unlockAchievement('hidden_path');
}
```

### **Achievement con Statistiche Globali:**
```javascript
// Tracking multi-partita
const globalStats = JSON.parse(localStorage.getItem('globalGameStats') || '{}');
globalStats.totalGamesPlayed = (globalStats.totalGamesPlayed || 0) + 1;
globalStats.totalTimePlayed = (globalStats.totalTimePlayed || 0) + sessionTime;

if (globalStats.totalGamesPlayed >= 50) {
    unlockAchievement('veteran_player');
}
```

---

## ✅ CHECKLIST ACHIEVEMENT PERFETTI

- [ ] **Nome chiaro** e accattivante
- [ ] **Descrizione** che spiega esattamente cosa fare
- [ ] **Rarità appropriata** alla difficoltà
- [ ] **Immagine** che rappresenta l'achievement
- [ ] **Controllo automatico** implementato correttamente
- [ ] **Testato** che si sblocchi quando dovrebbe
- [ ] **Non troppo facile** né impossibile da ottenere
- [ ] **Motivante** per il giocatore
- [ ] **Coerente** con il tema del gioco

---

## 🔥 IDEE PER NUOVI ACHIEVEMENT

### **🎯 Achievement Comportamentali:**
- `pacifist` - Non scegliere mai opzioni violente
- `rebel` - Scegliere sempre l'opzione più rischiosa
- `diplomat` - Risolvere conflitti senza violenza

### **📊 Achievement Statistici:**
- `efficiency_master` - Completare capitolo con minimo numero di scelte
- `resource_manager` - Non sprecare mai risorse
- `risk_taker` - Scegliere sempre l'opzione più rischiosa

### **🎭 Achievement Narrativi:**
- `all_paths` - Sbloccare tutti i finali di un capitolo
- `completionist` - Vedere tutti gli scenari disponibili
- `lore_master` - Leggere tutti i testi delle cutscene

### **🏆 Achievement Meta:**
- `achievement_hunter` - Sbloccare 50% degli achievement
- `perfectionist` - Sbloccare tutti gli achievement
- `first_week` - Giocare entro la prima settimana di rilascio

---

## ❓ PROBLEMI COMUNI

**Q: Gli achievement non si salvano**
A: Controlla che `saveAchievements()` sia chiamata in `unlockAchievement()`

**Q: Achievement si sblocca più volte**  
A: La funzione `unlockAchievement()` controlla già se è già sbloccato

**Q: Immagine achievement non appare**
A: Verifica che l'URL dell'immagine sia corretto e accessibile

**Q: Achievement non appare nella lista**
A: Controlla che `loadAchievements()` sia chiamata all'avvio

**Q: Come creo achievement per azioni specifiche?**
A: Aggiungi tracking nel gameState e controlla nelle funzioni appropriate

**SE IL SISTEMA ACHIEVEMENT FUNZIONA = 🎉 GIOCO ANCORA PIÙ COINVOLGENTE!**