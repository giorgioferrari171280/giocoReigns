# 🎯 SISTEMA CONDIZIONI DI VITTORIA AVANZATO

## 🚀 OBIETTIVI DEL SISTEMA

Invece di avere solo **"metrica a 0/20 = game over"**, vogliamo:

### **🏆 Condizioni di Vittoria Complesse:**
- ✅ "Sopravvivi 10 round con salute > 5"
- ✅ "Accumula tesoro ≥ 15 E forza ≥ 12"  
- ✅ "Mantieni equilibrio: tutte le metriche tra 8-15"
- ✅ "Non far mai scendere salute sotto 10"
- ✅ "Raggiundi fama = 18 senza perdere onore"

### **💀 Condizioni di Sconfitta Specifiche:**
- ❌ "Salute critica: sotto 3 per più di 1 round"
- ❌ "Bancarotta: tesoro = 0 per 2 round consecutivi"
- ❌ "Rivolta: popolarità < 5 E ordine < 5"
- ❌ "Eccesso di potere: forza > 18 E onore < 5"

---

## 🛠️ STRUTTURA TECNICA

### **Formato JSON Condizioni:**

```javascript
// Nel file del capitolo
const gildaData = {
    title: "...",
    metrics: { ... },
    
    // NUOVO: Condizioni di vittoria/sconfitta
    winConditions: [
        {
            type: "survive_rounds",
            rounds: 8,
            description: "Sopravvivi 8 scenari"
        },
        {
            type: "metric_threshold", 
            metric: "tesoro",
            operator: ">=",
            value: 15,
            description: "Accumula almeno 15 tesori"
        },
        {
            type: "multiple_metrics",
            conditions: [
                { metric: "forza", operator: ">=", value: 12 },
                { metric: "onore", operator: ">=", value: 8 }
            ],
            description: "Bilancia forza (≥12) e onore (≥8)"
        }
    ],
    
    loseConditions: [
        {
            type: "metric_critical",
            metric: "salute", 
            operator: "<=",
            value: 2,
            rounds: 1,
            description: "Salute critica (≤2) per 1+ round"
        },
        {
            type: "metric_combination",
            conditions: [
                { metric: "popolarita", operator: "<", value: 5 },
                { metric: "ordine", operator: "<", value: 5 }
            ],
            description: "Popolarità E ordine entrambi sotto 5"
        }
    ],
    
    scenarios: [ ... ]
};
```

---

## 🎮 TIPI DI CONDIZIONI

### **🏆 WIN CONDITIONS**

#### **1. survive_rounds**
```javascript
{
    type: "survive_rounds",
    rounds: 10,
    description: "Sopravvivi 10 scenari senza game over"
}
```

#### **2. metric_threshold** 
```javascript
{
    type: "metric_threshold",
    metric: "tesoro",
    operator: ">=", // >=, <=, ==, >, <
    value: 18,
    description: "Accumula almeno 18 tesori"
}
```

#### **3. multiple_metrics**
```javascript
{
    type: "multiple_metrics", 
    operator: "AND", // AND, OR
    conditions: [
        { metric: "forza", operator: ">=", value: 15 },
        { metric: "saggezza", operator: ">=", value: 12 },
        { metric: "onore", operator: ">=", value: 10 }
    ],
    description: "Maestria completa: forza ≥15, saggezza ≥12, onore ≥10"
}
```

#### **4. balanced_metrics**
```javascript
{
    type: "balanced_metrics",
    metrics: ["forza", "onore", "saggezza"],
    min_value: 8,
    max_value: 15,
    description: "Equilibrio perfetto: tutte le metriche tra 8-15"
}
```

#### **5. progression_goal**
```javascript
{
    type: "progression_goal",
    metric: "conoscenza", 
    start_value: 0,
    target_value: 18,
    max_rounds: 12,
    description: "Diventa un saggio: 0→18 conoscenza in massimo 12 round"
}
```

### **💀 LOSE CONDITIONS**

#### **1. metric_critical**
```javascript
{
    type: "metric_critical",
    metric: "salute",
    operator: "<=", 
    value: 3,
    rounds: 2, // Per quanti round consecutivi
    description: "Salute critica (≤3) per 2+ round consecutivi"
}
```

#### **2. metric_combination**
```javascript
{
    type: "metric_combination",
    operator: "AND", // Tutte le condizioni devono essere vere
    conditions: [
        { metric: "tesoro", operator: "==", value: 0 },
        { metric: "popolarita", operator: "<", value: 5 }
    ],
    description: "Bancarotta (tesoro=0) E impopolarità (<5)"
}
```

#### **3. metric_spiral**
```javascript
{
    type: "metric_spiral",
    metric: "onore",
    threshold: 3,
    decline_rate: 2, // Perde 2+ punti per round
    rounds: 3,
    description: "Spirale di disonore: onore <3 E perde 2+ per 3 round"
}
```

#### **4. forbidden_combination**
```javascript
{
    type: "forbidden_combination",
    conditions: [
        { metric: "forza", operator: ">", value: 17 },
        { metric: "onore", operator: "<", value: 5 }
    ],
    description: "Tiranno: troppa forza (>17) con poco onore (<5)"
}
```

---

## 💻 IMPLEMENTAZIONE TECNICA

### **Nuova Struttura GameState:**
```javascript
gameState = {
    player: { ... },
    currentChapterId: "...",
    scenarios: [ ... ],
    currentScenarioIndex: 0,
    
    // NUOVO: Tracking condizioni
    conditionTracking: {
        roundsPlayed: 0,
        metricHistory: [], // Ultime N metriche per tracking trends
        criticalStates: {}, // Contatori per stati critici
        achievedWinConditions: [], // Condizioni di vittoria raggiunte
        triggeredLoseConditions: [] // Condizioni di sconfitta attivate
    }
};
```

### **Sistema di Valutazione:**

```javascript
// Nuova funzione principale
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

function evaluateWinConditions(conditions) {
    if (!conditions) return null;
    
    for (const condition of conditions) {
        if (checkCondition(condition)) {
            return condition;
        }
    }
    return null;
}

function checkCondition(condition) {
    switch (condition.type) {
        case 'survive_rounds':
            return gameState.conditionTracking.roundsPlayed >= condition.rounds;
            
        case 'metric_threshold':
            const value = gameState.player.metrics[condition.metric];
            return evaluateOperator(value, condition.operator, condition.value);
            
        case 'multiple_metrics':
            return checkMultipleConditions(condition.conditions, condition.operator);
            
        case 'balanced_metrics':
            return checkBalancedMetrics(condition);
            
        // ... altri tipi
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
```

---

## 🎯 ESEMPI PRATICI

### **🏰 Capitolo Cavalieri - Condizioni Complesse:**

```javascript
const gildaDeiCavalieriData = {
    title: "Gilda dei Cavalieri",
    metrics: {
        gloria: "Gloria",      // 🟢 0→20
        forza: "Forza",        // 🟢 0→20  
        salute: "Salute",      // 🔴 20→0
        soldati: "Soldati",    // 🔴 20→0
        onore: "Onore",        // 🟡 10
        strategia: "Strategia"  // 🟡 10
    },
    
    winConditions: [
        {
            type: "multiple_metrics",
            operator: "AND",
            conditions: [
                { metric: "gloria", operator: ">=", value: 15 },
                { metric: "onore", operator: ">=", value: 12 },
                { metric: "salute", operator: ">", value: 8 }
            ],
            description: "Paladino Leggendario: gloria ≥15, onore ≥12, salute >8"
        },
        {
            type: "survive_rounds", 
            rounds: 15,
            description: "Veterano: sopravvivi 15 battaglie"
        }
    ],
    
    loseConditions: [
        {
            type: "metric_critical",
            metric: "salute",
            operator: "<=",
            value: 2,
            rounds: 1,
            description: "Ferite mortali"
        },
        {
            type: "metric_combination", 
            operator: "AND",
            conditions: [
                { metric: "soldati", operator: "<=", value: 3 },
                { metric: "gloria", operator: "<", value: 8 }
            ],
            description: "Generale fallito: pochi soldati E poca gloria"
        },
        {
            type: "forbidden_combination",
            conditions: [
                { metric: "forza", operator: ">", value: 17 },
                { metric: "onore", operator: "<", value: 6 }
            ],
            description: "Tiranno militare: troppa forza, poco onore"
        }
    ]
};
```

### **🧙‍♂️ Capitolo Maghi - Equilibrio Delicato:**

```javascript
const gildaDeiMaghiData = {
    // ...
    winConditions: [
        {
            type: "balanced_metrics",
            metrics: ["magia", "sanita", "saggezza"], 
            min_value: 10,
            max_value: 16,
            description: "Mago Equilibrato: magia, sanità e saggezza tra 10-16"
        },
        {
            type: "progression_goal",
            metric: "conoscenza",
            start_value: 0,
            target_value: 18,
            max_rounds: 10,
            description: "Arcimago: raggiungi conoscenza 18 in ≤10 round"
        }
    ],
    
    loseConditions: [
        {
            type: "metric_spiral",
            metric: "sanita",
            threshold: 5,
            decline_rate: 2,
            rounds: 3,
            description: "Follia magica: sanità <5 e cala 2+ per 3 round"
        },
        {
            type: "metric_threshold",
            metric: "magia",
            operator: ">=",
            value: 19,
            description: "Potere incontrollabile: magia troppo alta"
        }
    ]
};
```

---

## 🎨 INTERFACCIA UTENTE

### **Visualizzazione Condizioni:**
```html
<!-- Nuovo pannello condizioni -->
<div id="conditions-panel" class="mt-4">
    <h4 class="text-lg font-bold text-yellow-400">🏆 Obiettivi di Vittoria:</h4>
    <ul id="win-conditions-list" class="text-sm space-y-1">
        <li class="text-green-400">✓ Sopravvivi 8 scenari (7/8)</li>
        <li class="text-gray-400">○ Accumula tesoro ≥15 (12/15)</li>
    </ul>
    
    <h4 class="text-lg font-bold text-red-400 mt-2">💀 Pericoli:</h4>
    <ul id="lose-conditions-list" class="text-sm space-y-1">
        <li class="text-yellow-400">⚠️ Salute critica: 4/20 (soglia: ≤3)</li>
        <li class="text-gray-400">○ Nessun pericolo immediato</li>
    </ul>
</div>
```

### **Messaggi Dinamici:**
- **Progresso:** "Obiettivo in vista: tesoro 14/15!"
- **Avvertimenti:** "⚠️ PERICOLO: Salute a 4, soglia critica 3!"
- **Successi:** "🎉 Obiettivo raggiunto: Veterano (15 battaglie)!"

---

## 🚀 VANTAGGI DEL SISTEMA

### **🎯 Gameplay Strategico:**
- **Obiettivi multipli** = strategia più complessa
- **Trade-off** = decisioni più difficili
- **Tensione costante** = awareness dei pericoli

### **📖 Narrativa Ricca:**
- **Condizioni tematiche** = coerenza narrativa
- **Finali diversificati** = replay value
- **Progressione chiara** = senso di crescita

### **🔧 Facilità di Espansione:**
- **Sistema modulare** = aggiungi nuovi tipi facilmente
- **JSON configurabile** = nessun codice hardcoded
- **Template riutilizzabili** = copia/incolla tra capitoli

**🎮 RISULTATO = GAME DESIGN PROFESSIONALE!**