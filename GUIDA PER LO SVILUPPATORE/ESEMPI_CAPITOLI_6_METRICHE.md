# 🎯 ESEMPI PRATICI: Capitoli con 6 Metriche

## 🚀 TEMPLATE PRONTO ALL'USO

### **🏰 Gilda dei Cavalieri**
```javascript
const gildaDeiCavalieriData = {
    title: "Gilda dei Cavalieri",
    
    // NUOVO FORMATO: Array semplice!
    metrics: ["gloria", "forza", "salute", "soldati", "onore", "strategia"],
    
    // Se volessi override personalizzati:
    // metrics: {
    //     gloria: null,              // Usa "Gloria" dal registry
    //     forza: null,               // Usa "Forza" dal registry
    //     salute: null,              // Usa "Salute" dal registry
    //     soldati: "Compagnia d'Arme", // Override personalizzato
    //     onore: "Codice Cavalleresco", // Override personalizzato
    //     strategia: null            // Usa "Strategia" dal registry
    // },
    scenarios: [
        {
            image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Drago",
            description: "Un drago minaccia il villaggio. Puoi attaccarlo direttamente o elaborare una strategia.",
            choices: {
                yes: { 
                    text: "Attacco diretto!", 
                    effects: { 
                        gloria: +3,      // ✅ Aumenta gloria (gesta eroiche)
                        forza: +1,       // ✅ Aumenta forza (combattimento)
                        salute: -4,      // ✅ Diminuisce salute (ferite del drago)
                        equipaggio: -3,  // ✅ Diminuisce soldati (perdite)
                        onore: +2,       // ✅ Aumenta onore (coraggio)
                        strategia: -1    // ✅ Diminuisce strategia (azione impulsiva)
                    }
                },
                no: { 
                    text: "Elabora una strategia", 
                    effects: { 
                        gloria: +1,      // ✅ Poca gloria (vittoria calcolata)
                        forza: 0,        // Nessun cambio
                        salute: -1,      // ✅ Poche ferite
                        equipaggio: -1,  // ✅ Poche perdite
                        onore: 0,        // Nessun cambio
                        strategia: +3    // ✅ Aumenta strategia (pianificazione)
                    }
                }
            }
        },
        {
            image: "https://placehold.co/400x400/4B0082/FFFFFF?text=Nobile",
            description: "Un nobile corrotto ti offre oro in cambio di ignorare i suoi crimini.",
            choices: {
                yes: { 
                    text: "Accetta l'oro", 
                    effects: { 
                        gloria: -2,      // ❌ IGNORATO (gloria non può diminuire)
                        forza: 0,        // Nessun cambio
                        salute: 0,       // Nessun cambio
                        equipaggio: 0,   // Nessun cambio
                        onore: -4,       // ✅ Diminuisce onore (corruzione)
                        strategia: +1    // ✅ Aumenta strategia (cinismo)
                    }
                },
                no: { 
                    text: "Rifiuta e arrestalo", 
                    effects: { 
                        gloria: +2,      // ✅ Aumenta gloria (giustizia)
                        forza: +1,       // ✅ Aumenta forza (dimostrazione)
                        salute: -1,      // ✅ Diminuisce salute (scontro)
                        equipaggio: -1,  // ✅ Diminuisce soldati (resistenza)
                        onore: +3,       // ✅ Aumenta onore (integrità)
                        strategia: 0     // Nessun cambio
                    }
                }
            }
        }
    ],
    endings: {
        gloria: {
            high: { title: "Leggenda Vivente", message: "La tua gloria è così grande che sei diventato un mito. Ma i miti non possono vivere tra i mortali.", image: "https://placehold.co/400x400/FFD700/000000?text=Mito" }
        },
        forza: {
            high: { title: "Forza Sovrumana", message: "La tua forza è diventata incontrollabile. Hai distrutto tutto ciò che amavi.", image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Distruzione" }
        },
        salute: {
            low: { title: "Morte Eroica", message: "Sei morto in battaglia, come un vero cavaliere. La tua memoria vivrà per sempre.", image: "https://placehold.co/400x400/696969/FFFFFF?text=Morte" }
        },
        equipaggio: {
            low: { title: "Solo Contro Tutti", message: "Tutti i tuoi soldati sono morti. Sei rimasto solo a combattere una guerra impossibile.", image: "https://placehold.co/400x400/8B0000/FFFFFF?text=Solitudine" }
        },
        onore: {
            low: { title: "Cavaliere Caduto", message: "Hai tradito i tuoi ideali. Nessuno ti segue più.", image: "https://placehold.co/400x400/2F4F4F/FFFFFF?text=Caduta" },
            high: { title: "Santo Cavaliere", message: "Il tuo onore è così puro che sei diventato intoccabile, ma anche isolato dal mondo.", image: "https://placehold.co/400x400/FFFFFF/000000?text=Santo" }
        },
        strategia: {
            low: { title: "Stratega Fallito", message: "Le tue tattiche sbagliate hanno portato alla rovina.", image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Fallimento" },
            high: { title: "Mente Suprema", message: "Le tue strategie sono così complesse che nessuno riesce più a seguirti.", image: "https://placehold.co/400x400/4B0082/FFFFFF?text=Genio" }
        },
        success: {
            title: "Paladino Perfetto",
            message: "Hai bilanciato forza e saggezza, gloria e umiltà. Sei il cavaliere ideale.",
            image: "https://placehold.co/400x400/FFD700/000000?text=Vittoria",
            nextChapter: "gildaDeiMaghi"
        }
    }
};
```

---

## 🧙‍♂️ **Gilda dei Maghi**
```javascript
const gildaDeiMaghiData = {
    title: "Gilda dei Maghi",
    metrics: {
        magia: "Potere Magico",     // 🟢 Crescita: 0→20 (accumuli potere magico)
        conoscenza: "Conoscenza",   // 🟢 Crescita: 0→20 (studi e impari)
        sanita: "Sanità Mentale",   // 🔴 Deterioramento: 20→0 (magia corrompe)
        energia: "Energia Vitale",  // 🔴 Deterioramento: 20→0 (magia consuma)
        saggezza: "Saggezza",       // 🟡 Bilanciata: 10 (equilibrio mentale)
        etica: "Etica"              // 🟡 Bilanciata: 10 (moralità magica)
    },
    scenarios: [
        {
            image: "https://placehold.co/400x400/4B0082/FFFFFF?text=Libro+Proibito",
            description: "Trovi un antico grimorio con magie proibite. Studiarlo aumenterebbe enormemente il tuo potere, ma...",
            choices: {
                yes: { 
                    text: "Studia il grimorio", 
                    effects: { 
                        magia: +4,       // ✅ Grande potere magico
                        conoscenza: +3,  // ✅ Conoscenze arcane
                        sanita: -3,      // ✅ La magia nera corrompe
                        energia: -2,     // ✅ Rituali estenuanti
                        saggezza: -2,    // ✅ Perdita di saggezza
                        etica: -4        // ✅ Magia immorale
                    }
                },
                no: { 
                    text: "Distruggi il grimorio", 
                    effects: { 
                        magia: +0,       // ❌ IGNORATO (no potere)
                        conoscenza: +1,  // ✅ Saggezza dalla rinuncia
                        sanita: +0,      // ❌ IGNORATO (non può aumentare)
                        energia: +0,     // ❌ IGNORATO (non può aumentare)
                        saggezza: +3,    // ✅ Atto saggio
                        etica: +2        // ✅ Scelta morale
                    }
                }
            }
        }
    ]
};
```

---

## 🏴‍☠️ **Gilda dei Pirati**
```javascript
const gildaDeiPiratiData = {
    title: "Gilda dei Pirati",
    metrics: {
        tesoro: "Tesoro",           // 🟢 Crescita: 0→20 (accumuli ricchezze)
        fama: "Fama",               // 🟢 Crescita: 0→20 (leggenda piratesca)
        equipaggio: "Equipaggio",   // 🔴 Deterioramento: 20→0 (ammutinamenti)
        risorse: "Provviste",       // 🔴 Deterioramento: 20→0 (consumo navale)
        astuzia: "Astuzia",         // 🟡 Bilanciata: 10 (tattiche)
        lealta: "Lealtà"            // 🟡 Bilanciata: 10 (fiducia dell'equipaggio)
    },
    scenarios: [
        {
            image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Galeone+Spagnolo",
            description: "Avvistate un galeone carico d'oro, ma è ben armato. Attaccate o cercate prede più facili?",
            choices: {
                yes: { 
                    text: "All'arrembaggio!", 
                    effects: { 
                        tesoro: +5,      // ✅ Oro del galeone
                        fama: +3,        // ✅ Gesta leggendarie
                        equipaggio: -4,  // ✅ Perdite in battaglia
                        risorse: -2,     // ✅ Consumo per battaglia
                        astuzia: +1,     // ✅ Esperienza tattica
                        lealta: +2       // ✅ Bottino condiviso
                    }
                },
                no: { 
                    text: "Troppo rischioso", 
                    effects: { 
                        tesoro: +0,      // ❌ IGNORATO (nessun bottino)
                        fama: -1,        // ❌ IGNORATO (fama non cala)
                        equipaggio: +0,  // ❌ IGNORATO (non può aumentare)
                        risorse: -1,     // ✅ Tempo perso
                        astuzia: 0,      // Nessun cambio
                        lealta: -2       // ✅ Equipaggio deluso
                    }
                }
            }
        }
    ]
};
```

---

## 🏭 **Gilda degli Inventori**
```javascript
const gildaDegliInventoriData = {
    title: "Gilda degli Inventori",
    metrics: {
        innovazione: "Innovazione",     // 🟢 Crescita: 0→20 (nuove invenzioni)
        produzione: "Produzione",       // 🟢 Crescita: 0→20 (efficienza fabbriche)
        operai: "Operai",               // 🔴 Deterioramento: 20→0 (scioperi/incidenti)
        risorse: "Materie Prime",       // 🔴 Deterioramento: 20→0 (consumo produzione)
        sicurezza: "Sicurezza",         // 🟡 Bilanciata: 10 (incidenti vs protezione)
        etica_lavoro: "Etica Lavorativa" // 🟡 Bilanciata: 10 (trattamento operai)
    },
    scenarios: [
        {
            image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Macchina+Vapore",
            description: "Hai inventato una macchina rivoluzionaria, ma è pericolosa. La testi subito o studi meglio la sicurezza?",
            choices: {
                yes: { 
                    text: "Test immediato!", 
                    effects: { 
                        innovazione: +4,    // ✅ Scoperta rivoluzionaria
                        produzione: +3,     // ✅ Nuova efficienza
                        operai: -3,         // ✅ Incidenti durante test
                        risorse: -2,        // ✅ Materiali per prototipo
                        sicurezza: -3,      // ✅ Protocolli non testati
                        etica_lavoro: -2    // ✅ Rischi per lavoratori
                    }
                },
                no: { 
                    text: "Studio la sicurezza", 
                    effects: { 
                        innovazione: +1,    // ✅ Progresso più lento
                        produzione: +0,     // ❌ IGNORATO (nessun aumento immediato)
                        operai: +0,         // ❌ IGNORATO (non può aumentare)
                        risorse: -1,        // ✅ Materiali per ricerca
                        sicurezza: +3,      // ✅ Protocolli migliori
                        etica_lavoro: +2    // ✅ Attenzione ai lavoratori
                    }
                }
            }
        }
    ]
};
```

---

## 🌾 **Gilda dei Contadini**
```javascript
const gildaDeiContadiniData = {
    title: "Gilda dei Contadini",
    metrics: {
        raccolto: "Raccolto",       // 🟢 Crescita: 0→20 (accumuli cibo)
        esperienza: "Esperienza",   // 🟢 Crescita: 0→20 (tecniche agricole)
        acqua: "Riserve d'Acqua",   // 🔴 Deterioramento: 20→0 (siccità)
        popolazione: "Popolazione", // 🔴 Deterioramento: 20→0 (emigrazione/carestie)
        tradizione: "Tradizione",   // 🟡 Bilanciata: 10 (vecchi vs nuovi metodi)
        comunita: "Spirito Comunitario" // 🟡 Bilanciata: 10 (coesione sociale)
    },
    scenarios: [
        {
            image: "https://placehold.co/400x400/228B22/FFFFFF?text=Nuovi+Semi",
            description: "Un mercante offre semi di una nuova varietà che promette raccolti triplicati, ma nessuno li ha mai testati.",
            choices: {
                yes: { 
                    text: "Compra i semi", 
                    effects: { 
                        raccolto: +3,       // ✅ Potenziale grande raccolto
                        esperienza: +2,     // ✅ Nuove tecniche
                        acqua: -2,          // ✅ Nuova varietà consuma più acqua
                        popolazione: +0,    // ❌ IGNORATO (rischio, ma non immediato)
                        tradizione: -2,     // ✅ Abbandono metodi antichi
                        comunita: -1        // ✅ Divisioni sulla scelta
                    }
                },
                no: { 
                    text: "Resta con i metodi tradizionali", 
                    effects: { 
                        raccolto: +1,       // ✅ Raccolto sicuro ma modesto
                        esperienza: +0,     // ❌ IGNORATO (nessuna innovazione)
                        acqua: +0,          // ❌ IGNORATO (non può aumentare)
                        popolazione: +0,    // ❌ IGNORATO (non può aumentare)
                        tradizione: +2,     // ✅ Preservazione cultura
                        comunita: +1        // ✅ Unità nella scelta conservatrice
                    }
                }
            }
        }
    ]
};
```

---

## 🎯 **PATTERN DI DESIGN PER 6 METRICHE**

### **Formula Vincente:**
```
2 Metriche di Crescita (🟢) = Obiettivi da raggiungere
2 Metriche di Deterioramento (🔴) = Risorse da conservare  
2 Metriche Bilanciate (🟡) = Equilibri da mantenere
```

### **Sinergie Intelligenti:**
- **Crescita + Deterioramento**: "Per ottenere X, devi spendere Y"
- **Bilanciata + Crescita**: "Il potere corrompe l'equilibrio"
- **Deterioramento + Bilanciata**: "Le perdite testano i valori"

### **Conflitti Strategici:**
- Scelte che aumentano crescita ma danneggiano deterioramento
- Decisioni etiche che limitano il potere
- Trade-off tra sicurezza e progresso

---

## ✅ **CHECKLIST CAPITOLO PERFETTO**

- [ ] 2 metriche crescita con nomi riconosciuti (tesoro, forza, magia, ecc.)
- [ ] 2 metriche deterioramento con nomi riconosciuti (salute, operai, acqua, ecc.)
- [ ] 2 metriche bilanciate con nomi neutri (onore, strategia, etica, ecc.)
- [ ] Scenari con trade-off interessanti tra tipi diversi
- [ ] Finali logici per ogni tipo di metrica
- [ ] Bilanciamento: non troppo facile accumulare crescita
- [ ] Tensione: deterioramento costante crea urgenza
- [ ] Complessità: scelte morali con metriche bilanciate

**🎮 RISULTATO = GAMEPLAY STRATIFICATO E COINVOLGENTE!**