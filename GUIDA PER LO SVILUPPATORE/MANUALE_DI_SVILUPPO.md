# 📚 MANUALE DI SVILUPPO - Gilda dei Taglialegna

## Indice
1. [Introduzione](#introduzione)
2. [Struttura del Progetto](#struttura-del-progetto)
3. [Come Aggiungere Cutscene](#come-aggiungere-cutscene)
4. [Come Creare un Nuovo Capitolo](#come-creare-un-nuovo-capitolo)
5. [Sistema delle Metriche](#sistema-delle-metriche)
6. [Gestione degli Scenari](#gestione-degli-scenari)
7. [Sistema dei Finali](#sistema-dei-finali)
8. [Gestione delle Immagini](#gestione-delle-immagini)
9. [Sistema Audio e Musica](#sistema-audio-e-musica)
10. [Progressione e Sblocco Capitoli](#progressione-e-sblocco-capitoli)
11. [Testing e Debug](#testing-e-debug)
12. [Best Practices](#best-practices)

---

## 🎮 Introduzione

Questo manuale ti guiderà attraverso tutti gli aspetti necessari per espandere e personalizzare il gioco "Gilda dei Taglialegna". Il gioco è basato su un sistema modulare che permette di aggiungere facilmente nuovi contenuti senza modificare il codice core.

### Architettura del Gioco

Il gioco utilizza una struttura a capitoli, dove ogni capitolo contiene:
- **Metriche**: Le statistiche che il giocatore deve bilanciare
- **Scenari**: Le situazioni che il giocatore deve affrontare
- **Finali**: I possibili esiti del capitolo
- **Cutscene**: Scene narrative di inizio e fine capitolo

---

## 📁 Struttura del Progetto

```
giocoReigns/
├── index.html          # Pagina principale
├── style.css           # Stili del gioco
├── script.js           # Logica principale del gioco
├── audio.js            # Gestione audio e musica
├── backgrounds.js      # Sfondi dinamici
├── cutscene.js         # Definizioni delle cutscene
├── developer.js        # Info sviluppatore per credits
├── finali.js           # Definizioni dei finali (deprecato)
├── content.js          # Indice dei capitoli
├── player.js           # Gestione dati giocatore
├── gilda_tagliaboschi.js    # Dati Capitolo 1
├── gilda_maniscalchi.js     # Dati Capitolo 2
└── assets/             # Cartella risorse
    ├── img/            # Immagini del gioco
    └── audio/          # File audio
```

---

## 🎬 Come Aggiungere Cutscene

Le cutscene sono scene narrative che possono apparire:
- All'inizio di un capitolo
- Alla fine di un capitolo
- **NUOVO**: Dopo qualsiasi scenario durante il gameplay

### 1. Struttura Base delle Cutscene di Capitolo

Per le cutscene di inizio/fine capitolo, modifica il file `cutscene.js`:

```javascript
const cutscenes = {
    // Cutscene esistenti...
    
    tuoNuovoCapitolo: {
        start: {
            image: 'https://url-della-tua-immagine.jpg',
            text: 'Il testo narrativo che introduce il capitolo...'
        },
        end: {
            image: 'https://url-immagine-finale.jpg',
            text: 'Il testo che conclude il capitolo e introduce il successivo...'
        }
    }
};
```

### 2. Cutscene Multi-Slide (NUOVO!)

Ora puoi creare cutscene formate da più immagini e testi in sequenza! Usa il formato `slides` per creare narrazioni più ricche:

```javascript
// Cutscene multi-slide (3 immagini/testi)
cutscene: {
    slides: [
        {
            image: "immagine1.jpg",
            text: "Prima parte della storia..."
        },
        {
            image: "immagine2.jpg", 
            text: "Seconda parte della storia..."
        },
        {
            image: "immagine3.jpg",
            text: "Conclusione drammatica!"
        }
    ]
}

// Cutscene singola (formato classico - ancora supportato)
cutscene: {
    image: "immagine.jpg",
    text: "Testo della cutscene..."
}
```

### 3. Cutscene Intermedie negli Scenari (NUOVO!)

Ora puoi aggiungere cutscene che appaiono dopo le scelte del giocatore in qualsiasi scenario. Aggiungi semplicemente un campo `cutscene` allo scenario:

```javascript
{
    image: "assets/img/scenario.jpg",
    description: "Un evento importante sta per accadere...",
    choices: {
        yes: { text: "Accetta", effects: { forza: +1, onore: -1 } },
        no: { text: "Rifiuta", effects: { forza: -1, onore: +1 } }
    },
    // NUOVO: Cutscene opzionale dopo la scelta
    cutscene: {
        image: "assets/img/conseguenze.jpg",
        text: "La tua decisione ha avuto conseguenze immediate. Il popolo mormora, i nobili complottano, e tu senti il peso della corona sulla testa..."
    }
}
```

### 3. Esempio Pratico Completo

```javascript
// In gilda_tagliaboschi.js
scenarios: [
    {
        image: "assets/img/processo.jpg",
        description: "Un mercante è accusato di tradimento. Le prove sono deboli.",
        choices: {
            yes: { 
                text: "Condannalo", 
                effects: { ordine: +2, giustizia: -2, paura: +1 } 
            },
            no: { 
                text: "Assolvilo", 
                effects: { ordine: -1, giustizia: +2, paura: -1 } 
            }
        },
        // Questa cutscene appare DOPO che il giocatore ha scelto
        cutscene: {
            image: "assets/img/folla_reazione.jpg",
            text: "La folla esplode in un tumulto. Alcuni gridano 'Giustizia!', altri 'Tiranno!'. La tua decisione oggi sarà ricordata per generazioni."
        }
    },
    // Altri scenari...
]
```

### 4. Cutscene di Inizio/Fine Capitolo

Anche le cutscene di capitolo supportano il formato multi-slide:

```javascript
// In cutscene.js
gildaDeiMercanti: {
    start: {
        // Cutscene singola (formato classico)
        image: 'assets/img/mercato_medievale.jpg',
        text: 'Lasciata la foresta alle spalle, ti ritrovi nel caos del mercato cittadino...'
    },
    end: {
        // Cutscene multi-slide per finale epico
        slides: [
            {
                image: 'assets/img/vittoria1.jpg',
                text: 'Hai conquistato il mercato della città. I mercanti ti guardano con rispetto e timore.'
            },
            {
                image: 'assets/img/vittoria2.jpg', 
                text: 'Ma oltre le mura della città si stende il mare infinito. Le navi solcano le onde...'
            },
            {
                image: 'assets/img/vittoria3.jpg',
                text: 'Nuove terre, nuove sfide, nuove opportunità. Il tuo destino ti chiama oltre l\'orizzonte.'
            }
        ]
    }
}
```

### 5. Consigli per le Cutscene

- **Testo**: Mantieni il testo tra 50-150 parole per non annoiare il giocatore
- **Immagini**: Usa immagini 400x400px per mantenere coerenza visiva
- **Tono**: Mantieni un tono narrativo coerente con l'ambientazione medievale
- **Collegamento**: La cutscene finale dovrebbe anticipare il capitolo successivo
- **Cutscene Intermedie**: Usale per momenti drammatici o conseguenze importanti
- **Non Abusarne**: Non ogni scenario necessita di una cutscene intermedia
- **Impatto Narrativo**: Le cutscene intermedie dovrebbero aggiungere profondità alla storia
- **Multi-Slide**: Perfette per sequenze narrative complesse (max 3-5 slide)
- **Progressione**: Il pulsante mostra automaticamente il progresso (1/3, 2/3, ecc.)
- **Compatibilità**: I vecchi formati continuano a funzionare perfettamente

---

## 📖 Come Creare un Nuovo Capitolo

Creare un nuovo capitolo richiede diversi passaggi. Seguiamoli uno per uno.

### 1. Crea il File del Capitolo

Crea un nuovo file JavaScript per il tuo capitolo (es: `gilda_mercanti.js`):

```javascript
// ===================================================================================
// --- DATI CAPITOLO 3: Gilda dei Mercanti ---
// ===================================================================================

const gildaDeiMercantiData = {
    title: "Gilda dei Mercanti",
    
    // Il gioco utilizza le 6 metriche universali definite in metriche.js
    // Non è necessario ridefinirle qui - vengono applicate automaticamente:
    // tesoro, forza, salute, risorse, onore, coraggio
    
    // Array degli scenari
    scenarios: [
        {
            image: "assets/img/scenario1.jpg",
            description: "Un mercante rivale ti offre di unire le forze per controllare il mercato delle spezie.",
            choices: {
                yes: {
                    text: "Accetta l'alleanza",
                    effects: { tesoro: +2, forza: +1, onore: -1, coraggio: +1 }
                },
                no: {
                    text: "Rifiuta e competi",
                    effects: { tesoro: -1, forza: -1, onore: +2, coraggio: +1 }
                }
            }
        },
        // Aggiungi almeno 10-15 scenari per varietà
    ],
    
    // Definisci i finali per ogni metrica
    endings: {
        tesoro: {
            low: {
                title: "Mercante in Rovina",
                message: "Senza tesoro, la tua gilda è crollata nella povertà.",
                image: "assets/img/finale_tesoro_low.jpg"
            },
            high: {
                title: "Avarizia Fatale",
                message: "La tua cupidigia ha attirato ladri e assassini nella notte.",
                image: "assets/img/finale_tesoro_high.jpg"
            }
        },
        forza: {
            low: {
                title: "Debole e Indifeso",
                message: "Senza forza, non hai potuto proteggere la gilda.",
                image: "assets/img/finale_forza_low.jpg"
            },
            high: {
                title: "Tiranno Brutale", 
                message: "La tua forza eccessiva ha scatenato una ribellione.",
                image: "assets/img/finale_forza_high.jpg"
            }
        },
        // Definisci finali per salute, risorse, onore, coraggio...
        
        success: {
            title: "Re del Commercio",
            message: "Hai dominato il mercato e le rotte commerciali sono tue!",
            image: "assets/img/finale_successo.jpg",
            nextChapter: "gildaDeiNavigatori" // Sblocca il prossimo capitolo
        }
    }
};
```

### 2. Registra il Capitolo

Modifica `content.js` per includere il nuovo capitolo:

```javascript
const chapters = {
    gildaDeiBoschi: gildaDeiBoschiData,
    gildaDeiManiscalchi: gildaDeiManiscalchiData,
    gildaDeiMercanti: gildaDeiMercantiData  // Aggiungi questa riga
};
```

### 3. Includi il File in HTML

Aggiungi il riferimento al file in `index.html`:

```html
<!-- Script del Gioco -->
<script src="gilda_tagliaboschi.js"></script>
<script src="gilda_maniscalchi.js"></script>
<script src="gilda_mercanti.js"></script> <!-- Aggiungi questa riga -->
<script src="content.js"></script>
```

### 4. Aggiungi le Cutscene

Non dimenticare di aggiungere le cutscene del nuovo capitolo in `cutscene.js`.

---

## 📊 Sistema delle Metriche

Le metriche sono il cuore del gameplay. Il gioco utilizza un sistema a **6 metriche universali** che si applicano a tutti i capitoli, offrendo coerenza e profondità strategica.

### 1. Le 6 Metriche Attuali

```javascript
// Definite in metriche.js
const METRICS_CONFIG = {
    tesoro: { min: 0, max: 20, start: 0, name: "Tesoro", type: "growing" },
    forza: { min: 0, max: 20, start: 0, name: "Forza", type: "growing" },
    salute: { min: 0, max: 20, start: 20, name: "Salute", type: "depleting" },
    risorse: { min: 0, max: 20, start: 20, name: "Risorse", type: "depleting" },
    onore: { min: 0, max: 20, start: 10, name: "Onore", type: "balanced" },
    coraggio: { min: 0, max: 20, start: 10, name: "Coraggio", type: "balanced" }
};
```

### 2. Come Funzionano

- **Range**: Ogni metrica va da **0 a 20**
- **Game Over**: Se una metrica raggiunge **0 o 20**, il gioco termina
- **Valori Iniziali**: Variano per tipo di metrica:
  - **Growing (0→20)**: Tesoro, Forza - partono da 0
  - **Depleting (20→0)**: Salute, Risorse - partono da 20  
  - **Balanced (10±)**: Onore, Coraggio - partono da 10
- **Bilanciamento**: Il giocatore deve mantenerle tutte tra 1 e 19

### 3. Tipi di Metriche

**Growing Metrics (Crescita)**
- Rappresentano accumuli positivi (ricchezza, potere)
- Partono da 0 e crescono con successi
- Morte a 0: Povertà/Debolezza
- Morte a 20: Corruzione/Eccesso di potere

**Depleting Metrics (Consumo)**  
- Rappresentano risorse finite (salute, materiali)
- Partono da 20 e si consumano nel tempo
- Morte a 0: Esaurimento totale
- Morte a 20: Sovraccarico/Spreco

**Balanced Metrics (Equilibrio)**
- Rappresentano valori morali/sociali (onore, coraggio)
- Partono da 10 e oscillano con le scelte
- Morte a 0: Vizio estremo (disonore, codardia)
- Morte a 20: Virtù estrema (fanatismo, follia)

### 4. Effetti delle Scelte

Ogni scelta in uno scenario modifica le metriche:

```javascript
effects: { 
    tesoro: +3,     // Aumenta tesoro di 3
    salute: -1,     // Diminuisce salute di 1  
    onore: +2,      // Aumenta onore di 2
    coraggio: -1    // Diminuisce coraggio di 1
    // Le metriche non menzionate rimangono invariate
}
```

### 5. Design e Bilanciamento

Quando crei scenari, considera:

- **Opposizioni Naturali**: Tesoro vs Onore, Forza vs Diplomazia
- **Costi e Benefici**: Ogni vantaggio dovrebbe avere un prezzo
- **Diversità di Effetti**: Non tutti gli scenari devono toccare tutte le metriche
- **Progressione**: Effetti più drammatici (+3/-3) per scelte più rischiose
- **Equilibrio Tematico**: Le 6 metriche si adattano a qualsiasi ambientazione

---

## 🎭 Gestione degli Scenari

Gli scenari sono le situazioni che il giocatore affronta durante il gioco.

### 1. Struttura di uno Scenario

```javascript
{
    image: "percorso/immagine.jpg",
    description: "Descrizione della situazione che il giocatore deve affrontare.",
    choices: {
        yes: {
            text: "Testo del pulsante SÌ",
            effects: { tesoro: +1, forza: -1, salute: +2, onore: +1 }
        },
        no: {
            text: "Testo del pulsante NO",
            effects: { tesoro: -1, forza: +1, risorse: -1, coraggio: +2 }
        }
    }
}
```

### 2. Tipologie di Scenari

**Dilemma Morale**
```javascript
{
    description: "Un mendicante ruba del pane. Il fornaio chiede giustizia.",
    choices: {
        yes: { text: "Punisci il ladro", effects: { onore: +2, coraggio: -1 } },
        no: { text: "Perdona e paga tu", effects: { onore: +1, tesoro: -1, coraggio: +1 } }
    }
}
```

**Decisione Strategica**
```javascript
{
    description: "Un'alleanza con il regno vicino richiede truppe al confine.",
    choices: {
        yes: { text: "Invia le truppe", effects: { forza: -2, onore: +2, risorse: -1 } },
        no: { text: "Rifiuta cortesemente", effects: { forza: +1, onore: -1 } }
    }
}
```

**Evento Casuale**
```javascript
{
    description: "Una cometa attraversa il cielo. Il popolo è terrorizzato.",
    choices: {
        yes: { text: "È un segno divino!", effects: { coraggio: +2, salute: -1 } },
        no: { text: "È solo astronomia", effects: { coraggio: -1, onore: +1 } }
    }
}
```

### 3. Bilanciamento degli Scenari

- **Varietà di Effetti**: Non tutti gli scenari devono influenzare tutte le metriche
- **Conseguenze Bilanciate**: Evita scelte ovviamente migliori
- **Effetti Multipli**: Usa combinazioni interessanti (es: +3/-3 vs +1/+1/-1/-1)
- **Progressione**: Aumenta la difficoltà delle scelte man mano che il gioco procede

### 4. Scrittura degli Scenari

- **Brevità**: Massimo 2-3 frasi per la descrizione
- **Chiarezza**: Il dilemma deve essere immediatamente comprensibile
- **Ambientazione**: Mantieni coerenza con il periodo storico e il tema
- **Scelte Significative**: Entrambe le opzioni devono essere valide

---

## 🏆 Sistema dei Finali

I finali determinano come termina ogni capitolo.

### 1. Tipologie di Finali

**Finali per Metrica Bassa (0)**
```javascript
nomeMetrica: {
    low: {
        title: "Titolo Drammatico",
        message: "Descrizione di come la mancanza di questa metrica ti ha rovinato.",
        image: "immagine-tragica.jpg"
    }
}
```

**Finali per Metrica Alta (10)**
```javascript
nomeMetrica: {
    high: {
        title: "Eccesso Fatale",
        message: "Descrizione di come l'eccesso di questa metrica ti ha distrutto.",
        image: "immagine-drammatica.jpg"
    }
}
```

**Finale di Successo**
```javascript
success: {
    title: "Vittoria Gloriosa",
    message: "Hai completato il capitolo con successo!",
    image: "immagine-vittoria.jpg",
    nextChapter: "nomeCapitoloSuccessivo" // Opzionale: sblocca nuovo capitolo
}
```

### 2. Condizioni per il Finale di Successo

Il finale di successo si attiva quando il giocatore completa un certo numero di turni mantenendo tutte le metriche bilanciate. Puoi personalizzare questa condizione nel codice.

### 3. Scrittura dei Finali

- **Impatto Emotivo**: I finali devono essere memorabili
- **Conseguenze Logiche**: Il finale deve riflettere le scelte del giocatore
- **Varietà**: Ogni finale dovrebbe essere unico e interessante
- **Rigiocabilità**: Incoraggia il giocatore a riprovare per vedere altri finali

---

## 🖼️ Gestione delle Immagini

Le immagini sono fondamentali per l'atmosfera del gioco.

### 1. Specifiche Tecniche

- **Dimensioni**: 400x400 pixel (quadrate)
- **Formato**: JPG o PNG
- **Peso**: Massimo 200KB per immagine
- **Percorso**: Salva in `assets/img/`

### 2. Convenzioni di Naming

```
scenario_[capitolo]_[numero].jpg    // es: scenario_mercanti_01.jpg
finale_[metrica]_[high/low].jpg     // es: finale_oro_high.jpg
cutscene_[capitolo]_[start/end].jpg // es: cutscene_mercanti_start.jpg
```

### 3. Placeholder Temporanei

Durante lo sviluppo puoi usare placeholder:

```javascript
image: "https://placehold.co/400x400/colore1/colore2?text=Testo"
// Esempio:
image: "https://placehold.co/400x400/8B4513/FFD700?text=Mercato"
```

### 4. Ottimizzazione

- **Compressione**: Usa tool come TinyPNG per ridurre il peso
- **Lazy Loading**: Le immagini vengono caricate solo quando necessarie
- **CDN**: Per progetti online, considera l'uso di un CDN

---

## 🎵 Sistema Audio e Musica

Il sistema audio aggiunge atmosfera al gioco.

### 1. File audio.js

```javascript
const audioTracks = {
    menu: 'assets/audio/menu_theme.mp3',
    gildaDeiBoschi: 'assets/audio/forest_ambience.mp3',
    gildaDeiMercanti: 'assets/audio/market_sounds.mp3',
    victory: 'assets/audio/victory_fanfare.mp3',
    defeat: 'assets/audio/defeat_dirge.mp3'
};
```

### 2. Aggiungere Nuova Musica

```javascript
// In audio.js
audioTracks.tuoCapitolo = 'assets/audio/tua_musica.mp3';

// Il sistema cambierà automaticamente la musica quando 
// il giocatore entra nel capitolo
```

### 3. Effetti Sonori

Puoi aggiungere effetti sonori per:
- Click sui pulsanti
- Cambio delle metriche
- Finali drammatici

### 4. Best Practices Audio

- **Loop**: La musica di background deve essere in loop
- **Volume**: Rispetta le impostazioni volume del giocatore
- **Formato**: Usa MP3 per compatibilità
- **Dimensioni**: Comprimi i file audio senza perdere troppa qualità

---

## 🔓 Progressione e Sblocco Capitoli

Il sistema di progressione permette di sbloccare nuovi capitoli.

### 1. Sistema di Sblocco

```javascript
// Nel finale di successo di un capitolo
success: {
    title: "Vittoria!",
    message: "Hai completato il capitolo!",
    image: "victory.jpg",
    nextChapter: "nomeDelProssimoCapitolo" // Questo sblocca il nuovo capitolo
}
```

### 2. Salvataggio Progressi

Il gioco salva automaticamente:
- Capitoli sbloccati
- Punteggi migliori
- Statistiche del giocatore

### 3. Struttura Non Lineare

Puoi creare percorsi ramificati:

```javascript
// Capitolo 1 può sbloccare sia Capitolo 2A che 2B
success: {
    nextChapter: playerScore > 100 ? "capitolo2A" : "capitolo2B"
}
```

---

## 🐛 Testing e Debug

### 1. Console per Developer

Premi F12 e usa questi comandi nella console:

```javascript
// Cambia metriche istantaneamente
gameState.metrics.forza = 8;

// Salta a uno scenario specifico
gameState.scenarioIndex = 5;

// Forza un finale
checkGameEnd();
```

### 2. Modalità Test

Aggiungi un parametro URL per testare:
```
index.html?debug=true&chapter=gildaDeiMercanti
```

### 3. Checklist di Test

- [ ] Tutti gli scenari hanno immagini valide
- [ ] Gli effetti delle scelte sono bilanciati
- [ ] I finali si attivano correttamente
- [ ] Le cutscene appaiono nei momenti giusti
- [ ] La musica cambia tra i capitoli
- [ ] Il salvataggio funziona correttamente

---

## 💡 Best Practices

### 1. Coerenza Narrativa

- Mantieni uno stile di scrittura consistente
- Rispetta l'ambientazione storica
- Crea collegamenti tra i capitoli

### 2. Bilanciamento del Gameplay

- Testa ogni scenario per evitare scelte ovvie
- Assicurati che sia possibile vincere
- Offri multiple strategie valide

### 3. Esperienza Utente

- Feedback immediato alle scelte
- Transizioni fluide tra le scene
- Interfaccia reattiva su tutti i dispositivi

### 4. Organizzazione del Codice

- Un file per capitolo
- Commenti chiari nel codice
- Convenzioni di naming consistenti

### 5. Performance

- Ottimizza le immagini
- Minimizza i file JavaScript per la produzione
- Testa su dispositivi diversi

---

## 🎬 Guida Completa alle Cutscene Multi-Slide

### Quando Usare Cutscene Multi-Slide

- **Sequenze Narrative Complesse**: Quando una singola immagine non basta
- **Momenti Epici**: Battaglie, cerimonie, rivelazioni importanti
- **Transizioni tra Capitoli**: Per creare passaggi cinematografici
- **Conseguenze Articolate**: Mostrare gli effetti a cascata delle scelte

### Best Practices per Multi-Slide

1. **Numero Ottimale**: 3-5 slide per cutscene (non oltre per non annoiare)
2. **Progressione Logica**: Ogni slide dovrebbe seguire naturalmente la precedente
3. **Varietà Visiva**: Cambia inquadratura, prospettiva o focus tra le slide
4. **Climax Narrativo**: Costruisci verso un momento culminante
5. **Durata del Testo**: 30-80 parole per slide, bilanciate tra le slide

### Esempi di Sequenze Multi-Slide Efficaci

**Battaglia Epica (3 slide):**
```javascript
slides: [
    {
        image: "battaglia_inizio.jpg",
        text: "Le corna da guerra risuonano. I nemici avanzano come una marea scura."
    },
    {
        image: "battaglia_climax.jpg", 
        text: "Il clangore delle armi riempie l'aria. Sangue e gloria si mescolano nel fango."
    },
    {
        image: "battaglia_fine.jpg",
        text: "Il campo di battaglia tace. La vittoria è tua, ma a che prezzo?"
    }
]
```

**Rivelazione Drammatica (4 slide):**
```javascript
slides: [
    {
        image: "porta_misteriosa.jpg",
        text: "La porta segreta si apre con un gemito sinistro. L'aria è densa di segreti."
    },
    {
        image: "stanza_nascosta.jpg",
        text: "Nella penombra intravedi documenti, mappe, simboli strani sulle pareti."
    },
    {
        image: "documento_shock.jpg",
        text: "Un documento porta il sigillo reale. Le parole che leggi gelano il sangue."
    },
    {
        image: "realizzazione.jpg",
        text: "Ora tutto ha senso. Il tradimento, le menzogne, la cospirazione. Cosa farai?"
    }
]
```

### Cutscene Multi-Slide per Tipologia

**Inizio Capitolo (Introduzione Ambientale):**
- Slide 1: Vista panoramica del nuovo luogo
- Slide 2: Dettagli dell'ambiente e atmosfera
- Slide 3: Introduzione della sfida principale

**Fine Capitolo (Epilogo Conseguenze):**
- Slide 1: Risultato immediato delle azioni
- Slide 2: Impatto a medio termine
- Slide 3: Anticipazione del futuro

**Intermedia Scenario (Conseguenze Scelta):**
- Slide 1: Reazione immediata
- Slide 2: Sviluppi nelle ore/giorni seguenti
- Slide 3: Conseguenze a lungo termine

### Tecniche Narrative Avanzate

**Zoom Progressivo:**
```javascript
// Da panoramica generale a dettaglio specifico
slides: [
    { image: "citta_lontana.jpg", text: "La città si stende davanti a te..." },
    { image: "porte_citta.jpg", text: "Le guardie alle porte ti scrutano..." },
    { image: "volto_guardia.jpg", text: "Negli occhi della guardia vedi sospetto..." }
]
```

**Salto Temporale:**
```javascript
// Mostra lo scorrere del tempo
slides: [
    { image: "alba.jpg", text: "All'alba prendi la decisione..." },
    { image: "mezzogiorno.jpg", text: "A mezzogiorno i primi risultati..." },
    { image: "tramonto.jpg", text: "Al tramonto le conseguenze sono chiare..." }
]
```

**Punti di Vista Multipli:**
```javascript
// Stessa scena da prospettive diverse
slides: [
    { image: "tua_prospettiva.jpg", text: "Tu vedi giustizia nella tua decisione..." },
    { image: "prospettiva_popolo.jpg", text: "Il popolo vede tirannia..." },
    { image: "prospettiva_nobili.jpg", text: "I nobili vedono debolezza..." }
]
```

## 📝 Template Rapido per Nuovo Capitolo

```javascript
// nuovo_capitolo.js
const nuovoCapitoloData = {
    title: "Nome del Capitolo",
    
    // Le metriche sono automaticamente le 6 universali:
    // tesoro, forza, salute, risorse, onore, coraggio
    
    scenarios: [
        {
            image: "scenario.jpg",
            description: "Descrizione scenario...",
            choices: {
                yes: { text: "Opzione 1", effects: { tesoro: +1, forza: -1, onore: +2 } },
                no: { text: "Opzione 2", effects: { tesoro: -1, salute: +1, coraggio: +1 } }
            },
            // Cutscene opzionale (singola o multi-slide)
            cutscene: {
                slides: [
                    { image: "conseguenza1.jpg", text: "Prima conseguenza..." },
                    { image: "conseguenza2.jpg", text: "Sviluppo..." },
                    { image: "conseguenza3.jpg", text: "Risultato finale..." }
                ]
            }
        }
        // Aggiungi almeno 10-15 scenari
    ],
    endings: {
        tesoro: {
            low: { title: "Povertà", message: "Il tesoro è finito...", image: "" },
            high: { title: "Avarizia", message: "Troppa ricchezza...", image: "" }
        },
        forza: {
            low: { title: "Debolezza", message: "Senza forza...", image: "" },
            high: { title: "Tirannia", message: "Troppo potere...", image: "" }
        },
        salute: {
            low: { title: "Malattia", message: "La salute è compromessa...", image: "" },
            high: { title: "Ossessione", message: "Troppa attenzione alla salute...", image: "" }
        },
        risorse: {
            low: { title: "Scarsità", message: "Le risorse sono finite...", image: "" },
            high: { title: "Spreco", message: "Troppe risorse accumulate...", image: "" }
        },
        onore: {
            low: { title: "Disonore", message: "Hai perso l'onore...", image: "" },
            high: { title: "Fanatismo", message: "Troppo rigoroso...", image: "" }
        },
        coraggio: {
            low: { title: "Codardia", message: "Il coraggio ti ha abbandonato...", image: "" },
            high: { title: "Follia", message: "Troppo temerario...", image: "" }
        },
        success: { 
            title: "Vittoria", 
            message: "Hai completato il capitolo!", 
            image: "",
            nextChapter: "" // Opzionale
        }
    }
};

// E non dimenticare le cutscene di capitolo in cutscene.js:
const cutscenes = {
    nuovoCapitolo: {
        start: {
            slides: [
                { image: "intro1.jpg", text: "Introduzione..." },
                { image: "intro2.jpg", text: "Ambientazione..." },
                { image: "intro3.jpg", text: "Sfida..." }
            ]
        },
        end: {
            slides: [
                { image: "epilogo1.jpg", text: "Conclusione..." },
                { image: "epilogo2.jpg", text: "Conseguenze..." },
                { image: "epilogo3.jpg", text: "Futuro..." }
            ]
        }
    }
};
```

---

## 🎯 Conclusione

Con questo manuale hai tutti gli strumenti per espandere il gioco all'infinito. Ricorda che la chiave è la creatività: ogni nuovo capitolo è un'opportunità per esplorare nuovi temi, meccaniche e storie.

Buono sviluppo e che la tua saga sia leggendaria! 🏰⚔️