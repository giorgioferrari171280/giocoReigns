# 🎯 GUIDA STEP-BY-STEP: Gestire le Metriche (Sistema 6 Metriche Universali)

## 📋 COSA SONO LE METRICHE OGGI

Le metriche sono le **6 barre universali** fisse che il giocatore deve gestire:
- Vanno da **0 a 20**
- **Partono da valori diversi** a seconda del tipo (0, 10, o 20)
- **3 tipi diversi** con comportamenti unici
- Ogni scelta le modifica solitamente da -3 a +3
- **Sistema coerente** - stesse 6 metriche per tutti i capitoli!

---

## 🚀 STEP 1: COMPRENDERE I 3 TIPI DI METRICHE

### **🟢 Metriche di CRESCITA (0→20):**
- **Partono da 0** e crescono con successi
- Rappresentano: accumuli positivi
- **Game Over**: Se raggiungono 20 (eccesso pericoloso) o 0 (povertà/debolezza)
- **Le 2 attuali**: **Tesoro, Forza**

### **🔴 Metriche di DETERIORAMENTO (20→0):**
- **Partono da 20** e si consumano nel tempo
- Rappresentano: risorse finite
- **Game Over**: Se raggiungono 0 (esaurimento) o 20 (sovraccarico/spreco)
- **Le 2 attuali**: **Salute, Risorse**

### **🟡 Metriche BILANCIATE (10):**
- **Partono da 10** e oscillano con le scelte
- Rappresentano: valori morali/sociali
- **Game Over**: Se raggiungono 0 (vizio estremo) OR 20 (virtù estrema/fanatismo)
- **Le 2 attuali**: **Onore, Coraggio**

**Sistema Attuale**: Il gioco usa sempre le stesse **6 metriche universali**:

```
🟢 Tesoro (crescita: 0→20) + 🟢 Forza (crescita: 0→20) +
🔴 Salute (deterioramento: 20→0) + 🔴 Risorse (deterioramento: 20→0) +
🟡 Onore (bilanciata: 10±) + 🟡 Coraggio (bilanciata: 10±)
```

**Esempi sbagliati:**
```
❌ 6 metriche tutte di crescita = Troppo facile accumulare
❌ 6 metriche tutte di deterioramento = Troppo stressante  
❌ Metriche con nomi poco chiari = Confusione
```

**3.** Le metriche devono essere **chiare** al giocatore:
- ✅ "Salute" = Capisco subito
- ❌ "Xylothermodynamics" = Che significa???

---

## 🚀 STEP 2: USARE IL SISTEMA MODULARE (FACILISSIMO!)

### **Il Segreto: Zero Configurazione Necessaria!**

**1.** Apri il file del tuo capitolo (es: `gilda_alchimisti.js`)

**2.** Nella sezione `metrics`, usa il **NUOVO FORMATO ARRAY**:
```javascript
// FORMATO ARRAY (Raccomandato) - Zero ridondanza!
metrics: ["magia", "sanita", "etica", "conoscenza", "energia", "saggezza"],

// I nomi vengono automaticamente dal registry:
// magia → "Magia"
// sanita → "Sanità Mentale" 
// etica → "Etica"
// conoscenza → "Conoscenza"
// energia → "Energia"
// saggezza → "Saggezza"
```

**OPZIONALE - Override Personalizzati:**
```javascript
// Solo se vuoi nomi diversi da quelli del registry
metrics: {
    magia: "Potere Arcano",        // Override personalizzato
    sanita: null,                  // null = usa "Sanità Mentale" dal registry
    etica: "Codice dei Maghi",     // Override personalizzato
    conoscenza: null,              // null = usa "Conoscenza" dal registry
    energia: null,                 // null = usa "Energia" dal registry
    saggezza: null                 // null = usa "Saggezza" dal registry
}
```

**3.** **MAGIA!** Il sistema fa tutto automaticamente:
- ✅ **Valore iniziale** corretto (0, 10, o 20)
- ✅ **Colori barre** appropriati per tipo
- ✅ **Controllo effetti** (crescita solo +, deterioramento solo -)
- ✅ **Game over** logico per tipo metrica

### **60+ Metriche Già Disponibili:**
```
🟢 CRESCITA: tesoro, oro, forza, magia, fama, gloria, conoscenza, segreti...
🔴 DETERIORAMENTO: salute, operai, cibo, acqua, soldati, munizioni, tempo...
🟡 BILANCIATE: onore, coraggio, strategia, diplomazia, astuzia, carisma...
```

**4.** **IMPORTANTE:** Usa le **chiavi esatte** dal registry per auto-riconoscimento!

---

## 🚀 STEP 3: USARE LE METRICHE NEGLI SCENARI

**1.** Ogni scelta deve modificare le metriche con `effects:`

**2.** **Range Tipico**: Da **-3 a +3** (più varietà strategica!)
```javascript
effects: { 
    magia: +3,         // Grande aumento
    sanita: -2,        // Deterioramento medio
    etica: 0,          // Non cambia
    conoscenza: +1,    // Piccolo aumento
    energia: -1,       // Piccolo calo
    saggezza: +2       // Aumento medio
}
```

**3.** **INTELLIGENZA AUTOMATICA** - Il sistema sa cosa permettere:
```javascript
{
    description: "Trovi un grimorio di magia nera. Lo studi?",
    choices: {
        yes: { 
            text: "Studia il grimorio", 
            effects: { 
                magia: +4,       // ✅ APPLICATO: crescita può aumentare
                sanita: -3,      // ✅ APPLICATO: deterioramento può diminuire
                etica: -2,       // ✅ APPLICATO: bilanciata può aumentare/diminuire
                conoscenza: +2,  // ✅ APPLICATO: crescita può aumentare
                energia: -2,     // ✅ APPLICATO: deterioramento può diminuire
                saggezza: -1     // ✅ APPLICATO: bilanciata può aumentare/diminuire
            } 
        },
        no: { 
            text: "Distruggi il grimorio", 
            effects: { 
                magia: -1,       // ❌ IGNORATO: crescita non può diminuire
                sanita: +2,      // ❌ IGNORATO: deterioramento non può aumentare
                etica: +3,       // ✅ APPLICATO: bilanciata può aumentare/diminuire
                conoscenza: +1,  // ✅ APPLICATO: crescita può aumentare
                energia: +1,     // ❌ IGNORATO: deterioramento non può aumentare
                saggezza: +2     // ✅ APPLICATO: bilanciata può aumentare/diminuire
            } 
        }
    }
}
```

**4.** **Effetti Ignorati = Feature, Non Bug!**
- 🟢 **Crescita**: Effetti negativi ignorati (non può diminuire)
- 🔴 **Deterioramento**: Effetti positivi ignorati (non può aumentare)
- 🟡 **Bilanciate**: Tutti gli effetti applicati (può fare entrambi)

---

## 🚀 STEP 4: BILANCIARE LE METRICHE

**1.** **Regola d'oro:** Non ci devono essere scelte "ovviamente migliori"

**❌ Scelta sbagliata:**
```javascript
yes: { text: "Opzione buona", effects: { a: +2, b: +2, c: +2, d: +2 } },  // Troppo buona!
no:  { text: "Opzione cattiva", effects: { a: -2, b: -2, c: -2, d: -2 } }  // Troppo cattiva!
```

**✅ Scelta bilanciata:**
```javascript
yes: { text: "Sii forte", effects: { forza: +2, saggezza: -1, onore: 0, popolarita: +1 } },
no:  { text: "Sii saggio", effects: { forza: -1, saggezza: +2, onore: +1, popolarita: 0 } }
```

**2.** **Ogni scelta deve avere pro e contro**

**3.** **Variazioni consigliate:**
- Da -2 a +2 per scelte drammatiche
- Da -1 a +1 per scelte normali
- 0 quando la metrica non è coinvolta

---

## 🚀 STEP 5: CREARE FINALI PER LE METRICHE

**1.** Ogni metrica deve avere 2 finali: uno per 0 (low) e uno per 20 (high)

**2.** Formato:
```javascript
endings: {
    nomeMetrica: {
        low: { 
            title: "Titolo Finale Brutto", 
            message: "Cosa succede quando la metrica va a 0...", 
            image: "immagine.jpg" 
        },
        high: { 
            title: "Titolo Finale Brutto Opposto", 
            message: "Cosa succede quando la metrica va a 20...", 
            image: "immagine.jpg" 
        }
    }
}
```

**3.** Esempio per "Tesoro":
```javascript
tesoro: {
    low: { 
        title: "Bancarotta Totale", 
        message: "Le casse sono vuote. L'equipaggio ti ha abbandonato per cercare fortuna altrove. Muori solo e povero su un'isola deserta.", 
        image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Povertà" 
    },
    high: { 
        title: "Soffocato dall'Oro", 
        message: "Hai accumulato troppo tesoro. I pirati rivali ti hanno ucciso nel sonno per impossessarsi delle tue ricchezze. L'avarizia è stata la tua rovina.", 
        image: "https://placehold.co/400x400/FFD700/000000?text=Avarizia" 
    }
}
```

---

## 🚀 STEP 6: TESTARE IL BILANCIAMENTO

**1.** Gioca il tuo capitolo più volte

**2.** Prova strategie diverse:
- Concentrati solo su 1-2 metriche
- Cerca di bilanciare tutto
- Fai scelte "estreme"

**3.** **Domande da farti:**
- Riesco a vincere con strategie diverse?
- Ci sono metriche "inutili"?
- Ci sono scelte troppo ovvie?
- È troppo facile/difficile?

**4.** **Aggiusta** gli `effects` se necessario

---

## 📊 TEMPLATE PER METRICHE TEMATICHE (6 METRICHE)

### 🏰 **Tema Medievale (Cavalieri):**
```javascript
metrics: {
    gloria: "Gloria",          // 🟢 Crescita: 0→20 (gesta eroiche)
    forza: "Forza",            // 🟢 Crescita: 0→20 (allenamento)
    salute: "Salute",          // 🔴 Deterioramento: 20→0 (ferite)
    soldati: "Soldati",        // 🔴 Deterioramento: 20→0 (perdite)
    onore: "Onore",            // 🟡 Bilanciata: 10 (virtù)
    strategia: "Strategia"     // 🟡 Bilanciata: 10 (tattiche)
}
```

### 🏴‍☠️ **Tema Pirati (6 Metriche):**
```javascript
metrics: {
    tesoro: "Tesoro",          // 🟢 Crescita: 0→20 (bottino)
    fama: "Fama",              // 🟢 Crescita: 0→20 (leggenda)
    equipaggio: "Equipaggio",  // 🔴 Deterioramento: 20→0 (ammutinamenti)
    provviste: "Provviste",    // 🔴 Deterioramento: 20→0 (vita in mare)
    astuzia: "Astuzia",        // 🟡 Bilanciata: 10 (furbizia)
    onore: "Onore da Pirata"   // 🟡 Bilanciata: 10 (codice)
}
```

### 🏭 **Tema Industriale (Inventori):**
```javascript
metrics: {
    innovazione: "Innovazione",     // 🟢 Crescita: 0→20 (invenzioni)
    produzione: "Produzione",       // 🟢 Crescita: 0→20 (efficienza)
    operai: "Operai",              // 🔴 Deterioramento: 20→0 (scioperi)
    risorse: "Materie Prime",      // 🔴 Deterioramento: 20→0 (consumo)
    sicurezza: "Sicurezza",        // 🟡 Bilanciata: 10 (incidenti vs protezione)
    etica: "Etica Lavorativa"      // 🟡 Bilanciata: 10 (trattamento operai)
}
```

### 🧙‍♂️ **Tema Fantasy (Maghi):**
```javascript
metrics: {
    magia: "Potere Magico",        // 🟢 Crescita: 0→20 (accumuli potere)
    conoscenza: "Conoscenza",      // 🟢 Crescita: 0→20 (studi arcani)
    sanita: "Sanità Mentale",      // 🔴 Deterioramento: 20→0 (magia corrompe)
    energia: "Energia Vitale",     // 🔴 Deterioramento: 20→0 (rituali consumano)
    saggezza: "Saggezza",          // 🟡 Bilanciata: 10 (equilibrio mentale)
    etica: "Etica Magica"          // 🟡 Bilanciata: 10 (moralità)
}
```

### 🌟 **Tema Spaziale (Comandanti):**
```javascript
metrics: {
    tecnologia: "Tecnologia",      // 🟢 Crescita: 0→20 (ricerca)
    esplorazione: "Esplorazione",  // 🟢 Crescita: 0→20 (scoperte)
    equipaggio: "Equipaggio",      // 🔴 Deterioramento: 20→0 (incidenti spaziali)
    carburante: "Carburante",      // 🔴 Deterioramento: 20→0 (consumo)
    diplomazia: "Diplomazia",      // 🟡 Bilanciata: 10 (relazioni aliene)
    equilibrio: "Equilibrio"       // 🟡 Bilanciata: 10 (sistemi nave)
}
```

### 🌾 **Tema Sopravvivenza (Contadini):**
```javascript
metrics: {
    raccolto: "Raccolto",          // 🟢 Crescita: 0→20 (cibo accumulato)
    esperienza: "Esperienza",      // 🟢 Crescita: 0→20 (tecniche agricole)
    acqua: "Riserve d'Acqua",      // 🔴 Deterioramento: 20→0 (siccità)
    popolazione: "Popolazione",    // 🔴 Deterioramento: 20→0 (emigrazione)
    tradizione: "Tradizione",      // 🟡 Bilanciata: 10 (vecchi vs nuovi metodi)
    comunita: "Spirito Comunitario" // 🟡 Bilanciata: 10 (coesione sociale)
}
```

---

## 🔥 IDEE PER EFFETTI CREATIVI

### **Effetti Simmetrici:**
```javascript
// Una scelta aumenta A e diminuisce B, l'altra fa l'opposto
yes: { effects: { forza: +2, saggezza: -1 } },
no:  { effects: { forza: -1, saggezza: +2 } }
```

### **Effetti a Costo:**
```javascript
// Grandi vantaggi con grandi svantaggi
yes: { effects: { tesoro: +3, reputazione: -2 } },
no:  { effects: { tesoro: -1, reputazione: +1 } }
```

### **Effetti Neutrali:**
```javascript
// Una scelta non tocca alcune metriche
yes: { effects: { forza: +2, onore: 0, ricchezza: -1, popolarita: 0 } },
no:  { effects: { forza: 0, onore: +1, ricchezza: 0, popolarita: +1 } }
```

### **Effetti Concentrati:**
```javascript
// Impatto forte su una sola metrica
yes: { effects: { magia: +3, saggezza: 0, alleati: 0, equilibrio: 0 } },
no:  { effects: { magia: 0, saggezza: +1, alleati: +1, equilibrio: +1 } }
```

---

## ⚖️ PRINCIPI DEL BILANCIAMENTO

### **1. Opposizioni Chiare:**
- Forza ↔ Saggezza
- Ordine ↔ Libertà  
- Ricchezza ↔ Popolarità
- Onore ↔ Pragmatismo

### **2. Scelte Difficili:**
- Ogni opzione deve avere pro e contro
- Nessuna scelta "perfetta"
- Il giocatore deve sacrificare qualcosa

### **3. Varietà di Strategie:**
- Deve essere possibile vincere in modi diversi
- Alcune metriche possono essere più importanti di altre in certi scenari
- Il giocatore deve poter sperimentare

### **4. Conseguenze Logiche:**
- Se scegli violenza, perdi onore ma guadagni paura
- Se scegli generosità, perdi ricchezza ma guadagni popolarità
- Le conseguenze devono "avere senso" nella storia

---

## 🚀 AGGIUNGERE NUOVE METRICHE (SUPER FACILE!)

### **Metodo 1: Usa Metriche Esistenti (Raccomandato)**
```javascript
// Scegli da 60+ metriche già disponibili nel registry!
metrics: {
    determinazione: "Determinazione",  // 🟡 Già nel sistema
    creativita: "Creatività",          // 🟡 Già nel sistema  
    passione: "Passione"               // 🟡 Già nel sistema
}
```

### **Metodo 2: Aggiungi al Registry (Permanente)**
**1.** Apri `metriche.js`

**2.** Trova la sezione giusta (`growth`, `decay`, `balanced`)

**3.** Aggiungi la tua metrica:
```javascript
// In MetricRegistry.growth
intelligence: { 
    name: 'Intelligence', 
    type: MetricTypes.GROWTH, 
    startValue: 0, 
    description: 'Capacità di spionaggio' 
}
```

### **Metodo 3: Registrazione Runtime (Temporanea)**
```javascript
// Nel tuo file capitolo
registerCustomMetric('mia_metrica_speciale', {
    name: 'Mia Metrica Speciale',
    type: MetricTypes.BALANCED,
    startValue: 10,
    description: 'Una metrica unica per questo capitolo'
});

// Ora puoi usarla
metrics: {
    mia_metrica_speciale: "Mia Metrica Speciale"
}
```

---

## ✅ CHECKLIST METRICHE MODERNE

- [ ] Ho esattamente **6 metriche**?
- [ ] Mix equilibrato: **2 crescita + 2 deterioramento + 2 bilanciate**?
- [ ] I nomi sono chiari e comprensibili?
- [ ] Le metriche si contrastano strategicamente?
- [ ] Ogni scelta ha pro e contro?
- [ ] Ho definito finali per tutte le metriche?
- [ ] Gli effetti vanno da **-3 a +3** per varietà?
- [ ] Ho testato che il sistema modulare funzioni?
- [ ] Le metriche sono riconosciute automaticamente?

---

## ❓ PROBLEMI COMUNI (SISTEMA MODULARE)

**Q: Una metrica non viene riconosciuta**
A: Controlla che il nome sia nel registry (`getMetricInfo('nome')` nel console)

**Q: Una metrica parte dal valore sbagliato**
A: Verifica il tipo nel registry o aggiungila con il tipo corretto

**Q: Gli effetti vengono ignorati**
A: È normale! Crescita ignora effetti negativi, deterioramento ignora positivi

**Q: Il colore della barra è sbagliato**
A: Verifica che la metrica sia riconosciuta dal sistema automatico

**Q: Come vedo tutte le metriche disponibili?**
A: Nel console browser: `console.log(MetricRegistry)`

**SE IL SISTEMA MODULARE FUNZIONA = 🎉 HAI UN GIOCO PROFESSIONALE!**