# Plan de Dashboard Avancé - Valentine Vibes Check 2026

Ce document détaille les fonctionnalités et visualisations à implémenter pour créer un dashboard "Portfolio Level" comme demandé.

## 1. Visualisations descriptives classiques (Base dashboard) ✅
- [x] **Distribution des participants**
    - [x] Nombre total de répondants (compteur live)
    - [x] Répartition par genre
    - [x] Répartition par tranche d’âge
    - [x] Répartition par statut relationnel
- [ ] **Répartition géographique** (Carte/Heatmap) - *À envisager si librairie de map légère disponible*

## 2. Perception de la Saint-Valentin 🚧
- [ ] **Importance de Valentine** (Bar chart ou donut)
- [x] **Émotions dominantes** (Déjà partiellement fait dans DashboardLive original, à réintégrer)
- [ ] **Répartition perception** (Romantique vs Pression vs Tradition vs Indifférence)

## 3. Budget Valentine ✅
- [x] **Distribution budget** (Histogramme)
- [x] **Budget moyen par statut relationnel**

## 4. Préférences Cadeaux 🆕
- [ ] **Type cadeau préféré** (Bar chart)
- [ ] **Cadeaux vs Genre** (Comparaison)
- [ ] **Cadeaux vs Love Language** (Comparaison)

## 5. Influence Réseaux Sociaux 🆕
- [ ] **Impact réseaux sociaux global** (Gauge/Score)
- [ ] **Réseaux sociaux vs Pression** (Scatter/Correlation)

## 6. Visualisations Relationnelles (Corrélations) 🆕
- [ ] **Heatmap corrélations** (Pression/Budget/Influence/Satisfaction)
- [ ] **Scatter plot** Budget vs Pression

## 7. Visualisations Comportementales Avancées
- [x] **Love Language Distribution** (Pie Chart)
- [ ] **Profil Amoureux** (Radar chart comparatif des profils)

## 8. Indices Composites (Scores) 🆕
- [x] **Love Pressure Index**
- [ ] **Romance Authenticity Score**
- [ ] **Valentine Economic Stress Score**
- [ ] **Social Influence Score**

## 9. Visualisations NLP / Sentiment ✅
- [x] **Sentiment Cloud** (Word cloud)
- [x] **Sentiment Gauge** (Positif/Négatif)

## 10. Temps Réel & Storytelling
- [x] **AI Insights Live Feed**
- [ ] **Météo émotionnelle** (Visualisation temporelle)

---

## Plan d'Implémentation Technique

### Etape 1 : Data Engineering (Mock)
- Enrichir `data/dashboardData.ts` avec les nouvelles métriques nécessaires.

### Etape 2 : Nouveaux Composants
1.  `PerceptionCharts.tsx`: Importance, Perception types, Social Media Impact.
2.  `GiftInsights.tsx`: Préférences cadeaux et corrélations croisées.
3.  `AdvancedScores.tsx`: Jauges pour Romance Authenticity, Economic Stress, Social Influence.
4.  `CorrelationInsights.tsx`: Scatter plots pour montrer les liens entre variables.

### Etape 3 : Assemblage
- Mettre à jour `DashboardLive.tsx` pour inclure ces nouvelles sections dans une grille responsive, avec une navigation par onglets ou un scroll infini bien structuré.
