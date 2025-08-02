// ===================================================================================
// --- DATI CAPITOLO 001: Gilda dei Maniscalchi ---
// ===================================================================================

const capitolo001Data = {
    title: "Capitolo 1: Gilda dei Maniscalchi",
    // NUOVO FORMATO: Array semplice, i nomi vengono dal registry!
    metrics: ["influenza", "tesoro", "ordine", "segreti", "operai", "innovazione"],
    
    // Condizioni di vittoria per i Maniscalchi
    winConditions: [
        {
            type: "multiple_metrics",
            operator: "AND", 
            conditions: [
                { metric: "tesoro", operator: ">=", value: 16 },
                { metric: "influenza", operator: ">=", value: 14 },
                { metric: "operai", operator: ">", value: 8 }
            ],
            description: "Magnate Industriale: tesoro ≥16, influenza ≥14, operai >8"
        },
        {
            type: "balanced_metrics",
            metrics: ["influenza", "ordine", "segreti"],
            min_value: 10,
            max_value: 16,
            description: "Maestro dell'Equilibrio: influenza, ordine e segreti tra 10-16"
        }
    ],
    
    // Condizioni di sconfitta specifiche
    loseConditions: [
        {
            type: "metric_critical",
            metric: "operai",
            operator: "<=",
            value: 2,
            rounds: 2,
            description: "Sciopero generale: operai critici per 2+ round"
        },
        {
            type: "metric_combination",
            operator: "AND",
            conditions: [
                { metric: "tesoro", operator: "<=", value: 1 },
                { metric: "influenza", operator: "<=", value: 4 }
            ],
            description: "Bancarotta politica: senza soldi né potere"
        },
        {
            type: "forbidden_combination",
            conditions: [
                { metric: "segreti", operator: ">", value: 17 },
                { metric: "ordine", operator: "<", value: 5 }
            ],
            description: "Spymaster nel caos: troppi segreti, poco controllo"
        }
    ],
    scenarios: [
        { 
            image: "https://placehold.co/400x400/64748b/f1f5f9?text=Il+Borgomastro", 
            description: "Il Borgomastro chiede una 'tassa' speciale per finanziare una nuova statua. In realtà, intascherà lui i soldi.", 
            choices: { 
                yes: { text: "Paga", effects: { influenza: +1, tesoro: -2, ordine: 0, segreti: +1, operai: -1, innovazione: 0 } }, 
                no:  { text: "Rifiuta", effects: { influenza: -1, tesoro: 0, ordine: 0, segreti: 0, operai: +1, innovazione: 0 } } 
            },
            // Esempio di cutscene intermedia per il Capitolo 2
            cutscene: {
                image: "https://placehold.co/400x400/1e293b/f59e0b?text=Segreti+Svelati",
                text: "Quella notte, una figura incappucciata bussa alla tua porta. 'Ho visto cosa hai fatto con il Borgomastro,' sussurra. 'Ci sono cose che dovresti sapere sui fondi della città...' La figura scompare nell'ombra prima che tu possa rispondere."
            }
        },
        { 
            image: "https://placehold.co/400x400/3a3a3a/f1f5f9?text=Gilda+dei+Ladri", 
            description: "La Gilda dei Ladri offre protezione... in cambio di una parte dei tuoi profitti.", 
            choices: { 
                yes: { text: "Accetta", effects: { influenza: 0, tesoro: -1, ordine: +1, segreti: +1, operai: +1, innovazione: -1 } }, 
                no:  { text: "Ignora", effects: { influenza: 0, tesoro: +1, ordine: -2, segreti: 0, operai: -2, innovazione: +1 } } 
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
        operai: {
            low: { title: "Sciopero Generale", message: "Tutti gli operai hanno abbandonato le fucine. La produzione è ferma e sei rovinato.", image: "https://placehold.co/400x400/8B0000/f1f5f9?text=Sciopero" },
            high: { title: "Dipendenza Totale", message: "Dipendi troppo dagli operai. Quando chiedono l'impossibile, non puoi dire di no e vai in bancarotta.", image: "https://placehold.co/400x400/4169E1/f1f5f9?text=Sottomissione" }
        },
        innovazione: {
            low: { title: "Tecnologia Obsoleta", message: "I tuoi metodi sono antiquati. I concorrenti ti hanno surclassato con nuove invenzioni.", image: "https://placehold.co/400x400/8B4513/f1f5f9?text=Obsoleto" },
            high: { title: "Innovazione Folle", message: "Le tue invenzioni sono troppo avanzate e pericolose. Una esplosione nelle fucine ti uccide.", image: "https://placehold.co/400x400/FF6347/f1f5f9?text=Esplosione" }
        },
        success: { 
            title: "Signore della Città", 
            message: "Hai conquistato anche la giungla di pietra. La tua saga è completa.", 
            image: "https://placehold.co/400x400/be123c/f1f5f9?text=Vittoria"
            // Nessun nextChapter qui, questo è un finale definitivo
        }
    }
};
