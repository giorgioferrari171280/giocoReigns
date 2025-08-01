// ===================================================================================
// --- FILE CAPITOLI DI GIOCO ---
// Definisce tutti i capitoli, ognuno con le proprie metriche, scenari e finali.
// ===================================================================================

const chapters = {
    // --- CAPITOLO 1: LA GILDA DEI BOSCHI ---
    gildaDeiBoschi: {
        title: "Gilda dei Taglialegna",
        metrics: {
            forza: "Forza",
            onore: "Onore",
            ricchezza: "Ricchezza",
            popolarita: "Popolarità"
        },
        scenarios: [
            { 
                image: "https://placehold.co/400x400/5a2a27/c8a27c?text=Richiesta+del+Lord", 
                description: "Il Thegn locale esige una fornitura gratuita di legna per riparare il suo forte. È nostro dovere, dice.", 
                choices: { 
                    yes: { text: "Obbedisci", effects: { forza: -1, onore: +1, ricchezza: -1, popolarita: 0 } }, 
                    no:  { text: "Rifiuta", effects: { forza: 0, onore: -1, ricchezza: +1, popolarita: +1 } } 
                } 
            },
            { 
                image: "https://placehold.co/400x400/7f1d1d/c8a27c?text=Incursione+Vichinga", 
                description: "Avvistate navi vichinghe! Dobbiamo formare una milizia e difendere il guado o nascondere le nostre ricchezze?", 
                choices: { 
                    yes: { text: "Combatti!", effects: { forza: -1, onore: +1, ricchezza: 0, popolarita: +1 } }, 
                    no:  { text: "Nasconditi!", effects: { forza: +1, onore: -1, ricchezza: -1, popolarita: -1 } } 
                } 
            },
            { 
                image: "https://placehold.co/400x400/4b5563/c8a27c?text=Nuova+Ascia", 
                description: "Un fabbro ha inventato un'ascia di metallo superiore, ma costa un patrimonio. Investiamo in questa nuova tecnologia?", 
                choices: { 
                    yes: { text: "Investi", effects: { forza: +2, onore: 0, ricchezza: -2, popolarita: 0 } }, 
                    no:  { text: "Risparmia", effects: { forza: 0, onore: 0, ricchezza: +1, popolarita: 0 } } 
                } 
            }
        ],
        endings: {
            forza: {
                low: { title: "Gilda Infranta", message: "La tua gilda è troppo debole.", image: "https://placehold.co/400x400/333333/c8a27c?text=Rovine" },
                high: { title: "Tirannia dell'Ascia", message: "La tua brama di potere ti ha reso un tiranno.", image: "https://placehold.co/400x400/b91c1c/c8a27c?text=Rivolta" }
            },
            onore: {
                low: { title: "Senza Onore", message: "Nessuno si fida più di te.", image: "https://placehold.co/400x400/57534e/c8a27c?text=Disonore" },
                high: { title: "Nobile Ingenuo", message: "Il tuo onore ti ha reso prevedibile.", image: "https://placehold.co/400x400/fde047/333333?text=Tradimento" }
            },
            ricchezza: {
                low: { title: "Bancarotta", message: "La gilda è in bancarotta.", image: "https://placehold.co/400x400/a16207/c8a27c?text=Povert%C3%A0" },
                high: { title: "Annegato nell'Oro", message: "Sei annegato nel tuo stesso oro.", image: "https://placehold.co/400x400/facc15/333333?text=Avarizia" }
            },
            popolarita: {
                low: { title: "L'Esiliato", message: "Il popolo ti disprezza.", image: "https://placehold.co/400x400/78716c/c8a27c?text=Esilio" },
                high: { title: "Amico di Tutti", message: "La tua indecisione ha portato alla rovina.", image: "https://placehold.co/400x400/a8a29e/333333?text=Indecisione" }
            },
            success: { 
                title: "Saga nei Boschi", 
                message: "Hai dominato la foresta. Ora la città ti attende.", 
                image: "https://placehold.co/400x400/166534/c8a27c?text=Successo",
                nextChapter: "gildaInCitta" // <-- SBLOCCA IL PROSSIMO CAPITOLO
            }
        }
    },

    // --- CAPITOLO 2: LA GILDA IN CITTÀ ---
    gildaInCitta: {
        title: "Gilda dei Mercanti",
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
                low: { title: "Casse Vuote", message: "I debiti hanno sommerso la gilda.", image: "https://placehold.co/400x400/ca8a04/1e293b?text=Debiti" },
                high: { title: "Il Drago", message: "La tua ricchezza ti ha isolato da tutti.", image: "https://placehold.co/400x400/f59e0b/1e293b?text=Solitudine" }
            },
            // Aggiungi qui altri finali per le nuove metriche...
            success: { 
                title: "Signore della Città", 
                message: "Hai conquistato anche la giungla di pietra. La tua saga è completa.", 
                image: "https://placehold.co/400x400/be123c/f1f5f9?text=Vittoria"
                // Nessun nextChapter qui, questo è un finale definitivo
            }
        }
    }
};
