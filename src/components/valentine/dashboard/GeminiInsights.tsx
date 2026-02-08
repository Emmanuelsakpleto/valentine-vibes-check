import { useState, useEffect } from "react";
import { Lightbulb, Sparkles, TrendingUp, AlertCircle, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_INSIGHTS = [
    {
        type: "TENDANCE",
        icon: TrendingUp,
        content: "Le budget moyen des <span class='font-medium text-foreground'>18-24 ans</span> a augmenté de 15% cette année.",
    },
    {
        type: "CORRÉLATION",
        icon: AlertCircle,
        content: "Forte corrélation (0.8) entre l'utilisation de <span class='font-medium text-foreground'>TikTok</span> et le sentiment de pression sociale.",
    },
    {
        type: "INSIGHT CADEAUX",
        icon: Sparkles,
        content: "Les hommes sous-estiment l'envie d'expériences (voyages) de 25% par rapport aux femmes.",
    },
    {
        type: "GÉOGRAPHIE",
        icon: Lightbulb,
        content: "<span class='font-medium text-foreground'>Paris</span> affiche le 'Love Score' le plus élevé (85/100), mais aussi le budget le plus lourd.",
    },
    {
        type: "FUN FACT",
        icon: Quote,
        content: "42% des célibataires s'offrent leurs propres chocolats. #SelfLove",
    },
    {
        type: "CHOC DES GÉNÉRATIONS",
        icon: AlertCircle,
        content: "La Gen Z préfère les 'Dates' simples (café) à 65%, contre 30% pour les Millenials.",
    },
    {
        type: "BUDGET ALERT",
        icon: TrendingUp,
        content: "L'inflation a réduit le budget fleurs de 12%, profitant aux chocolats (+8%).",
    },
    {
        type: "LOVE LANGUAGE",
        icon: Sparkles,
        content: "Le 'Temps de Qualité' est le langage de l'amour n°1 cette année (45%), devant les Cadeaux (15%).",
    },
    {
        type: "DIGITAL LOVE",
        icon: Lightbulb,
        content: "1 couple sur 3 s'est rencontré via une app de dating. La stigmatisation a chuté de 60%.",
    },
    {
        type: "ANTI-VALENTINE",
        icon: Quote,
        content: "Les soirées 'Sans Valentin' entre amis augmentent de 22% par rapport à 2025.",
    },
    {
        type: "ECO-RESPONSABLE",
        icon: Sparkles,
        content: "35% des participants privilégient des cadeaux éthiques ou locaux.",
    },
    {
        type: "PRESSION SOCIALE",
        icon: AlertCircle,
        content: "Instagram est cité comme source principale de stress par 58% des utilisateurs.",
    },
    {
        type: "ASTRO VIBES",
        icon: Sparkles,
        content: "Les Lions et les Balances sont ceux qui dépensent le plus (+40% vs moyenne).",
    },
    {
        type: "RUPTURE SEASON",
        icon: AlertCircle,
        content: "Pic de ruptures détecté 2 semaines avant la Saint-Valentin. Coïncidence ? Je ne crois pas.",
    },
    {
        type: "MATÉRIALISME",
        icon: TrendingUp,
        content: "Seulement 12% des femmes attendent un bijou, alors que 30% des hommes pensent en offrir.",
    },
    {
        type: "FOODIE LOVE",
        icon: Lightbulb,
        content: "Le restaurant reste l'option n°1 (60%), devant le dîner fait maison (25%).",
    },
];

const GeminiInsights = () => {
    const [insights, setInsights] = useState(MOCK_INSIGHTS.slice(0, 4));
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsUpdating(true); // Trigger loading animation

            setTimeout(() => {
                setInsights((prev) => {
                    // Pick a random NEW insight not in current view (simple random for now)
                    const randomIdx = Math.floor(Math.random() * MOCK_INSIGHTS.length);
                    const newInsight = MOCK_INSIGHTS[randomIdx];

                    // Add to top, remove last
                    return [newInsight, ...prev.slice(0, 4)];
                });
                setIsUpdating(false);
            }, 1500); // Fake processing time

        }, 8000); // Every 8 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 h-full flex flex-col relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase text-primary">Gemini Live Insights</span>
                </div>

                {isUpdating && (
                    <span className="text-[10px] text-primary animate-pulse font-medium">
                        Analyse en cours...
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-hidden relative">
                <ul className="space-y-3 relative">
                    <AnimatePresence initial={false} mode="popLayout">
                        {insights.map((insight, idx) => (
                            <motion.li
                                key={`${insight.type}-${idx}-${Date.now()}`} // Unique key for animation
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className="bg-background/80 p-3 rounded-lg border border-border shadow-sm backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <insight.icon className="w-3 h-3 text-primary/70" />
                                    <p className="font-semibold text-primary text-[10px] uppercase tracking-wide">{insight.type}</p>
                                </div>
                                <p
                                    className="text-sm text-muted-foreground leading-snug"
                                    dangerouslySetInnerHTML={{ __html: insight.content }}
                                />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {/* Helper gradient for scroll hint (even though fixed list) */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            </div>

            <div className="mt-4 pt-4 border-t border-primary/10 text-center flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest">
                <span>Powered by Gemini AI</span>
                <span>Mise à jour: Live</span>
            </div>
        </div>
    );
};

export default GeminiInsights;
