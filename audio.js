// ===================================================================================
// --- FILE GESTIONE AUDIO ---
// Gestisce la musica per capitoli con transizioni fade.
// ===================================================================================

class AudioManager {
    constructor(chapterMusic, audioPlayer) {
        this.chapterMusic = chapterMusic;
        this.audioPlayer = audioPlayer;
        this.currentChapter = null;
        this.targetVolume = 0;
        this.fadeDuration = 2000; // 2 secondi di fade
        this.fadeSteps = 50; // Numero di step per il fade
        this.isPlaying = false;
        this.isFading = false;
        
        // Configura l'audio element per il loop
        this.audioPlayer.loop = true;
    }

    /**
     * Imposta il volume target (utilizzato dallo slider)
     */
    setVolume(volume) {
        this.targetVolume = volume;
        
        if (!this.isFading) {
            this.audioPlayer.volume = volume;
        }
        
        if (volume > 0 && !this.isPlaying && this.currentChapter) {
            this.playChapterMusic(this.currentChapter);
        } else if (volume === 0) {
            this.pause();
        }
    }

    /**
     * Pausa la musica
     */
    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
    }

    /**
     * Riprende la musica
     */
    resume() {
        if (this.targetVolume > 0) {
            this.audioPlayer.play().catch(e => console.error("Audio playback failed:", e));
            this.isPlaying = true;
        }
    }

    /**
     * Cambia la musica per un capitolo specifico con transizione fade
     */
    async playChapterMusic(chapterId) {
        // Se stiamo già riproducendo la musica corretta, non fare nulla
        if (this.currentChapter === chapterId && this.isPlaying) {
            return;
        }

        const newTrack = this.chapterMusic[chapterId];
        if (!newTrack) {
            console.warn(`Nessuna musica trovata per il capitolo: ${chapterId}`);
            return;
        }

        console.log(`Cambiando musica per capitolo: ${chapterId}`);
        this.currentChapter = chapterId;

        // Se non c'è musica in riproduzione, avvia direttamente
        if (!this.isPlaying || this.targetVolume === 0) {
            this.audioPlayer.src = newTrack;
            this.audioPlayer.volume = this.targetVolume;
            if (this.targetVolume > 0) {
                this.audioPlayer.play().catch(e => console.error("Audio playback failed:", e));
                this.isPlaying = true;
            }
            return;
        }

        // Transizione con fade
        await this.crossfadeToTrack(newTrack);
    }

    /**
     * Esegue una transizione fade tra tracce
     */
    async crossfadeToTrack(newTrackSrc) {
        if (this.isFading) return; // Evita sovrapposizioni di fade

        this.isFading = true;
        const originalVolume = this.targetVolume;
        const stepTime = this.fadeDuration / this.fadeSteps;
        const volumeStep = originalVolume / this.fadeSteps;

        try {
            // Fase 1: Fade out della traccia corrente
            for (let i = this.fadeSteps; i >= 0; i--) {
                this.audioPlayer.volume = (i * volumeStep);
                await this.sleep(stepTime);
            }

            // Fase 2: Cambia traccia
            this.audioPlayer.src = newTrackSrc;
            await this.audioPlayer.play();

            // Fase 3: Fade in della nuova traccia
            for (let i = 0; i <= this.fadeSteps; i++) {
                this.audioPlayer.volume = (i * volumeStep);
                await this.sleep(stepTime);
            }

            // Assicurati che il volume finale sia corretto
            this.audioPlayer.volume = originalVolume;
            this.isPlaying = true;

        } catch (error) {
            console.error("Errore durante il crossfade:", error);
            // Ripristina il volume in caso di errore
            this.audioPlayer.volume = originalVolume;
        } finally {
            this.isFading = false;
        }
    }

    /**
     * Utility per creare pause asincrone
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Ottiene il capitolo attualmente in riproduzione
     */
    getCurrentChapter() {
        return this.currentChapter;
    }
}

// --- CONFIGURAZIONE MUSICA PER CAPITOLI ---
const chapterMusic = {
    menu: 'assets/audio/audio_001.mp3',
    prologo: 'assets/audio/audio_002.mp3',
    capitolo001: 'assets/audio/city_theme.mp3',
    capitolo002: 'assets/audio/adventure_theme.mp3'
};

// Manteniamo la playlist come fallback per compatibilità
const musicPlaylist = Object.values(chapterMusic);
