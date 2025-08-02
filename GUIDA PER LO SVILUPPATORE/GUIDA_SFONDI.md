# 🎯 GUIDA STEP-BY-STEP: Sfondi Dinamici

## 📋 COSA SONO GLI SFONDI DINAMICI

- **Immagini panoramiche** che appaiono dietro al gioco
- **Cambiano automaticamente** in base alla schermata
- **Creano atmosfera** senza interferire con il gameplay
- **Si adattano** a tutti i dispositivi e risoluzioni

---

## 🚀 STEP 1: COME FUNZIONA IL SISTEMA SFONDI

**1.** Gli sfondi sono gestiti da `backgrounds.js`

**2.** Ogni schermata ha il suo sfondo:
- **Menu principale** = sfondo menu
- **Gameplay** = sfondo del capitolo attuale
- **Hall of Fame** = sfondo speciale
- **Manuale** = sfondo neutro

**3.** **Gli sfondi cambiano automaticamente** quando cambi schermata!

---

## 🚀 STEP 2: STRUTTURA DEL FILE BACKGROUNDS.JS

**1.** Apri `backgrounds.js`

**2.** Troverai qualcosa del tipo:
```javascript
const backgrounds = {
    default: '#2d2424',           // Colore di fallback
    mainMenu: 'url_sfondo_menu',  // Sfondo menu principale
    game: 'url_sfondo_gioco',     // Sfondo durante il gameplay
    manual: 'url_sfondo_manuale', // Sfondo pagine informative
    hallOfFame: 'url_sfondo_hof'  // Sfondo hall of fame
};
```

**3.** Puoi usare:
- **URL di immagini** online
- **Percorsi locali** (assets/img/sfondi/)
- **Colori CSS** come fallback

---

## 🚀 STEP 3: AGGIUNGERE NUOVI SFONDI

**1.** Salva le tue immagini in `assets/img/sfondi/`

**2.** Modifica `backgrounds.js`:
```javascript
const backgrounds = {
    default: '#2d2424',
    mainMenu: 'assets/img/sfondi/menu_medievale.jpg',
    game: 'assets/img/sfondi/gameplay_foresta.jpg',
    manual: 'assets/img/sfondi/pergamena_antica.jpg',
    hallOfFame: 'assets/img/sfondi/tempio_gloria.jpg'
};
```

**3.** Salva il file

**4.** Ricarica il gioco per vedere i cambiamenti!

---

## 🚀 STEP 4: SFONDI SPECIFICI PER CAPITOLO

**1.** Puoi avere sfondi diversi per ogni capitolo!

**2.** Modifica `backgrounds.js`:
```javascript
const backgrounds = {
    default: '#2d2424',
    mainMenu: 'assets/img/sfondi/menu_epic.jpg',
    
    // Sfondi per capitolo
    gildaDeiBoschi: 'assets/img/sfondi/foresta_profonda.jpg',
    gildaDeiManiscalchi: 'assets/img/sfondi/fucine_ardenti.jpg', 
    gildaDeiPirati: 'assets/img/sfondi/mare_tempestoso.jpg',
    
    // Sfondi per schermate speciali
    manual: 'assets/img/sfondi/biblioteca_antica.jpg',
    hallOfFame: 'assets/img/sfondi/hall_trofei.jpg'
};
```

**3.** Il gioco userà automaticamente lo sfondo del capitolo quando giochi!

---

## 🚀 STEP 5: SPECIFICHE TECNICHE SFONDI

### **📐 Dimensioni Consigliate:**
- **Larghezza minima:** 1920px (Full HD)
- **Altezza minima:** 1080px (Full HD)
- **Formato:** JPG per file più leggeri
- **Peso:** Massimo 500KB per sfondo

### **🎨 Aspetto Ratio:**
- **16:9** = Standard (1920x1080, 1366x768, ecc.)
- **16:10** = Alternativa (1920x1200)
- **Panoramico** = Meglio se più largo che alto

### **🖼️ Tipo di Immagine:**
- **Paesaggi** funzionano benissimo
- **Architetture** come castelli, città
- **Texture** come pergamene, metallo
- **Ambientazioni** coerenti con il tema

---

## 🚀 STEP 6: TROVARE SFONDI ADATTI

### **🔍 Parole Chiave per Cercare:**

**Tema Medievale:**
```
- "medieval castle landscape"
- "fantasy forest background"
- "ancient parchment texture"
- "medieval village panorama"
- "royal hall background"
```

**Tema Pirati:**
```
- "pirate ship ocean background"
- "caribbean sea sunset"
- "treasure island landscape" 
- "naval battle background"
- "pirate tavern interior"
```

**Tema Industriale:**
```
- "industrial factory background"
- "steampunk machinery"
- "19th century workshop"
- "coal mine interior"
- "industrial revolution cityscape"
```

**Tema Spaziale:**
```
- "space station interior"
- "alien planet landscape"
- "nebula space background"
- "futuristic city skyline"
- "spaceship bridge background"
```

### **🌐 Siti Consigliati:**
- **Unsplash.com** - Foto professionali gratuite
- **Pexels.com** - Ottima selezione di paesaggi
- **Wallpaper Sites** - Già ottimizzati per sfondi
- **AI Generators** - Per sfondi custom

---

## 🚀 STEP 7: OTTIMIZZARE GLI SFONDI

### **📉 Ridurre il Peso:**

**1. Compressione Online:**
- **TinyPNG.com** (mantiene buona qualità)
- **CompressJPEG.com** (specifico per JPG)
- **Squoosh.app** (tool Google potente)

**2. Impostazioni Ideali:**
```
Formato: JPG
Qualità: 70-80%
Dimensione: 1920x1080px
Peso target: < 500KB
```

### **🎨 Regolare Contrasto e Luminosità:**
- **Sfondi più scuri** = testo più leggibile
- **Basso contrasto** = non distrae dal gameplay
- **Effetto overlay scuro** = sempre una buona idea

---

## 🚀 STEP 8: EFFETTI E OVERLAY

### **🌫️ Overlay Scuro Automatico:**
Il gioco ha già un overlay scuro del 80% sopra lo sfondo:
```css
/* In style.css, già presente */
.fixed.inset-0.bg-black/80
```

### **🎨 Personalizzare l'Overlay:**
Se vuoi cambiare l'intensità, modifica `style.css`:
```css
/* Overlay più leggero (60%) */
.bg-black/60

/* Overlay più scuro (90%) */
.bg-black/90

/* Overlay colorato */
.bg-red-900/70
.bg-blue-900/70
```

---

## 🎭 CREARE ATMOSFERA CON GLI SFONDI

### **🏰 Sfondi Medievali Efficaci:**
- **Castelli** con luci calde dalle finestre
- **Foreste** misteriose con raggi di sole
- **Sale del trono** maestose ma cupe
- **Pergamene** antiche con macchie d'inchiostro

### **🏴‍☠️ Sfondi Pirati Efficaci:**
- **Mari tempestosi** con fulmini
- **Tramonti** dorati sull'oceano
- **Porti** notturni con lanterne
- **Grotte** del tesoro con riflessi dorati

### **🏭 Sfondi Industriali Efficaci:**
- **Fabbriche** fumanti al tramonto
- **Macchine a vapore** con bagliori metallici
- **Miniere** con luci di lanterne
- **Città** industriali nella nebbia

### **🌟 Sfondi Spaziali Efficaci:**
- **Nebulose** colorate con stelle
- **Pianeti** alieni all'orizzonte
- **Stazioni spaziali** illuminate
- **Cockpit** di navi spaziali

---

## 🔥 TEMPLATE RAPIDO BACKGROUNDS.JS

```javascript
// ===================================================================================
// --- SFONDI DINAMICI DEL GIOCO ---
// ===================================================================================

const backgrounds = {
    // Sfondo di fallback (colore CSS)
    default: '#1a1a1a',
    
    // MENU PRINCIPALE
    mainMenu: 'assets/img/sfondi/menu_epico.jpg',
    
    // GAMEPLAY - Sfondi per capitolo
    gildaDeiBoschi: 'assets/img/sfondi/foresta_magica.jpg',
    gildaDeiManiscalchi: 'assets/img/sfondi/fucine_ferro.jpg',
    gildaDeiPirati: 'assets/img/sfondi/oceano_infinito.jpg',
    gildaDeiNavigatori: 'assets/img/sfondi/terre_ignote.jpg',
    
    // SCHERMATE SPECIALI
    manual: 'assets/img/sfondi/biblioteca_antica.jpg',
    hallOfFame: 'assets/img/sfondi/tempio_gloria.jpg',
    
    // FALLBACK per gameplay generico
    game: 'assets/img/sfondi/sfondo_neutro.jpg'
};
```

---

## 🌈 PLACEHOLDER TEMPORANEI

### **🎨 Gradienti CSS come placeholder:**
```javascript
const backgrounds = {
    default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    mainMenu: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gildaDeiBoschi: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gildaDeiPirati: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};
```

### **🖼️ Placeholder con pattern:**
```javascript
// Url di servizi che generano pattern
'https://www.transparenttextures.com/patterns/asfalt-light.png'
'https://www.transparenttextures.com/patterns/brick-wall.png'  
'https://www.transparenttextures.com/patterns/wood-pattern.png'
```

---

## 🚀 SFONDI ADATTIVI E RESPONSIVI

### **📱 Il sistema è già responsivo:**
- Gli sfondi si adattano automaticamente a tutte le risoluzioni
- Funzionano su desktop, tablet e mobile
- Si ridimensionano mantenendo le proporzioni

### **🎯 Best Practices:**
- **Elementi importanti al centro** (visibili su tutti i dispositivi)
- **Dettagli sui bordi** (potrebbero essere tagliati su mobile)
- **Contrasto sufficiente** (il testo deve rimanere leggibile)

---

## 🤖 CREARE SFONDI CON AI

### **🎨 Prompt per AI Art:**

**Midjourney/DALL-E:**
```
"Medieval castle interior, throne room, dramatic lighting, wide angle, cinematic background --ar 16:9"

"Pirate ship deck during storm, dark clouds, lightning, atmospheric background --ar 16:9"

"Industrial factory interior, steam machines, Victorian era, moody lighting --ar 16:9"

"Space station corridor, sci-fi, blue lighting, futuristic background --ar 16:9"
```

**Tips per sfondi AI:**
- Usa sempre `--ar 16:9` per aspetto ratio corretto
- Specifica "background", "wide angle", "atmospheric"
- Evita elementi troppo dettagliati al centro
- Preferisci ambientazioni a personaggi

---

## ✅ CHECKLIST SFONDI

- [ ] Ho creato la cartella `assets/img/sfondi/`?
- [ ] Tutti gli sfondi sono almeno 1920x1080px?
- [ ] I file pesano meno di 500KB ciascuno?
- [ ] Ho aggiornato `backgrounds.js` con i nuovi percorsi?
- [ ] Gli sfondi sono coerenti con il tema di ogni capitolo?
- [ ] Ho testato che si caricano su tutte le schermate?
- [ ] Il contrasto permette di leggere il testo?
- [ ] Ho un colore di fallback per ogni sfondo?

---

## 🎨 ESEMPI DI COMBINAZIONI EFFICACI

### **🏰 Set Medievale Completo:**
```javascript
const backgrounds = {
    default: '#2c1810',
    mainMenu: 'assets/img/sfondi/castello_tramonto.jpg',      // Maestoso
    gildaDeiBoschi: 'assets/img/sfondi/foresta_nebbiosa.jpg', // Misterioso
    manual: 'assets/img/sfondi/pergamena_antica.jpg',         // Informativo
    hallOfFame: 'assets/img/sfondi/sala_trofei.jpg'          // Celebrativo
};
```

### **🏴‍☠️ Set Pirati Completo:**
```javascript
const backgrounds = {
    default: '#1a2332',
    mainMenu: 'assets/img/sfondi/porto_notturno.jpg',         // Avventuroso
    gildaDeiPirati: 'assets/img/sfondi/mare_tempesta.jpg',    // Dinamico
    manual: 'assets/img/sfondi/mappa_tesoro.jpg',             // Tematico
    hallOfFame: 'assets/img/sfondi/grotta_tesoro.jpg'        // Leggendario
};
```

---

## ❓ PROBLEMI COMUNI

**Q: Lo sfondo non appare**
A: Controlla il percorso del file in `backgrounds.js` e che il file esista

**Q: Lo sfondo è distorto su mobile**
A: Assicurati che sia almeno 1920x1080px e in formato 16:9

**Q: Il gioco carica lentamente**
A: Gli sfondi sono troppo pesanti, comprimili sotto i 500KB

**Q: Non vedo il testo sopra lo sfondo**
A: Aumenta l'overlay scuro o scegli sfondi con meno contrasto

**Q: Lo sfondo non cambia tra capitoli**
A: Verifica che il nome in `backgrounds.js` sia uguale al nome del capitolo

**Q: Voglio uno sfondo diverso per ogni scenario**
A: Non è supportato nativamente, ma puoi modificare `script.js` (avanzato)

---

## 🎨 TRUCCHI PER SFONDI PROFESSIONALI

### **🖼️ Layering Tecnico:**
1. **Sfondo base** (paesaggio/architettura)
2. **Overlay scuro** (per leggibilità)
3. **Interfaccia gioco** (sempre in primo piano)

### **🎭 Mood Progression:**
- **Inizio capitolo:** Sfondi più luminosi e speranzosi
- **Durante gameplay:** Sfondi neutri che non distraggono  
- **Finali drammatici:** Sfondi più scuri e intensi

### **🔄 Variazioni Stagionali:**
```javascript
// Puoi cambiare sfondi per eventi speciali
if (isChristmas) {
    backgrounds.mainMenu = 'assets/img/sfondi/menu_natale.jpg';
}
```

**SE GLI SFONDI SONO EVOCATIVI = 🎉 IL GIOCO È CINEMATOGRAFICO!**