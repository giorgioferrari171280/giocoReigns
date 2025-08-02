# 🎯 GUIDA SISTEMA METRICHE MODULARE

## 🚀 ADDIO HARDCODING, BENVENUTA MODULARITÀ!

### **Prima (Sistema Hardcoded):**
- ❌ Parole chiave sparse in script.js
- ❌ Difficile aggiungere nuove metriche
- ❌ Codice duplicato ovunque
- ❌ Modifiche richiedevano toccare script.js

### **Ora (Sistema Modulare):**
- ✅ Tutte le definizioni in `metriche.js`
- ✅ Registry centralizzato e organizzato
- ✅ Aggiungere metriche = solo una riga
- ✅ Zero hardcoding in script.js

---

## 🚀 STEP 1: COME FUNZIONA IL REGISTRY

### **File metriche.js - Struttura:**
```javascript
const MetricRegistry = {
    growth: {    // 🟢 Metriche 0→20
        tesoro: { name: 'Tesoro', type: 'growth', startValue: 0, description: '...' },
        forza: { name: 'Forza', type: 'growth', startValue: 0, description: '...' }
        // ... 30+ metriche predefinite
    },
    decay: {     // 🔴 Metriche 20→0  
        salute: { name: 'Salute', type: 'decay', startValue: 20, description: '...' },
        operai: { name: 'Operai', type: 'decay', startValue: 20, description: '...' }
        // ... 25+ metriche predefinite
    },
    balanced: {  // 🟡 Metriche 10
        onore: { name: 'Onore', type: 'balanced', startValue: 10, description: '...' },
        strategia: { name: 'Strategia', type: 'balanced', startValue: 10, description: '...' }
        // ... 20+ metriche predefinite
    }
};
```

---

## 🚀 STEP 2: USARE METRICHE ESISTENTI

### **Nei Tuoi Capitoli - ANCORA PIÙ SEMPLICE!**

#### **Formato Array (RACCOMANDATO) - Zero Ridondanza:**
```javascript
const tuoCapitoloData = {
    title: "Gilda degli Esploratori",
    
    // NUOVO! Solo le chiavi, i nomi vengono automaticamente dal registry!
    metrics: ["tesoro", "salute", "coraggio", "conoscenza", "equipaggio", "strategia"],
    
    // Il resto rimane uguale...
};
```

#### **Formato Oggetto (Per Override) - Quando Vuoi Personalizzare:**
```javascript
const tuoCapitoloData = {
    title: "Gilda dei Samurai",
    
    // Formato oggetto permette override personalizzati
    metrics: {
        forza: null,                    // null = usa "Forza" dal registry
        onore: "Onore del Bushido",     // Override: nome personalizzato
        salute: null,                   // null = usa "Salute" dal registry
        equipaggio: "Clan Guerrieri",   // Override: nome personalizzato
        strategia: "Arte della Guerra", // Override: nome personalizzato
        saggezza: null                  // null = usa "Saggezza" dal registry
    }
    // Il resto rimane uguale...
};
```

### **Il Sistema Fa Tutto Automaticamente:**
- ✅ **Valore iniziale** corretto (0, 10, o 20)
- ✅ **Colore barre** appropriato per tipo
- ✅ **Controllo effetti** (crescita solo +, deterioramento solo -)
- ✅ **Game over** logico per tipo metrica

---

## 🚀 STEP 3: METRICHE DISPONIBILI NEL REGISTRY

### **🟢 Metriche di Crescita (0→20):**
```
💰 RICCHEZZE: tesoro, oro, ricchezza, denaro
🧠 CONOSCENZE: conoscenza, saggezza, segreti, informazioni
👑 POTERE: influenza, potere, fama, reputazione, gloria, prestigio
💪 ABILITÀ: forza, esperienza, abilita
🔬 TECH: tecnologia, innovazione, produzione
🔮 MAGIA: magia, mana
🗺️ ESPLORAZIONE: navigazione, esplorazione
```

### **🔴 Metriche di Deterioramento (20→0):**
```
❤️ SALUTE: salute, vita, sanita, benessere
🍖 RISORSE: risorse, cibo, acqua, provviste
👥 PERSONE: equipaggio, soldati, operai, popolazione, alleati, seguaci
⏰ TEMPO: tempo, scadenza, opportunita
⚡ ENERGIA: energia, carburante, munizioni
🤝 SOCIETÀ: fiducia, stabilita, ordine, pace, equilibrio, armonia
```

### **🟡 Metriche Bilanciate (10):**
```
🛡️ VIRTÙ: onore, coraggio, umilta, generosita, giustizia
👑 SOCIALE: popolarita, carisma, diplomazia, lealta
🧠 MENTALI: astuzia, strategia, intuizione, creativita
⚖️ PROFESSIONAL: disciplina, efficienza, precisione
❤️ EMOTIVE: determinazione, serenita, passione
📜 ETICHE: etica, integrita, rispetto
```

---

## 🚀 STEP 4: AGGIUNGERE NUOVE METRICHE

### **Metodo 1: Aggiungere al Registry (Permanente)**

**1.** Apri `metriche.js`

**2.** Trova la sezione appropriata (`growth`, `decay`, `balanced`)

**3.** Aggiungi la tua metrica:

```javascript
// In MetricRegistry.growth per una metrica di crescita
intelligence: { 
    name: 'Intelligence', 
    type: MetricTypes.GROWTH, 
    startValue: 0, 
    description: 'Capacità di spionaggio' 
},

// In MetricRegistry.decay per una metrica di deterioramento  
morale: { 
    name: 'Morale', 
    type: MetricTypes.DECAY, 
    startValue: 20, 
    description: 'Spirito delle truppe' 
},

// In MetricRegistry.balanced per una metrica bilanciata
carisma_politico: { 
    name: 'Carisma Politico', 
    type: MetricTypes.BALANCED, 
    startValue: 10, 
    description: 'Influenza nelle corti' 
}
```

### **Metodo 2: Registrazione Runtime (Temporanea)**

```javascript
// Nel tuo capitolo o in content.js
registerCustomMetric('mia_metrica', {
    name: 'Mia Metrica Speciale',
    type: MetricTypes.GROWTH,
    startValue: 0,
    description: 'Una metrica personalizzata'
});

// Ora puoi usarla nei capitoli
const capitoloPersonalizzato = {
    metrics: {
        mia_metrica: "Mia Metrica Speciale"  // Funzionerà!
    }
};
```

---

## 🚀 STEP 5: ESEMPI PRATICI TEMATICI

### **🏰 Capitolo Assedio:**
```javascript
const assedioData = {
    title: "L'Assedio di Roccaforte",
    metrics: {
        // Usa metriche esistenti per tema coerente
        munizioni: "Munizioni",        // 🔴 Deterioramento: si consumano
        soldati: "Soldati",            // 🔴 Deterioramento: perdite
        cibo: "Cibo",                  // 🔴 Deterioramento: razionamento
        esperienza: "Esperienza",      // 🟢 Crescita: veterani
        morale: "Morale",              // 🟡 Bilanciata: sale/scende
        strategia: "Strategia"         // 🟡 Bilanciata: tattiche
    }
    // Tutto il resto gestito automaticamente!
};
```

### **🚀 Capitolo Spaziale:**
```javascript
const spaceData = {
    title: "Comandante Galattico",
    metrics: {
        tecnologia: "Tecnologia",      // 🟢 Crescita: ricerca
        carburante: "Carburante",      // 🔴 Deterioramento: consumo
        equipaggio: "Equipaggio",      // 🔴 Deterioramento: incidenti
        conoscenza: "Conoscenza",      // 🟢 Crescita: scoperte
        equilibrio: "Equilibrio",      // 🔴 Deterioramento: sistemi
        diplomazia: "Diplomazia"       // 🟡 Bilanciata: relazioni aliene
    }
};
```

### **🏴‍☠️ Capitolo Pirati Migliorato:**
```javascript
const piratiData = {
    title: "Capitano dei Sette Mari",
    metrics: {
        tesoro: "Tesoro",              // 🟢 Crescita: bottino
        fama: "Fama",                  // 🟢 Crescita: leggenda
        equipaggio: "Equipaggio",      // 🔴 Deterioramento: ammutinamenti  
        provviste: "Provviste",        // 🔴 Deterioramento: vita in mare
        astuzia: "Astuzia",            // 🟡 Bilanciata: furbizia
        onore: "Onore da Pirata"       // 🟡 Bilanciata: codice piratesco
    }
};
```

---

## 🚀 STEP 6: VANTAGGI DEL SISTEMA MODULARE

### **🎯 Per i Creatori:**
- **Zero configurazione**: Scrivi nome metrica, tutto funziona
- **Espansione facile**: Aggiungi metrica = una riga in metriche.js
- **Coerenza automatica**: Stesso comportamento in tutto il gioco
- **Manutenzione semplice**: Un solo file da modificare

### **🛠️ Per il Codice:**
- **Zero hardcoding**: Tutto centralizzato nel registry
- **Separation of concerns**: Logica business separata da dati
- **Estensibilità**: Aggiungi nuovi tipi senza toccare script.js
- **Type safety**: Controlli automatici sui tipi

### **🎮 Per i Giocatori:**
- **Comportamenti prevedibili**: Stessa metrica = stesso comportamento
- **UI coerente**: Colori e feedback sempre appropriati
- **Learning curve**: Imparano una volta, vale per tutti i capitoli

---

## 🚀 STEP 7: FUNZIONI UTILI DISPONIBILI

### **getMetricInfo(metricKey)**
```javascript
const info = getMetricInfo('tesoro');
// Returns: { name: 'Tesoro', type: 'growth', startValue: 0, ... }
```

### **getMetricsByType(type)**
```javascript
const crescite = getMetricsByType(MetricTypes.GROWTH);
// Returns: ['tesoro', 'oro', 'forza', 'conoscenza', ...]
```

### **isEffectAllowed(metricKey, effectValue)**
```javascript
const allowed = isEffectAllowed('salute', +2);  // false (decay non può aumentare)
const allowed2 = isEffectAllowed('tesoro', +3); // true (growth può aumentare)
```

### **getMetricBarColor(metricKey, value)**
```javascript
const color = getMetricBarColor('salute', 5);  // '#ef4444' (rosso, critico)
const color2 = getMetricBarColor('tesoro', 15); // '#10b981' (verde, buono)
```

---

## 🚀 STEP 8: DEBUGGING E TROUBLESHOOTING

### **Metrica Non Riconosciuta:**
```javascript
// Console warning: "Metrica 'xyz' non trovata nel registry"
// Soluzione: Aggiungi 'xyz' al registry o usa nome esistente
```

### **Comportamento Inaspettato:**
```javascript
// Usa getMetricInfo per controllare
console.log(getMetricInfo('mia_metrica'));
// Se torna null, la metrica non è registrata
```

### **Testing Rapido:**
```javascript
// Test nel browser console
console.log(getMetricsByType('growth'));     // Vedi tutte le crescite
console.log(getMetricsByType('decay'));      // Vedi tutti i deterioramenti
console.log(getMetricsByType('balanced'));   // Vedi tutte le bilanciate
```

---

## 🚀 STEP 9: MIGRAZIONE CAPITOLI ESISTENTI

### **I Tuoi Capitoli Esistenti Funzionano Già!**

Il sistema è **retrocompatibile**:
- ✅ **Taglialegna**: `forza`, `salute`, `onore` → Funziona
- ✅ **Maniscalchi**: `tesoro`, `operai`, `influenza` → Funziona  
- ✅ **Tutti i capitoli**: Riconoscimento automatico

### **Per Ottimizzare (Opzionale):**
```javascript
// Prima (funziona ma verbose)
metrics: {
    forza_bruta_guerriera: "Forza Bruta Guerriera"
}

// Dopo (più pulito)  
metrics: {
    forza: "Forza Bruta Guerriera"  // Usa chiave registry
}
```

---

## 🚀 STEP 10: ESTENSIONI FUTURE

### **Aggiungere Nuovi Tipi:**
```javascript
// In metriche.js - Facilmente estensibile
const MetricTypes = {
    GROWTH: 'growth',
    DECAY: 'decay', 
    BALANCED: 'balanced',
    CYCLICAL: 'cyclical',    // NUOVO: Ciclico (es: stagioni)
    VOLATILE: 'volatile'     // NUOVO: Volatile (swing estremi)
};
```

### **Metadati Avanzati:**
```javascript
// Ogni metrica può avere proprietà aggiuntive
conoscenza: { 
    name: 'Conoscenza',
    type: MetricTypes.GROWTH,
    startValue: 0,
    description: 'Sapere acquisito',
    category: 'mental',      // NUOVO: Categorizzazione
    rarity: 'common',        // NUOVO: Rarità  
    theme: 'scholarly',      // NUOVO: Tema narrativo
    maxSafeValue: 18         // NUOVO: Soglia di sicurezza
}
```

---

## ✅ CHECKLIST SISTEMA MODULARE

- [ ] Ho capito che le metriche vanno solo scritte come chiavi nel capitolo?
- [ ] So dove aggiungere nuove metriche permanenti (metriche.js)?
- [ ] Capisco la differenza tra growth/decay/balanced?
- [ ] I miei capitoli esistenti funzionano senza modifiche?
- [ ] So usare getMetricInfo() per debugging?
- [ ] Ho testato che i colori delle barre siano giusti?
- [ ] Gli effetti vengono applicati correttamente (ignorati quando dovrebbero)?

**🎯 RISULTATO = SISTEMA POTENTE, FLESSIBILE E FACILE DA USARE!**