# Logique de Détermination des Profils Valentine Vibes Check

Ce document détaille comment l'algorithme attribue les points à chaque profil en fonction des réponses aux questions.

## Les 8 Profils Types

1.  🌹 **Lover Old School** : L'amour traditionnel, romantique, roses rouges, "c'est important".
2.  🎯 **Romantique Stratégique** : L'amour organisé, planifié, efficace, listes de cadeaux, budget géré.
3.  👻 **Anti-Valentine Discret** : Refuse le commercial, préfère l'amour au quotidien, "pas le 14 février".
4.  📱 **Lover Pression Sociale** : Stressé par Instagram, peur de décevoir, budget explosé par obligation.
5.  ✨ **Lover Minimaliste** : Simplicité volontaire, peu de dépenses, "moins c'est plus".
6.  ☁️ **Lover Rêveur** : Idéaliste, aime les surprises, l'expérience, la magie, parfois déconnecté du réel.
7.  ⚡ **Lover Émotionnel** : Tout pour les sentiments, le temps de qualité, l'attention sincère.
8.  ☀️ **Lover Simple** : Pas de stress, cool, suit le mouvement, "on verra bien".

---

## Logique de Points par Question

L'algorithme part de 0 pour tous les profils. Chaque réponse ajoute des points. À la fin, le score le plus élevé l'emporte.

### Q6 : Aimes-tu célébrer la Saint-Valentin ?
*   "Oui, j'adore !" (+5 Old School, +3 Rêveur, +2 Stratégique)
*   "Un peu, pour l'occasion" (+2 Simple, +3 Émotionnel)
*   "Pas du tout" (+5 Anti-Valentine, +3 Minimaliste)
*   "C'est une corvée commerciale" (+5 Pression, +3 Anti-Valentine)

### Q7 : Quelle importance accordes-tu à cette date ?
*   "1 - Aucune" (+3 Anti-Valentine, +3 Minimaliste)
*   "2 - Faible" (+2 Simple, +2 Minimaliste)
*   "3 - Moyenne" (+1 Simple, +3 Émotionnel)
*   "4 - Forte" (+3 Old School, +2 Stratégique, +2 Rêveur)
*   "5 - Cruciale" (+5 Old School, +2 Pression, +2 Stratégique)

### Q8 : Ressens-tu une pression sociale ?
*   "Énormément" (+6 Pression, +2 Stratégique)
*   "Un peu" (+2 Émotionnel, +1 Stratégique)
*   "Pas du tout" (+2 Simple, +2 Anti-Valentine, +2 Minimaliste)

### Q9 : Ton budget prévu ?
*   "0 €" (+4 Anti-Valentine, +3 Minimaliste)
*   "< 50 €" (+3 Simple, +3 Minimaliste)
*   "50 - 100 €" (+2 Émotionnel, +2 Simple, +1 Old School)
*   "100 - 200 €" (+3 Old School, +3 Stratégique)
*   "> 200 €" (+3 Pression, +2 Stratégique, +3 Rêveur)

### Q10 : Ton type de cadeau préféré (DOUBLE POIDS)
*   "Expérience (Voyage...)" (+8 Rêveur, +4 Émotionnel, +2 Old School)
*   "Matériel (Bijou...)" (+8 Stratégique, +2 Pression)
*   "Temps de qualité" (+6 Émotionnel, +4 Simple, +3 Minimaliste)
*   "Surprise totale" (+6 Rêveur, +5 Old School)
*   "Aucun cadeau" (+6 Anti-Valentine, +5 Minimaliste, +2 Simple)

### Q12 : Stress financier ?
*   "Oui, souvent" (+3 Pression)
*   "Une fois/Jamais" (+1 Simple, +1 Minimaliste)

### Q14 : Préférence Surprise ou Liste ? (DOUBLE POIDS)
*   "J'adore les surprises" (+8 Rêveur, +2 Old School)
*   "Liste précise" (+8 Stratégique, +3 Pression, +1 Old School)
*   "On décide ensemble" (+5 Simple, +5 Émotionnel)
*   "Aucune préférence" (+2 Simple, +4 Minimaliste, +2 Anti-Valentine)

### Q15 : Qui gère l'organisation ?
*   "Tout repose sur moi" (+6 Stratégique, +3 Pression, +2 Old School)
*   "Mon partenaire" (+3 Simple, +3 Minimaliste, +2 Rêveur)
*   "Ensemble" (+4 Simple, +4 Émotionnel)
*   "Improvisation / Rien" (+5 Rêveur, +3 Anti-Valentine, +3 Simple)

### Q16 & Q17 : Influence Réseaux (VETO)
*   Si "Je me compare beaucoup" -> +6 Pression
*   Si "Pas du tout" ou "Aucune appli" -> **VETO PRESSION** (Le score Pression est mis à -50, impossible d'être Pression Sociale sans réseaux).

---

## Arbitrage en cas d'égalité

Si plusieurs profils ont exactement le même score (rare désormais), l'ordre de priorité est le suivant (du plus prioritaire au moins prioritaire) :
1.  **Old School** 🌹
2.  **Rêveur** ☁️
3.  **Stratégique** 🎯
4.  **Émotionnel** ⚡
5.  **Pression** 📱
6.  **Anti-Valentine** 👻
7.  **Simple** ☀️
8.  **Minimaliste** ✨

*Cela signifie qu'un romantique old school gagnera toujours contre un "simple" à points égaux, car le profil est plus marqué.*
