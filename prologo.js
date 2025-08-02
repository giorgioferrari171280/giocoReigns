// ===================================================================================
// --- DATI PROLOGO: Gilda dei Taglialegna ---
// ===================================================================================

const prologoData = {
    title: "Prologo: Gilda dei Taglialegna",
    // NUOVO FORMATO: Array semplice, i nomi vengono dal registry!
    metrics: ["contessa", "onore", "ricchezza", "popolarita", "salute", "conoscenza"],
    
    // Condizioni di vittoria per i Taglialegna
    winConditions: [
        {
            type: "multiple_metrics",
            operator: "AND",
            conditions: [
                { metric: "forza", operator: ">=", value: 15 },
                { metric: "onore", operator: ">=", value: 12 },
                { metric: "salute", operator: ">", value: 10 }
            ],
            description: "Capo Leggendario: forza ≥15, onore ≥12, salute >10"
        },
        {
            type: "survive_rounds",
            rounds: 10,
            description: "Veterano della Foresta: sopravvivi 10 scenari"
        }
    ],
    
    // Condizioni di sconfitta specifiche
    loseConditions: [
        {
            type: "metric_critical",
            metric: "salute",
            operator: "<=",
            value: 3,
            rounds: 1,
            description: "Ferite mortali nella foresta"
        },
        {
            type: "forbidden_combination",
            conditions: [
                { metric: "forza", operator: ">", value: 17 },
                { metric: "onore", operator: "<", value: 6 }
            ],
            description: "Tiranno della Foresta: troppa forza senza onore"
        },
        {
            type: "metric_combination",
            operator: "AND",
            conditions: [
                { metric: "popolarita", operator: "<=", value: 3 },
                { metric: "ricchezza", operator: "<=", value: 2 }
            ],
            description: "Emarginato: impopolare e povero"
        }
    ],
    scenarios: [
        { 
            image: "assets/img/contessa_roia.png", 
            description: "Le guardie conducono la contessa di Bourdessac di fronte al marito furioso. 'Ora pagherai con la vita il tuo tradimento, maledetta!' grida il conte. Hai due possibilità: potresti bruciarla sul rogo per vendicare la vergogna subita dal Conte oppure chiuderla in un convento di monache per il resto dei suoi giorni. Cosa dobbiamo fare della contessa?.", 
            choices: { 
                yes: { text: "Che bruci sul rogo quella adultera!", effects: { contessa: -20, onore: +2, ricchezza: -1, popolarita: 0, salute: 0, conoscenza: +1 } }, 
                no:  { text: "Diventerà una monaca di clausura per tutta la vita.", effects: { contessa: -10, onore: -1, ricchezza: +1, popolarita: +1, salute: 0, conoscenza: 0 } } 
            },
            // Esempio di cutscene multi-slide intermedia
            cutscene: {
                slides: [
                    {
                        image: "assets/img/rogo.png",
                        text: "Una folla di villici, soldati e curiosi dai villaggi vicini accorre per vedere l'esecuzione. Le fiamme illuminano a giorno la notte del borgo di Bourdessac. Le grida della contessa, terrificanti, si affievoliscono lentamente fino a scomparire del tutto."
                    },
                    {
                        image: "https://placehold.co/400x400/4a5568/FFFFFF?text=Nelle+Ore",
                        text: "Nelle ore seguenti, i nobili si riuniscono in conciliaboli segreti. Le tue spie riferiscono di messaggi cifrati e incontri notturni."
                    },
                    {
                        image: "https://placehold.co/400x400/1e293b/c8a27c?text=Conseguenze",
                        text: "La tua decisione sulla contessa ha gettato un seme che crescerà nei giorni a venire. Alcuni ti vedono come un giusto sovrano, altri come un tiranno spietato."
                    }
                ]
            }
        },
        { 
            image: "https://placehold.co/400x400/7f1d1d/c8a27c?text=Incursione+Vichinga", 
            description: "Avvistate navi vichinghe! Dobbiamo formare una milizia e difendere il guado o nascondere le nostre ricchezze?", 
            choices: { 
                yes: { text: "Combatti!", effects: { forza: -1, onore: +1, ricchezza: 0, popolarita: +1, salute: -2, conoscenza: +1 } }, 
                no:  { text: "Nasconditi!", effects: { forza: +1, onore: -1, ricchezza: -1, popolarita: -1, salute: 0, conoscenza: 0 } } 
            },
            // Cutscenes differenziate per ogni scelta
            cutscenes: {
                yes: {
                    slides: [
                        {
                            image: "https://placehold.co/400x400/DC143C/FFFFFF?text=Battaglia+Inizia",
                            text: "I corni da guerra risuonano! I tuoi taglialegna afferrano asce e scudi improvvisati, trasformandosi da boscaioli in guerrieri."
                        },
                        {
                            image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Scontro+Feroce",
                            text: "La battaglia infuria per ore. Il clangore delle asce risuona nella valle mentre sangue e sudore si mescolano nel fango."
                        },
                        {
                            image: "https://placehold.co/400x400/228B22/FFFFFF?text=Vittoria+Costosa",
                            text: "Quando la nebbia si dirada, i vichinghi sono in ritirata. Hai vinto, ma il prezzo della vittoria è scritto nel sangue sulla neve."
                        }
                    ]
                },
                no: {
                    slides: [
                        {
                            image: "https://placehold.co/400x400/2F4F4F/FFFFFF?text=Ritirata+Silenziosa",
                            text: "Ordini di nascondere tutto ciò che ha valore e di rifugiarsi nelle grotte della foresta. I vichinghi non troveranno nulla."
                        },
                        {
                            image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Saccheggio",
                            text: "I vichinghi devastano le case vuote, ma trovano ben poco. Frustrati, incendiano alcuni edifici prima di ripartire."
                        },
                        {
                            image: "https://placehold.co/400x400/696969/FFFFFF?text=Vergogna",
                            text: "Hai salvato vite e ricchezze, ma il prezzo è l'onore. Alcuni taglialegna ti guardano con disprezzo: 'Un vero capo avrebbe combattuto'."
                        }
                    ]
                }
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
        salute: {
            low: { title: "Morte per Sfinimento", message: "Il tuo corpo non ha retto alle fatiche e alle ferite. Sei collassato esausto nel mezzo della foresta.", image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Morte" },
            high: { title: "Ipocondriaco Paranoico", message: "La tua ossessione per la salute ti ha reso pazzo. Muori di paura immaginando malattie inesistenti.", image: "https://placehold.co/400x400/90EE90/000000?text=Paranoia" }
        },
        conoscenza: {
            low: { title: "Ignoranza Fatale", message: "La tua ignoranza ti ha portato alla rovina. Hai fatto scelte sbagliate che hanno distrutto tutto.", image: "https://placehold.co/400x400/696969/FFFFFF?text=Ignoranza" },
            high: { title: "Sapienza Maledetta", message: "Sai troppo e questo ti ha reso pazzo. La conoscenza proibita ti ha consumato l'anima.", image: "https://placehold.co/400x400/4B0082/FFFFFF?text=Follia" }
        },
        success: { 
            title: "Saga nei Boschi", 
            message: "Hai dominato la foresta. Ora la città ti attende.", 
            image: "https://placehold.co/400x400/166534/c8a27c?text=Successo",
            nextChapter: "capitolo001" // <-- SBLOCCA IL PROSSIMO CAPITOLO
        }
    }
};
