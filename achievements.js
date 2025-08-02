// ===================================================================================
// --- SISTEMA ACHIEVEMENT ---
// Questo file definisce tutti gli achievement disponibili nel gioco.
// ===================================================================================

// --- DEFINIZIONI ACHIEVEMENT ---
const AchievementRegistry = {
    // 🎯 ACHIEVEMENT PRIME VOLTE
    first_victory: {
        id: 'first_victory',
        name: 'Prima Vittoria',
        description: 'Completa il tuo primo capitolo con successo',
        image: 'https://placehold.co/300x300/FFD700/000000?text=🏆',
        rarity: 'common',
        unlocked: false
    },
    
    first_defeat: {
        id: 'first_defeat',
        name: 'Lezioni Apprese',
        description: 'Subisci la tua prima sconfitta e impara dai tuoi errori',
        image: 'https://placehold.co/300x300/8B0000/FFFFFF?text=💀',
        rarity: 'common',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT METRICHE
    max_growth_metric: {
        id: 'max_growth_metric',
        name: 'Accumulo Estremo',
        description: 'Porta una metrica di crescita al massimo (20)',
        image: 'https://placehold.co/300x300/10B981/FFFFFF?text=📈',
        rarity: 'uncommon',
        unlocked: false
    },
    
    min_decay_metric: {
        id: 'min_decay_metric',
        name: 'Fino alla Fine',
        description: 'Lascia che una metrica di deterioramento raggiunga 0',
        image: 'https://placehold.co/300x300/EF4444/FFFFFF?text=📉',
        rarity: 'uncommon',
        unlocked: false
    },
    
    perfect_balance: {
        id: 'perfect_balance',
        name: 'Equilibrio Perfetto',
        description: 'Mantieni tutte le metriche bilanciate tra 8 e 12 per 5 round',
        image: 'https://placehold.co/300x300/C8A27C/000000?text=⚖️',
        rarity: 'rare',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT CAPITOLI SPECIFICI
    lumberjack_master: {
        id: 'lumberjack_master',
        name: 'Signore della Foresta',
        description: 'Completa la Gilda dei Taglialegna con tutte le metriche sopra 15',
        image: 'https://placehold.co/300x300/228B22/FFFFFF?text=🌲',
        rarity: 'rare',
        unlocked: false
    },
    
    blacksmith_legend: {
        id: 'blacksmith_legend',
        name: 'Leggenda del Metallo',
        description: 'Completa la Gilda dei Maniscalchi senza mai perdere operai',
        image: 'https://placehold.co/300x300/8B4513/FFFFFF?text=🔨',
        rarity: 'rare',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT CONDIZIONI AVANZATE
    survival_master: {
        id: 'survival_master',
        name: 'Maestro di Sopravvivenza',
        description: 'Sopravvivi 15 round in un singolo capitolo',
        image: 'https://placehold.co/300x300/FF6347/FFFFFF?text=🔥',
        rarity: 'epic',
        unlocked: false
    },
    
    speed_runner: {
        id: 'speed_runner',
        name: 'Velocità Fulminea',
        description: 'Completa un capitolo in meno di 5 round',
        image: 'https://placehold.co/300x300/1E90FF/FFFFFF?text=⚡',
        rarity: 'epic',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT CUTSCENE E STORIA
    story_enthusiast: {
        id: 'story_enthusiast',
        name: 'Amante delle Storie',
        description: 'Attiva 10 cutscene in una singola partita',
        image: 'https://placehold.co/300x300/9932CC/FFFFFF?text=📚',
        rarity: 'uncommon',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT SERIE E COLLEZIONISMO
    chapter_collector: {
        id: 'chapter_collector',
        name: 'Collezionista di Capitoli',
        description: 'Completa almeno 3 capitoli diversi',
        image: 'https://placehold.co/300x300/FF1493/FFFFFF?text=🎭',
        rarity: 'rare',
        unlocked: false
    },
    
    ending_explorer: {
        id: 'ending_explorer',
        name: 'Esploratore di Finali',
        description: 'Sblocca 10 finali diversi',
        image: 'https://placehold.co/300x300/20B2AA/FFFFFF?text=🎬',
        rarity: 'epic',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT SCORE E PERFORMANCE
    high_scorer: {
        id: 'high_scorer',
        name: 'Punteggio Alto',
        description: 'Raggiungi un punteggio di 500 punti',
        image: 'https://placehold.co/300x300/FFD700/000000?text=💯',
        rarity: 'uncommon',
        unlocked: false
    },
    
    score_legend: {
        id: 'score_legend',
        name: 'Leggenda dei Punteggi',
        description: 'Raggiungi un punteggio di 1000 punti',
        image: 'https://placehold.co/300x300/FF4500/FFFFFF?text=🌟',
        rarity: 'legendary',
        unlocked: false
    },
    
    // 🎯 ACHIEVEMENT SEGRETI E EASTER EGG
    secret_finder: {
        id: 'secret_finder',
        name: 'Cacciatore di Segreti',
        description: 'Trova un easter egg nascosto nel gioco',
        image: 'https://placehold.co/300x300/4B0082/FFFFFF?text=🔍',
        rarity: 'legendary',
        unlocked: false
    }
};

// --- RARITÀ ACHIEVEMENT ---
const AchievementRarity = {
    common: { name: 'Comune', color: '#9CA3AF', border: '#6B7280' },
    uncommon: { name: 'Non Comune', color: '#10B981', border: '#059669' },
    rare: { name: 'Raro', color: '#3B82F6', border: '#2563EB' },
    epic: { name: 'Epico', color: '#8B5CF6', border: '#7C3AED' },
    legendary: { name: 'Leggendario', color: '#F59E0B', border: '#D97706' }
};

// --- STORAGE KEY ---
const ACHIEVEMENTS_KEY = 'lumberjackAchievements';

// --- FUNZIONI UTILITÀ ACHIEVEMENT ---

/**
 * Carica gli achievement dal localStorage
 */
function loadAchievements() {
    const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (saved) {
        const savedAchievements = JSON.parse(saved);
        // Merge con i nuovi achievement mantenendo lo stato di unlock
        for (const id in AchievementRegistry) {
            if (savedAchievements[id]) {
                AchievementRegistry[id].unlocked = savedAchievements[id].unlocked;
                AchievementRegistry[id].unlockedAt = savedAchievements[id].unlockedAt;
            }
        }
    }
}

/**
 * Salva gli achievement nel localStorage
 */
function saveAchievements() {
    const achievementsState = {};
    for (const id in AchievementRegistry) {
        achievementsState[id] = {
            unlocked: AchievementRegistry[id].unlocked,
            unlockedAt: AchievementRegistry[id].unlockedAt
        };
    }
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievementsState));
}

/**
 * Sblocca un achievement
 */
function unlockAchievement(achievementId) {
    const achievement = AchievementRegistry[achievementId];
    if (!achievement) {
        console.warn(`Achievement '${achievementId}' non trovato`);
        return false;
    }
    
    if (achievement.unlocked) {
        return false; // Già sbloccato
    }
    
    achievement.unlocked = true;
    achievement.unlockedAt = new Date().toISOString();
    saveAchievements();
    
    return true; // Appena sbloccato
}

/**
 * Controlla se un achievement è sbloccato
 */
function isAchievementUnlocked(achievementId) {
    const achievement = AchievementRegistry[achievementId];
    return achievement ? achievement.unlocked : false;
}

/**
 * Ottiene tutti gli achievement sbloccati
 */
function getUnlockedAchievements() {
    return Object.values(AchievementRegistry).filter(achievement => achievement.unlocked);
}

/**
 * Ottiene il numero totale di achievement
 */
function getTotalAchievements() {
    return Object.keys(AchievementRegistry).length;
}

/**
 * Ottiene la percentuale di completamento
 */
function getAchievementProgress() {
    const total = getTotalAchievements();
    const unlocked = getUnlockedAchievements().length;
    return Math.round((unlocked / total) * 100);
}

/**
 * Ottiene achievement per rarità
 */
function getAchievementsByRarity(rarity) {
    return Object.values(AchievementRegistry).filter(achievement => achievement.rarity === rarity);
}

// --- CONTROLLI AUTOMATICI ACHIEVEMENT ---

/**
 * Controlla achievement basati su metriche
 */
function checkMetricAchievements(metrics) {
    let newAchievements = [];
    
    // Controlla metrica di crescita al massimo
    for (const metricKey in metrics) {
        const metricType = determineMetricType(metricKey);
        const value = metrics[metricKey];
        
        if (metricType === MetricTypes.GROWTH && value >= 20) {
            if (unlockAchievement('max_growth_metric')) {
                newAchievements.push('max_growth_metric');
            }
        }
        
        if (metricType === MetricTypes.DECAY && value <= 0) {
            if (unlockAchievement('min_decay_metric')) {
                newAchievements.push('min_decay_metric');
            }
        }
    }
    
    return newAchievements;
}

/**
 * Controlla achievement basati su punteggio
 */
function checkScoreAchievements(score) {
    let newAchievements = [];
    
    if (score >= 500 && unlockAchievement('high_scorer')) {
        newAchievements.push('high_scorer');
    }
    
    if (score >= 1000 && unlockAchievement('score_legend')) {
        newAchievements.push('score_legend');
    }
    
    return newAchievements;
}

/**
 * Controlla achievement di vittoria/sconfitta
 */
function checkGameEndAchievements(reason, chapterId) {
    let newAchievements = [];
    
    if (reason === 'success') {
        if (unlockAchievement('first_victory')) {
            newAchievements.push('first_victory');
        }
        
        // Achievement specifici per capitolo
        if (chapterId === 'prologo' && unlockAchievement('lumberjack_master')) {
            newAchievements.push('lumberjack_master');
        }
        
        if (chapterId === 'capitolo001' && unlockAchievement('blacksmith_legend')) {
            newAchievements.push('blacksmith_legend');
        }
    } else {
        if (unlockAchievement('first_defeat')) {
            newAchievements.push('first_defeat');
        }
    }
    
    return newAchievements;
}

// --- EXPORT GLOBALI ---
window.AchievementRegistry = AchievementRegistry;
window.AchievementRarity = AchievementRarity;
window.loadAchievements = loadAchievements;
window.saveAchievements = saveAchievements;
window.unlockAchievement = unlockAchievement;
window.isAchievementUnlocked = isAchievementUnlocked;
window.getUnlockedAchievements = getUnlockedAchievements;
window.getTotalAchievements = getTotalAchievements;
window.getAchievementProgress = getAchievementProgress;
window.getAchievementsByRarity = getAchievementsByRarity;
window.checkMetricAchievements = checkMetricAchievements;
window.checkScoreAchievements = checkScoreAchievements;
window.checkGameEndAchievements = checkGameEndAchievements;