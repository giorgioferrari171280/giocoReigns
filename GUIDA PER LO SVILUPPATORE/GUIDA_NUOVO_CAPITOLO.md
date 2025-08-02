# 🎯 GUIDA STEP-BY-STEP: Creare un Nuovo Capitolo (AGGIORNATA)

> ⚠️ **NOTA IMPORTANTE**: Questa guida è stata aggiornata per il nuovo sistema con **6 metriche modulari**. Se vedi guide più vecchie che parlano di 4 metriche, ignorale!

## 📋 COSA TI SERVE PRIMA DI INIZIARE

- Nome del capitolo (es: "Gilda dei Pirati")
- **6 metriche** con mix equilibrato (2 crescita + 2 deterioramento + 2 bilanciate)
- Conoscenza del **sistema modulare** (leggi prima GUIDA_SISTEMA_METRICHE_MODULARE.md)

---

## 🚀 STEP 1: CREA IL FILE DEL CAPITOLO (SISTEMA MODULARE)

**1.** Crea un nuovo file chiamato `gilda_pirati.js` (sostituisci "pirati" con il tuo tema)

**2.** Copia questo template moderno:
```javascript
// ===================================================================================
// --- DATI CAPITOLO 3: Gilda dei Pirati ---
// ===================================================================================

const gildaDeiPiratiData = {
    title: "Gilda dei Pirati",
    
    // NUOVO FORMATO SEMPLIFICATO: Solo le chiavi, i nomi vengono dal registry!
    metrics: ["tesoro", "fama", "equipaggio", "provviste", "astuzia", "onore"],
    
    // OPZIONALE: Se vuoi override personalizzati per alcuni nomi:
    // metrics: {
    //     tesoro: null,              // null = usa "Tesoro" dal registry
    //     fama: "Leggenda Piratesca", // Override personalizzato
    //     equipaggio: null,          // null = usa "Equipaggio" dal registry
    //     provviste: null,           // null = usa "Provviste" dal registry
    //     astuzia: null,             // null = usa "Astuzia" dal registry
    //     onore: "Codice Piratesco"  // Override personalizzato
    // },
    
    // OPZIONALE: Condizioni di vittoria personalizzate
    winConditions: [
        {
            type: "multiple_metrics",
            operator: "AND",
            conditions: [
                { metric: "tesoro", operator: ">=", value: 16 },
                { metric: "fama", operator: ">=", value: 14 },
                { metric: "equipaggio", operator: ">", value: 8 }
            ],
            description: "Re dei Pirati: tesoro ≥16, fama ≥14, equipaggio >8"
        }
    ],
    
    loseConditions: [
        {
            type: "metric_combination",
            operator: "AND",
            conditions: [
                { metric: "equipaggio", operator: "<=", value: 3 },
                { metric: "onore", operator: "<=", value: 4 }
            ],
            description: "Ammutinamento: equipaggio ≤3 E onore ≤4"
        }
    ],
    
    scenarios: [
        // Qui metterai gli scenari (Step 3)
    ],
    
    endings: {
        // Qui metterai i finali (Step 4) - Ora per 6 metriche!
    }
};
```

**3.** Salva il file

---

## 🚀 STEP 2: REGISTRA IL CAPITOLO NEL GIOCO

**1.** Apri `content.js`

**2.** Aggiungi il tuo capitolo alla lista:
```javascript
const chapters = {
    gildaDeiBoschi: gildaDeiBoschiData,
    gildaDeiManiscalchi: gildaDeiManiscalchiData,
    gildaDeiPirati: gildaDeiPiratiData  // ← AGGIUNGI QUESTA RIGA
};
```

**3.** Salva il file

---

## 🚀 STEP 3: INCLUDI IL FILE IN HTML

**1.** Apri `index.html`

**2.** Trova la sezione script verso la fine

**3.** Aggiungi questa riga:
```html
<script src="gilda_pirati.js"></script>
```

**4.** Deve stare PRIMA di `<script src="content.js"></script>`

**5.** Esempio di come deve apparire:
```html
<script src="gilda_tagliaboschi.js"></script>
<script src="gilda_maniscalchi.js"></script>
<script src="gilda_pirati.js"></script>  ← NUOVO
<script src="content.js"></script>
```

**6.** Salva il file

---

## 🚀 STEP 4: AGGIUNGI SCENARI AL TUO CAPITOLO

**1.** Torna al file `gilda_pirati.js`

**2.** Sostituisci `scenarios: [` con:
```javascript
scenarios: [
    {
        image: "https://placehold.co/400x400/1e40af/ffffff?text=Tempesta",
        description: "Una tempesta minaccia la nave. Cosa fai?",
        choices: {
            yes: { 
                text: "Affronta la tempesta", 
                effects: { navigazione: +2, tesoro: 0, equipaggio: -1, reputazione: +1 } 
            },
            no: { 
                text: "Cerca riparo", 
                effects: { navigazione: -1, tesoro: 0, equipaggio: +1, reputazione: -1 } 
            }
        }
    },
    {
        image: "https://placehold.co/400x400/dc2626/ffffff?text=Nemici",
        description: "Navi nemiche all'orizzonte! Come reagisci?",
        choices: {
            yes: { 
                text: "Attacca!", 
                effects: { navigazione: 0, tesoro: +1, equipaggio: -2, reputazione: +2 } 
            },
            no: { 
                text: "Fuggi", 
                effects: { navigazione: +1, tesoro: 0, equipaggio: +1, reputazione: -2 } 
            }
        }
    }
],
```

**3.** Puoi aggiungere tutti gli scenari che vuoi copiando il formato!

**4.** Salva il file

---

## 🚀 STEP 5: AGGIUNGI I FINALI

**1.** Nel file `gilda_pirati.js`, sostituisci `endings: {` con:
```javascript
endings: {
    navigazione: {
        low: { 
            title: "Naufragato", 
            message: "Ti sei perso in mare aperto. I pesci sono la tua ultima compagnia.", 
            image: "https://placehold.co/400x400/1e40af/ffffff?text=Naufragio" 
        },
        high: { 
            title: "Maestro dei Mari", 
            message: "La tua perizia ha impressionato tutti, ma l'equipaggio ti teme.", 
            image: "https://placehold.co/400x400/0ea5e9/ffffff?text=Maestria" 
        }
    },
    tesoro: {
        low: { 
            title: "Povero come un Topo", 
            message: "Le casse sono vuote. L'equipaggio si ammutina per mancanza di bottino.", 
            image: "https://placehold.co/400x400/a16207/ffffff?text=Povertà" 
        },
        high: { 
            title: "Sepolto dall'Oro", 
            message: "Troppo oro attira troppi nemici. Sei morto nella notte.", 
            image: "https://placehold.co/400x400/facc15/000000?text=Avarizia" 
        }
    },
    equipaggio: {
        low: { 
            title: "Ammutinamento", 
            message: "L'equipaggio ti ha gettato in mare. I pesci ti daranno sepoltura.", 
            image: "https://placehold.co/400x400/dc2626/ffffff?text=Tradimento" 
        },
        high: { 
            title: "Troppo Buono", 
            message: "La tua bontà è stata scambiata per debolezza. Ti hanno detronizzato.", 
            image: "https://placehold.co/400x400/22c55e/ffffff?text=Debolezza" 
        }
    },
    reputazione: {
        low: { 
            title: "Disonorato", 
            message: "Nessun porto ti accoglie più. Vagai per mari deserti.", 
            image: "https://placehold.co/400x400/6b7280/ffffff?text=Esilio" 
        },
        high: { 
            title: "Leggenda Vivente", 
            message: "La tua fama ti precede ovunque, ma con essa arrivano sfidanti.", 
            image: "https://placehold.co/400x400/f59e0b/ffffff?text=Fama" 
        }
    },
    success: {
        title: "Re dei Pirati",
        message: "Hai conquistato i sette mari! La tua flotta è leggendaria!",
        image: "https://placehold.co/400x400/166534/ffffff?text=Vittoria",
        nextChapter: "gildaDeiNavigatori"  // Sblocca il prossimo capitolo (opzionale)
    }
}
```

**2.** Salva il file

---

## 🚀 STEP 6: AGGIUNGI LE CUTSCENE (OPZIONALE)

**1.** Apri `cutscene.js`

**2.** Aggiungi le cutscene del tuo capitolo:
```javascript
gildaDeiPirati: {
    start: {
        image: "https://placehold.co/400x400/1e40af/ffffff?text=Mare+Aperto",
        text: "Il vento salato riempie le vele. L'orizzonte infinito ti chiama. I pirati della tua ciurma ti guardano con rispetto... per ora."
    },
    end: {
        image: "https://placehold.co/400x400/166534/ffffff?text=Nuove+Terre",
        text: "Hai dominato i mari, ma oltre l'oceano si estendono terre inesplorate. Nuove avventure ti attendono..."
    }
}
```

**3.** Salva il file

---

## 🚀 STEP 7: COLLEGA IL CAPITOLO AL PRECEDENTE

**1.** Apri il file del capitolo precedente (es: `gilda_maniscalchi.js`)

**2.** Trova la sezione `success` nei finali

**3.** Aggiungi o modifica `nextChapter`:
```javascript
success: {
    title: "Signore della Città",
    message: "Hai conquistato la città, ma il mare ti chiama...",
    image: "...",
    nextChapter: "gildaDeiPirati"  // ← AGGIUNGI/MODIFICA QUESTA RIGA
}
```

**4.** Salva il file

---

## 🚀 STEP 8: TESTA IL TUO CAPITOLO

**1.** Ricarica la pagina del gioco

**2.** Completa il capitolo precedente fino alla fine

**3.** Se tutto funziona, dovrebbe apparire il tuo nuovo capitolo!

---

## ✅ CHECKLIST FINALE

Prima di testare:

- [ ] Ho creato il file `gilda_miotema.js`?
- [ ] Ho aggiunto il capitolo a `content.js`?
- [ ] Ho incluso il file in `index.html`?
- [ ] Ho messo almeno 2 scenari nel capitolo?
- [ ] Ho definito tutti i finali per le 4 metriche?
- [ ] Ho collegato il capitolo al precedente?
- [ ] Ho salvato tutti i file?
- [ ] Ho ricaricato la pagina?

---

## 🔥 TEMPLATE VELOCE DA COPIARE

Copia questo e sostituisci i nomi:

```javascript
const gildaDei[TUO_TEMA]Data = {
    title: "Gilda dei [TUO_TEMA]",
    metrics: {
        metrica1: "Nome Metrica 1",
        metrica2: "Nome Metrica 2", 
        metrica3: "Nome Metrica 3",
        metrica4: "Nome Metrica 4"
    },
    scenarios: [
        {
            image: "https://placehold.co/400x400/colore/ffffff?text=Scenario1",
            description: "Cosa succede...",
            choices: {
                yes: { text: "Opzione 1", effects: { metrica1: +1, metrica2: -1, metrica3: 0, metrica4: +1 } },
                no: { text: "Opzione 2", effects: { metrica1: -1, metrica2: +1, metrica3: +1, metrica4: 0 } }
            }
        }
    ],
    endings: {
        metrica1: {
            low: { title: "Finale Brutto 1", message: "Cosa succede...", image: "..." },
            high: { title: "Finale Brutto 1+", message: "Cosa succede...", image: "..." }
        },
        metrica2: {
            low: { title: "Finale Brutto 2", message: "Cosa succede...", image: "..." },
            high: { title: "Finale Brutto 2+", message: "Cosa succede...", image: "..." }
        },
        metrica3: {
            low: { title: "Finale Brutto 3", message: "Cosa succede...", image: "..." },
            high: { title: "Finale Brutto 3+", message: "Cosa succede...", image: "..." }
        },
        metrica4: {
            low: { title: "Finale Brutto 4", message: "Cosa succede...", image: "..." },
            high: { title: "Finale Brutto 4+", message: "Cosa succede...", image: "..." }
        },
        success: {
            title: "Finale Vittoria",
            message: "Hai vinto!",
            image: "...",
            nextChapter: "prossimoCapitolo"
        }
    }
};
```

---

## ❓ PROBLEMI COMUNI

**Q: Il capitolo non appare nel gioco**
A: Controlla di averlo aggiunto a `content.js` e `index.html`

**Q: Il gioco si blocca**
A: Controlla le virgole e parentesi nel codice

**Q: Le metriche non funzionano**
A: I nomi delle metriche devono essere uguali in `metrics` e `effects`

**Q: Non riesco a raggiungere il nuovo capitolo**
A: Verifica che il capitolo precedente abbia `nextChapter` impostato

**SE TUTTO FUNZIONA = 🎉 HAI CREATO UN NUOVO CAPITOLO!**