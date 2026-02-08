export interface Question {
  id: number;
  section: string;
  sectionEmoji: string;
  text: string;
  type: "single" | "text";
  options?: string[];
}

export const questions: Question[] = [
  // SECTION 1 — Ta situation actuelle
  {
    id: 1,
    section: "Ta situation actuelle",
    sectionEmoji: "💝",
    text: "Actuellement, côté cœur tu es plutôt :",
    type: "single",
    options: [
      "Célibataire et tranquille",
      "Célibataire mais en recherche",
      "En couple et heureux",
      "En couple mais… compliqué",
      "C'est flou même pour moi",
    ],
  },
  {
    id: 2,
    section: "Ta situation actuelle",
    sectionEmoji: "💝",
    text: "Si tu es en couple, ça dure depuis :",
    type: "single",
    options: [
      "Moins de 6 mois",
      "6 mois – 2 ans",
      "2 – 5 ans",
      "Plus de 5 ans",
      "Non concerné",
    ],
  },
  {
    id: 3,
    section: "Ta situation actuelle",
    sectionEmoji: "💝",
    text: "Quand tu penses à la Saint-Valentin, tu ressens surtout :",
    type: "single",
    options: ["Excitation", "Stress", "Indifférence", "Pression", "Nostalgie"],
  },

  // SECTION 2 — Vérité sur la Saint-Valentin
  {
    id: 4,
    section: "Vérité sur la Saint-Valentin",
    sectionEmoji: "💔",
    text: "Pour toi, la Saint-Valentin c'est surtout :",
    type: "single",
    options: [
      "Une vraie fête romantique",
      "Une tradition sociale",
      "Une excuse pour dépenser",
      "Une journée comme une autre",
      "Ça dépend avec qui je suis",
    ],
  },
  {
    id: 5,
    section: "Vérité sur la Saint-Valentin",
    sectionEmoji: "💔",
    text: "Tu te sens obligé(e) de faire quelque chose ce jour-là ?",
    type: "single",
    options: ["Oui clairement", "Parfois", "Pas du tout"],
  },
  {
    id: 6,
    section: "Vérité sur la Saint-Valentin",
    sectionEmoji: "💔",
    text: "Si rien n'est organisé pour toi ce jour-là, tu serais :",
    type: "single",
    options: ["Très déçu(e)", "Un peu triste", "Indifférent(e)", "Soulagé(e)"],
  },

  // SECTION 3 — Cadeaux
  {
    id: 7,
    section: "Cadeaux",
    sectionEmoji: "🎁",
    text: "Ton vrai langage amoureux :",
    type: "single",
    options: [
      "Recevoir ou offrir des cadeaux",
      "Passer du temps ensemble",
      "Les mots et messages",
      "Les attentions du quotidien",
      "Le contact et la proximité",
    ],
  },
  {
    id: 8,
    section: "Cadeaux",
    sectionEmoji: "🎁",
    text: "Ton cadeau Valentine idéal :",
    type: "single",
    options: [
      "Voyage / sortie romantique",
      "Objet symbolique",
      "Dîner romantique",
      "Surprise totale",
      "Rien, juste être ensemble",
    ],
  },
  {
    id: 9,
    section: "Cadeaux",
    sectionEmoji: "🎁",
    text: "Budget réaliste Valentine :",
    type: "single",
    options: [
      "0 €",
      "Petit budget (< 30 €)",
      "Budget moyen (30 – 100 €)",
      "Gros budget (100 € +)",
      "Ça dépend de la relation",
    ],
  },
  {
    id: 10,
    section: "Cadeaux",
    sectionEmoji: "🎁",
    text: "Réponds honnêtement : As-tu déjà dépassé ton budget pour impressionner quelqu'un ?",
    type: "single",
    options: ["Oui 😅", "Non 😌", "Peut-être… 👀"],
  },
  {
    id: 11,
    section: "Cadeaux",
    sectionEmoji: "🎁",
    text: "As-tu déjà fait semblant d'aimer un cadeau ?",
    type: "single",
    options: [
      "Oui et plusieurs fois 🎭",
      "Oui une fois",
      "Jamais",
      "Je préfère être honnête",
    ],
  },

  // SECTION 4 — Réseaux sociaux
  {
    id: 12,
    section: "Réseaux sociaux",
    sectionEmoji: "📱",
    text: "Instagram / TikTok influencent ta vision du romantisme ?",
    type: "single",
    options: ["Beaucoup 📲", "Un peu", "Pas du tout 🚫"],
  },
  {
    id: 13,
    section: "Réseaux sociaux",
    sectionEmoji: "📱",
    text: "As-tu déjà comparé ta relation à celles que tu vois en ligne ?",
    type: "single",
    options: ["Oui 😬", "Parfois", "Jamais"],
  },

  // SECTION 5 — Vérités que peu avouent
  {
    id: 14,
    section: "Vérités que peu avouent",
    sectionEmoji: "🤫",
    text: "Le pire cadeau Valentine que tu pourrais recevoir :",
    type: "single",
    options: [
      "Rien du tout",
      "Un cadeau impersonnel",
      "Quelque chose hors budget",
      "Un message WhatsApp seulement 💀",
      "Une promesse non tenue",
    ],
  },
  {
    id: 15,
    section: "Vérités que peu avouent",
    sectionEmoji: "🤫",
    text: "La chose la plus importante ce jour-là :",
    type: "single",
    options: [
      "Se sentir aimé(e)",
      "L'effort fait par l'autre",
      "Le moment partagé",
      "Le cadeau",
      "La tranquillité",
    ],
  },

  // SECTION 6 — Storytelling
  {
    id: 16,
    section: "Storytelling",
    sectionEmoji: "✍️",
    text: "Ton moment Valentine le plus marquant :",
    type: "text",
  },
  {
    id: 17,
    section: "Storytelling",
    sectionEmoji: "✍️",
    text: "Décris ta Saint-Valentin parfaite en une phrase :",
    type: "text",
  },
];

export const getSectionNumber = (section: string): number => {
  const sections = [
    "Ta situation actuelle",
    "Vérité sur la Saint-Valentin",
    "Cadeaux",
    "Réseaux sociaux",
    "Vérités que peu avouent",
    "Storytelling",
  ];
  return sections.indexOf(section) + 1;
};
