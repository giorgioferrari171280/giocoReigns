# 📖 GUIDA COMPLETA: Creare un Nuovo Capitolo

## 🎯 Introduzione

Questa guida ti spiega passo-passo come creare un nuovo capitolo per "Il Sentiero di Midgard", usando come esempio "Gilda dei Taglialegna" e altri capitoli esistenti.

Un capitolo è un'avventura completa con:
- **Scenari** (situazioni che il giocatore affronta)
- **Scelte** (opzioni SÌ/NO con conseguenze)
- **Metriche** (6 valori che il giocatore deve bilanciare)
- **Finali** (come termina l'avventura)

---

## 🏗️ Struttura di un Capitolo

### File Necessari

Per creare un capitolo chiamato "Gilda dei Mercanti" ti serviranno:

```
1. gilda_mercanti.js         # Il capitolo vero e proprio
2. Aggiornare content.js     # Registrare il capitolo nel gioco
3. Aggiornare index.html     # Includere il file JavaScript
4. images/                   # Immagini per gli scenari
```

---

## 🚀 STEP 1: Creare il File del Capitolo

### 1.1 Crea il File JavaScript

Crea un nuovo file: `gilda_mercanti.js`

```javascript
// ===================================================================================
// --- CAPITOLO: GILDA DEI MERCANTI ---
// ===================================================================================

const gildaDeiMercantiData = {
    // Nome del capitolo che vedrà il giocatore
    title: "Gilda dei Mercanti",
    
    // Descrizione breve (opzionale)
    description: "Lascia la foresta per il mondo del commercio cittadino",
    
    // Le 6 metriche del capitolo (nomi dal registry)
    metrics: ["ricchezza", "influenza", "reputazione", "informazioni", "salute", "morale"],
    
    // Array di tutti gli scenari del capitolo
    scenarios: [
        // SCENARIO 1
        {
            image: "images/mercante_ambulante.jpg",
            description: "Un mercante ambulante ti propone di investire nella sua carovana diretta in terre lontane. Promette grandi profitti, ma il viaggio è rischioso.",
            choices: {
                yes: {
                    text: "Investi nella carovana",
                    effects: { ricchezza: -2, influenza: +1, informazioni: +2, salute: 0, reputazione: +1, morale: +1 }
                },
                no: {
                    text: "Declina educatamente",
                    effects: { ricchezza: 0, influenza: 0, informazioni: 0, salute: +1, reputazione: +1, morale: -1 }
                }
            }
        },
        
        // SCENARIO 2
        {
            image: "images/gilda_riunione.jpg",
            description: "La gilda si riunisce per decidere i nuovi prezzi. Alcuni vogliono alzarli per più profitti, altri temono di perdere clienti.",
            choices: {
                yes: {
                    text: "Sostieni prezzi più alti",
                    effects: { ricchezza: +2, influenza: +1, informazioni: 0, salute: 0, reputazione: -2, morale: +1 }
                },
                no: {
                    text: "Mantieni prezzi accessibili",
                    effects: { ricchezza: -1, influenza: -1, informazioni: 0, salute: 0, reputazione: +3, morale: +1 }
                }
            }
        },
        
        // SCENARIO 3
        {
            image: "images/cliente_nobile.jpg",
            description: "Un nobile ricco ma arrogante pretende uno sconto eccessivo, minacciando di rovinare la tua reputazione se rifiuti.",
            choices: {
                yes: {
                    text: "Accetta il ricatto",
                    effects: { ricchezza: -1, influenza: -1, informazioni: +1, salute: 0, reputazione: -1, morale: -2 }
                },
                no: {
                    text: "Rifiuta con fermezza",
                    effects: { ricchezza: 0, influenza: +1, informazioni: 0, salute: 0, reputazione: +1, morale: +2 }
                }
            }
        },
        
        // SCENARIO 4
        {
            image: "images/concorrente_sleale.jpg",
            description: "Scopri che un concorrente sta usando pratiche sleali per sottrartti clienti. Potresti denunciarlo o usare i suoi stessi metodi.",
            choices: {
                yes: {
                    text: "Usa anche tu metodi sleali",
                    effects: { ricchezza: +2, influenza: +1, informazioni: +1, salute: 0, reputazione: -2, morale: -3 }
                },
                no: {
                    text: "Mantieni l'onestà",
                    effects: { ricchezza: -1, influenza: 0, informazioni: 0, salute: 0, reputazione: +2, morale: +2 }
                }
            }
        },
        
        // SCENARIO 5
        {
            image: "images/mercato_crisi.jpg",
            description: "Una crisi economica colpisce la città. I cittadini hanno meno soldi e tu devi decidere se aiutarli o pensare solo ai profitti.",
            choices: {
                yes: {
                    text: "Aiuta i cittadini in difficoltà",
                    effects: { ricchezza: -3, influenza: +1, informazioni: 0, salute: 0, reputazione: +3, morale: +2 }
                },
                no: {
                    text: "Pensa solo ai profitti",
                    effects: { ricchezza: +1, influenza: -1, informazioni: 0, salute: 0, reputazione: -2, morale: -1 }
                }
            }
        },
        
        // SCENARIO 6
        {
            image: "images/guardie_corrotte.jpg",
            description: "Le guardie cittadine ti chiedono una 'tassa' non ufficiale per proteggere i tuoi carichi. È corruzione, ma rifiutare potrebbe essere pericoloso.",
            choices: {
                yes: {
                    text: "Paga la tangente",
                    effects: { ricchezza: -2, influenza: +1, informazioni: +2, salute: +1, reputazione: -1, morale: -1 }
                },
                no: {
                    text: "Rifiuta e rischia",
                    effects: { ricchezza: 0, influenza: -1, informazioni: 0, salute: -2, reputazione: +1, morale: +2 }
                }
            }
        },
        
        // SCENARIO 7
        {
            image: "images/nuovo_mercato.jpg",
            description: "Si apre un nuovo mercato in un quartiere povero. Potresti essere il primo ad aprire lì, ma i profitti iniziali saranno bassi.",
            choices: {
                yes: {
                    text: "Apri nel nuovo mercato",
                    effects: { ricchezza: -1, influenza: +2, informazioni: +1, salute: 0, reputazione: +2, morale: +1 }
                },
                no: {
                    text: "Rimani nel mercato ricco",
                    effects: { ricchezza: +1, influenza: 0, informazioni: 0, salute: 0, reputazione: -1, morale: 0 }
                }
            }
        },
        
        // SCENARIO 8
        {
            image: "images/incendio_magazzino.jpg",
            description: "Un incendio distrugge parte del tuo magazzino. Puoi dichiarare una perdita maggiore per l'assicurazione o essere onesto.",
            choices: {
                yes: {
                    text: "Esagera per l'assicurazione",
                    effects: { ricchezza: +3, influenza: 0, informazioni: 0, salute: 0, reputazione: -1, morale: -2 }
                },
                no: {
                    text: "Dichiara la perdita reale",
                    effects: { ricchezza: -1, influenza: 0, informazioni: 0, salute: 0, reputazione: +1, morale: +1 }
                }
            }
        },
        
        // SCENARIO 9
        {
            image: "images/apprendista_talento.jpg",
            description: "Un giovane di grande talento vuole diventare tuo apprendista, ma non ha soldi per pagarti. Investire in lui potrebbe ripagare nel futuro.",
            choices: {
                yes: {
                    text: "Accetta l'apprendista",
                    effects: { ricchezza: -1, influenza: +1, informazioni: +1, salute: 0, reputazione: +1, morale: +2 }
                },
                no: {
                    text: "Rifiuta senza pagamento",
                    effects: { ricchezza: +1, influenza: 0, informazioni: 0, salute: 0, reputazione: -1, morale: -1 }
                }
            }
        },
        
        // SCENARIO 10
        {
            image: "images/festival_commercio.jpg",
            description: "Si avvicina il grande festival del commercio. Potresti spendere molto per uno stand prestigioso o risparmiare con uno modesto.",
            choices: {
                yes: {
                    text: "Stand prestigioso costoso",
                    effects: { ricchezza: -3, influenza: +3, informazioni: +1, salute: 0, reputazione: +2, morale: +1 }
                },
                no: {
                    text: "Stand modesto economico",
                    effects: { ricchezza: +1, influenza: -1, informazioni: 0, salute: 0, reputazione: 0, morale: -1 }
                }
            }
        }
    ],
    
    // Finali per ogni metrica (cosa succede se raggiunge 0 o 20)
    endings: {
        ricchezza: {
            low: {
                title: "Bancarotta Totale",
                message: "Hai perso tutto. Le tue merci sono state sequestrate dai creditori e ora vivi per strada, guardando con nostalgia i mercanti che un tempo erano tuoi rivali.",
                image: "images/finale_poverta.jpg"
            },
            high: {
                title: "L'Avarizia ti Consuma",
                message: "La tua ossessione per l'oro ti ha reso cieco a tutto il resto. Vivi da solo in una dimora lussuosa, circondato da ricchezze ma senza un vero amico al mondo.",
                image: "images/finale_avarizia.jpg"
            }
        },
        
        influenza: {
            low: {
                title: "Mercante Dimenticato",
                message: "Nessuno ti rispetta più. Le tue parole non hanno peso e le tue proposte vengono ignorate. Sei diventato un mercante di seconda categoria.",
                image: "images/finale_irrilevanza.jpg"
            },
            high: {
                title: "Il Burattino dei Potenti",
                message: "Hai tanto potere che tutti ti temono, ma sei diventato uno strumento della politica. Non sei più un mercante, sei un politico corrotto.",
                image: "images/finale_potere_corrotto.jpg"
            }
        },
        
        reputazione: {
            low: {
                title: "Nome Infangato",
                message: "La tua reputazione è così rovinata che nessuno vuole fare affari con te. Sei costretto a lasciare la città per sempre.",
                image: "images/finale_disonore.jpg"
            },
            high: {
                title: "Santo del Commercio",
                message: "Sei così rispettato che tutti si aspettano perfezione da te. Un singolo errore distruggerebbe tutto. Vivi nel terrore di deludere le aspettative.",
                image: "images/finale_perfezione_opprimente.jpg"
            }
        },
        
        informazioni: {
            low: {
                title: "Cieco negli Affari",
                message: "Senza informazioni sei sempre un passo indietro. I tuoi concorrenti ti superano facilmente perché sanno cose che tu ignori.",
                image: "images/finale_ignoranza.jpg"
            },
            high: {
                title: "Spia dei Mercanti",
                message: "Sai troppi segreti. Ora tutti ti vedono come una minaccia e una spia. Devi guardarti continuamente le spalle.",
                image: "images/finale_troppi_segreti.jpg"
            }
        },
        
        salute: {
            low: {
                title: "Corpo Malato",
                message: "Lo stress degli affari ha distrutto la tua salute. Passi le giornate a letto, incapace di gestire la tua attività.",
                image: "images/finale_malattia.jpg"
            },
            high: {
                title: "Ossessione per la Salute",
                message: "Sei così ossessionato dal tuo benessere fisico che non fai più nulla di rischioso. La tua attività ristagna mentre tu fai solo esercizio.",
                image: "images/finale_ipocondria.jpg"
            }
        },
        
        morale: {
            low: {
                title: "Spirito Spezzato",
                message: "Hai perso ogni motivazione. Ti trascini senza entusiasmo, incapace di prendere decisioni importanti o di lottare per i tuoi obiettivi.",
                image: "images/finale_depressione.jpg"
            },
            high: {
                title: "Fanatico del Commercio",
                message: "Sei così motivato che sei diventato un fanatico. Sacrifichi tutto e tutti per il 'bene supremo' del commercio, diventando un tiranno.",
                image: "images/finale_fanatismo.jpg"
            }
        },
        
        // Finale di successo (se sopravvivi abbastanza a lungo)
        success: {
            title: "Maestro del Commercio",
            message: "Hai trovato l'equilibrio perfetto nel mondo del commercio. Sei ricco ma non avaro, influente ma non corrotto, rispettato ma non perfetto. La tua storia diventerà leggenda tra i mercanti futuri.",
            image: "images/finale_successo_mercanti.jpg",
            nextChapter: "gilda_navigatori" // Nome del capitolo successivo da sbloccare
        }
    }
};
```

---

## 🚀 STEP 2: Registrare il Capitolo

### 2.1 Modificare content.js

Apri il file `content.js` e aggiungi il tuo capitolo:

```javascript
// Nel file content.js
const chapters = {
    gildaDeiBoschi: gildaDeiBoschiData,           // Capitolo esistente
    gildaDeiManiscalchi: gildaDeiManiscalchiData, // Capitolo esistente
    gildaDeiMercanti: gildaDeiMercantiData        // ← AGGIUNGI QUESTA RIGA
};
```

### 2.2 Modificare index.html

Apri `index.html` e aggiungi il riferimento al tuo file JavaScript prima di `content.js`:

```html
<!-- Script del Gioco -->
<script src="backgrounds.js"></script>
<script src="audio.js"></script>
<script src="cutscene.js"></script>
<script src="developer.js"></script>
<script src="metriche.js"></script>
<script src="achievements.js"></script>
<script src="gilda_tagliaboschi.js"></script>
<script src="gilda_maniscalchi.js"></script>
<script src="gilda_mercanti.js"></script>    <!-- ← AGGIUNGI QUESTA RIGA -->
<script src="content.js"></script>
<script src="player.js"></script>
<script src="script.js"></script>
```

---

## 🖼️ STEP 3: Aggiungere le Immagini

### 3.1 Creare le Cartelle

Crea una struttura di cartelle per le immagini:

```
images/
├── mercante_ambulante.jpg
├── gilda_riunione.jpg
├── cliente_nobile.jpg
├── concorrente_sleale.jpg
├── mercato_crisi.jpg
├── guardie_corrotte.jpg
├── nuovo_mercato.jpg
├── incendio_magazzino.jpg
├── apprendista_talento.jpg
├── festival_commercio.jpg
├── finale_poverta.jpg
├── finale_avarizia.jpg
├── finale_irrilevanza.jpg
├── finale_potere_corrotto.jpg
├── finale_disonore.jpg
├── finale_perfezione_opprimente.jpg
├── finale_ignoranza.jpg
├── finale_troppi_segreti.jpg
├── finale_malattia.jpg
├── finale_ipocondria.jpg
├── finale_depressione.jpg
├── finale_fanatismo.jpg
└── finale_successo_mercanti.jpg
```

### 3.2 Specifiche Immagini

- **Dimensioni**: 400x400 pixel (quadrate)
- **Formato**: JPG o PNG
- **Peso**: Massimo 200KB per immagine
- **Stile**: Coerente con l'ambientazione medievale/fantasy

---

## 🚀 STEP 4: Testare il Capitolo

### 4.1 Test Base

1. **Apri il gioco** nel browser
2. **Controlla la console** (F12) per errori JavaScript
3. **Verifica** che il capitolo appaia nel menu (se accessibile)
4. **Testa alcuni scenari** per verificare che funzionino

### 4.2 Test Completo

```javascript
// Comandi da testare nella console del browser (F12)

// 1. Verifica che il capitolo sia caricato
console.log(gildaDeiMercantiData);

// 2. Verifica le metriche
console.log(gildaDeiMercantiData.metrics);

// 3. Conta gli scenari
console.log("Scenari totali:", gildaDeiMercantiData.scenarios.length);

// 4. Verifica i finali
console.log(gildaDeiMercantiData.endings);
```

---

## ⚖️ STEP 5: Bilanciamento delle Metriche

### 5.1 Principi Base

**Range degli Effetti:**
- **Piccoli**: ±1 (cambiamenti graduali)
- **Medi**: ±2 (cambiamenti significativi)
- **Grandi**: ±3 (cambiamenti drammatici)

**Bilanciamento delle Scelte:**
```javascript
// ✅ BUONO - Scelte bilanciate
yes: { effects: { ricchezza: +2, reputazione: -1, morale: +1 } },
no:  { effects: { ricchezza: -1, reputazione: +2, morale: 0 } }

// ❌ CATTIVO - Una scelta troppo migliore
yes: { effects: { ricchezza: +3, reputazione: +2, morale: +2 } },
no:  { effects: { ricchezza: -2, reputazione: -2, morale: -2 } }
```

### 5.2 Tipologie di Metriche

**Metriche di Accumulo** (partono basse, crescono):
- Ricchezza, Influenza, Informazioni

**Metriche di Consumo** (partono alte, calano):
- Salute, Energia, Risorse

**Metriche Bilanciate** (partono medie, oscillano):
- Reputazione, Morale, Onore

---

## 🎭 STEP 6: Scrittura degli Scenari

### 6.1 Struttura di uno Scenario

**Elementi Essenziali:**
1. **Immagine**: Visuale che rappresenta la situazione
2. **Descrizione**: 2-3 frasi che spiegano il dilemma
3. **Scelte**: Due opzioni chiare con conseguenze logiche

### 6.2 Tipologie di Scenari

**Dilemma Morale:**
```javascript
{
    description: "Un mendicante ruba pane dal tuo negozio. È povero ma comunque un ladro.",
    choices: {
        yes: { text: "Perdonalo e dagli cibo", effects: { ricchezza: -1, reputazione: +2, morale: +1 } },
        no: { text: "Chiamale guardie", effects: { ricchezza: 0, reputazione: -1, influenza: +1 } }
    }
}
```

**Decisione Economica:**
```javascript
{
    description: "Puoi comprare merci a prezzo stracciato da un commerciante in difficoltà.",
    choices: {
        yes: { text: "Approfitta dell'occasione", effects: { ricchezza: +2, reputazione: -1, morale: -1 } },
        no: { text: "Offri un prezzo giusto", effects: { ricchezza: 0, reputazione: +2, morale: +1 } }
    }
}
```

**Evento Casuale:**
```javascript
{
    description: "Una carovana di mercanti stranieri arriva in città con merci esotiche.",
    choices: {
        yes: { text: "Investi nelle merci esotiche", effects: { ricchezza: -2, informazioni: +2, influenza: +1 } },
        no: { text: "Rimani sulle merci tradizionali", effects: { ricchezza: +1, informazioni: 0, influenza: 0 } }
    }
}
```

---

## 🏆 STEP 7: Creare i Finali

### 7.1 Tipologie di Finali

**Finale per Metrica Bassa (valore 0):**
- Mostra le conseguenze del fallimento in quell'area
- Deve essere drammatico ma logico

**Finale per Metrica Alta (valore 20):**
- Mostra i problemi dell'eccesso
- L'estremo opposto è altrettanto pericoloso

**Finale di Successo:**
- Il giocatore sopravvive abbastanza a lungo
- Celebra l'equilibrio e la saggezza

### 7.2 Scrittura dei Finali

**Principi:**
- **Conseguenze Logiche**: Il finale deve riflettere le scelte
- **Impatto Emotivo**: Deve essere memorabile
- **Varietà**: Ogni finale deve essere unico
- **Collegamento**: I finali possono anticipare capitoli futuri

---

## 🔗 STEP 8: Collegamenti tra Capitoli

### 8.1 Sbloccare Nuovi Capitoli

Nel finale di successo, specifica il capitolo successivo:

```javascript
success: {
    title: "Maestro del Commercio",
    message: "Hai dominato il mondo del commercio...",
    image: "images/successo.jpg",
    nextChapter: "gilda_navigatori" // ← Sblocca il prossimo capitolo
}
```

### 8.2 Progressione Non Lineare

Puoi creare percorsi ramificati:

```javascript
// Finale che sblocca capitoli diversi in base al punteggio
success: {
    title: "Successo",
    message: "...",
    nextChapter: gameState.player.score > 100 ? "capitolo_ricchi" : "capitolo_normali"
}
```

---

## ✅ Checklist Finale

Prima di considerare completo il tuo capitolo:

### Contenuti:
- [ ] Almeno 10 scenari diversi
- [ ] Finali per tutte le 6 metriche (low/high)
- [ ] Un finale di successo
- [ ] Immagini per tutti gli scenari e finali
- [ ] Descrizioni chiare e coinvolgenti

### Tecnico:
- [ ] File JavaScript creato correttamente
- [ ] Capitolo registrato in `content.js`
- [ ] File incluso in `index.html`
- [ ] Nessun errore nella console del browser
- [ ] Testato completamente

### Bilanciamento:
- [ ] Effetti realistici (generalmente -3/+3)
- [ ] Scelte difficili senza opzioni ovviamente migliori
- [ ] Varietà negli effetti (non tutti gli scenari toccano tutte le metriche)
- [ ] Possibile vincere con strategie diverse

### Narrativa:
- [ ] Tema coerente per tutto il capitolo
- [ ] Personaggi e situazioni credibili
- [ ] Dilemmi interessanti e significativi
- [ ] Collegamenti logici con altri capitoli

---

## 🎯 Esempi di Capitoli Tematici

### 🏰 Capitolo Cavalieri
```javascript
metrics: ["gloria", "forza", "onore", "strategia", "salute", "soldati"]
```

### 🧙‍♂️ Capitolo Maghi
```javascript
metrics: ["potere", "conoscenza", "sanita", "energia", "reputazione", "etica"]
```

### 🏴‍☠️ Capitolo Pirati
```javascript
metrics: ["tesoro", "fama", "equipaggio", "provviste", "fortuna", "onore"]
```

---

## 🚨 Errori Comuni da Evitare

### Errori Tecnici:
- **Sintassi JavaScript sbagliata** (parentesi, virgole mancanti)
- **Nomi variabili incoerenti** (maiuscole/minuscole)
- **Percorsi immagini sbagliati**
- **Dimenticare di registrare il capitolo**

### Errori di Design:
- **Troppi scenari facili** (il giocatore non è sfidato)
- **Troppi scenari impossibili** (frustrante)
- **Scelte ovvie** (una sempre migliore dell'altra)
- **Effetti senza senso** (perché perdere salute comprando cibo?)

### Errori Narrativi:
- **Tema incoerente** (mescolare cavalieri e astronauti)
- **Personaggi piatti** (senza personalità)
- **Situazioni irrealistiche** (anche nel fantasy serve logica)
- **Finali che non riflettono le scelte** (disconnessi dalla storia)

---

## 🎉 Conclusione

Seguendo questa guida dovresti essere in grado di creare un capitolo completo e bilanciato per "Il Sentiero di Midgard". Ricorda che la chiave è l'equilibrio tra:

- **Sfida** vs **Divertimento**
- **Realismo** vs **Fantasy**
- **Varietà** vs **Coerenza**
- **Semplicità** vs **Profondità**

Buona creazione! 🏰⚔️