import { COUNTRIES } from "@/data/countries";

export interface Question {
  id: number;
  section: string;
  sectionEmoji: string;
  text: string;
  type: "single" | "text" | "select";
  options?: string[];
}

export const questions: Question[] = [
  // SECTION 1 — PROFIL
  {
    id: 1,
    section: "Profil",
    sectionEmoji: "Heart",
    text: "Ton genre :",
    type: "single",
    options: ["Homme", "Femme", "Non-binaire", "Préfère ne pas dire"],
  },
  {
    id: 2,
    section: "Profil",
    sectionEmoji: "Heart",
    text: "Ta tranche d'âge :",
    type: "single",
    options: ["18-24 ans", "25-34 ans", "35-49 ans", "50 ans et +"],
  },
  {
    id: 3,
    section: "Profil",
    sectionEmoji: "Heart",
    text: "Ton pays de résidence :",
    type: "select",
  },
  {
    id: 4,
    section: "Profil",
    sectionEmoji: "Heart",
    text: "Ton statut relationnel :",
    type: "single",
    options: [
      "Célibataire",
      "En couple",
      "C'est compliqué",
      "Marié(e) / Pacsé(e)",
    ],
  },
  {
    id: 5,
    section: "Profil",
    sectionEmoji: "Heart",
    text: "Durée de la relation (si couple) :",
    type: "single",
    options: [
      "Moins de 6 mois",
      "6 mois - 2 ans",
      "2 - 5 ans",
      "Plus de 5 ans",
      "Non concerné",
    ],
  },

  // SECTION 2 — PERCEPTION VALENTINE
  {
    id: 6,
    section: "Perception Valentine",
    sectionEmoji: "HeartCrack",
    text: "Aimes-tu célébrer la Saint-Valentin ?",
    type: "single",
    options: [
      "Oui, j'adore !",
      "Un peu, pour l'occasion",
      "Pas du tout",
      "C'est une corvée commerciale",
    ],
  },
  {
    id: 7,
    section: "Perception Valentine",
    sectionEmoji: "HeartCrack",
    text: "Quelle importance accordes-tu à cette date (1 à 5) ?",
    type: "single",
    options: [
      "1 - Aucune",
      "2 - Faible",
      "3 - Moyenne",
      "4 - Forte",
      "5 - Cruciale",
    ],
  },
  {
    id: 8,
    section: "Perception Valentine",
    sectionEmoji: "HeartCrack",
    text: "Ressens-tu une pression sociale autour de cette fête ?",
    type: "single",
    options: ["Énormément", "Un peu", "Pas du tout"],
  },

  // SECTION 3 — CADEAUX & BUDGET
  {
    id: 9,
    section: "Cadeaux & Budget",
    sectionEmoji: "Gift",
    text: "Ton budget prévu cette année :",
    type: "single",
    options: [
      "0 € (Rien prévu)",
      "Petit (< 50 €)",
      "Moyen (50 - 100 €)",
      "Confortable (100 - 200 €)",
      "Illimité (200 € +)",
    ],
  },
  {
    id: 10,
    section: "Cadeaux & Budget",
    sectionEmoji: "Gift",
    text: "Ton type de cadeau préféré :",
    type: "single",
    options: [
      "Expérience (Voyage, Resto)",
      "Objet matériel (Bijou, Tech)",
      "Temps de qualité ensemble",
      "Surprise totale",
      "Aucun cadeau",
    ],
  },
  {
    id: 11,
    section: "Cadeaux & Budget",
    sectionEmoji: "Gift",
    text: "Pour toi, c'est quoi le PIRE cadeau ?",
    type: "single",
    options: [
      "Rien du tout",
      "Un truc 'utile' (électroménager)",
      "Un truc kitch (nounours géant)",
      "De l'argent cash",
      "Une carte cadeau impersonnelle",
    ],
  },

  // SECTION 4 — DIFFICULTÉS & RÉALITÉS
  {
    id: 12,
    section: "Difficultés & Réalités",
    sectionEmoji: "Lock",
    text: "As-tu déjà ressenti un stress financier lié à la Saint-Valentin ?",
    type: "single",
    options: ["Oui, souvent", "Une fois", "Jamais"],
  },
  {
    id: 13,
    section: "Difficultés & Réalités",
    sectionEmoji: "Lock",
    text: "As-tu déjà reçu un cadeau que tu n'aimais pas ?",
    type: "single",
    options: [
      "Oui (et j'ai menti)",
      "Oui (et je l'ai dit)",
      "Jamais",
    ],
  },
  {
    id: 14,
    section: "Difficultés & Réalités",
    sectionEmoji: "Lock",
    text: "Préférence : Surprise ou Liste de souhaits ?",
    type: "single",
    options: [
      "J'adore les surprises",
      "Je donne une liste précise (pas de risque)",
      "On décide du cadeau ensemble",
    ],
  },

  // SECTION 5 — FUN & STORYTELLING
  {
    id: 15,
    section: "Fun & Storytelling",
    sectionEmoji: "PenTool",
    text: "Ton cadeau le plus inattendu reçu (ou offert) ?",
    type: "text",
  },
  {
    id: 16,
    section: "Fun & Storytelling",
    sectionEmoji: "PenTool",
    text: "Raconte ta pire (ou meilleure) expérience Valentine :",
    type: "text",
  },
  {
    id: 17,
    section: "Fun & Storytelling",
    sectionEmoji: "PenTool",
    text: "Ton idéal de Saint-Valentin en 3 mots :",
    type: "text",
  },
];

export const getSectionNumber = (section: string): number => {
  const sections = [
    "Profil",
    "Perception Valentine",
    "Cadeaux & Budget",
    "Difficultés & Réalités",
    "Fun & Storytelling",
  ];
  const index = sections.indexOf(section);
  return index !== -1 ? index + 1 : 0;
};
