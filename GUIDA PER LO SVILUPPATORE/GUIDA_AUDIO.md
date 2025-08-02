# 🎯 GUIDA STEP-BY-STEP: Audio e Musica

## 📋 COSA PUOI FARE CON L'AUDIO

- **Musica diversa per ogni capitolo** con cambio automatico
- **Transizioni fade** smooth di 2 secondi tra tracce
- **Volume controllabile** dal giocatore con slider visuale
- **Riproduzione automatica** in loop per ogni traccia
- **Salvataggio preferenze** volume nel browser

✅ **NUOVO**: Il sistema ora supporta musica specifica per capitolo con transizioni fade-out/fade-in!

---

## 🚀 STEP 1: STRUTTURA DEL SISTEMA AUDIO ATTUALE

**1.** L'audio è gestito da questi file:
- `audio.js` = Class AudioManager + playlist musicale
- `script.js` = Inizializzazione audio e controlli volume
- `index.html` = Elemento `<audio id="background-music">` nel DOM

**2.** Il sistema supporta:
- **MP3** (consigliato per compatibilità)
- **OGG** (alternativa)
- **WAV** (sconsigliato, file troppo grandi)

**3.** **Funzionamento Attuale**:
- **Musica per capitolo**: Ogni capitolo/menu ha la sua traccia specifica
- **Cambio automatico**: La musica cambia quando entri in un capitolo o torni al menu
- **Transizioni fade**: Cambio musica con fade-out (2s) → cambio traccia → fade-in (2s)
- **Loop infinito**: Ogni traccia si ripete in loop finché non cambi capitolo
- **Controllo volume**: Slider nel menu principale salva le preferenze

---

## 🚀 STEP 2: AGGIUNGERE NUOVA MUSICA (SISTEMA ATTUALE)

**1.** Crea la cartella `assets/audio/` se non esiste

**2.** Metti i tuoi file audio dentro:
```
assets/
  audio/
    track_001.mp3
    track_002.mp3
    track_003.mp3
    ambient_music.mp3
    background_theme.mp3
```

**3.** Apri `audio.js`

**4.** Trova l'oggetto `chapterMusic` e aggiungi/modifica le tracce per capitolo:
```javascript
const chapterMusic = {
    menu: 'assets/audio/menu_theme.mp3',        // ← Musica menu principale
    prologo: 'assets/audio/forest_theme.mp3',   // ← Musica Prologo
    capitolo001: 'assets/audio/city_theme.mp3', // ← Musica Capitolo 1
    capitolo002: 'assets/audio/adventure_theme.mp3' // ← AGGIUNGI QUI
};
```

**5.** Salva il file

**6.** Ricarica la pagina - la musica cambierà automaticamente per ogni capitolo!

---

## 🚀 STEP 3: COME FUNZIONA IL SISTEMA PER CAPITOLI

✅ **NUOVO SISTEMA**: La musica cambia automaticamente in base al capitolo/menu corrente.

**1.** **Mapping Capitolo → Musica**:
```javascript
const chapterMusic = {
    menu: 'assets/audio/menu_theme.mp3',        // ← Menu principale
    prologo: 'assets/audio/forest_theme.mp3',   // ← Prologo
    capitolo001: 'assets/audio/city_theme.mp3', // ← Capitolo 1
    capitolo002: 'assets/audio/adventure_theme.mp3' // ← Capitolo 2
};
```

**2.** **Cambio Automatico**:
- **Entri nel menu**: Suona `menu_theme.mp3` con fade-in
- **Avvii il Prologo**: Fade-out menu → Fade-in `forest_theme.mp3`
- **Passi al Capitolo 1**: Fade-out prologo → Fade-in `city_theme.mp3`
- **Torni al menu**: Fade-out capitolo → Fade-in `menu_theme.mp3`

**3.** **Transizioni Fade**:
- **Durata**: 2 secondi totali (1s fade-out + 1s fade-in)
- **Fluide**: Nessun "salto" o interruzione brusca
- **Automatiche**: Avvengono senza input dal giocatore

---

## 🚀 STEP 4: TROVARE MUSICA GRATUITA

### **🎵 Siti per Musica Libera:**

**1. Freesound.org**
- Registrazione gratuita richiesta
- Migliaia di brani e effetti
- Licenze Creative Commons

**2. OpenGameArt.org**
- Specifico per videogiochi
- Musica e effetti pronti
- Tutto gratuito

**3. Zapsplat.com**
- Registrazione gratuita
- Ottima qualità
- Buona per effetti sonori

**4. YouTube Audio Library**
- Accesso tramite YouTube Studio
- Musica libera da copyright
- Download diretto MP3

### **🔍 Parole Chiave per Cercare:**
- "Medieval music loop"
- "Pirate battle theme"
- "Fantasy adventure music"
- "Industrial ambient"
- "Epic orchestral loop"

---

## 🚀 STEP 5: CREARE ATMOSFERE TEMATICHE

### **🏰 Tema Medievale:**
- **Strumenti:** Liuto, cornamuse, tamburi
- **Mood:** Epico, misterioso, eroico
- **Esempi:** Musica celtica, brani orchestrali fantasy

### **🏴‍☠️ Tema Pirati:**
- **Strumenti:** Fisarmonica, violino, tamburi tribali
- **Mood:** Avventuroso, ritmato, selvaggio
- **Esempi:** Irish folk, musica marittima

### **🏭 Tema Industriale:**
- **Strumenti:** Sintetizzatori, rumori meccanici, percussioni
- **Mood:** Cupo, ritmico, tecnologico
- **Esempi:** Industrial music, ambient dark

### **🌟 Tema Spaziale:**
- **Strumenti:** Sintetizzatori, pad ambientali, effetti
- **Mood:** Misterioso, epico, futuristico
- **Esempi:** Synthwave, ambient space

---

## 🚀 STEP 6: OTTIMIZZARE I FILE AUDIO

### **📏 Dimensioni Consigliate:**
- **Musica di sottofondo:** 2-5 MB max
- **Effetti sonori:** 50-500 KB max
- **Durata musica:** 1-3 minuti (deve essere in loop)

### **🛠️ Tool per Ottimizzare:**

**1. Audacity (Gratuito)**
- Taglia, modifica, esporta
- Rimuovi silenzio all'inizio/fine
- Normalizza volume

**2. Online Audio Converter**
- Converte tra formati
- Riduce dimensioni file
- Facile da usare

### **⚙️ Impostazioni di Esportazione:**
```
Formato: MP3
Bitrate: 128 kbps (qualità/dimensione bilanciata)
Sample Rate: 44.1 kHz
Canali: Stereo (o Mono per effetti)
```

---

## 🚀 STEP 7: CREARE LOOP PERFETTI

**1.** La musica di sottofondo deve ripetersi senza interruzioni

**2.** **Come creare un loop perfetto:**
- Taglia il brano in modo che inizio e fine si colleghino
- Rimuovi silenzi all'inizio e alla fine
- Fai un fade-in di 0.1-0.5 secondi all'inizio
- Fai un fade-out di 0.1-0.5 secondi alla fine

**3.** **Test del loop:**
- Riproduci il file 3-4 volte di seguito
- Non devono esserci "salti" o interruzioni
- Il volume deve essere costante

---

## 🚀 STEP 8: AGGIUNGERE EFFETTI SONORI

**1.** Oltre alla musica di sottofondo, puoi aggiungere suoni per:
- Click sui pulsanti
- Cambio scenario
- Vittoria/Sconfitta
- Transizioni

**2.** Modifica `audio.js`:
```javascript
const audioTracks = {
    // Musiche di sottofondo
    menu: 'assets/audio/menu_theme.mp3',
    gildaDeiBoschi: 'assets/audio/forest_theme.mp3',
    
    // Effetti sonori
    buttonClick: 'assets/audio/click.mp3',
    scenarioChange: 'assets/audio/whoosh.mp3',
    victory: 'assets/audio/victory_fanfare.mp3',
    defeat: 'assets/audio/defeat_horn.mp3'
};
```

**3.** Per usare gli effetti, devi modificare `script.js` (più avanzato)

---

## 🎛️ CONTROLLO VOLUME E QUALITÀ

### **🔊 Il giocatore può:**
- Regolare il volume con lo slider
- Mutare completamente l'audio
- Il volume viene salvato automaticamente

### **🎵 Linee guida per il Volume:**
- **Musica di sottofondo:** Mai troppo forte, deve stare "dietro"
- **Effetti sonori:** Più prominenti ma brevi
- **Normalizza tutto:** Stesso livello di volume per tutti i file

---

## 📁 TEMPLATE STRUTTURA AUDIO

```
giocoReigns/
├── assets/
│   └── audio/
│       ├── menu_theme.mp3          (Musica menu principale)
│       ├── gilda_boschi.mp3        (Musica Capitolo 1)
│       ├── gilda_maniscalchi.mp3   (Musica Capitolo 2)
│       ├── gilda_pirati.mp3        (Musica Capitolo 3)
│       ├── victory_fanfare.mp3     (Suono vittoria)
│       ├── defeat_horn.mp3         (Suono sconfitta)
│       ├── button_click.mp3        (Click pulsanti)
│       └── transition.mp3          (Transizioni)
├── audio.js                        (Configurazione audio)
└── script.js                       (Logica audio)
```

---

## 🔥 TEMPLATE VELOCE AUDIO.JS (SISTEMA ATTUALE)

```javascript
// ===================================================================================
// --- FILE GESTIONE AUDIO ---
// Gestisce la playlist musicale e la riproduzione.
// ===================================================================================

class AudioManager {
    constructor(playlist, audioPlayer) {
        this.playlist = playlist;
        this.audioPlayer = audioPlayer;
        this.currentTrackIndex = 0;
        this.isPlaying = false;

        // Bind 'this' to the event listener function
        this.handleTrackEnd = this.handleTrackEnd.bind(this);
        this.audioPlayer.addEventListener('ended', this.handleTrackEnd);
    }

    handleTrackEnd() {
        // When a track finishes, play the next one
        this.nextTrack();
    }

    play() {
        if (this.playlist.length === 0) {
            console.error("Playlist is empty.");
            return;
        }
        this.audioPlayer.src = this.playlist[this.currentTrackIndex];
        this.audioPlayer.play().catch(e => console.error("Audio playback failed:", e));
        this.isPlaying = true;
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.play();
    }

    setVolume(volume) {
        this.audioPlayer.volume = volume;
        if (volume > 0 && !this.isPlaying) {
            this.play();
        } else if (volume === 0) {
            this.pause();
        }
    }
}

// --- CONFIGURAZIONE PLAYLIST ---
// AGGIUNGI I TUOI FILE AUDIO QUI:
const musicPlaylist = [
    'assets/audio/audio_001.mp3',
    'assets/audio/audio_002.mp3',
    // 'assets/audio/tuofile.mp3',  // ← AGGIUNGI QUI
];
```

---

## 🚀 STEP AVANZATO: PERSONALIZZAZIONE TRANSIZIONI

Se vuoi modificare la durata delle transizioni fade o altri parametri:

### **1. Modifica la durata fade**:
```javascript
// In audio.js, nella classe AudioManager:
class AudioManager {
    constructor(chapterMusic, audioPlayer) {
        // ...
        this.fadeDuration = 3000; // ← Cambia qui (in millisecondi)
        this.fadeSteps = 50;       // ← Più step = transizione più smooth
        // ...
    }
}
```

### **2. Aggiungi nuovi capitoli**:
```javascript
// Basta aggiungere la riga in chapterMusic:
const chapterMusic = {
    menu: 'assets/audio/menu_theme.mp3',
    prologo: 'assets/audio/forest_theme.mp3',
    capitolo001: 'assets/audio/city_theme.mp3',
    capitolo002: 'assets/audio/adventure_theme.mp3',
    capitolo003: 'assets/audio/epic_finale.mp3' // ← NUOVO
};
```

---

## 🎨 IDEE CREATIVE PER L'AUDIO

### **🎭 Musica Adattiva:**
- Musica più tensa quando le metriche sono pericolose
- Musica più epica quando il giocatore sta vincendo
- Musica più cupa quando le cose vanno male

### **🔊 Effetti Immersivi:**
- Suono di onde per tema pirati
- Suono di fucine per tema industriale
- Suono di vento per tema fantasy

### **🎵 Variazioni Tematiche:**
- Stessa melodia, arrangiamenti diversi per ogni capitolo
- Tema principale che evolve durante il gioco
- Motivi musicali che si richiamano tra capitoli

---

## ✅ CHECKLIST AUDIO (SISTEMA PER CAPITOLI)

- [ ] Ho creato la cartella `assets/audio/`?
- [ ] Ho file audio in formato MP3?
- [ ] I file audio sono ottimizzati (< 5MB)?
- [ ] Ho aggiunto le tracce all'oggetto `chapterMusic` in `audio.js`?
- [ ] Ogni capitolo ha la sua musica specifica?
- [ ] Ho testato il cambio musica tra menu e capitoli?
- [ ] I file audio hanno una durata ragionevole (2-5 minuti)?
- [ ] Il volume è bilanciato tra tutti i file?
- [ ] Le transizioni fade sono smooth (2 secondi)?
- [ ] Ho verificato che il controllo volume funzioni?
- [ ] La musica va in loop correttamente per ogni capitolo?

---

## ❓ PROBLEMI COMUNI (SISTEMA ATTUALE)

**Q: La musica non parte**
A: Verifica che il volume sia > 0 e che i percorsi dei file siano corretti

**Q: La musica non passa al brano successivo**
A: Controlla che i file audio abbiano una durata definita (non stream infiniti)

**Q: Il file è troppo grande**
A: Riduci il bitrate a 128 kbps o taglia la durata del brano

**Q: C'è un silenzio tra un brano e l'altro**
A: Rimuovi i silenzi all'inizio e fine dei file audio

**Q: La musica è troppo forte/debole**
A: Normalizza tutti i file audio allo stesso livello

**Q: Il browser non supporta il formato**
A: Usa MP3, è supportato ovunque

**Q: La transizione fade è troppo veloce/lenta**
A: Modifica `this.fadeDuration` in audio.js (valore in millisecondi)

**Q: La musica non cambia quando cambio capitolo**
A: Verifica che il nome capitolo in `chapterMusic` corrisponda esattamente al chapterId

---

## 🎼 RISORSE AGGIUNTIVE

### **Software di Editing Audio:**
- **Audacity** (Gratuito)
- **Reaper** (A pagamento, ma ottimo)
- **FL Studio** (Per creare musica originale)

### **Converter Online:**
- **Online Audio Converter**
- **Convertio**
- **CloudConvert**

### **AI per Generare Musica:**
- **AIVA** (Compone musica AI)
- **Amper Music** (Musica AI per giochi)
- **Soundraw** (Musica royalty-free AI)

**SE L'AUDIO È COINVOLGENTE = 🎉 IL GIOCO È MOLTO PIÙ IMMERSIVO!**