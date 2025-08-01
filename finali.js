// ===================================================================================
// --- FILE CONTENUTI FINALI ---
// Contiene i testi e le immagini per tutte le possibili schermate di fine gioco.
// ===================================================================================

const endings = {
    forza: {
        low: {
            title: "Gilda Infranta",
            message: "La tua gilda è troppo debole per difendersi ed è stata spazzata via.",
            image: "https://placehold.co/400x400/333333/c8a27c?text=Rovine"
        },
        high: {
            title: "Tirannia dell'Ascia",
            message: "La tua brama di potere ti ha reso un tiranno. I tuoi stessi uomini ti hanno deposto.",
            image: "https://placehold.co/400x400/b91c1c/c8a27c?text=Rivolta"
        }
    },
    onore: {
        low: {
            title: "Senza Onore",
            message: "Nessuno si fida più di te. Il tuo nome è fango e la tua gilda si è sciolta.",
            image: "https://placehold.co/400x400/57534e/c8a27c?text=Disonore"
        },
        high: {
            title: "Nobile Ingenuo",
            message: "Il tuo onore ti ha reso prevedibile e debole. I tuoi rivali ti hanno schiacciato.",
            image: "https://placehold.co/400x400/fde047/333333?text=Tradimento"
        }
    },
    ricchezza: {
        low: {
            title: "Bancarotta",
            message: "La gilda è in bancarotta. I tuoi uomini ti hanno abbandonato per cercare fortuna altrove.",
            image: "https://placehold.co/400x400/a16207/c8a27c?text=Povert%C3%A0"
        },
        high: {
            title: "Annegato nell'Oro",
            message: "Sei annegato nel tuo stesso oro, dimenticando il popolo. Una rivolta ti ha detronizzato.",
            image: "https://placehold.co/400x400/facc15/333333?text=Avarizia"
        }
    },
    popolarita: {
        low: {
            title: "L'Esiliato",
            message: "Il popolo ti disprezza. Sei stato cacciato dalla contea in disgrazia.",
            image: "https://placehold.co/400x400/78716c/c8a27c?text=Esilio"
        },
        high: {
            title: "Amico di Tutti, Capo di Nessuno",
            message: "Hai cercato di compiacere tutti e non hai accontentato nessuno. La tua indecisione ha portato alla rovina.",
            image: "https://placehold.co/400x400/a8a29e/333333?text=Indecisione"
        }
    },
    success: {
        title: "Saga Leggendaria",
        message: "Sei riuscito a navigare tra le insidie del potere e a portare la tua gilda alla prosperità. La tua saga sarà cantata per generazioni!",
        image: "https://placehold.co/400x400/166534/c8a27c?text=Leggenda"
    }
};
