// ===================================================================================
// --- ESEMPIO: Come usare override personalizzati per i nomi ---
// ===================================================================================

const esempioCapitoloOverride = {
    title: "Esempio con Override",
    
    // FORMATO OGGETTO: Permette override personalizzati
    metrics: {
        forza: null,                    // null = usa nome dal registry ("Forza")
        onore: "Onore del Samurai",     // Override personalizzato
        tesoro: null,                   // null = usa nome dal registry ("Tesoro")
        salute: "Punti Vita",           // Override personalizzato
        equipaggio: null,               // null = usa nome dal registry ("Equipaggio")
        strategia: "Arte della Guerra"  // Override personalizzato
    },
    
    scenarios: [
        // Gli scenari funzionano come sempre
    ]
};

// OPPURE: Formato array semplice (RACCOMANDATO per la maggior parte dei casi)
const esempioCapitoloSemplice = {
    title: "Esempio Semplice",
    
    // FORMATO ARRAY: Usa sempre i nomi dal registry
    metrics: ["forza", "onore", "tesoro", "salute", "equipaggio", "strategia"],
    
    scenarios: [
        // Gli scenari funzionano come sempre
    ]
};