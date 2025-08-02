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
        tesoro: {
            low: { title: "Fucine Fredde", message: "Senza denaro per il carbone, le tue fucine si sono spente per sempre.", image: "https://placehold.co/400x400/475569/f1f5f9?text=Fallimento" },
            high: { title: "Il Prezzo del Successo", message: "La tua ricchezza ha attirato ladri e assassini. Sei caduto vittima della tua stessa fortuna.", image: "https://placehold.co/400x400/fbbf24/1e293b?text=Assassinio" }
        },
        ordine: {
            low: { title: "Caos Totale", message: "La città è nel caos. La tua gilda è stata travolta dai disordini.", image: "https://placehold.co/400x400/991b1b/f1f5f9?text=Anarchia" },
            high: { title: "Pugno di Ferro", message: "Il tuo regno del terrore ha unito tutti contro di te. Sei stato rovesciato.", image: "https://placehold.co/400x400/1e293b/f1f5f9?text=Ribellione" }
        },
        segreti: {
            low: { title: "Cieco e Sordo", message: "Senza informazioni, sei stato tradito dai tuoi stessi alleati.", image: "https://placehold.co/400x400/6b7280/f1f5f9?text=Tradimento" },
            high: { title: "Sapere Troppo", message: "Conoscevi troppi segreti. Qualcuno ha deciso di farti tacere per sempre.", image: "https://placehold.co/400x400/0f172a/f1f5f9?text=Silenzio" }
        },
        success: { 
            title: "Signore della Città", 
            message: "Hai conquistato anche la giungla di pietra. La tua saga è completa.", 
            image: "https://placehold.co/400x400/be123c/f1f5f9?text=Vittoria"
            // Nessun nextChapter qui, questo è un finale definitivo
        }
    }
};
