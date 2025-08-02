# 🎯 GUIDA STEP-BY-STEP: Gestire le Immagini

## 📋 TIPI DI IMMAGINI NEL GIOCO

- **Immagini scenario** (quadrate, 400x400px)
- **Immagini cutscene** (quadrate, 400x400px)  
- **Immagini finali** (quadrate, 400x400px)
- **Sfondi dinamici** (panoramiche per l'atmosfera)
- **Icone e elementi UI** (piccole, per interfaccia)

---

## 🚀 STEP 1: SPECIFICHE TECNICHE

### **📐 Dimensioni Richieste:**
- **Tutte le immagini del gioco:** 400x400 pixel (perfettamente quadrate)
- **Formato:** JPG o PNG
- **Peso:** Massimo 200KB per immagine
- **Qualità:** Buona risoluzione ma ottimizzata per il web

### **🎨 Aspetto Ratio:**
- **1:1 (quadrato)** = OBBLIGATORIO per tutto
- Il layout del gioco è progettato per immagini quadrate
- Se l'immagine non è quadrata, verrà distorta!

---

## 🚀 STEP 2: ORGANIZZAZIONE DELLE CARTELLE

**1.** Crea questa struttura:
```
assets/
  img/
    scenari/
      capitolo1_scenario1.jpg
      capitolo1_scenario2.jpg
      capitolo2_scenario1.jpg
    cutscene/
      capitolo1_intro.jpg
      capitolo1_epilogo.jpg
      capitolo2_intro.jpg
    finali/
      finale_forza_low.jpg
      finale_forza_high.jpg
      finale_successo.jpg
    sfondi/
      sfondo_menu.jpg
      sfondo_boschi.jpg
      sfondo_citta.jpg
```

**2.** **Convenzioni di naming:**
- **Scenari:** `capitolo_scenario_numero.jpg`
- **Cutscene:** `capitolo_momento.jpg`
- **Finali:** `finale_metrica_tipo.jpg`
- **Sfondi:** `sfondo_tema.jpg`

---

## 🚀 STEP 3: AGGIUNGERE IMMAGINI AGLI SCENARI

**1.** Salva la tua immagine in `assets/img/scenari/`

**2.** Nel file del capitolo, aggiungi il percorso:
```javascript
{
    image: "assets/img/scenari/pirati_tempesta.jpg",
    description: "Una tempesta minaccia la nave...",
    choices: { ... }
}
```

**3.** **IMPORTANTE:** Il percorso deve essere corretto!
- ✅ `"assets/img/scenari/nomefile.jpg"`
- ❌ `"assets\img\scenari\nomefile.jpg"` (slashes sbagliati)
- ❌ `"nomefile.jpg"` (percorso incompleto)

---

## 🚀 STEP 4: USARE PLACEHOLDER TEMPORANEI

### **🛠️ Durante lo sviluppo:**
Puoi usare placeholder automatici mentre cerchi le immagini definitive:

```javascript
// Placeholder colorati con testo
image: "https://placehold.co/400x400/colore1/colore2?text=Testo"

// Esempi pratici:
image: "https://placehold.co/400x400/FF0000/FFFFFF?text=Battaglia"
image: "https://placehold.co/400x400/0000FF/FFFFFF?text=Mare"
image: "https://placehold.co/400x400/008000/FFFFFF?text=Foresta"
```

### **🎨 Colori tematici per placeholder:**
```javascript
// Tema medievale
"https://placehold.co/400x400/8B4513/FFFFFF?text=Castello"  // Marrone
"https://placehold.co/400x400/4B0082/FFFFFF?text=Nobile"    // Viola

// Tema pirati  
"https://placehold.co/400x400/000080/FFFFFF?text=Mare"      // Blu navy
"https://placehold.co/400x400/8B0000/FFFFFF?text=Battaglia" // Rosso scuro

// Tema industriale
"https://placehold.co/400x400/696969/FFFFFF?text=Fabbrica"  // Grigio
"https://placehold.co/400x400/A0522D/FFFFFF?text=Operai"    // Marrone ferro

// Tema spaziale
"https://placehold.co/400x400/000000/FFFFFF?text=Spazio"    // Nero
"https://placehold.co/400x400/4169E1/FFFFFF?text=Pianeta"   // Blu royal
```

---

## 🚀 STEP 5: TROVARE IMMAGINI GRATUITE

### **🖼️ Siti per Immagini Libere:**

**1. Unsplash.com**
- Foto professionali gratuite
- Ottima qualità
- Licenza libera per uso commerciale

**2. Pexels.com**  
- Milioni di foto gratuite
- Facile ricerca per categoria
- Download diretto

**3. Pixabay.com**
- Foto, illustrazioni, vettoriali
- Registrazione gratuita
- Buona varietà

**4. Freepik.com**
- Illustrazioni e grafica
- Versione gratuita con attribuzione
- Ottimo per stile cartoon/fantasy

### **🔍 Parole chiave per cercare:**
```
Tema Medievale:
- "medieval castle"
- "knight armor" 
- "medieval village"
- "royal court"
- "medieval battle"

Tema Pirati:
- "pirate ship"
- "treasure chest"
- "ocean storm"
- "pirate flag"
- "ship battle"

Tema Industriale:
- "factory workers"
- "steam engine"
- "industrial machinery"
- "19th century factory"
- "worker strike"

Tema Spaziale:
- "space station"
- "alien planet"
- "spaceship"
- "cosmic background"
- "futuristic city"
```

---

## 🚀 STEP 6: ADATTARE IMMAGINI AL FORMATO QUADRATO

### **🛠️ Tool per Ritagliare:**

**1. Canva.com (Online, Gratuito)**
- Crea design 400x400px
- Carica la tua immagine
- Ritaglia e centra
- Scarica in JPG

**2. GIMP (Software, Gratuito)**
- Apri immagine
- Strumento → Ritaglia
- Imposta 1:1 (quadrato)
- Esporta come JPG

**3. Photoshop (A pagamento)**
- Crop tool → 1:1 ratio
- Ridimensiona a 400x400px
- Salva per web

### **📱 App Mobile:**
- **Canva** (iOS/Android)
- **VSCO** (iOS/Android) 
- **Snapseed** (iOS/Android)

---

## 🚀 STEP 7: OTTIMIZZARE LE IMMAGINI

### **📉 Ridurre il Peso del File:**

**1. Tool Online:**
- **TinyPNG.com** (Comprime senza perdere qualità)
- **CompressJPEG.com** (Specifico per JPG)
- **Squoosh.app** (Google, molto potente)

**2. Impostazioni di Esportazione:**
```
Formato: JPG (per foto reali)
Formato: PNG (per illustrazioni con trasparenze)
Qualità: 75-85% (bilanciamento qualità/dimensione)
Dimensione: 400x400px esatti
Peso target: < 200KB
```

### **⚡ Perché ottimizzare:**
- Caricamento più veloce del gioco
- Meno consumo di banda
- Miglior esperienza utente

---

## 🚀 STEP 8: STILI VISIVI COERENTI

### **🎨 Mantenere Coerenza:**

**1. Stessa palette colori per capitolo**
```javascript
// Capitolo medievale = toni caldi (marroni, oro, rosso)
// Capitolo pirati = blu e marroni
// Capitolo industriale = grigi e metallici
// Capitolo spaziale = blu scuri e argento
```

**2. Stesso stile artistico**
- Tutte fotorealistiche
- Tutte illustrazioni
- Tutte pixel art
- Mescolare stili = brutto risultato

**3. Stesso mood/atmosfera**
- Cupo e drammatico
- Avventuroso e colorato  
- Realistico e serio
- Fantasy e magico

---

## 🎨 TEMPLATE PER TIPO DI IMMAGINE

### **⚔️ Immagini Scenario:**
```javascript
// Dilemma morale
image: "assets/img/scenari/processo_strega.jpg"

// Situazione di rischio
image: "assets/img/scenari/battaglia_nemici.jpg"

// Decisione strategica  
image: "assets/img/scenari/consiglio_guerra.jpg"

// Gestione risorse
image: "assets/img/scenari/mercato_città.jpg"
```

### **🎬 Immagini Cutscene:**
```javascript
// Introduzione capitolo
image: "assets/img/cutscene/arrivo_castello.jpg"

// Sviluppo narrativo
image: "assets/img/cutscene/complotto_nobili.jpg"

// Epilogo drammatico
image: "assets/img/cutscene/conseguenze_decisione.jpg"
```

### **🏆 Immagini Finali:**
```javascript
// Finali tragici
image: "assets/img/finali/morte_tradimento.jpg"

// Finali ironici  
image: "assets/img/finali/vittoria_pirrica.jpg"

// Finale successo
image: "assets/img/finali/gloria_leggenda.jpg"
```

---

## 🎭 CREARE ATMOSFERA CON LE IMMAGINI

### **🌅 Lighting e Mood:**

**Immagini Tensive:**
- Controluce drammatico
- Ombre profonde
- Colori desaturati

**Immagini Epiche:**
- Luci dorate
- Angolazioni dal basso
- Colori vivaci

**Immagini Misteriose:**
- Nebbia e foschia
- Illuminazione laterale
- Toni freddi (blu, viola)

### **📐 Composizione Efficace:**
- **Regola dei terzi** per posizionare elementi importanti
- **Leading lines** che guidano l'occhio
- **Framing** naturale (archi, finestre, rami)
- **Contrasto** tra primo piano e sfondo

---

## 🔥 TEMPLATE RAPIDO STRUTTURA IMMAGINI

```javascript
// In uno scenario
{
    image: "assets/img/scenari/pirati_tesoro.jpg",
    description: "Trovi una mappa del tesoro...",
    choices: { ... },
    // Cutscene con immagine diversa
    cutscene: {
        image: "assets/img/cutscene/scoperta_tesoro.jpg",
        text: "La mappa ti porta a una grotta nascosta..."
    }
}

// In un finale
endings: {
    tesoro: {
        low: {
            title: "Senza un Soldo",
            message: "Hai perso tutto...",
            image: "assets/img/finali/poverta_assoluta.jpg"
        },
        high: {
            title: "Avaro Senza Cuore", 
            message: "L'oro ti ha corrotto...",
            image: "assets/img/finali/ricchezza_maledetta.jpg"
        }
    }
}
```

---

## 🤖 INTELLIGENZA ARTIFICIALE PER IMMAGINI

### **🎨 AI Art Generators:**

**1. Midjourney** (A pagamento, top qualità)
```
Prompt esempio: "medieval castle courtyard, dramatic lighting, fantasy art style --ar 1:1"
```

**2. DALL-E 2** (OpenAI, a pagamento)
```
Prompt esempio: "A pirate ship in a storm, oil painting style, square format"
```

**3. Stable Diffusion** (Gratuito online)
```
Prompt esempio: "industrial factory interior, workers, 19th century, realistic"
```

**4. Leonardo.ai** (Freemium)
```
Prompt esempio: "spaceship bridge, sci-fi, blue lighting, cinematic"
```

### **💡 Tips per prompt AI:**
- Specifica sempre "square format" o "--ar 1:1"
- Usa termini artistici: "oil painting", "digital art", "photorealistic"
- Aggiungi mood: "dramatic", "mysterious", "epic", "dark"
- Specifica lighting: "golden hour", "candlelight", "neon lights"

---

## ✅ CHECKLIST IMMAGINI

- [ ] Tutte le immagini sono 400x400px (quadrate)?
- [ ] Tutti i file pesano meno di 200KB?
- [ ] Ho organizzato le immagini in cartelle logiche?
- [ ] I percorsi nei file del gioco sono corretti?
- [ ] Lo stile è coerente all'interno di ogni capitolo?
- [ ] Le immagini si adattano al tema del gioco?
- [ ] Ho testato che tutte le immagini si caricano?
- [ ] Ho backup delle immagini originali?

---

## ❓ PROBLEMI COMUNI

**Q: L'immagine non appare nel gioco**
A: Controlla il percorso del file e che il file esista davvero

**Q: L'immagine è distorta**
A: Non è 400x400px esatti, ritaglia in formato quadrato

**Q: Il gioco è lento a caricare**
A: Le immagini sono troppo pesanti, comprimile sotto i 200KB

**Q: Le immagini sono pixelate**
A: Hai compresso troppo, usa qualità 75-85%

**Q: Non trovo immagini adatte al mio tema**
A: Prova ricerche più specifiche o usa AI art generators

**Q: Come faccio le immagini quadrate da foto rettangolari?**
A: Usa Canva o GIMP per ritagliare al centro la parte più interessante

---

## 🎯 STRATEGIA IMMAGINI PER CAPITOLO

### **📋 Pianificazione:**

**1. Lista immagini necessarie:**
- 10-15 scenari = 10-15 immagini
- 2-4 cutscene = 2-4 immagini  
- 8 finali metrica + 1 successo = 9 immagini
- **Totale per capitolo: ~25 immagini**

**2. Ordine di priorità:**
1. **Scenari principali** (il giocatore le vede sicuramente)
2. **Finale successo** (obiettivo del giocatore)
3. **Cutscene importanti** (momenti epici)
4. **Altri finali** (completamento)

**3. Workflow efficiente:**
1. Inizia con placeholder colorati
2. Trova/crea 2-3 immagini chiave per testare l'atmosfera
3. Se funzionano, completa il set
4. Ottimizza tutto insieme alla fine

**SE LE IMMAGINI SONO COINVOLGENTI = 🎉 IL GIOCO È VISIVAMENTE PERFETTO!**