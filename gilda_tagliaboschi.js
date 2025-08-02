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
            image: "https://placehold.co/400x400/65a30d/c8a27c?text=Villaggio", 
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
        onore: {
            low: { title: "Senza Onore", message: "Nessuno si fida più di te. Il tuo nome è fango e la tua gilda si è sciolta.", image: "https://placehold.co/400x400/57534e/c8a27c?text=Disonore" },
            high: { title: "Nobile Ingenuo", message: "Il tuo onore ti ha reso prevedibile e debole. I tuoi rivali ti hanno schiacciato.", image: "https://placehold.co/400x400/fde047/333333?text=Tradimento" }
        },
        ricchezza: {
            low: { title: "Bancarotta", message: "La gilda è in bancarotta. I tuoi uomini ti hanno abbandonato per cercare fortuna altrove.", image: "https://placehold.co/400x400/a16207/c8a27c?text=Povertà" },
            high: { title: "Annegato nell'Oro", message: "Sei annegato nel tuo stesso oro, dimenticando il popolo. Una rivolta ti ha detronizzato.", image: "https://placehold.co/400x400/facc15/333333?text=Avarizia" }
        },
        popolarita: {
            low: { title: "L'Esiliato", message: "Il popolo ti disprezza. Sei stato cacciato dalla contea in disgrazia.", image: "https://placehold.co/400x400/78716c/c8a27c?text=Esilio" },
            high: { title: "Amico di Tutti, Capo di Nessuno", message: "Hai cercato di compiacere tutti e non hai accontentato nessuno. La tua indecisione ha portato alla rovina.", image: "https://placehold.co/400x400/a8a29e/333333?text=Indecisione" }
        },
        success: { 
            title: "Saga nei Boschi", 
            message: "Hai dominato la foresta. Ora la città ti attende.", 
            image: "https://placehold.co/400x400/166534/c8a27c?text=Successo",
            nextChapter: "gildaDeiManiscalchi" // <-- SBLOCCA IL PROSSIMO CAPITOLO
        }
    }
};
