# 🎯 GUIDA STEP-BY-STEP: Come Aggiungere Cutscene

## 📋 CUTSCENE SINGOLA (1 immagine + 1 testo)

### ➡️ DURANTE IL GIOCO (dopo una scelta)

**1.** Apri il file del capitolo (es: `gilda_tagliaboschi.js`)

**2.** Trova lo scenario dove vuoi la cutscene

**3.** Aggiungi questo codice DOPO le `choices`:
```javascript
cutscene: {
    image: "https://placehold.co/400x400/colore/testo?text=Titolo",
    text: "Il tuo testo qui..."
}
```

**4.** Salva il file

**5.** FINITO! ✅

**Esempio completo:**
```javascript
{
    image: "scenario.jpg",
    description: "Devi scegliere...",
    choices: {
        yes: { text: "Sì", effects: { forza: +1 } },
        no: { text: "No", effects: { forza: -1 } }
    },
    cutscene: {
        image: "https://placehold.co/400x400/FF0000/FFFFFF?text=Conseguenze",
        text: "La tua scelta ha conseguenze immediate..."
    }
}
```

---

### ➡️ INIZIO/FINE CAPITOLO

**1.** Apri `cutscene.js`

**2.** Trova il tuo capitolo (es: `gildaDeiBoschi`)

**3.** Aggiungi `start` o `end`:
```javascript
gildaDeiBoschi: {
    start: {
        image: "inizio.jpg",
        text: "Inizia l'avventura..."
    },
    end: {
        image: "fine.jpg", 
        text: "Il capitolo finisce..."
    }
}
```

**4.** Salva il file

**5.** FINITO! ✅

---

## 📋 CUTSCENE MULTI-SLIDE (3+ immagini + testi)

### ➡️ DURANTE IL GIOCO (dopo una scelta)

**1.** Apri il file del capitolo (es: `gilda_tagliaboschi.js`)

**2.** Trova lo scenario dove vuoi la cutscene

**3.** Aggiungi questo codice DOPO le `choices`:
```javascript
cutscene: {
    slides: [
        {
            image: "immagine1.jpg",
            text: "Prima parte..."
        },
        {
            image: "immagine2.jpg", 
            text: "Seconda parte..."
        },
        {
            image: "immagine3.jpg",
            text: "Terza parte..."
        }
    ]
}
```

**4.** Salva il file

**5.** FINITO! ✅

**Esempio completo:**
```javascript
{
    image: "battaglia.jpg",
    description: "Arrivano i nemici!",
    choices: {
        yes: { text: "Combatti", effects: { forza: -1, onore: +1 } },
        no: { text: "Fuggi", effects: { forza: +1, onore: -1 } }
    },
    cutscene: {
        slides: [
            {
                image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Scontro",
                text: "Le spade si scontrano nel fragore della battaglia..."
            },
            {
                image: "https://placehold.co/400x400/4169E1/FFFFFF?text=Climax",
                text: "Il destino pende in bilico. Chi vincerà?"
            },
            {
                image: "https://placehold.co/400x400/228B22/FFFFFF?text=Vittoria",
                text: "La battaglia è finita. Sei ancora in piedi."
            }
        ]
    }
}
```

---

### ➡️ INIZIO/FINE CAPITOLO

**1.** Apri `cutscene.js`

**2.** Trova il tuo capitolo (es: `gildaDeiBoschi`)

**3.** Aggiungi `start` o `end` con `slides`:
```javascript
gildaDeiBoschi: {
    start: {
        slides: [
            {
                image: "intro1.jpg",
                text: "Prima parte introduzione..."
            },
            {
                image: "intro2.jpg",
                text: "Seconda parte introduzione..."
            },
            {
                image: "intro3.jpg", 
                text: "Terza parte introduzione..."
            }
        ]
    }
}
```

**4.** Salva il file

**5.** FINITO! ✅

---

## 🎯 RIASSUNTO VELOCE

### DOVE METTERE LE CUTSCENE:

- **`cutscene.js`** = Cutscene di inizio/fine capitolo
- **File del capitolo** (es: `gilda_tagliaboschi.js`) = Cutscene durante il gioco

### FORMATI:

**Cutscene Singola:**
```javascript
cutscene: {
    image: "foto.jpg",
    text: "Testo..."
}
```

**Cutscene Multi-Slide:**
```javascript
cutscene: {
    slides: [
        { image: "foto1.jpg", text: "Testo1..." },
        { image: "foto2.jpg", text: "Testo2..." },
        { image: "foto3.jpg", text: "Testo3..." }
    ]
}
```

---

## 🔥 ESEMPI RAPIDISSIMI DA COPIARE

### Per mettere cutscene dopo uno scenario:
```javascript
// Copia questo DOPO le choices di uno scenario
cutscene: {
    image: "https://placehold.co/400x400/FF6347/FFFFFF?text=Drama",
    text: "Qualcosa di drammatico succede dopo la tua scelta..."
}
```

### Per mettere cutscene multi-slide dopo uno scenario:
```javascript
// Copia questo DOPO le choices di uno scenario
cutscene: {
    slides: [
        {
            image: "https://placehold.co/400x400/FF0000/FFFFFF?text=Parte1",
            text: "Prima cosa che succede..."
        },
        {
            image: "https://placehold.co/400x400/00FF00/000000?text=Parte2", 
            text: "Seconda cosa che succede..."
        },
        {
            image: "https://placehold.co/400x400/0000FF/FFFFFF?text=Parte3",
            text: "Terza cosa che succede..."
        }
    ]
}
```

### Per aggiungere cutscene di inizio capitolo:
```javascript
// In cutscene.js, aggiungi questo dentro il tuo capitolo
start: {
    image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Inizio",
    text: "Il capitolo inizia con..."
}
```

---

## ❓ DOMANDE FREQUENTI

**Q: Dove vedo le cutscene?**
A: Appariranno automaticamente nel gioco quando giochi!

**Q: Quante slide posso mettere?**
A: Da 1 a infinite, ma consiglio massimo 3-5 per non annoiare

**Q: Posso mixare singole e multi-slide?**
A: Sì! Ogni cutscene può essere diversa

**Q: Cosa succede se sbaglio il codice?**
A: La cutscene semplicemente non apparirà, il gioco continua normalmente

**Q: Devo riavviare il gioco?**
A: Sì, ricarica la pagina per vedere le modifiche

---

## ✅ CHECKLIST FINALE

Prima di testare, verifica:

- [ ] Ho messo la virgola `,` dopo `choices`?
- [ ] Ho chiuso tutte le parentesi `{ }` correttamente?
- [ ] Il testo è tra virgolette `"testo"`?
- [ ] Ho salvato il file?
- [ ] Ho ricaricato la pagina del gioco?

**SE FUNZIONA = 🎉 BRAVO!**
**SE NON FUNZIONA = Controlla la checklist sopra**