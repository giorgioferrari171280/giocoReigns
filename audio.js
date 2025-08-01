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

// --- CONFIGURAZIONE ---
// Nota: I file audio effettivi non esistono in questo ambiente.
// Questi sono percorsi di esempio.
const musicPlaylist = [
    'assets/audio/music1.mp3',
    'assets/audio/music2.mp3',
    'assets/audio/music3.mp3'
];
