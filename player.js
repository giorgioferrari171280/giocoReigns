// ===================================================================================
// --- FILE STATO GIOCATORE ---
// Definisce lo stato iniziale del giocatore, incluse metriche, punteggio e flag.
// ===================================================================================

const initialPlayerState = {
    name: "",
    metrics: {
        forza: 5,
        onore: 5,
        ricchezza: 5,
        popolarita: 5
    },
    score: 0,
    // I flag possono essere usati per sbloccare eventi speciali o opzioni di dialogo.
    // Esempio: se 'ha_mappa_tesoro' è true, potrebbe apparire un nuovo scenario.
    flags: {
        rivale_sconfitto: false,
        alleanza_stretta: false,
        segreto_scoperto: false
    }
};
