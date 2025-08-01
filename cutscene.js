// ===================================================================================
// --- FILE CUTSCENES ---
// Contiene le scene di intermezzo per la narrazione.
// ===================================================================================

const cutscenes = {
    gildaDeiBoschi: {
        start: {
            image: 'https://placehold.co/1280x720/000000/ffffff?text=Inizio',
            text: 'La Gilda dei Taglialegna è in un periodo di pace, ma le foreste sono antiche e piene di segreti. La tua guida sarà fondamentale per il suo futuro.'
        },
        middle: {
            // This could be triggered after a certain number of scenarios
            image: 'https://placehold.co/1280x720/000000/ffffff?text=Metà+Avventura',
            text: 'Le tue decisioni stanno plasmando la gilda. Le voci delle tue gesta si diffondono tra i membri, nel bene e nel male.'
        },
        end: {
            // This is shown before transitioning to the next chapter
            image: 'https://placehold.co/1280x720/000000/ffffff?text=Fine+Capitolo',
            text: 'Il primo capitolo della tua saga si conclude, ma nuove sfide ti attendono. La Gilda dei Maniscalchi ha bisogno di una guida...'
        }
    },
    // Future chapters can be added here
    gildaDeiManiscalchi: {
        start: {
            image: 'https://placehold.co/1280x720/333333/eeeeee?text=Nuovo+Inizio',
            text: 'Hai lasciato le foreste per le fucine ardenti. Il clangore del metallo sostituisce il fruscio delle foglie. La Gilda dei Maniscalchi ora dipende da te.'
        }
    }
};
