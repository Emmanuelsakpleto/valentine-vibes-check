import { motion } from "framer-motion";
import { ADVANCED_SCORES } from "@/data/dashboardData";
import { Activity, Heart, DollarSign, Share2 } from "lucide-react";

const ScoreCard = ({
    title,
    value,
    description,
    trend,
    icon,
    color,
}: {
    title: string;
    value: number;
    description: string;
    trend: string;
    icon: React.ReactNode;
    color: string;
}) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-4 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between h-full"
    >
        <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg bg-opacity-10 ${color} text-white`}>
                {icon}
            </div>
            <div className="text-right">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-xs text-muted-foreground">/100</span>
            </div>
        </div>

        <div className="mt-4">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        </div>

        <div className="mt-3 w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${value}%`, backgroundColor: color.replace('bg-', '') }} // Hacky color mapping
            />
        </div>
    </motion.div>
);

const AdvancedScores = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ScoreCard
                title={ADVANCED_SCORES.romanceAuthenticity.label}
                value={ADVANCED_SCORES.romanceAuthenticity.value}
                description={ADVANCED_SCORES.romanceAuthenticity.description}
                trend={ADVANCED_SCORES.romanceAuthenticity.trend}
                icon={<Heart size={18} className="text-pink-500" />}
                color="bg-pink-500"
            />
            <ScoreCard
                title={ADVANCED_SCORES.economicStress.label}
                value={ADVANCED_SCORES.economicStress.value}
                description={ADVANCED_SCORES.economicStress.description}
                trend={ADVANCED_SCORES.economicStress.trend}
                icon={<DollarSign size={18} className="text-red-500" />}
                color="bg-red-500"
            />
            <ScoreCard
                title={ADVANCED_SCORES.socialInfluence.label}
                value={ADVANCED_SCORES.socialInfluence.value}
                description={ADVANCED_SCORES.socialInfluence.description}
                trend={ADVANCED_SCORES.socialInfluence.trend}
                icon={<Share2 size={18} className="text-blue-500" />}
                color="bg-blue-500"
            />
            <ScoreCard
                title="Indice Viralité"
                value={88}
                description="Potentiel de propagation de ce dashboard"
                trend="up"
                icon={<Activity size={18} className="text-purple-500" />}
                color="bg-purple-500"
            />
        </div>
    );
};

export default AdvancedScores;
