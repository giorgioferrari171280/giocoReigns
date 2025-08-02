# 🎯 GUIDA STEP-BY-STEP: Progressione e Sblocco Capitoli

## 📋 COME FUNZIONA LA PROGRESSIONE

- **Capitoli si sbloccano** completando quello precedente
- **Finale "success"** sblocca il prossimo capitolo  
- **Il giocatore può tornare** ai capitoli precedenti
- **Progressi vengono salvati** automaticamente nel browser
- **Hall of Fame** tiene traccia dei migliori punteggi

---

## 🚀 STEP 1: COLLEGARE DUE CAPITOLI

**1.** Per far sì che il Capitolo A sblocchi il Capitolo B:

**2.** Apri il file del Capitolo A (es: `gilda_tagliaboschi.js`)

**3.** Trova la sezione `success` nei finali:
```javascript
endings: {
    // Altri finali...
    success: {
        title: "Titolo Vittoria",
        message: "Hai completato il capitolo!",
        image: "immagine_vittoria.jpg",
        nextChapter: "nomeCapitoloB"  // ← QUESTA RIGA SBLOCCA IL PROSSIMO
    }
}
```

**4.** Sostituisci `"nomeCapitoloB"` con il nome esatto del capitolo successivo

**5.** Salva il file

---

## 🚀 STEP 2: ESEMPI DI PROGRESSIONE LINEARE

### **📚 Saga in Sequenza:**
```javascript
// Capitolo 1: Gilda dei Boschi
success: {
    title: "Padrone della Foresta",
    message: "Hai dominato le terre selvagge, ma la città ti chiama...",
    image: "vittoria_boschi.jpg",
    nextChapter: "gildaDeiManiscalchi"  // → Sblocca Capitolo 2
}

// Capitolo 2: Gilda dei Maniscalchi  
success: {
    title: "Signore delle Fucine",
    message: "Le città sono tue, ma il mare ti attende...",
    image: "vittoria_citta.jpg", 
    nextChapter: "gildaDeiPirati"  // → Sblocca Capitolo 3
}

// Capitolo 3: Gilda dei Pirati
success: {
    title: "Re dei Sette Mari",
    message: "Hai conquistato tutto! La tua leggenda è immortale!",
    image: "vittoria_finale.jpg"
    // Nessun nextChapter = FINE DELLA SAGA
}
```

---

## 🚀 STEP 3: PROGRESSIONE RAMIFICATA

**1.** Puoi creare percorsi diversi in base al punteggio o alle scelte:

```javascript
// Finale che sblocca capitoli diversi
success: {
    title: "Maestro delle Scelte",
    message: "Il tuo regno si espande, ma in quale direzione?",
    image: "bivio_destino.jpg",
    nextChapter: gameState.player.score > 150 ? "gildaDeiMercanti" : "gildaDeiGuerrieri"
}
```

**2.** Oppure finali multipli con sblocchi diversi:

```javascript
// Nel file script.js, funzione personalizzata
function determineNextChapter() {
    if (gameState.player.metrics.onore >= 8) {
        return "gildaDeiPaladini";  // Percorso virtuoso
    } else if (gameState.player.metrics.forza >= 8) {
        return "gildaDeiTiranni";   // Percorso violento  
    } else {
        return "gildaDeiMercanti";  // Percorso bilanciato
    }
}
```

---

## 🚀 STEP 4: AGGIUNGERE CAPITOLI OPZIONALI

**1.** Puoi creare capitoli "segreti" sbloccabili solo con condizioni speciali:

```javascript
// Capitolo segreto sbloccabile solo con punteggio perfetto
success: {
    title: "Leggenda Assoluta",
    message: "Hai raggiunto la perfezione! Un segreto si rivela...",
    image: "perfezione.jpg",
    nextChapter: gameState.player.score >= 200 ? "capitoloSegreto" : "capitoloNormale"
}
```

**2.** Oppure condizioni multiple:
```javascript
// Sblocca capitolo speciale solo se hai completato tutti i finali
const allEndingsSeen = localStorage.getItem('allEndingsSeen');
nextChapter: allEndingsSeen ? "capitoloMaster" : "capitoloNormale"
```

---

## 🚀 STEP 5: GESTIRE I SALVATAGGI PROGRESSIONE

### **💾 Il gioco salva automaticamente:**
- Quali capitoli hai sbloccato
- Il tuo punteggio migliore per ogni capitolo
- I finali che hai visto
- Le statistiche generali

### **📊 Dati salvati nel browser:**
```javascript
// Esempio di dati salvati (non modificare direttamente)
{
    unlockedChapters: ["gildaDeiBoschi", "gildaDeiManiscalchi"],
    bestScores: {
        gildaDeiBoschi: 187,
        gildaDeiManiscalchi: 142
    },
    endingsSeen: ["forza_high", "onore_low", "success"],
    totalPlaytime: 4520000  // millisecondi
}
```

---

## 🚀 STEP 6: CREARE FINALI TEMPORANEI

**1.** Se non hai ancora creato il capitolo successivo, usa un finale temporaneo:

```javascript
success: {
    title: "Continua...",
    message: "La tua avventura continuerà presto! Nuovi capitoli in arrivo.",
    image: "coming_soon.jpg"
    // Nessun nextChapter = Il giocatore torna al menu
}
```

**2.** Quando crei il nuovo capitolo, aggiungi semplicemente `nextChapter`!

---

## 🚀 STEP 7: TESTARE LA PROGRESSIONE

### **🧪 Come testare:**

**1. Test Manuale:**
- Gioca e completa il capitolo
- Verifica che appaia il prossimo capitolo
- Controlla che sia selezionabile dal menu

**2. Test Veloce (Developer):**
- Apri la console del browser (F12)
- Digita: `localStorage.clear()` per resettare tutto
- Oppure: `gameState.player.score = 1000` per vincere facilmente

**3. Test di Bilanciamento:**
- Il capitolo è completabile con strategie diverse?
- Il punteggio richiesto è ragionevole?
- I finali sono tutti raggiungibili?

---

## 🎯 DESIGN DELLA PROGRESSIONE

### **📈 Curva di Difficoltà:**

**Capitolo 1:** 
- Tutorial implicito
- Perdono per errori
- Scenario più semplici

**Capitolo 2:**
- Maggior complessità
- Scelte più difficili
- Introduczione nuove meccaniche

**Capitolo 3+:**
- Sfide complete
- Bilanciamento perfetto richiesto
- Finali più difficili da raggiungere

### **🎭 Arco Narrativo:**
```
Inizio → Crescita → Conflitto → Climax → Risoluzione
   ↓        ↓         ↓        ↓         ↓
Cap 1    Cap 2     Cap 3    Cap 4     Cap 5
```

---

## 🔄 TIPI DI PROGRESSIONE

### **🔢 Progressione Lineare:**
```
Cap 1 → Cap 2 → Cap 3 → Cap 4 → FINE
```
- Semplice da bilanciare
- Storia coerente
- Facile da testare

### **🌳 Progressione Ramificata:**
```
        Cap 2A (Pace)
       /
Cap 1 ← 
       \
        Cap 2B (Guerra) → Cap 3 → FINE
```
- Maggior rigiocabilità
- Scelte più significative
- Più complesso da creare

### **🕸️ Progressione a Rete:**
```
Cap 1 → Cap 2 ↘
   ↓      ↓     → Cap 4 → FINE
Cap A → Cap 3 ↗
```
- Massima libertà
- Molte combinazioni possibili
- Molto complesso da bilanciare

---

## 🎨 MESSAGGI DI TRANSIZIONE

### **📜 Finali che Anticipano:**

**Buoni esempi:**
```javascript
// Anticipa il tema del prossimo capitolo
message: "Hai conquistato la foresta, ma dalle colline sale il fumo delle fucine. La città ti chiama..."

// Crea suspense
message: "Il tuo regno è stabile, ma un messaggero porta notizie inquietanti dal mare..."

// Evoluzione del personaggio  
message: "Non sei più il semplice taglialegna di un tempo. Il potere ti ha cambiato, ma quanto?"
```

**Cattivi esempi:**
```javascript
// Troppo generico
message: "Hai vinto! Ora puoi giocare il prossimo capitolo."

// Senza connessione
message: "Fine del gioco. Riprova."

// Spoiler del prossimo capitolo
message: "Nel prossimo capitolo diventerai un pirata e dovrai combattere il Kraken."
```

---

## 🏆 SISTEMA PUNTEGGI E UNLOCK

### **🎯 Punteggio Base:**
- **+10 punti** per ogni scenario completato
- **Bonus** per strategie efficienti
- **Malus** per morti frequenti

### **⭐ Unlock Speciali:**
```javascript
// Esempi di condizioni speciali
if (completedWithoutDying) {
    unlockedChapters.push("capitoloPerfetto");
}

if (sawAllEndings) {
    unlockedChapters.push("capitoloMaster"); 
}

if (totalScore > 500) {
    unlockedChapters.push("capitoloLeggendario");
}
```

---

## 🔥 TEMPLATE PROGRESSIONE COMPLETA

```javascript
// CAPITOLO 1 - Inizio dell'avventura
success: {
    title: "Il Richiamo dell'Avventura", 
    message: "Hai dimostrato il tuo valore nelle terre selvagge. Ma questo è solo l'inizio: oltre le colline, la civiltà ti attende con nuove sfide.",
    image: "assets/img/finali/cap1_vittoria.jpg",
    nextChapter: "gildaDeiManiscalchi"
}

// CAPITOLO 2 - Sviluppo delle competenze  
success: {
    title: "Maestro di Due Mondi",
    message: "Natura e civiltà si piegano al tuo volere. Ma il vero potere non risiede sulla terraferma: i mari infiniti nascondono segreti più antichi.",
    image: "assets/img/finali/cap2_vittoria.jpg", 
    nextChapter: "gildaDeiPirati"
}

// CAPITOLO 3 - Climax dell'avventura
success: {
    title: "Leggenda dei Tre Regni",
    message: "Terra, città e mare: hai conquistato tutti i domini possibili. La tua leggenda attraverserà i secoli. Non c'è più nulla da conquistare... o forse sì?",
    image: "assets/img/finali/cap3_vittoria.jpg",
    nextChapter: gameState.player.score >= 300 ? "capitoloSegreto" : null
}

// CAPITOLO SEGRETO - Per i migliori giocatori
success: {
    title: "Oltre l'Impossibile",
    message: "Hai superato ogni limite, conquistato ogni terra, dominato ogni sfida. Sei diventato leggenda vivente. La tua saga è immortale.",
    image: "assets/img/finali/leggenda_immortale.jpg"
    // Nessun nextChapter = Vera fine del gioco
}
```

---

## ✅ CHECKLIST PROGRESSIONE

- [ ] Ogni capitolo ha un finale "success" definito?
- [ ] I `nextChapter` puntano ai capitoli giusti?
- [ ] I nomi dei capitoli corrispondono esattamente?
- [ ] La progressione ha senso narrativamente?
- [ ] Ho testato completando ogni capitolo?
- [ ] I punteggi richiesti sono bilanciati?
- [ ] I messaggi di transizione sono coinvolgenti?
- [ ] Il capitolo finale non ha `nextChapter`?

---

## ❓ PROBLEMI COMUNI

**Q: Il prossimo capitolo non si sblocca**
A: Controlla che il nome in `nextChapter` sia esatto e che il capitolo esista in `content.js`

**Q: Il giocatore può accedere a capitoli non sbloccati**
A: Il sistema impedisce automaticamente questo, se succede c'è un bug nel codice

**Q: I salvataggi si perdono**
A: Il browser potrebbe cancellare i dati locali; considera avvisi per l'export

**Q: La progressione è troppo facile/difficile**
A: Testa con giocatori diversi e aggiusta il bilanciamento degli scenari

**Q: Voglio resettare tutto per testare**
A: Console browser → `localStorage.clear()` → ricarica pagina

**Q: Come faccio a creare finali alternativi per sblocchi diversi?**
A: Devi modificare `script.js` per logica personalizzata (avanzato)

---

## 🎮 ESEMPI DI PROGRESSIONI FAMOSE

### **🎯 Progressione "Rise to Power":**
```
Servo → Soldato → Capitano → Generale → Re → Imperatore
```

### **🌍 Progressione "Expansion":**
```
Villaggio → Città → Regno → Continente → Mondo → Galassia
```

### **⚔️ Progressione "Mastery":**
```
Novizio → Apprendista → Esperto → Maestro → Gran Maestro → Leggenda
```

### **🎭 Progressione "Corruption":**
```
Eroe → Pragmatico → Cinico → Antieroe → Villain → Rovina
```

**SE LA PROGRESSIONE È COINVOLGENTE = 🎉 IL GIOCATORE VORRÀ COMPLETARE TUTTO!**