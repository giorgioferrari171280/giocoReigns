// ===================================================================================
// --- FILE CUTSCENES ---
// Contiene le scene di intermezzo per la narrazione.
// ===================================================================================

const cutscenes = {
    prologo: {
        start: {
            image: 'https://placehold.co/400x400/1a1a1a/c8a27c?text=Inizio',
            text: 'La Gilda dei Taglialegna è in un periodo di pace, ma le foreste sono antiche e piene di segreti. La tua guida sarà fondamentale per il suo futuro.'
        },
        end: {
            // Esempio di cutscene multi-slide per la fine del capitolo
            slides: [
                {
                    image: 'https://placehold.co/400x400/1f1f1f/c8a27c?text=Epilogo+1',
                    text: 'Il primo capitolo della tua saga si conclude. I taglialegna ti guardano con rispetto, ma le sfide non sono finite...'
                },
                {
                    image: 'https://placehold.co/400x400/4a5568/c8a27c?text=Epilogo+2',
                    text: 'Oltre le colline fumano le ciminiere della città. Il clangore dei martelli sui metalli risuona nell\'aria. Un nuovo mondo ti attende.'
                },
                {
                    image: 'https://placehold.co/400x400/7c2d12/c8a27c?text=Epilogo+3',
                    text: 'La Gilda dei Maniscalchi ha bisogno di una guida. Lasci la foresta alle spalle e ti dirigi verso le fucine ardenti del tuo destino.'
                }
            ]
        }
    },
    // Future chapters can be added here
    capitolo001: {
        start: {
            // Esempio di cutscene multi-slide per l'inizio del capitolo
            slides: [
                {
                    image: 'https://placehold.co/400x400/333333/c8a27c?text=Nuovo+Inizio',
                    text: 'Le porte della città si aprono davanti a te. L\'odore di ferro e carbone riempie le narici.'
                },
                {
                    image: 'https://placehold.co/400x400/7c2d12/f1f5f9?text=Le+Fucine',
                    text: 'Il clangore del metallo sostituisce il fruscio delle foglie. Qui la forza non basta: serve astuzia, diplomazia e oro.'
                },
                {
                    image: 'https://placehold.co/400x400/4a5568/f1f5f9?text=Nuova+Sfida',
                    text: 'La Gilda dei Maniscalchi ora dipende da te. Riuscirai a dominare anche questo nuovo mondo?'
                }
            ]
        }
    }
};
