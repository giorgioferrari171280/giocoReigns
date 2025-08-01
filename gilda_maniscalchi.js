// ===================================================================================
// --- DATI CAPITOLO 2: Gilda dei Maniscalchi ---
// ===================================================================================

const gildaDeiManiscalchiData = {
    title: "Gilda dei Maniscalchi",
    metrics: {
        influenza: "Influenza",
        tesoro: "Tesoro",
        ordine: "Ordine",
        segreti: "Segreti"
    },
    scenarios: [
        { 
            image: "https://placehold.co/400x400/64748b/f1f5f9?text=Il+Borgomastro", 
            description: "Il Borgomastro chiede una 'tassa' speciale per finanziare una nuova statua. In realtà, intascherà lui i soldi.", 
            choices: { 
                yes: { text: "Paga", effects: { influenza: +1, tesoro: -2, ordine: 0, segreti: +1 } }, 
                no:  { text: "Rifiuta", effects: { influenza: -1, tesoro: 0, ordine: 0, segreti: 0 } } 
            } 
        },
        { 
            image: "https://placehold.co/400x400/3a3a3a/f1f5f9?text=Gilda+dei+Ladri", 
            description: "La Gilda dei Ladri offre protezione... in cambio di una parte dei tuoi profitti.", 
            choices: { 
                yes: { text: "Accetta", effects: { influenza: 0, tesoro: -1, ordine: +1, segreti: +1 } }, 
                no:  { text: "Ignora", effects: { influenza: 0, tesoro: +1, ordine: -2, segreti: 0 } } 
            } 
        }
    ],
    endings: {
        influenza: {
            low: { title: "Irrilevante", message: "La tua gilda non ha più peso in città.", image: "https://placehold.co/400x400/94a3b8/1e293b?text=Nessuno" },
            high: { title: "Troppo in Vista", message: "La tua influenza ha attirato nemici potenti.", image: "https://placehold.co/400x400/ef4444/f1f5f9?text=Congiura" }
        },
        // Aggiungi qui altri finali per le nuove metriche...
        success: { 
            title: "Signore della Città", 
            message: "Hai conquistato anche la giungla di pietra. La tua saga è completa.", 
            image: "https://placehold.co/400x400/be123c/f1f5f9?text=Vittoria"
            // Nessun nextChapter qui, questo è un finale definitivo
        }
    }
};
