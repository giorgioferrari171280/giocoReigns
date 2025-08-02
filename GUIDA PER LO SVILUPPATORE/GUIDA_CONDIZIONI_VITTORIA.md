# 🎯 GUIDA STEP-BY-STEP: Condizioni di Vittoria Avanzate

## 🚀 STEP 1: COSA SONO LE CONDIZIONI PERSONALIZZATE

### **Prima (Sistema Semplice):**
- ❌ Metrica a 0 o 20 = Game Over automatico
- ❌ Stesso comportamento per tutti i capitoli
- ❌ Nessuna strategia complessa

### **Ora (Sistema Avanzato):**
- ✅ Obiettivi multipli configurabili per capitolo
- ✅ Condizioni di sconfitta specifiche e tematiche
- ✅ Gameplay strategico con trade-off complessi

---

## 🚀 STEP 2: AGGIUNGERE CONDIZIONI A UN CAPITOLO

### **Struttura Base:**
```javascript
const tuoCapitoloData = {
    title: "Nome Capitolo",
    metrics: { ... },
    
    // NUOVE SEZIONI
    winConditions: [
        // Obiettivi da raggiungere per vincere
    ],
    
    loseConditions: [
        // Situazioni che causano sconfitta
    ],
    
    scenarios: [ ... ]
};
```

---

## 🚀 STEP 3: TIPI DI CONDIZIONI DI VITTORIA

### **🏆 Type: "survive_rounds"**
Il giocatore deve sopravvivere un numero minimo di scenari.

```javascript
{
    type: "survive_rounds",
    rounds: 8,
    description: "Sopravvivi 8 scenari senza morire"
}
```

### **🏆 Type: "metric_threshold"**
Una singola metrica deve raggiungere un valore specifico.

```javascript
{
    type: "metric_threshold",
    metric: "tesoro",
    operator: ">=",    // >=, <=, >, <, ==, !=
    value: 15,
    description: "Accumula almeno 15 tesori"
}
```

### **🏆 Type: "multiple_metrics"**
Più metriche devono soddisfare condizioni simultaneamente.

```javascript
{
    type: "multiple_metrics",
    operator: "AND",   // AND = tutte vere, OR = almeno una vera
    conditions: [
        { metric: "forza", operator: ">=", value: 15 },
        { metric: "onore", operator: ">=", value: 12 },
        { metric: "salute", operator: ">", value: 8 }
    ],
    description: "Paladino perfetto: forza ≥15, onore ≥12, salute >8"
}
```

### **🏆 Type: "balanced_metrics"**
Più metriche devono rimanere in un range specifico.

```javascript
{
    type: "balanced_metrics",
    metrics: ["forza", "saggezza", "diplomazia"],
    min_value: 8,
    max_value: 15,
    description: "Equilibrio perfetto: tutte le metriche tra 8-15"
}
```

### **🏆 Type: "progression_goal"**
Una metrica deve crescere da un valore iniziale a uno finale in tempo limitato.

```javascript
{
    type: "progression_goal",
    metric: "conoscenza",
    start_value: 0,
    target_value: 18,
    max_rounds: 12,
    description: "Diventa saggio: 0→18 conoscenza in ≤12 round"
}
```

---

## 🚀 STEP 4: TIPI DI CONDIZIONI DI SCONFITTA

### **💀 Type: "metric_critical"**
Una metrica rimane in stato critico per troppi round consecutivi.

```javascript
{
    type: "metric_critical",
    metric: "salute",
    operator: "<=",
    value: 3,
    rounds: 2,
    description: "Salute critica (≤3) per 2+ round consecutivi"
}
```

### **💀 Type: "metric_combination"**
Più metriche raggiungono contemporaneamente valori pericolosi.

```javascript
{
    type: "metric_combination",
    operator: "AND",
    conditions: [
        { metric: "tesoro", operator: "==", value: 0 },
        { metric: "popolarita", operator: "<", value: 5 }
    ],
    description: "Bancarotta totale: senza soldi E impopolare"
}
```

### **💀 Type: "forbidden_combination"**
Combinazioni di valori che sono intrinsecamente pericolose.

```javascript
{
    type: "forbidden_combination",
    conditions: [
        { metric: "forza", operator: ">", value: 17 },
        { metric: "onore", operator: "<", value: 5 }
    ],
    description: "Tiranno: troppa forza con poco onore"
}
```

---

## 🚀 STEP 5: ESEMPI PRATICI TEMATICI

### **🏰 Capitolo Cavalieri:**
```javascript
winConditions: [
    {
        type: "multiple_metrics",
        operator: "AND",
        conditions: [
            { metric: "gloria", operator: ">=", value: 15 },
            { metric: "onore", operator: ">=", value: 12 },
            { metric: "salute", operator: ">", value: 8 }
        ],
        description: "Paladino Leggendario"
    },
    {
        type: "survive_rounds",
        rounds: 15,
        description: "Veterano di 15 battaglie"
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
        type: "forbidden_combination",
        conditions: [
            { metric: "forza", operator: ">", value: 17 },
            { metric: "onore", operator: "<", value: 6 }
        ],
        description: "Tiranno militare"
    }
]
```

### **🧙‍♂️ Capitolo Maghi:**
```javascript
winConditions: [
    {
        type: "balanced_metrics",
        metrics: ["magia", "sanita", "saggezza"],
        min_value: 10,
        max_value: 16,
        description: "Mago Equilibrato"
    },
    {
        type: "progression_goal",
        metric: "conoscenza",
        start_value: 0,
        target_value: 18,
        max_rounds: 10,
        description: "Arcimago in 10 round"
    }
],

loseConditions: [
    {
        type: "metric_critical",
        metric: "sanita",
        operator: "<=",
        value: 4,
        rounds: 3,
        description: "Follia magica progressiva"
    },
    {
        type: "metric_threshold",
        metric: "magia",
        operator: ">=",
        value: 19,
        description: "Potere incontrollabile"
    }
]
```

### **⚓ Capitolo Pirati:**
```javascript
winConditions: [
    {
        type: "multiple_metrics",
        operator: "AND",
        conditions: [
            { metric: "tesoro", operator: ">=", value: 18 },
            { metric: "fama", operator: ">=", value: 14 },
            { metric: "equipaggio", operator: ">", value: 10 }
        ],
        description: "Re dei Pirati"
    }
],

loseConditions: [
    {
        type: "metric_combination",
        operator: "AND",
        conditions: [
            { metric: "equipaggio", operator: "<=", value: 3 },
            { metric: "lealta", operator: "<=", value: 4 }
        ],
        description: "Ammutinamento generale"
    },
    {
        type: "metric_critical",
        metric: "provviste",
        operator: "<=",
        value: 2,
        rounds: 3,
        description: "Fame in mare aperto"
    }
]
```

---

## 🚀 STEP 6: OPERATORI DISPONIBILI

### **Confronti Numerici:**
- `>=` : Maggiore o uguale
- `<=` : Minore o uguale  
- `>` : Maggiore
- `<` : Minore
- `==` : Uguale
- `!=` : Diverso

### **Operatori Logici:**
- `AND` : Tutte le condizioni devono essere vere
- `OR` : Almeno una condizione deve essere vera

---

## 🚀 STEP 7: COME FUNZIONA IL SISTEMA

### **Priorità di Controllo:**
1. **Prima** vengono controllate le **loseConditions**
2. **Poi** vengono controllate le **winConditions**
3. Se nessuna è attiva, il gioco continua

### **Fallback Sistema Legacy:**
Se un capitolo non ha `winConditions` o `loseConditions`, usa automaticamente il sistema vecchio (metrica a 0/20 = game over).

### **Tracking Automatico:**
Il sistema tiene traccia di:
- Round giocati
- Storia delle metriche (ultimi 10 round)
- Stati critici consecutivi
- Condizioni raggiunte

---

## 🚀 STEP 8: TESTARE LE TUE CONDIZIONI

### **Checklist Pre-Test:**
- [ ] Le condizioni di vittoria sono raggiungibili?
- [ ] Le condizioni di sconfitta non sono troppo facili da attivare?
- [ ] C'è un buon bilanciamento tra rischio e ricompensa?
- [ ] Le descrizioni sono chiare e tematiche?

### **Test Manuale:**
1. **Gioca il capitolo** normalmente
2. **Forza situazioni estreme** (modifica valori per test)
3. **Controlla che i messaggi** di vittoria/sconfitta siano giusti
4. **Verifica il timing** delle condizioni critiche

---

## 🚀 STEP 9: ESEMPI DI BILANCIAMENTO

### **❌ Condizioni Troppo Facili:**
```javascript
// Male: troppo facile
{
    type: "metric_threshold",
    metric: "forza", 
    operator: ">=",
    value: 5,  // Troppo basso!
    description: "Guerriero"
}
```

### **✅ Condizioni Ben Bilanciate:**
```javascript
// Bene: sfidante ma raggiungibile
{
    type: "multiple_metrics",
    operator: "AND",
    conditions: [
        { metric: "forza", operator: ">=", value: 15 },   // Alta ma non massima
        { metric: "onore", operator: ">=", value: 12 },   // Richiede equilibrio
        { metric: "salute", operator: ">", value: 8 }     // Non deve morire
    ],
    description: "Paladino Leggendario"
}
```

### **❌ Condizioni Impossibili:**
```javascript
// Male: impossibile da raggiungere
{
    type: "multiple_metrics",
    operator: "AND", 
    conditions: [
        { metric: "forza", operator: ">=", value: 19 },   // Quasi massimo
        { metric: "magia", operator: ">=", value: 19 },   // Quasi massimo
        { metric: "onore", operator: ">=", value: 19 }    // Quasi massimo
    ],
    description: "Divinità" // Troppo difficile!
}
```

---

## 🚀 STEP 10: AGGIUNGERE AL TUO CAPITOLO

### **Template Completo:**
```javascript
const tuoCapitoloData = {
    title: "Il Tuo Capitolo",
    metrics: {
        metrica1: "Nome Metrica 1",
        metrica2: "Nome Metrica 2",
        // ... fino a 6 metriche
    },
    
    winConditions: [
        {
            type: "multiple_metrics",
            operator: "AND",
            conditions: [
                { metric: "metrica1", operator: ">=", value: 15 },
                { metric: "metrica2", operator: ">=", value: 12 }
            ],
            description: "Maestro del Dominio"
        },
        {
            type: "survive_rounds",
            rounds: 8,
            description: "Veterano Esperto"
        }
    ],
    
    loseConditions: [
        {
            type: "metric_critical",
            metric: "metrica_critica",
            operator: "<=",
            value: 3,
            rounds: 2,
            description: "Collasso critico"
        },
        {
            type: "forbidden_combination",
            conditions: [
                { metric: "potere", operator: ">", value: 17 },
                { metric: "morale", operator: "<", value: 5 }
            ],
            description: "Tiranno folle"
        }
    ],
    
    scenarios: [
        // I tuoi scenari qui
    ],
    
    endings: {
        // I tuoi finali qui
    }
};
```

---

## ✅ VANTAGGI DEL NUOVO SISTEMA

### **🎯 Per i Giocatori:**
- **Obiettivi chiari** da raggiungere
- **Strategia più profonda** con trade-off complessi
- **Tensione costante** senza essere frustrante
- **Replay value** con strategie diverse

### **🛠️ Per i Creatori:**
- **Flessibilità totale** nel design
- **Temi narrativi** supportati dal gameplay
- **Bilanciamento fine** capitolo per capitolo
- **Facilità di espansione** con nuovi tipi

**🎮 RISULTATO = GAMEPLAY STRATEGICO E COINVOLGENTE!**