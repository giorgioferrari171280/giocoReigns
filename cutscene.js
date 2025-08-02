// ===================================================================================
// --- FILE CUTSCENES ---
// Contiene le scene di intermezzo per la narrazione.
// ===================================================================================

const cutscenes = {
    gildaDeiBoschi: {
        start: {
            image: 'https://placehold.co/400x400/1a1a1a/c8a27c?text=Inizio',
            text: 'La Gilda dei Taglialegna è in un periodo di pace, ma le foreste sono antiche e piene di segreti. La tua guida sarà fondamentale per il suo futuro.'
        },
        end: {
            // This is shown before transitioning to the next chapter
            image: 'https://placehold.co/400x400/1f1f1f/c8a27c?text=Fine+Capitolo',
            text: 'Il primo capitolo della tua saga si conclude, ma nuove sfide ti attendono. La Gilda dei Maniscalchi ha bisogno di una guida...'
        }
    },
    // Future chapters can be added here
    gildaDeiManiscalchi: {
        start: {
            image: 'https://placehold.co/400x400/333333/c8a27c?text=Nuovo+Inizio',
            text: 'Hai lasciato le foreste per le fucine ardenti. Il clangore del metallo sostituisce il fruscio delle foglie. La Gilda dei Maniscalchi ora dipende da te.'
        }
    }
};
