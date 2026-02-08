export type ProfileType =
  | "old-school"
  | "strategique"
  | "anti-valentine"
  | "pression"
  | "minimaliste"
  | "reveur"
  | "emotionnel"
  | "simple";

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

  // Q1: Situation
  const q1 = answers[1] as number;
  if (q1 === 0) addScores(scores, { "anti-valentine": 1, simple: 1 });
  if (q1 === 1) addScores(scores, { reveur: 1, emotionnel: 1 });
  if (q1 === 2) addScores(scores, { "old-school": 1, simple: 1 });
  if (q1 === 3) addScores(scores, { pression: 1, emotionnel: 1 });
  if (q1 === 4) addScores(scores, { reveur: 2 });

  // Q3: Feeling
  const q3 = answers[3] as number;
  if (q3 === 0) addScores(scores, { "old-school": 2, emotionnel: 1 });
  if (q3 === 1) addScores(scores, { pression: 2 });
  if (q3 === 2) addScores(scores, { "anti-valentine": 2, simple: 1 });
  if (q3 === 3) addScores(scores, { pression: 2, strategique: 1 });
  if (q3 === 4) addScores(scores, { reveur: 2, emotionnel: 1 });

  // Q4: What is Valentine's
  const q4 = answers[4] as number;
  if (q4 === 0) addScores(scores, { "old-school": 2 });
  if (q4 === 1) addScores(scores, { strategique: 1, simple: 1 });
  if (q4 === 2) addScores(scores, { pression: 1, strategique: 1 });
  if (q4 === 3) addScores(scores, { "anti-valentine": 2 });
  if (q4 === 4) addScores(scores, { emotionnel: 1, reveur: 1 });

  // Q5: Obligation
  const q5 = answers[5] as number;
  if (q5 === 0) addScores(scores, { pression: 3 });
  if (q5 === 1) addScores(scores, { pression: 1, strategique: 1 });
  if (q5 === 2) addScores(scores, { "anti-valentine": 1, simple: 1, minimaliste: 1 });

  // Q6: If nothing organized
  const q6 = answers[6] as number;
  if (q6 === 0) addScores(scores, { "old-school": 2, emotionnel: 1 });
  if (q6 === 1) addScores(scores, { emotionnel: 1, reveur: 1 });
  if (q6 === 2) addScores(scores, { "anti-valentine": 1, simple: 1, minimaliste: 1 });
  if (q6 === 3) addScores(scores, { "anti-valentine": 2, minimaliste: 1 });

  // Q7: Love language
  const q7 = answers[7] as number;
  if (q7 === 0) addScores(scores, { "old-school": 2, strategique: 1 });
  if (q7 === 1) addScores(scores, { minimaliste: 2, simple: 1 });
  if (q7 === 2) addScores(scores, { emotionnel: 2, reveur: 1 });
  if (q7 === 3) addScores(scores, { simple: 2, minimaliste: 1 });
  if (q7 === 4) addScores(scores, { emotionnel: 1, minimaliste: 1 });

  // Q8: Ideal gift
  const q8 = answers[8] as number;
  if (q8 === 0) addScores(scores, { reveur: 2, "old-school": 1 });
  if (q8 === 1) addScores(scores, { emotionnel: 2, "old-school": 1 });
  if (q8 === 2) addScores(scores, { "old-school": 2, strategique: 1 });
  if (q8 === 3) addScores(scores, { reveur: 2, emotionnel: 1 });
  if (q8 === 4) addScores(scores, { minimaliste: 3, simple: 1 });

  // Q9: Budget
  const q9 = answers[9] as number;
  if (q9 === 0) addScores(scores, { "anti-valentine": 2, minimaliste: 1 });
  if (q9 === 1) addScores(scores, { simple: 2, minimaliste: 1 });
  if (q9 === 2) addScores(scores, { strategique: 2 });
  if (q9 === 3) addScores(scores, { "old-school": 2, pression: 1 });
  if (q9 === 4) addScores(scores, { strategique: 1, emotionnel: 1 });

  // Q10: Exceeded budget
  const q10 = answers[10] as number;
  if (q10 === 0) addScores(scores, { pression: 2, "old-school": 1 });
  if (q10 === 1) addScores(scores, { simple: 1, minimaliste: 1, "anti-valentine": 1 });
  if (q10 === 2) addScores(scores, { strategique: 1 });

  // Q12: Social media influence
  const q12 = answers[12] as number;
  if (q12 === 0) addScores(scores, { pression: 3 });
  if (q12 === 1) addScores(scores, { pression: 1, strategique: 1 });
  if (q12 === 2) addScores(scores, { "anti-valentine": 1, simple: 1 });

  // Q13: Compared relationship
  const q13 = answers[13] as number;
  if (q13 === 0) addScores(scores, { pression: 2, reveur: 1 });
  if (q13 === 1) addScores(scores, { pression: 1 });
  if (q13 === 2) addScores(scores, { simple: 1, "anti-valentine": 1 });

  // Q15: Most important
  const q15 = answers[15] as number;
  if (q15 === 0) addScores(scores, { emotionnel: 3 });
  if (q15 === 1) addScores(scores, { strategique: 2, "old-school": 1 });
  if (q15 === 2) addScores(scores, { minimaliste: 2, simple: 1 });
  if (q15 === 3) addScores(scores, { "old-school": 2 });
  if (q15 === 4) addScores(scores, { "anti-valentine": 2, minimaliste: 1 });

  // Find the top profile
  let maxScore = 0;
  let topProfile: ProfileType = "simple";
  for (const [key, val] of Object.entries(scores)) {
    if (val > maxScore) {
      maxScore = val;
      topProfile = key as ProfileType;
    }
  }

  return profiles[topProfile];
}
