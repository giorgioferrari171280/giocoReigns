# 🎯 GUIDA STEP-BY-STEP: Creare Scenari Coinvolgenti

> ⚠️ **NOTA**: Questa guida usa ancora esempi con 4 metriche, ma ora il gioco usa **6 metriche**. I principi rimangono uguali, adatta gli esempi!

## 📋 COSA SONO GLI SCENARI

Gli scenari sono le situazioni che il giocatore affronta:
- Una immagine
- Una descrizione del problema
- Due scelte (SÌ/NO)
- Effetti sulle **6 metriche** (invece di 4)
- Opzionale: cutscene dopo la scelta

---

## 🚀 STEP 1: STRUTTURA BASE DI UNO SCENARIO

**1.** Ogni scenario ha questo formato:
```javascript
{
    image: "url_immagine.jpg",
    description: "Descrizione della situazione...",
    choices: {
        yes: { 
            text: "Testo pulsante SÌ", 
            effects: { metrica1: +1, metrica2: -1, metrica3: 0, metrica4: +2 } 
        },
        no: { 
            text: "Testo pulsante NO", 
            effects: { metrica1: -1, metrica2: +1, metrica3: +1, metrica4: -1 } 
        }
    }
}
```

**2.** **IMPORTANTE:** Metti sempre una **virgola** dopo ogni scenario (tranne l'ultimo)!

---

## 🚀 STEP 2: AGGIUNGERE SCENARI AL TUO CAPITOLO

**1.** Apri il file del tuo capitolo (es: `gilda_pirati.js`)

**2.** Trova la sezione `scenarios: [`

**3.** Aggiungi i tuoi scenari:
```javascript
scenarios: [
    {
        image: "https://placehold.co/400x400/1e40af/ffffff?text=Tempesta",
        description: "Una violenta tempesta minaccia di distruggere la nave. L'equipaggio ti guarda con paura negli occhi.",
        choices: {
            yes: { 
                text: "Affronta la tempesta a viso aperto", 
                effects: { navigazione: +2, tesoro: 0, equipaggio: +1, reputazione: +1 } 
            },
            no: { 
                text: "Cerca riparo in una baia sicura", 
                effects: { navigazione: -1, tesoro: 0, equipaggio: -1, reputazione: -1 } 
            }
        }
    },  // ← VIRGOLA IMPORTANTE!
    
    {
        image: "https://placehold.co/400x400/dc2626/ffffff?text=Galeone",
        description: "Un galeone carico d'oro naviga indisturbato. È una preda facile, ma porta la bandiera reale.",
        choices: {
            yes: { 
                text: "Attacca il galeone reale", 
                effects: { navigazione: 0, tesoro: +3, equipaggio: +1, reputazione: -2 } 
            },
            no: { 
                text: "Rispetta la bandiera reale", 
                effects: { navigazione: +1, tesoro: -1, equipaggio: -1, reputazione: +2 } 
            }
        }
    }  // ← ULTIMO SCENARIO = NIENTE VIRGOLA
],
```

**4.** Salva il file

---

## 🚀 STEP 3: TIPI DI SCENARI EFFICACI

### **🔥 Dilemma Morale**
Il giocatore deve scegliere tra giusto e conveniente:

```javascript
{
    image: "https://placehold.co/400x400/8B4513/ffffff?text=Prigioniero",
    description: "Hai catturato un nemico che conosce la posizione di un tesoro leggendario. Ti supplica di risparmiarlo.",
    choices: {
        yes: { 
            text: "Risparmialo e lascialo libero", 
            effects: { navigazione: 0, tesoro: -2, equipaggio: -1, reputazione: +2 } 
        },
        no: { 
            text: "Torturalo per il tesoro", 
            effects: { navigazione: 0, tesoro: +2, equipaggio: +1, reputazione: -2 } 
        }
    }
}
```

### **⚔️ Situazione Rischiosa**
Alta ricompensa vs alto rischio:

```javascript
{
    image: "https://placehold.co/400x400/FF4500/ffffff?text=Kraken",
    description: "Le acque sono infestate da un kraken leggendario, ma al centro del suo territorio giace un'isola del tesoro.",
    choices: {
        yes: { 
            text: "Sfida il mostro marino", 
            effects: { navigazione: -2, tesoro: +3, equipaggio: -2, reputazione: +2 } 
        },
        no: { 
            text: "Gira al largo per sicurezza", 
            effects: { navigazione: +1, tesoro: -1, equipaggio: +2, reputazione: -1 } 
        }
    }
}
```

### **🤝 Decisione Strategica**
Il giocatore deve scegliere alleati o nemici:

```javascript
{
    image: "https://placehold.co/400x400/4B0082/ffffff?text=Flotta",
    description: "Un'altra flotta pirata ti propone un'alleanza per dividere i mari. Ma puoi fidarti di loro?",
    choices: {
        yes: { 
            text: "Accetta l'alleanza", 
            effects: { navigazione: +1, tesoro: +1, equipaggio: 0, reputazione: -1 } 
        },
        no: { 
            text: "Rifiuta e mantieni l'indipendenza", 
            effects: { navigazione: -1, tesoro: -1, equipaggio: +1, reputazione: +1 } 
        }
    }
}
```

### **💰 Gestione Risorse**
Il giocatore deve gestire quello che ha:

```javascript
{
    image: "https://placehold.co/400x400/DAA520/000000?text=Taverna",
    description: "In porto, l'equipaggio vuole spendere tutto il bottino in rum e donne. Cosa decidi?",
    choices: {
        yes: { 
            text: "Lascia che si divertano", 
            effects: { navigazione: 0, tesoro: -2, equipaggio: +3, reputazione: 0 } 
        },
        no: { 
            text: "Risparmia il bottino", 
            effects: { navigazione: 0, tesoro: +1, equipaggio: -2, reputazione: +1 } 
        }
    }
}
```

---

## 🚀 STEP 4: SCRIVERE DESCRIZIONI COINVOLGENTI

### **✅ Buone Descrizioni:**
- **Brevi** (1-3 frasi max)
- **Specifiche** (dettagli concreti)
- **Emotivamente coinvolgenti**
- **Fanno capire la posta in gioco**

**Esempio buono:**
```
"Le sirene cantano nella nebbia. Il loro canto ipnotico attira la nave verso gli scogli, ma l'equipaggio sembra incantato."
```

### **❌ Cattive Descrizioni:**
- Troppo lunghe
- Troppo vaghe
- Noiose
- Senza conseguenze chiare

**Esempio cattivo:**
```
"C'è una situazione. Devi decidere cosa fare. È importante che tu scelga bene perché potrebbe cambiare molte cose nel futuro."
```

### **🎯 Formula per Buone Descrizioni:**
1. **Situazione** (cosa sta succedendo)
2. **Tensione** (perché è importante)
3. **Conseguenze implicite** (cosa potrebbe succedere)

**Formula applicata:**
```
"[SITUAZIONE] Le guardie del porto hanno scoperto il tuo carico di contrabbando. 
[TENSIONE] Ti fissano con sospetto mentre la tua mano si avvicina alla spada. 
[CONSEGUENZE] Una mossa sbagliata e sarà guerra."
```

---

## 🚀 STEP 5: CREARE SCELTE INTERESSANTI

### **✅ Buone Scelte:**
- **Nessuna ovviamente migliore**
- **Entrambe hanno senso**
- **Riflettono personalità diverse**
- **Hanno conseguenze logiche**

**Esempio buono:**
```javascript
choices: {
    yes: { 
        text: "Paga il riscatto per salvare gli ostaggi",    // Scelta morale
        effects: { navigazione: 0, tesoro: -3, equipaggio: +1, reputazione: +2 } 
    },
    no: { 
        text: "Attacca e riprendi gli ostaggi con la forza", // Scelta aggressiva
        effects: { navigazione: +1, tesoro: 0, equipaggio: +2, reputazione: -2 } 
    }
}
```

### **❌ Cattive Scelte:**
- Una chiaramente migliore dell'altra
- Non hanno senso
- Troppo simili
- Conseguenze illogiche

**Esempio cattivo:**
```javascript
choices: {
    yes: { text: "Fai la cosa giusta", effects: { tutto: +2 } },  // Troppo buona
    no: { text: "Fai la cosa sbagliata", effects: { tutto: -2 } } // Troppo cattiva
}
```

---

## 🚀 STEP 6: AGGIUNGERE CUTSCENE AGLI SCENARI

**1.** Puoi aggiungere cutscene che appaiono dopo la scelta:

```javascript
{
    image: "scenario.jpg",
    description: "Descrizione...",
    choices: {
        yes: { text: "Sì", effects: { ... } },
        no: { text: "No", effects: { ... } }
    },
    // Cutscene che appare DOPO la scelta
    cutscene: {
        image: "https://placehold.co/400x400/FF0000/ffffff?text=Conseguenze",
        text: "La tua decisione ha conseguenze immediate che non avevi previsto..."
    }
}
```

**2.** Per cutscene multi-slide:

```javascript
cutscene: {
    slides: [
        {
            image: "conseguenza1.jpg",
            text: "Prima conseguenza..."
        },
        {
            image: "conseguenza2.jpg", 
            text: "Seconda conseguenza..."
        }
    ]
}
```

---

## 📚 TEMPLATE PER SCENARI TEMATICI

### 🏰 **Tema Medievale:**

```javascript
{
    image: "https://placehold.co/400x400/8B4513/ffffff?text=Processo",
    description: "Un contadino è accusato di stregoneria. Le prove sono deboli, ma il popolo chiede giustizia.",
    choices: {
        yes: { 
            text: "Condannalo al rogo", 
            effects: { forza: +1, onore: -2, ricchezza: 0, popolarita: +1 } 
        },
        no: { 
            text: "Dichiaralo innocente", 
            effects: { forza: -1, onore: +2, ricchezza: 0, popolarita: -1 } 
        }
    }
}
```

### 🏭 **Tema Industriale:**

```javascript
{
    image: "https://placehold.co/400x400/696969/ffffff?text=Sciopero",
    description: "Gli operai scioperano per migliori condizioni di lavoro. La produzione è ferma.",
    choices: {
        yes: { 
            text: "Accetta le loro richieste", 
            effects: { produzione: -1, innovazione: 0, operai: +3, profitti: -2 } 
        },
        no: { 
            text: "Assumi nuovi operai", 
            effects: { produzione: +1, innovazione: 0, operai: -3, profitti: +1 } 
        }
    }
}
```

### 🌟 **Tema Spaziale:**

```javascript
{
    image: "https://placehold.co/400x400/000080/ffffff?text=Alieni",
    description: "Una specie aliena richiede tributi in cambio di tecnologie avanzate.",
    choices: {
        yes: { 
            text: "Accetta il commercio", 
            effects: { tecnologia: +2, risorse: -2, diplomazia: +1, esplorazione: 0 } 
        },
        no: { 
            text: "Rifiuta con orgoglio", 
            effects: { tecnologia: 0, risorse: +1, diplomazia: -2, esplorazione: +1 } 
        }
    }
}
```

---

## 🎯 FORMULE PER SCENARI VINCENTI

### **Formula "Tentazione":**
```
Situazione + Ricompensa facile + Prezzo nascosto
```

**Esempio:**
"Un mercante ti offre mappe segrete in cambio di protezione. Sembra un affare vantaggioso, ma ha l'aria di chi nasconde qualcosa."

### **Formula "Dilemma del Tempo":**
```
Urgenza + Due soluzioni + Conseguenze opposte
```

**Esempio:**
"La nave sta affondando! Puoi salvare l'equipaggio o il tesoro, ma non entrambi."

### **Formula "Scelta del Leader":**
```
Conflitto tra seguaci + Due filosofie + Tu devi scegliere
```

**Esempio:**
"Il primo ufficiale vuole attaccare subito, il timoniere consiglia prudenza. L'equipaggio aspetta la tua decisione."

---

## ✅ CHECKLIST SCENARI

- [ ] Ho almeno 10 scenari per capitolo?
- [ ] Ogni scenario ha immagine, descrizione e 2 scelte?
- [ ] Le descrizioni sono brevi e coinvolgenti?
- [ ] Nessuna scelta è ovviamente migliore?
- [ ] Gli effetti sono bilanciati?
- [ ] I testi dei pulsanti sono chiari?
- [ ] Ho messo le virgole dopo ogni scenario (tranne l'ultimo)?
- [ ] Ho testato tutti gli scenari?

---

## ❓ PROBLEMI COMUNI

**Q: Lo scenario non appare**
A: Controlla virgole e parentesi graffe nel codice

**Q: Le scelte non hanno senso**
A: Rileggi la descrizione e verifica che le scelte siano logiche

**Q: Il gioco finisce sempre uguale**
A: Varia di più gli effetti delle scelte

**Q: Gli scenari sono noiosi**
A: Aggiungi più tensione e conseguenze emotive

**Q: Non so cosa scrivere**
A: Usa i template tematici e le formule qui sopra!

---

## 🔥 IDEE RAPIDE PER SCENARI

### **Situazioni Universali:**
- Tradimento di un alleato
- Scelta tra sicurezza e opportunità
- Conflitto tra giustizia e pietà
- Gestione di risorse scarse
- Decisioni sotto pressione temporale
- Confronto con figure autoritarie
- Scoperta di segreti pericolosi
- Gestione di subordinati ribelli

### **Twist Narrativi:**
- Le conseguenze appaiono solo dopo
- La scelta "giusta" ha effetti negativi
- Il nemico diventa alleato
- La vittoria ha un prezzo alto
- Il passato ritorna a perseguitarti

**SE I TUOI SCENARI SONO COINVOLGENTI = 🎉 IL GIOCO È DIVERTENTE!**