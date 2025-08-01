// ===================================================================================
// --- DATI CAPITOLO 1: Gilda dei Taglialegna ---
// ===================================================================================

const gildaDeiBoschiData = {
    title: "Gilda dei Taglialegna",
    metrics: {
        forza: "Forza",
        onore: "Onore",
        ricchezza: "Ricchezza",
        popolarita: "Popolarità"
    },
    scenarios: [
        { 
            image: "assets/img/villaggio.png", 
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
        }
    ],
    endings: {
        forza: {
            low: { title: "Gilda Infranta", message: "La tua gilda è troppo debole.", image: "https://placehold.co/400x400/333333/c8a27c?text=Rovine" },
            high: { title: "Tirannia dell'Ascia", message: "La tua brama di potere ti ha reso un tiranno.", image: "https://placehold.co/400x400/b91c1c/c8a27c?text=Rivolta" }
        },
        // Aggiungi qui altri finali per le altre metriche...
        success: { 
            title: "Saga nei Boschi", 
            message: "Hai dominato la foresta. Ora la città ti attende.", 
            image: "https://placehold.co/400x400/166534/c8a27c?text=Successo",
            nextChapter: "gildaDeiManiscalchi" // <-- SBLOCCA IL PROSSIMO CAPITOLO
        }
    }
};
