# 🎬 GUIDA COMPLETA ALLE CUTSCENES

## 📋 Indice
1. [Introduzione alle Cutscenes](#introduzione)
2. [Tipi di Cutscenes](#tipi-di-cutscenes)
3. [Cutscenes di Capitolo (Iniziali e Finali)](#cutscenes-di-capitolo)
4. [Cutscenes Singole vs Multi-Slide](#cutscenes-singole-vs-multi-slide)
5. [Cutscenes Intermedie negli Scenari](#cutscenes-intermedie)
6. [Cutscenes Condizionali (Basate sulla Scelta)](#cutscenes-condizionali)
7. [Esempi Pratici per Tema](#esempi-pratici)
8. [Best Practices e Consigli](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Introduzione

Le cutscenes sono scene narrative che arricchiscono l'esperienza di gioco, fornendo contesto, atmosfera e conseguenze drammatiche alle scelte del giocatore. In "Il Sentiero di Midgard", le cutscenes possono apparire in diversi momenti e formati.

### Scopo delle Cutscenes
- **Immersione Narrativa**: Approfondire la storia e l'ambientazione
- **Feedback Emotivo**: Mostrare le conseguenze delle scelte del giocatore
- **Collegamento tra Capitoli**: Creare continuità narrativa
- **Momenti Epici**: Enfatizzare eventi importanti

---

## 🎭 Tipi di Cutscenes

### 1. **Cutscenes di Capitolo**
- **Iniziali**: Introducono il capitolo e l'ambientazione
- **Finali**: Concludono il capitolo e anticipano il successivo

### 2. **Cutscenes Intermedie**
- **Post-Scenario**: Appaiono dopo le scelte in scenari specifici
- **Neutre**: Stessa cutscene indipendentemente dalla scelta
- **Condizionali**: Diverse in base alla scelta del giocatore

### 3. **Formati**
- **Singola**: Una immagine + un testo
- **Multi-Slide**: Sequenza di 2-5 immagini/testi

---

## 🏰 Cutscenes di Capitolo (Iniziali e Finali)

Le cutscenes di capitolo si definiscono nel file `cutscene.js`.

### 1. Struttura Base

```javascript
// In cutscene.js
const cutscenes = {
    nomeCapitolo: {
        start: {
            // Cutscene iniziale
        },
        end: {
            // Cutscene finale
        }
    }
};
```

### 2. Cutscene Iniziale Singola

```javascript
const cutscenes = {
    gildaDeiMercanti: {
        start: {
            image: 'assets/img/mercato_medievale.jpg',
            text: 'Lasciata la foresta alle spalle, ti ritrovi nel caos del mercato cittadino. Mercanti gridano le loro offerte, monete tintinnano, e l\'odore delle spezie riempie l\'aria. Qui, il potere si misura in oro e influenza.'
        }
    }
};
```

### 3. Cutscene Iniziale Multi-Slide

```javascript
const cutscenes = {
    gildaDeiCavalieri: {
        start: {
            slides: [
                {
                    image: 'assets/img/castello_alba.jpg',
                    text: 'L\'alba sorge sul castello. Oggi riceverai l\'investitura cavalleresca che hai sempre sognato.'
                },
                {
                    image: 'assets/img/cerimonia_preparazione.jpg',
                    text: 'I servitori ti aiutano a indossare l\'armatura. Il peso del metallo è nulla rispetto al peso della responsabilità.'
                },
                {
                    image: 'assets/img/sala_del_trono.jpg',
                    text: 'Entri nella sala del trono. Il re ti attende, la spada scintilla alla luce delle torce. Il tuo destino sta per compiersi.'
                }
            ]
        }
    }
};
```

### 4. Cutscene Finale con Transizione

```javascript
const cutscenes = {
    gildaDeiMercanti: {
        end: {
            slides: [
                {
                    image: 'assets/img/mercato_conquistato.jpg',
                    text: 'Hai dominato il mercato della città. I mercanti ti guardano con rispetto misto a timore.'
                },
                {
                    image: 'assets/img/porto_lontano.jpg',
                    text: 'Ma oltre le mura della città si stende il mare infinito. Le navi solcano le onde cariche di tesori.'
                },
                {
                    image: 'assets/img/nave_partenza.jpg',
                    text: 'Nuove terre, nuovi mari, nuove sfide ti attendono. Il tuo destino ti chiama verso l\'orizzonte.'
                }
            ]
        }
    }
};
```

---

## 🎞️ Cutscenes Singole vs Multi-Slide

### Cutscene Singola (Formato Classico)

**Quando usarla:**
- Messaggi semplici e diretti
- Introduzioni brevi
- Conseguenze immediate

**Esempio:**
```javascript
cutscene: {
    image: "assets/img/tradimento_scoperto.jpg",
    text: "Il tradimento è stato scoperto. Le guardie si avvicinano con le spade sguainate."
}
```

### Cutscene Multi-Slide (2-5 Slide)

**Quando usarla:**
- Sequenze narrative complesse
- Momenti epici che richiedono buildup
- Transizioni temporali
- Conseguenze articolate

**Esempio Base (3 slide):**
```javascript
cutscene: {
    slides: [
        {
            image: "assets/img/decisione_presa.jpg",
            text: "Hai preso la tua decisione. Non c'è più tempo per i dubbi."
        },
        {
            image: "assets/img/reazione_corte.jpg",
            text: "La corte esplode in un tumulto. Alcuni nobili applaudono, altri gridano al tradimento."
        },
        {
            image: "assets/img/conseguenze_future.jpg",
            text: "Quella notte, messaggeri partono verso tutti i regni. La tua scelta cambierà la storia."
        }
    ]
}
```

---

## ⚡ Cutscenes Intermedie negli Scenari

Le cutscenes intermedie appaiono **dopo** che il giocatore ha fatto una scelta in uno scenario. Esistono due tipi principali:

### 1. Cutscene Neutra (Stessa per Entrambe le Scelte)

Usa il formato **`cutscene:`** (singolare) quando vuoi che la stessa cutscene appaia indipendentemente dalla scelta del giocatore.

```javascript
{
    image: "assets/img/processo_pubblico.jpg",
    description: "Un mercante è accusato di tradimento. Le prove sono deboli ma il popolo chiede giustizia.",
    choices: {
        yes: { 
            text: "Condannalo a morte", 
            effects: { forza: +2, onore: -2, tesoro: +1 } 
        },
        no: { 
            text: "Assolvilo pubblicamente", 
            effects: { forza: -1, onore: +3, tesoro: -1 } 
        }
    },
    // Cutscene che appare DOPO la scelta (sempre la stessa)
    cutscene: {
        image: "assets/img/folla_tumulto.jpg",
        text: "La folla esplode in un tumulto. Le tue parole risuonano nella piazza mentre la tensione sale. Alcuni gridano approvazione, altri dissenso. La tua decisione segnerà questo giorno nella memoria del popolo."
    }
}
```

### 2. Cutscene Multi-Slide per Conseguenze Complesse

```javascript
{
    image: "assets/img/guerra_dichiarazione.jpg", 
    description: "Un regno vicino ti dichiara guerra. I tuoi consiglieri sono divisi: negoziare o attaccare per primi?",
    choices: {
        yes: { 
            text: "Attacca preventivamente", 
            effects: { forza: +3, onore: -2, tesoro: -2, coraggio: +2 } 
        },
        no: { 
            text: "Proponi negoziati", 
            effects: { forza: -1, onore: +3, tesoro: -1, coraggio: -1 } 
        }
    },
    // Cutscene multi-slide che mostra le conseguenze nel tempo
    cutscene: {
        slides: [
            {
                image: "assets/img/reazione_immediata.jpg",
                text: "La tua decisione scatena reazioni immediate. I messaggeri corrono, le truppe si muovono, il castello fermenta di attività."
            },
            {
                image: "assets/img/giorni_seguenti.jpg", 
                text: "Nei giorni seguenti, le conseguenze della tua scelta si fanno sentire. Alleati e nemici ridefiniscono le loro posizioni."
            },
            {
                image: "assets/img/nuovo_equilibrio.jpg",
                text: "Un nuovo equilibrio di potere emerge. Il regno non sarà mai più lo stesso dopo questa decisione."
            }
        ]
    }
}
```

---

## 🎲 Cutscenes Condizionali (Basate sulla Scelta)

Le cutscenes condizionali mostrano scene **diverse** in base alla scelta fatta dal giocatore.

**⚠️ IMPORTANTE**: Per cutscenes differenziate, usa **`cutscenes:`** (plurale) invece di **`cutscene:`** (singolare).

### 1. Differenza tra Cutscene Neutra e Condizionale

```javascript
// ❌ CUTSCENE NEUTRA (sempre uguale)
cutscene: {
    image: "stessa_immagine.jpg",
    text: "Stesso testo per entrambe le scelte"
}

// ✅ CUTSCENES CONDIZIONALI (diverse per ogni scelta)
cutscenes: {
    yes: { image: "scelta_A.jpg", text: "Conseguenze scelta SÌ" },
    no: { image: "scelta_B.jpg", text: "Conseguenze scelta NO" }
}
```

### 2. Formato Base per Cutscenes Condizionali

```javascript
{
    image: "assets/img/prigioniero_interrogatorio.jpg",
    description: "Hai catturato una spia nemica. Puoi torturarla per informazioni o tentare di corromperla.",
    choices: {
        yes: { 
            text: "Usa la tortura", 
            effects: { forza: +2, onore: -3, tesoro: 0, coraggio: +1 } 
        },
        no: { 
            text: "Offri denaro e libertà", 
            effects: { forza: 0, onore: +1, tesoro: -2, coraggio: -1 } 
        }
    },
    // Cutscenes diverse per ogni scelta
    cutscenes: {
        yes: {
            image: "assets/img/tortura_conseguenze.jpg",
            text: "Le urla risuonano nei sotterranei. Ottieni le informazioni, ma a che prezzo? I tuoi soldati ti guardano con occhi diversi, misti di rispetto e timore."
        },
        no: {
            image: "assets/img/corruzione_conseguenze.jpg", 
            text: "La borsa d'oro fa il suo effetto. La spia parla volentieri, rivelando segreti preziosi. L'onore è salvo, ma le casse sono più leggere."
        }
    }
}
```

### 2. Cutscenes Condizionali Multi-Slide

```javascript
{
    image: "assets/img/villaggio_pestilenza.jpg",
    description: "Una terribile pestilenza ha colpito un villaggio di confine. Puoi inviare aiuti rischiando il contagio o sigillare le frontiere.",
    choices: {
        yes: { 
            text: "Invia medici e rifornimenti", 
            effects: { salute: -3, onore: +3, tesoro: -2, coraggio: +2 } 
        },
        no: { 
            text: "Sigilla le frontiere", 
            effects: { salute: +1, onore: -2, forza: +1, coraggio: -2 } 
        }
    },
    cutscenes: {
        yes: {
            slides: [
                {
                    image: "assets/img/medici_partenza.jpg",
                    text: "I tuoi migliori medici partono all'alba, carichi di medicine e speranza."
                },
                {
                    image: "assets/img/cura_villaggio.jpg",
                    text: "Lavorano giorno e notte per salvare vite. Alcuni si ammalano, ma molti vengono salvati."
                },
                {
                    image: "assets/img/villaggio_salvato.jpg",
                    text: "Il villaggio è salvo. I sopravvissuti ti benedicono, ma il prezzo pagato è alto."
                }
            ]
        },
        no: {
            slides: [
                {
                    image: "assets/img/frontiere_sigillate.jpg",
                    text: "Le frontiere vengono sigillate. Soldati impediscono qualsiasi passaggio."
                },
                {
                    image: "assets/img/villaggio_abbandonato.jpg",
                    text: "Dal villaggio non arrivano più notizie. Solo silenzio e fumo all'orizzonte."
                },
                {
                    image: "assets/img/regno_sicuro.jpg",
                    text: "Il tuo regno è al sicuro, ma il peso di quelle vite perdute graverà per sempre sulla tua coscienza."
                }
            ]
        }
    }
}
```

### 3. Cutscenes Condizionali con Logica Complessa

```javascript
{
    image: "assets/img/tesoro_misterioso.jpg",
    description: "Hai trovato un antico tesoro, ma è custodito da una maledizione. La leggenda parla di gloria eterna o rovina totale.",
    choices: {
        yes: { 
            text: "Prendi il tesoro sfidando la maledizione", 
            effects: { tesoro: +4, onore: +1, salute: -2, coraggio: +3 } 
        },
        no: { 
            text: "Lascia il tesoro e sigilla la tomba", 
            effects: { tesoro: 0, onore: +2, salute: +1, coraggio: -1 } 
        }
    },
    cutscenes: {
        yes: {
            // Cutscene diversa in base al coraggio attuale del giocatore
            condition: "coraggio >= 15",
            high_courage: {
                image: "assets/img/tesoro_conquistato.jpg",
                text: "Il tuo coraggio spezza la maledizione! Il tesoro è tuo e gli dei sorridono alla tua audacia. Diventerai leggenda."
            },
            low_courage: {
                image: "assets/img/maledizione_attiva.jpg",
                text: "La maledizione si attiva! Il tesoro brucia nelle tue mani mentre ombre antiche si risvegliano per reclamare ciò che è loro."
            }
        },
        no: {
            image: "assets/img/tomba_sigillata.jpg",
            text: "Sigilli la tomba con rispetto. Gli spiriti antichi riconoscono la tua saggezza e ti benedicono con protezione eterna."
        }
    }
}
```

### 4. Esempio Pratico: Incursione Vichinga (dal Prologo)

Ecco un esempio reale tratto dal gioco che dimostra l'uso efficace delle cutscenes condizionali:

```javascript
{
    image: "https://placehold.co/400x400/7f1d1d/c8a27c?text=Incursione+Vichinga", 
    description: "Avvistate navi vichinghe! Dobbiamo formare una milizia e difendere il guado o nascondere le nostre ricchezze?", 
    choices: { 
        yes: { text: "Combatti!", effects: { forza: -1, onore: +1, ricchezza: 0, popolarita: +1, salute: -2, conoscenza: +1 } }, 
        no:  { text: "Nasconditi!", effects: { forza: +1, onore: -1, ricchezza: -1, popolarita: -1, salute: 0, conoscenza: 0 } } 
    },
    // Cutscenes differenziate per ogni scelta
    cutscenes: {
        yes: {
            slides: [
                {
                    image: "https://placehold.co/400x400/DC143C/FFFFFF?text=Battaglia+Inizia",
                    text: "I corni da guerra risuonano! I tuoi taglialegna afferrano asce e scudi improvvisati, trasformandosi da boscaioli in guerrieri."
                },
                {
                    image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Scontro+Feroce",
                    text: "La battaglia infuria per ore. Il clangore delle asce risuona nella valle mentre sangue e sudore si mescolano nel fango."
                },
                {
                    image: "https://placehold.co/400x400/228B22/FFFFFF?text=Vittoria+Costosa",
                    text: "Quando la nebbia si dirada, i vichinghi sono in ritirata. Hai vinto, ma il prezzo della vittoria è scritto nel sangue sulla neve."
                }
            ]
        },
        no: {
            slides: [
                {
                    image: "https://placehold.co/400x400/2F4F4F/FFFFFF?text=Ritirata+Silenziosa",
                    text: "Ordini di nascondere tutto ciò che ha valore e di rifugiarsi nelle grotte della foresta. I vichinghi non troveranno nulla."
                },
                {
                    image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Saccheggio",
                    text: "I vichinghi devastano le case vuote, ma trovano ben poco. Frustrati, incendiano alcuni edifici prima di ripartire."
                },
                {
                    image: "https://placehold.co/400x400/696969/FFFFFF?text=Vergogna",
                    text: "Hai salvato vite e ricchezze, ma il prezzo è l'onore. Alcuni taglialegna ti guardano con disprezzo: 'Un vero capo avrebbe combattuto'."
                }
            ]
        }
    }
}
```

**📝 Analisi dell'Esempio:**
- **Scelta "Combatti":** Mostra una sequenza eroica con crescendo drammatico (preparazione → battaglia → vittoria costosa)
- **Scelta "Nasconditi":** Racconta una strategia di sopravvivenza con conseguenze morali (ritirata → devastazione → vergogna)
- **Differenziazione Emotiva:** Ogni percorso ha un tono e un messaggio completamente diversi
- **Coerenza Narrativa:** Le cutscenes riflettono perfettamente gli effetti sulle metriche

---

## 🎨 Esempi Pratici per Tema

### 🏰 Tema Medievale/Cavalieri

**Cutscene Iniziale Epica:**
```javascript
gildaDeiCavalieri: {
    start: {
        slides: [
            {
                image: "assets/img/alba_castello.jpg",
                text: "L'alba dorata illumina le mura del castello. Oggi diventerai cavaliere."
            },
            {
                image: "assets/img/armatura_indossata.jpg",
                text: "L'armatura scintilla, la spada pesa nella mano. Secoli di tradizione gravano sulle tue spalle."
            },
            {
                image: "assets/img/giuramento_cavaliere.jpg",
                text: "Giuri fedeltà al re, protezione ai deboli, onore sopra ogni cosa. Il tuo destino è segnato."
            }
        ]
    }
}
```

**Cutscene Intermedia Condizionale:**
```javascript
{
    description: "Un cavaliere nemico sfida a duello il tuo migliore amico. Puoi combattere al suo posto o lasciare che affronti il duello da solo.",
    cutscenes: {
        yes: {
            image: "assets/img/duello_al_posto.jpg",
            text: "Ti fai avanti e accetti la sfida al posto del tuo amico. L'onore cavalleresco brilla nei tuoi occhi mentre sguaini la spada."
        },
        no: {
            slides: [
                {
                    image: "assets/img/amico_duello.jpg",
                    text: "Il tuo amico affronta il duello da solo. Le lame si scontrano sotto il sole di mezzogiorno."
                },
                {
                    image: "assets/img/duello_tragico.jpg",
                    text: "Una lama trova il suo bersaglio. Il sangue macchia la terra mentre tu osservi impotente."
                }
            ]
        }
    }
}
```

### 🏴‍☠️ Tema Pirati

**Cutscene Multi-Slide Battaglia Navale:**
```javascript
{
    description: "Una nave della marina reale vi attacca. Puoi tentare la fuga o dare battaglia.",
    cutscenes: {
        yes: {
            slides: [
                {
                    image: "assets/img/battaglia_inizio.jpg",
                    text: "\"All'abbordaggio!\" Le navi si scontrano in un fragore di legno e metallo."
                },
                {
                    image: "assets/img/combattimento_ponte.jpg",
                    text: "La battaglia imperversa sul ponte. Sciabole scintillano, pistole tuonano, sangue macchia il legno."
                },
                {
                    image: "assets/img/vittoria_pirati.jpg",
                    text: "La vittoria è vostra! La nave nemica si arrende mentre la vostra bandiera sventola trionfante."
                }
            ]
        },
        no: {
            image: "assets/img/fuga_nebbia.jpg",
            text: "Sfuggite nella nebbia. Non è codardia, è strategia. Vivere per combattere un altro giorno."
        }
    }
}
```

### 🧙‍♂️ Tema Fantasy/Maghi

**Cutscene Condizionale Magica:**
```javascript
{
    description: "Trovi un grimorio di magia proibita. Studiarlo potrebbe darti immenso potere, ma a quale prezzo?",
    cutscenes: {
        yes: {
            condition: "sanita >= 10",
            high_sanity: {
                image: "assets/img/magia_controllata.jpg",
                text: "La tua mente forte resiste alla corruzione. Assorbi il potere mantenendo il controllo. Sei diventato più potente e più saggio."
            },
            low_sanity: {
                slides: [
                    {
                        image: "assets/img/corruzione_inizia.jpg",
                        text: "Le parole proibite entrano nella tua mente. Senti il potere, ma anche qualcosa di oscuro che si risveglia."
                    },
                    {
                        image: "assets/img/follia_magica.jpg",
                        text: "La follia ti pervade. Potere immenso, ma a che prezzo? Gli specchi riflettono un volto che non riconosci più."
                    }
                ]
            }
        },
        no: {
            image: "assets/img/grimorio_distrutto.jpg",
            text: "Distruggi il grimorio. Le fiamme consumano la conoscenza proibita. Hai scelto la saggezza sopra il potere."
        }
    }
}
```

---

## 💡 Best Practices e Consigli

### 1. Lunghezza del Testo
- **Cutscene Singola**: 50-150 parole
- **Slide Multi-Slide**: 30-80 parole per slide
- **Massimo Slide**: 5 slide per cutscene (3-4 ideale)

### 2. Ritmo Narrativo
- **Buildup**: Costruisci tensione gradualmente
- **Climax**: Il momento più intenso nella slide centrale
- **Risoluzione**: Conseguenze e anticipazioni nella slide finale

### 3. Coerenza Visiva
- **Dimensioni**: 400x400px per tutte le immagini
- **Stile**: Mantieni coerenza artistica nell'ambientazione
- **Peso**: Max 200KB per immagine

### 4. Linguaggio e Tono
- **Coerente**: Rispetta il tono dell'ambientazione
- **Evocativo**: Usa descrizioni che coinvolgono i sensi
- **Consequenziale**: Rifletti le scelte del giocatore

### 5. Quando Usare Ogni Tipo

**Cutscene Singola:**
- Reazioni immediate
- Messaggi semplici
- Transizioni rapide

**Cutscene Multi-Slide:**
- Sequenze epiche
- Conseguenze complesse
- Salti temporali
- Finali di capitolo

**Cutscenes Condizionali:**
- Quando le scelte hanno conseguenze visivamente diverse
- Per personalizzare l'esperienza
- Per premiare/punire scelte specifiche

### 6. Frequenza e Bilanciamento
- **Non Abusare**: Non ogni scenario ha bisogno di una cutscene
- **Momenti Chiave**: Usa cutscenes per momenti narrativi importanti
- **Varietà**: Alterna singole e multi-slide
- **Rilevanza**: Ogni cutscene deve aggiungere valore alla storia

---

## 🐛 Troubleshooting

### Problemi Comuni

**1. Cutscene non appare:**
```javascript
// Verifica la sintassi
cutscene: {  // Non cutscenes:
    image: "path/to/image.jpg",
    text: "Descrizione..."
}
```

**2. Immagini non si caricano:**
- Controlla il percorso del file
- Verifica che il file esista
- Usa sempre forward slash (/) anche su Windows

**3. Testo troppo lungo:**
- Spezza il testo su più slide
- Mantieni massimo 150 parole per slide

**4. Cutscenes condizionali non funzionano:**
```javascript
// Formato corretto
cutscenes: {  // Plurale!
    yes: { ... },
    no: { ... }
}
```

**5. Slide non avanzano:**
- Verifica che tutte le slide abbiano `image` e `text`
- Controlla la sintassi dell'array `slides`

### Codice di Debug

```javascript
// Console del browser (F12)
// Verifica se le cutscenes sono caricate
console.log(cutscenes);

// Forza una cutscene per test
showCutscene({
    image: "test.jpg",
    text: "Test cutscene"
});
```

---

## 🎯 Template Rapidi

### Template Cutscene Iniziale
```javascript
nomeCapitolo: {
    start: {
        slides: [
            {
                image: "assets/img/intro1.jpg",
                text: "Ambientazione e contesto..."
            },
            {
                image: "assets/img/intro2.jpg",
                text: "Presentazione della sfida..."
            },
            {
                image: "assets/img/intro3.jpg",
                text: "Motivazione e obiettivo..."
            }
        ]
    }
}
```

### Template Cutscene Intermedia Condizionale
```javascript
{
    image: "scenario.jpg",
    description: "Descrizione scenario...",
    choices: {
        yes: { text: "Scelta 1", effects: {...} },
        no: { text: "Scelta 2", effects: {...} }
    },
    cutscenes: {
        yes: {
            image: "conseguenza1.jpg",
            text: "Conseguenza scelta 1..."
        },
        no: {
            slides: [
                { image: "step1.jpg", text: "Prima conseguenza..." },
                { image: "step2.jpg", text: "Sviluppo..." },
                { image: "step3.jpg", text: "Risultato finale..." }
            ]
        }
    }
}
```

---

## 🏆 Conclusione

Le cutscenes sono uno strumento potente per creare un'esperienza narrativa coinvolgente. Usale saggiamente per:

- **Enfatizzare momenti importanti**
- **Mostrare conseguenze delle scelte**
- **Creare continuità narrativa**
- **Immergere il giocatore nel mondo di gioco**

Ricorda: una buona cutscene non interrompe il gameplay, lo arricchisce! 🎬✨