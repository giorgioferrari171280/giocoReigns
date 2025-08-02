// ===================================================================================
// --- SISTEMA MODULARE METRICHE ---
// Questo file definisce i tipi di metriche e i loro comportamenti.
// ===================================================================================

// --- DEFINIZIONI TIPI DI METRICHE ---
const MetricTypes = {
    GROWTH: 'growth',       // 🟢 Crescita: 0→20, possono solo aumentare
    DECAY: 'decay',         // 🔴 Deterioramento: 20→0, possono solo diminuire  
    BALANCED: 'balanced'    // 🟡 Bilanciate: 10, possono aumentare e diminuire
};

// --- REGISTRY METRICHE ---
// Qui definisci tutte le metriche disponibili nel gioco
const MetricRegistry = {
    // 🟢 METRICHE DI CRESCITA (0→20)
    // Rappresentano risorse che si accumulano, poteri che crescono, conoscenze che si acquisiscono
    growth: {
        // Ricchezze e tesori
        tesoro: { name: 'Tesoro', type: MetricTypes.GROWTH, startValue: 0, description: 'Ricchezze accumulate' },
        oro: { name: 'Oro', type: MetricTypes.GROWTH, startValue: 0, description: 'Monete d\'oro' },
        ricchezza: { name: 'Ricchezza', type: MetricTypes.GROWTH, startValue: 0, description: 'Patrimonio totale' },
        denaro: { name: 'Denaro', type: MetricTypes.GROWTH, startValue: 0, description: 'Capitale liquido' },
        
        // Conoscenze e saggezza
        conoscenza: { name: 'Conoscenza', type: MetricTypes.GROWTH, startValue: 0, description: 'Sapere acquisito' },
        saggezza: { name: 'Saggezza', type: MetricTypes.GROWTH, startValue: 0, description: 'Esperienza di vita' },
        segreti: { name: 'Segreti', type: MetricTypes.GROWTH, startValue: 0, description: 'Informazioni riservate' },
        informazioni: { name: 'Informazioni', type: MetricTypes.GROWTH, startValue: 0, description: 'Intelligence' },
        
        // Potere e influenza
        influenza: { name: 'Influenza', type: MetricTypes.GROWTH, startValue: 0, description: 'Potere politico' },
        potere: { name: 'Potere', type: MetricTypes.GROWTH, startValue: 0, description: 'Autorità generale' },
        fama: { name: 'Fama', type: MetricTypes.GROWTH, startValue: 0, description: 'Riconoscimento pubblico' },
        reputazione: { name: 'Reputazione', type: MetricTypes.GROWTH, startValue: 0, description: 'Stima sociale' },
        gloria: { name: 'Gloria', type: MetricTypes.GROWTH, startValue: 0, description: 'Onore militare' },
        prestigio: { name: 'Prestigio', type: MetricTypes.GROWTH, startValue: 0, description: 'Status sociale' },
        
        // Abilità fisiche e mentali
        forza: { name: 'Forza', type: MetricTypes.GROWTH, startValue: 0, description: 'Potenza fisica' },
        esperienza: { name: 'Esperienza', type: MetricTypes.GROWTH, startValue: 0, description: 'Competenza acquisita' },
        abilita: { name: 'Abilità', type: MetricTypes.GROWTH, startValue: 0, description: 'Skill specialistiche' },
        
        // Tecnologia e innovazione  
        tecnologia: { name: 'Tecnologia', type: MetricTypes.GROWTH, startValue: 0, description: 'Avanzamento tecnico' },
        innovazione: { name: 'Innovazione', type: MetricTypes.GROWTH, startValue: 0, description: 'Capacità inventiva' },
        produzione: { name: 'Produzione', type: MetricTypes.GROWTH, startValue: 0, description: 'Efficienza manifatturiera' },
        
        // Magia e poteri
        magia: { name: 'Magia', type: MetricTypes.GROWTH, startValue: 0, description: 'Potere arcano' },
        mana: { name: 'Mana', type: MetricTypes.GROWTH, startValue: 0, description: 'Energia magica' },
        
        // Navigazione e esplorazione
        navigazione: { name: 'Navigazione', type: MetricTypes.GROWTH, startValue: 0, description: 'Abilità marinaresche' },
        esplorazione: { name: 'Esplorazione', type: MetricTypes.GROWTH, startValue: 0, description: 'Spirito di scoperta' }
    },
    
    // 🔴 METRICHE DI DETERIORAMENTO (20→0)
    // Rappresentano risorse finite, condizioni che peggiorano, elementi che si consumano
    decay: {
        // Capitolo 001
        contessa: { name: 'Contessa de Bourdessac', type: MetricTypes.DECAY, startValue: 20, description: 'Salute della Contessa de Bourdessac' }, 
        
        // Salute e benessere
        salute: { name: 'Salute', type: MetricTypes.DECAY, startValue: 20, description: 'Condizione fisica' },
        vita: { name: 'Vita', type: MetricTypes.DECAY, startValue: 20, description: 'Energia vitale' },
        sanita: { name: 'Sanità Mentale', type: MetricTypes.DECAY, startValue: 20, description: 'Equilibrio psichico' },
        benessere: { name: 'Benessere', type: MetricTypes.DECAY, startValue: 20, description: 'Stato generale' },
        
        // Risorse fisiche
        risorse: { name: 'Risorse', type: MetricTypes.DECAY, startValue: 20, description: 'Materiali disponibili' },
        cibo: { name: 'Cibo', type: MetricTypes.DECAY, startValue: 20, description: 'Provviste alimentari' },
        acqua: { name: 'Acqua', type: MetricTypes.DECAY, startValue: 20, description: 'Riserve idriche' },
        provviste: { name: 'Provviste', type: MetricTypes.DECAY, startValue: 20, description: 'Scorte generali' },
        
        // Persone e alleati
        equipaggio: { name: 'Equipaggio', type: MetricTypes.DECAY, startValue: 20, description: 'Membri della crew' },
        soldati: { name: 'Soldati', type: MetricTypes.DECAY, startValue: 20, description: 'Forze militari' },
        operai: { name: 'Operai', type: MetricTypes.DECAY, startValue: 20, description: 'Lavoratori disponibili' },
        popolazione: { name: 'Popolazione', type: MetricTypes.DECAY, startValue: 20, description: 'Cittadini sotto controllo' },
        alleati: { name: 'Alleati', type: MetricTypes.DECAY, startValue: 20, description: 'Sostenitori fidati' },
        seguaci: { name: 'Seguaci', type: MetricTypes.DECAY, startValue: 20, description: 'Discepoli devoti' },
        
        // Tempo e opportunità
        tempo: { name: 'Tempo', type: MetricTypes.DECAY, startValue: 20, description: 'Tempo rimanente' },
        scadenza: { name: 'Scadenza', type: MetricTypes.DECAY, startValue: 20, description: 'Countdown finale' },
        opportunita: { name: 'Opportunità', type: MetricTypes.DECAY, startValue: 20, description: 'Occasioni disponibili' },
        
        // Energia e carburanti
        energia: { name: 'Energia', type: MetricTypes.DECAY, startValue: 20, description: 'Riserve energetiche' },
        carburante: { name: 'Carburante', type: MetricTypes.DECAY, startValue: 20, description: 'Combustibile per mezzi' },
        munizioni: { name: 'Munizioni', type: MetricTypes.DECAY, startValue: 20, description: 'Proiettili e esplosivi' },
        
        // Stati sociali
        fiducia: { name: 'Fiducia', type: MetricTypes.DECAY, startValue: 20, description: 'Credibilità presso altri' },
        stabilita: { name: 'Stabilità', type: MetricTypes.DECAY, startValue: 20, description: 'Equilibrio del sistema' },
        ordine: { name: 'Ordine', type: MetricTypes.DECAY, startValue: 20, description: 'Controllo della situazione' },
        pace: { name: 'Pace', type: MetricTypes.DECAY, startValue: 20, description: 'Assenza di conflitti' },
        bernadette: { name: 'Sicurezza di Bernadette', type: MetricTypes.DECAY, startValue: 20, description: 'Incolumità della contessa Bernadette' },
        equilibrio: { name: 'Equilibrio', type: MetricTypes.DECAY, startValue: 20, description: 'Bilanciamento di forze' },
        armonia: { name: 'Armonia', type: MetricTypes.DECAY, startValue: 20, description: 'Concordia generale' }
    },
    
    // 🟡 METRICHE BILANCIATE (10)
    // Rappresentano virtù, qualità morali, capacità che possono oscillare
    balanced: {
        // Virtù morali
        onore: { name: 'Onore', type: MetricTypes.BALANCED, startValue: 10, description: 'Integrità morale' },
        coraggio: { name: 'Coraggio', type: MetricTypes.BALANCED, startValue: 10, description: 'Bravura in battaglia' },
        umilta: { name: 'Umiltà', type: MetricTypes.BALANCED, startValue: 10, description: 'Modestia e saggezza' },
        generosita: { name: 'Generosità', type: MetricTypes.BALANCED, startValue: 10, description: 'Spirito altruista' },
        giustizia: { name: 'Giustizia', type: MetricTypes.BALANCED, startValue: 10, description: 'Senso del diritto' },
        
        // Relazioni sociali
        popolarita: { name: 'Popolarità', type: MetricTypes.BALANCED, startValue: 10, description: 'Gradimento del popolo' },
        carisma: { name: 'Carisma', type: MetricTypes.BALANCED, startValue: 10, description: 'Fascino personale' },
        diplomazia: { name: 'Diplomazia', type: MetricTypes.BALANCED, startValue: 10, description: 'Abilità negoziali' },
        lealta: { name: 'Lealtà', type: MetricTypes.BALANCED, startValue: 10, description: 'Fedeltà reciproca' },
        
        // Capacità mentali
        astuzia: { name: 'Astuzia', type: MetricTypes.BALANCED, startValue: 10, description: 'Intelligenza pratica' },
        strategia: { name: 'Strategia', type: MetricTypes.BALANCED, startValue: 10, description: 'Capacità tattiche' },
        intuizione: { name: 'Intuizione', type: MetricTypes.BALANCED, startValue: 10, description: 'Sesto senso' },
        creativita: { name: 'Creatività', type: MetricTypes.BALANCED, startValue: 10, description: 'Immaginazione fertile' },
        
        // Qualità professionali
        disciplina: { name: 'Disciplina', type: MetricTypes.BALANCED, startValue: 10, description: 'Rigore e controllo' },
        efficienza: { name: 'Efficienza', type: MetricTypes.BALANCED, startValue: 10, description: 'Ottimizzazione risorse' },
        precision: { name: 'Precisione', type: MetricTypes.BALANCED, startValue: 10, description: 'Accuratezza esecutiva' },
        
        // Stati d'animo
        determinazione: { name: 'Determinazione', type: MetricTypes.BALANCED, startValue: 10, description: 'Volontà ferrea' },
        serenita: { name: 'Serenità', type: MetricTypes.BALANCED, startValue: 10, description: 'Pace interiore' },
        passione: { name: 'Passione', type: MetricTypes.BALANCED, startValue: 10, description: 'Ardore e entusiasmo' },
        
        // Aspetti etici
        etica: { name: 'Etica', type: MetricTypes.BALANCED, startValue: 10, description: 'Principi morali' },
        integrita: { name: 'Integrità', type: MetricTypes.BALANCED, startValue: 10, description: 'Coerenza di valori' },
        rispetto: { name: 'Rispetto', type: MetricTypes.BALANCED, startValue: 10, description: 'Considerazione per altri' }
    }
};

// --- FUNZIONI DI GESTIONE METRICHE ---

/**
 * Ottiene le informazioni di una metrica dal registry
 * @param {string} metricKey - Chiave della metrica (es: 'tesoro', 'salute')
 * @returns {Object|null} - Informazioni della metrica o null se non trovata
 */
function getMetricInfo(metricKey) {
    if (!metricKey) {
        console.warn('getMetricInfo chiamata con metricKey undefined o null');
        return null;
    }
    const normalizedKey = metricKey.toLowerCase();
    
    // Cerca in tutti i gruppi di metriche
    for (const groupName in MetricRegistry) {
        const group = MetricRegistry[groupName];
        if (group[normalizedKey]) {
            return {
                ...group[normalizedKey],
                key: normalizedKey,
                group: groupName
            };
        }
    }
    
    return null;
}

/**
 * Determina il tipo di una metrica dal suo nome
 * @param {string} metricName - Nome della metrica da analizzare
 * @returns {string} - Tipo della metrica (growth, decay, balanced)
 */
function determineMetricType(metricName) {
    const metricInfo = getMetricInfo(metricName);
    if (metricInfo) {
        return metricInfo.type;
    }
    
    // Fallback al sistema legacy se non trovata nel registry
    console.warn(`Metrica '${metricName}' non trovata nel registry, usando rilevamento legacy`);
    return MetricTypes.BALANCED; // Default safe
}

/**
 * Ottiene il valore iniziale di una metrica
 * @param {string} metricName - Nome della metrica
 * @returns {number} - Valore iniziale (0, 10, o 20)
 */
function getMetricStartValue(metricName) {
    const metricInfo = getMetricInfo(metricName);
    if (metricInfo) {
        return metricInfo.startValue;
    }
    
    // Fallback al sistema legacy
    console.warn(`Metrica '${metricName}' non trovata nel registry, usando valore default 10`);
    return 10; // Default safe per metriche bilanciate
}

/**
 * Controlla se un effetto è permesso per una metrica
 * @param {string} metricName - Nome della metrica
 * @param {number} effectValue - Valore dell'effetto (+1, -2, etc.)
 * @returns {boolean} - True se l'effetto è permesso
 */
function isEffectAllowed(metricName, effectValue) {
    const metricType = determineMetricType(metricName);
    
    switch (metricType) {
        case MetricTypes.GROWTH:
            // Metriche crescita: permettono solo effetti positivi
            return effectValue >= 0;
            
        case MetricTypes.DECAY:
            // Metriche deterioramento: permettono solo effetti negativi
            return effectValue <= 0;
            
        case MetricTypes.BALANCED:
            // Metriche bilanciate: permettono tutti gli effetti
            return true;
            
        default:
            return true; // Safe default
    }
}

/**
 * Ottiene il colore della barra per una metrica
 * @param {string} metricName - Nome della metrica
 * @param {number} value - Valore attuale della metrica
 * @returns {string} - Codice colore CSS
 */
function getMetricBarColor(metricName, value) {
    const metricType = determineMetricType(metricName);
    
    switch (metricType) {
        case MetricTypes.GROWTH:
            // 🟢 Crescita: Rosso → Giallo → Verde
            if (value < 5) return '#ef4444';      // Rosso (troppo basso)
            if (value < 10) return '#f59e0b';     // Giallo (medio)
            return '#10b981';                     // Verde (buono)
            
        case MetricTypes.DECAY:
            // 🔴 Deterioramento: Verde → Giallo → Rosso
            if (value > 15) return '#10b981';     // Verde (ottimo)
            if (value > 10) return '#f59e0b';     // Giallo (attenzione)
            return '#ef4444';                     // Rosso (critico)
            
        case MetricTypes.BALANCED:
            // 🟡 Bilanciate: Colore neutro dorato
            return '#c8a27c';
            
        default:
            return '#c8a27c'; // Default
    }
}

/**
 * Controlla se una metrica è in uno stato di game over
 * @param {string} metricName - Nome della metrica
 * @param {number} value - Valore attuale
 * @returns {Object|null} - {reason, state} se game over, null altrimenti
 */
function checkMetricGameOver(metricName, value) {
    const metricType = determineMetricType(metricName);
    const metricInfo = getMetricInfo(metricName);
    const metricKey = metricInfo ? metricInfo.key : metricName.toLowerCase();
    
    switch (metricType) {
        case MetricTypes.GROWTH:
            // Crescita: game over solo se raggiunge il massimo
            if (value >= 20) {
                return { reason: metricKey, state: 'high' };
            }
            break;
            
        case MetricTypes.DECAY:
            // Deterioramento: game over solo se raggiunge 0
            if (value <= 0) {
                return { reason: metricKey, state: 'low' };
            }
            break;
            
        case MetricTypes.BALANCED:
            // Bilanciate: game over sia a 0 che a 20
            if (value <= 0) {
                return { reason: metricKey, state: 'low' };
            }
            if (value >= 20) {
                return { reason: metricKey, state: 'high' };
            }
            break;
    }
    
    return null; // Nessun game over
}

/**
 * Ottiene tutte le metriche di un tipo specifico
 * @param {string} type - Tipo di metrica (growth, decay, balanced)
 * @returns {Array} - Array di chiavi delle metriche
 */
function getMetricsByType(type) {
    const typeGroups = {
        [MetricTypes.GROWTH]: 'growth',
        [MetricTypes.DECAY]: 'decay', 
        [MetricTypes.BALANCED]: 'balanced'
    };
    
    const groupName = typeGroups[type];
    if (!groupName || !MetricRegistry[groupName]) {
        return [];
    }
    
    return Object.keys(MetricRegistry[groupName]);
}

/**
 * Registra una nuova metrica personalizzata
 * @param {string} key - Chiave della metrica
 * @param {Object} definition - Definizione della metrica
 */
function registerCustomMetric(key, definition) {
    const groupName = {
        [MetricTypes.GROWTH]: 'growth',
        [MetricTypes.DECAY]: 'decay',
        [MetricTypes.BALANCED]: 'balanced'
    }[definition.type];
    
    if (groupName && MetricRegistry[groupName]) {
        MetricRegistry[groupName][key.toLowerCase()] = definition;
        console.log(`Metrica personalizzata '${key}' registrata nel gruppo '${groupName}'`);
    } else {
        console.error(`Tipo metrica '${definition.type}' non valido per '${key}'`);
    }
}

// --- EXPORT GLOBALI ---
// Rende disponibili le funzioni e oggetti a script.js
window.MetricTypes = MetricTypes;
window.MetricRegistry = MetricRegistry;
window.getMetricInfo = getMetricInfo;
window.determineMetricType = determineMetricType;
window.getMetricStartValue = getMetricStartValue;
window.isEffectAllowed = isEffectAllowed;
window.getMetricBarColor = getMetricBarColor;
window.checkMetricGameOver = checkMetricGameOver;
window.getMetricsByType = getMetricsByType;
window.registerCustomMetric = registerCustomMetric;