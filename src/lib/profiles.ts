export type ProfileType =
  | "old-school"
  | "strategique"
  | "anti-valentine"
  | "pression"
  | "minimaliste"
  | "reveur"
  | "emotionnel"
  | "simple";

export interface TraitScores {
  romantisme: number;
  spontaneite: number;
  effort: number;
  chill: number;
  creativite: number;
}

export interface Profile {
  id: ProfileType;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
}

export const profiles: Record<ProfileType, Profile> = {
  "old-school": {
    id: "old-school",
    name: "Lover Old School",
    emoji: "Rose",
    tagline: "Le romantisme, c'est un art de vivre.",
    description:
      "Tu crois aux grandes déclarations, aux roses rouges et aux dîners aux chandelles. La Saint-Valentin, c'est sacré pour toi. Tu assumes pleinement et tu fais les choses en grand.",
  },
  strategique: {
    id: "strategique",
    name: "Romantique Stratégique",
    emoji: "Target",
    tagline: "L'amour, c'est aussi de l'organisation.",
    description:
      "Tu planifies tout : le resto, le cadeau, le timing parfait. Rien n'est laissé au hasard. Tu veux que tout soit impeccable parce que l'effort, c'est ta façon d'aimer.",
  },
  "anti-valentine": {
    id: "anti-valentine",
    name: "Anti-Valentine Discret",
    emoji: "Ghost",
    tagline: "L'amour ne se commande pas au calendrier.",
    description:
      "La Saint-Valentin ? Très peu pour toi. Tu préfères montrer ton amour au quotidien, pas quand le marketing te le dicte. Et tu assumes totalement.",
  },
  pression: {
    id: "pression",
    name: "Lover Pression Sociale",
    emoji: "Smartphone",
    tagline: "Entre ce que tu veux et ce qu'on attend de toi…",
    description:
      "Tu ressens la pression : les stories Instagram parfaites, les attentes de l'autre, le budget qui explose… Tu fais souvent les choses plus par obligation que par envie. Respire.",
  },
  minimaliste: {
    id: "minimaliste",
    name: "Lover Minimaliste",
    emoji: "Sparkles",
    tagline: "Moins c'est plus. Surtout en amour.",
    description:
      "Pas besoin de grands gestes ni de cadeaux extravagants. Un câlin, un film, un moment à deux — c'est ta définition du bonheur. Simple mais sincère.",
  },
  reveur: {
    id: "reveur",
    name: "Lover Rêveur",
    emoji: "CloudMoon",
    tagline: "La réalité est belle, mais l'imaginaire l'est encore plus.",
    description:
      "Tu idéalises l'amour, tu imagines des scénarios dignes d'un film. La réalité ne suit pas toujours, mais tu continues de rêver. Et c'est ce qui te rend unique.",
  },
  emotionnel: {
    id: "emotionnel",
    name: "Lover Émotionnel",
    emoji: "Zap",
    tagline: "Les sentiments avant tout, toujours.",
    description:
      "Ce qui compte pour toi, c'est l'émotion brute, la sincérité, le cœur qui bat. Un regard, un mot juste, un geste vrai — ça vaut tous les cadeaux du monde.",
  },
  simple: {
    id: "simple",
    name: "Lover Simple",
    emoji: "Sun",
    tagline: "L'amour n'a pas besoin d'être compliqué.",
    description:
      "Pas de drama, pas de prise de tête. L'amour c'est simple pour toi et ça devrait le rester. Tu profites des bons moments sans te stresser.",
  },
};

type Scores = Record<ProfileType, number>;

const addScores = (scores: Scores, additions: Partial<Scores>) => {
  for (const [key, val] of Object.entries(additions)) {
    scores[key as ProfileType] += val as number;
  }
};

export function calculateProfile(
  answers: Record<number, number | string>
): Profile {
  const scores: Scores = {
    "old-school": 0,
    strategique: 0,
    "anti-valentine": 0,
    pression: 0,
    minimaliste: 0,
    reveur: 0,
    emotionnel: 0,
    simple: 0,
  };

  // --- LOGIQUE DE SCORING RENFORCÉE ---

  // Q6: Attitude face à la fête
  // 0: C'est important -> Old School / Rêveur
  // 1: Occasion de se faire plaisir -> Simple / Émotionnel
  // 2: Trop commercial -> Anti-Valentine / Minimaliste
  // 3: Une corvée -> Pression / Anti-Valentine
  const q6 = answers[6] as number;
  if (q6 === 0) addScores(scores, { "old-school": 4, reveur: 2, strategique: 1 });
  if (q6 === 1) addScores(scores, { simple: 4, emotionnel: 3 });
  if (q6 === 2) addScores(scores, { "anti-valentine": 4, minimaliste: 3 });
  if (q6 === 3) addScores(scores, { pression: 4, "anti-valentine": 2 });

  // Q7: Niveau d'importance (0-4)
  // 0 (Pas du tout) -> Anti / Minimaliste
  // 2 (Moyen) -> Simple / Émotionnel
  // 4 (Vital) -> Old School / Pression / Stratégique
  const q7 = answers[7] as number;
  if (q7 === 0) addScores(scores, { "anti-valentine": 3, minimaliste: 2 });
  if (q7 === 1) addScores(scores, { simple: 3, minimaliste: 2 });
  if (q7 === 2) addScores(scores, { simple: 2, emotionnel: 3 });
  if (q7 === 3) addScores(scores, { "old-school": 2, strategique: 2, reveur: 1 });
  if (q7 === 4) addScores(scores, { "old-school": 4, pression: 3, strategique: 2 });

  // Q8: Pression Sociale
  // 0: Énormément -> Pression
  // 1: Un peu -> Émotionnel / Stratégique
  // 2: Pas du tout -> Simple / Anti / Minimaliste
  const q8 = answers[8] as number;
  if (q8 === 0) addScores(scores, { pression: 5, strategique: 2 });
  if (q8 === 1) addScores(scores, { emotionnel: 2, strategique: 1 });
  if (q8 === 2) addScores(scores, { simple: 3, "anti-valentine": 2, minimaliste: 2 });

  // Q16: Influence Réseaux (0=Beaucoup, 1=Peu, 2=Non, 3=Néant)
  const q16 = answers[16] as number;
  if (q16 === 0) addScores(scores, { pression: 5, strategique: 2 });
  if (q16 === 1) addScores(scores, { reveur: 2, strategique: 1 });
  if (q16 >= 2) {
    scores.pression = -50; // VETO: Pas de réseaux = Pas de pression sociale digitale
    addScores(scores, { simple: 2, "anti-valentine": 2, minimaliste: 2 });
  }

  // Q17: Réseau principal (0=Aucun, 1=Instagram, 2=TikTok, 3=Facebook, 4=Snapchat, 5=Autre, 6=Aucune appli)
  const q17 = answers[17] as number;
  if (q17 === 6) { // Aucune appli
    scores.pression = -50;
    addScores(scores, { "anti-valentine": 2, simple: 2, minimaliste: 2 });
  }

  // Q9: Budget (0-4)
  // 0 (0€) -> Anti / Minimaliste
  // 1 (<50€) -> Simple / Minimaliste
  // 2 (50-100€) -> Émotionnel / Simple
  // 3 (100-200€) -> Old School / Stratégique
  // 4 (>200€) -> Pression / Old School / Rêveur
  const q9 = answers[9] as number;
  if (q9 === 0) addScores(scores, { "anti-valentine": 4, minimaliste: 3 });
  if (q9 === 1) addScores(scores, { simple: 3, minimaliste: 3 });
  if (q9 === 2) addScores(scores, { emotionnel: 2, simple: 2, "old-school": 1 });
  if (q9 === 3) addScores(scores, { "old-school": 3, strategique: 3 });
  if (q9 === 4) addScores(scores, { pression: 3, strategique: 2, reveur: 3 });

  // Q10: Type de cadeau préféré
  // 0: Expérience -> Rêveur / Émotionnel
  // 1: Matériel -> Stratégique
  // 2: Temps/Attention -> Émotionnel / Simple / Minimaliste
  // 3: Surprise -> Rêveur / Old School
  // 4: Rien -> Anti / Minimaliste
  const q10 = answers[10] as number;
  if (q10 === 0) addScores(scores, { reveur: 3, emotionnel: 2 });
  if (q10 === 1) addScores(scores, { strategique: 4, "old-school": 1 });
  if (q10 === 2) addScores(scores, { emotionnel: 4, simple: 3, minimaliste: 3 });
  if (q10 === 3) addScores(scores, { reveur: 3, "old-school": 3 });
  if (q10 === 4) addScores(scores, { "anti-valentine": 4, minimaliste: 2 });

  // Q12: Stress financier (0=Oui, 1=Non)
  // Oui -> Pression
  // Non -> Simple / Chill
  const q12 = answers[12] as number;
  if (q12 === 0) addScores(scores, { pression: 3 });
  if (q12 === 1) addScores(scores, { simple: 1, minimaliste: 1 });

  // Q14: Organisation / Surprise
  // 0: J'adore les surprises -> Rêveur
  // 1: Liste précise -> Stratégique / Pression
  // 2: On décide ensemble -> Simple / Émotionnel
  // 3: Aucune prėf -> Chill / Simple
  const q14 = answers[14] as number;
  if (q14 === 0) addScores(scores, { reveur: 3, "old-school": 1 });
  if (q14 === 1) addScores(scores, { strategique: 4, pression: 2 });
  if (q14 === 2) addScores(scores, { simple: 5, emotionnel: 2 }); // Grosse signature "Simple"
  if (q14 === 3) addScores(scores, { simple: 3, minimaliste: 2 });

  // Q15: Qui gère l'orga ?
  // 0: Moi (tout le monde compte sur moi) -> Pression / Stratégique
  // 1: Mon partenaire -> Chill / Simple
  // 2: Équipe -> Simple / Émotionnel
  // 3: Freestyle -> Rêveur / Anti
  const q15 = answers[15] as number;
  if (q15 === 0) addScores(scores, { strategique: 3, pression: 2 });
  if (q15 === 1) addScores(scores, { simple: 2, minimaliste: 1 });
  if (q15 === 2) addScores(scores, { simple: 3, emotionnel: 3 });
  if (q15 === 3) addScores(scores, { reveur: 2, "anti-valentine": 2, simple: 1 });

  // Q16 Logic already handled above with veto

  // --- ARBITRAGE FINAL ---
  // Si le score Pression est élevé mais annulé par le veto Q16/Q17, il sera déjà négatif grâce à la pénalité -50.
  // Cependant, vérifions la cohérence globale.

  let maxScore = -999;
  let topProfile: ProfileType = "simple";

  // En cas d'égalité, on favorise un ordre de "priorité" pour éviter le hasard total
  const priorityOrder: ProfileType[] = [
    "pression", "anti-valentine", "old-school", "strategique", "reveur", "emotionnel", "simple", "minimaliste"
  ];
  // Pression est prioritaire car c'est un signal d'alarme important à détecter

  // On check d'abord les scores bruts
  for (const key of priorityOrder) {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      topProfile = key;
    }
  }

  // Petit boost contextuel si égalité ou score très serré
  // Si Pression et Simple sont proches, mais Budget est Élevé -> Pression gagne
  if (scores["pression"] >= scores[topProfile] - 2 && q9 >= 3) {
    topProfile = "pression";
  }

  return profiles[topProfile];
}

export function calculateTraits(answers: Record<number, number | string>): TraitScores {
  // Base scores (everyone starts with a bias, e.g. 20-40)
  let traits = {
    romantisme: 30,
    spontaneite: 40,
    effort: 30,
    chill: 40,
    creativite: 20,
  };

  const add = (t: Partial<TraitScores>) => {
    for (const [key, val] of Object.entries(t)) {
      // @ts-ignore
      traits[key] += val;
    }
  };

  // Q6: Attitude
  const q6 = answers[6] as number;
  if (q6 === 0) add({ romantisme: 20 }); // Important
  if (q6 === 1) add({ chill: 20, romantisme: 10 }); // Plaisir
  if (q6 === 2) add({ chill: 10, effort: -10 }); // Commercial
  if (q6 === 3) add({ chill: -20, effort: 30 }); // Corvée (effort forcé)

  // Q7: Importance
  const q7 = answers[7] as number;
  // 0=Pas du tout ... 4=Vital
  if (q7 >= 3) add({ romantisme: 20, effort: 20 });
  if (q7 <= 1) add({ chill: 20, romantisme: -10 });

  // Q8: Pression Sociale
  const q8 = answers[8] as number;
  if (q8 === 0) add({ chill: 30 }); // M'en fiche
  if (q8 === 2) add({ chill: -30, effort: 10 }); // Pression max

  // Q9: Budget
  const q9 = answers[9] as number;
  if (q9 === 0) add({ effort: -10, creativite: 10 }); // 0€ -> faut être créatif ou chill
  if (q9 >= 3) add({ effort: 30, romantisme: 10 }); // Gros budget

  // Q10: Cadeau
  const q10 = answers[10] as number;
  if (q10 === 0) add({ creativite: 25, romantisme: 15 }); // Expérience
  if (q10 === 1) add({ effort: 10, creativite: -10 }); // Matériel
  if (q10 === 2) add({ romantisme: 20, effort: 10 }); // Temps/Attention
  if (q10 === 3) add({ spontaneite: 20, romantisme: 15 }); // Surprise
  if (q10 === 4) add({ chill: 20 }); // Rien

  // Q14: Surprise vs Orga
  const q14 = answers[14] as number;
  if (q14 === 0) add({ romantisme: 20, spontaneite: 20 }); // J'adore les surprises
  if (q14 === 1) add({ effort: 20, spontaneite: -20 }); // Liste précise
  if (q14 === 2) add({ chill: 10, effort: 10 }); // On décide ensemble
  if (q14 === 3) add({ chill: 20, spontaneite: 10 }); // Aucune pref

  // Q15: Qui gère
  const q15 = answers[15] as number;
  if (q15 === 0) add({ effort: 30 }); // Moi
  if (q15 === 3) add({ spontaneite: 30, creativite: 10 }); // Freestyle

  // Normalize to 0-100
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  return {
    romantisme: clamp(traits.romantisme),
    spontaneite: clamp(traits.spontaneite),
    effort: clamp(traits.effort),
    chill: clamp(traits.chill),
    creativite: clamp(traits.creativite),
  };
}
