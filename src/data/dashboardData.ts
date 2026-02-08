import { LucideIcon } from "lucide-react";
import { getIcon } from "@/lib/icons";

export interface DataPoint {
    name: string;
    value: number;
    label?: string;
    fill?: string;
    icon?: LucideIcon;
}

export interface Metric {
    label: string;
    value: string | number;
    change?: number; // percentage
    trend?: "up" | "down" | "neutral";
}

export const DEMOGRAPHICS = {
    gender: [
        { name: "Femmes", value: 58, fill: "#dc3c78" },
        { name: "Hommes", value: 38, fill: "#636e72" },
        { name: "Non-binaire/Autre", value: 4, fill: "#a29bfe" },
    ],
    status: [
        { name: "Célibataire", value: 30, fill: "#fd79a8" },
        { name: "En couple (récent)", value: 15, fill: "#e17055" },
        { name: "En couple (long terme)", value: 35, fill: "#d63031" },
        { name: "Relation à distance", value: 15, fill: "#a29bfe" }, // Matches Q4 option
        { name: "C'est compliqué", value: 5, fill: "#636e72" },
    ],
    age: [
        { name: "18-24", value: 25, fill: "#a29bfe" },
        { name: "25-34", value: 40, fill: "#dc3c78" },
        { name: "35-44", value: 20, fill: "#00b894" },
        { name: "45+", value: 15, fill: "#e2a042" },
    ],
};

export const LOVE_PRESSURE = {
    score: 68, // out of 100
    breakdown: [
        { subject: "Attentes", A: 85, fullMark: 100 },
        { subject: "Budget", A: 70, fullMark: 100 },
        { subject: "Comparaison", A: 60, fullMark: 100 },
        { subject: "Planification", A: 55, fullMark: 100 },
        { subject: "Cadeau", A: 75, fullMark: 100 },
    ],
    history: [
        { time: "J-7", pressure: 45 },
        { time: "J-5", pressure: 52 },
        { time: "J-3", pressure: 60 },
        { time: "J-1", pressure: 85 },
        { time: "Jour J", pressure: 95 },
    ],
};

export const BUDGET_INSIGHTS = {
    distribution: [
        { range: "0€", count: 150 },
        { range: "<30€", count: 280 },
        { range: "30-100€", count: 320 },
        { range: "100€+", count: 120 },
        { range: "Secret", count: 80 },
    ],
    byStatus: [
        { status: "Célibataire", avg: 25 },
        { status: "Couple récent", avg: 65 },
        { status: "Couple long", avg: 90 },
        { status: "Distance", avg: 75 }, // Added LDR context
        { status: "Compliqué", avg: 15 },
    ],
};

export const SENTIMENT_ANALYSIS = {
    positive: 42,
    negative: 28,
    neutral: 30,
    keywords: [
        { text: "surcoté", value: 60 },
        { text: "commerce", value: 55 },
        { text: "amour", value: 50 },
        { text: "restaurant", value: 45 },
        { text: "stress", value: 40 },
        { text: "mignon", value: 35 },
        { text: "flemme", value: 30 },
        { text: "fleurs", value: 25 },
        { text: "seul", value: 20 },
        { text: "chocolat", value: 15 },
    ],
};

export const PERCEPTION_DATA = {
    importance: [
        { name: "Non, osef", value: 35, fill: "#636e72" },
        { name: "Un peu", value: 25, fill: "#a29bfe" },
        { name: "Beaucoup", value: 25, fill: "#fd79a8" },
        { name: "À la folie", value: 15, fill: "#dc3c78" },
    ],
    attitude: [
        { name: "Amoureux de l'Amour", value: 45, fill: "#dc3c78" }, // J'adore
        { name: "Sceptiques Commerciaux", value: 30, fill: "#636e72" }, // Corvée
        { name: "Indifférents", value: 15, fill: "#d63031" }, // Pas du tout
        { name: "Suiveurs d'Occasion", value: 10, fill: "#fdcb6e" }, // Un peu
    ],
};

export const GIFT_INSIGHTS = {
    preferences: [
        { name: "Expérience (Voyage, Resto)", value: 45, fill: "#e84393" },
        { name: "Attention (Lettre, DIY)", value: 25, fill: "#fd79a8" },
        { name: "Objet (Bijou, Tech)", value: 20, fill: "#a29bfe" },
        { name: "Rien", value: 10, fill: "#b2bec3" },
    ],
    byGender: [
        { name: "Expérience", Hommes: 40, Femmes: 50 },
        { name: "Attention", Hommes: 20, Femmes: 30 },
        { name: "Objet", Hommes: 30, Femmes: 15 },
        { name: "Rien", Hommes: 10, Femmes: 5 },
    ],
};

export const SOCIAL_IMPACT = {
    influenceScore: 72, // /100
    networkComparison: [
        { name: "Instagram", pressure: 85, satisfaction: 40 },
        { name: "TikTok", pressure: 75, satisfaction: 55 },
        { name: "Snapchat", pressure: 45, satisfaction: 60 },
        { name: "Twitter/X", pressure: 65, satisfaction: 30 },
        { name: "Pinterest", pressure: 20, satisfaction: 90 },
    ],
};

export const SCATTER_DATA = {
    budgetVsPressure: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 300), // Budget
        y: Math.floor(Math.random() * 100), // Pressure
        z: Math.floor(Math.random() * 100), // Importance (Bubble size)
    })),
};

export const ADVANCED_SCORES = {
    romanceAuthenticity: {
        value: 64,
        label: "Authenticité",
        description: "Mesure la sincérité des attentes vs pression sociale",
        trend: "stable",
    },
    economicStress: {
        value: 42,
        label: "Stress Éco",
        description: "Impact du budget sur le bien-être relationnel",
        trend: "down",
    },
    socialInfluence: {
        value: 78,
        label: "Influence Sociale",
        description: "Degré d'impact des réseaux sur les décisions",
        trend: "up",
    },
};

export const GEO_DATA = [
    { city: "Lomé", country: "Togo", lat: 6.1319, lng: 1.2228, score: 85, budget: 45, count: 40 },
    { city: "Ouagadougou", country: "Burkina Faso", lat: 12.3714, lng: -1.5197, score: 78, budget: 35, count: 35 },
    { city: "Dakar", country: "Sénégal", lat: 14.7167, lng: -17.4677, score: 82, budget: 60, count: 45 },
    { city: "Abidjan", country: "Côte d'Ivoire", lat: 5.3600, lng: -4.0083, score: 70, budget: 55, count: 50 },
    { city: "Casablanca", country: "Maroc", lat: 33.5731, lng: -7.5898, score: 65, budget: 80, count: 30 },
    { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, score: 55, budget: 120, count: 17 },
    { city: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090, score: 60, budget: 30, count: 0 },
    { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, score: 55, budget: 25, count: 0 },
    { city: "Kabul", country: "Afghanistan", lat: 34.5553, lng: 69.2075, score: 40, budget: 15, count: 0 },
];

export const REAL_TIME_METRICS: Metric[] = [
    { label: "Participants", value: 12453, change: 12, trend: "up" },
    { label: "Budget Moyen", value: "54 €", change: -2, trend: "down" },
    { label: "Love Pressure", value: "Wait...", change: 5, trend: "up" }, // Dynamic visual
];
