import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import type { ProfileType, TraitScores } from "@/lib/profiles";

interface LoveRadarProps {
    profileId: ProfileType;
    traits?: TraitScores | null;
}

const profileStats: Record<
    ProfileType,
    { subject: string; A: number; fullMark: number }[]
> = {
    "old-school": [
        { subject: "Romantisme", A: 100, fullMark: 100 },
        { subject: "Spontanéité", A: 40, fullMark: 100 },
        { subject: "Effort", A: 90, fullMark: 100 },
        { subject: "Chill", A: 30, fullMark: 100 },
        { subject: "Créativité", A: 60, fullMark: 100 },
    ],
    strategique: [
        { subject: "Romantisme", A: 70, fullMark: 100 },
        { subject: "Spontanéité", A: 20, fullMark: 100 },
        { subject: "Effort", A: 100, fullMark: 100 },
        { subject: "Chill", A: 10, fullMark: 100 },
        { subject: "Créativité", A: 80, fullMark: 100 },
    ],
    "anti-valentine": [
        { subject: "Romantisme", A: 10, fullMark: 100 },
        { subject: "Spontanéité", A: 80, fullMark: 100 },
        { subject: "Effort", A: 20, fullMark: 100 },
        { subject: "Chill", A: 100, fullMark: 100 },
        { subject: "Créativité", A: 50, fullMark: 100 },
    ],
    pression: [
        { subject: "Romantisme", A: 50, fullMark: 100 },
        { subject: "Spontanéité", A: 10, fullMark: 100 },
        { subject: "Effort", A: 90, fullMark: 100 },
        { subject: "Chill", A: 5, fullMark: 100 },
        { subject: "Créativité", A: 40, fullMark: 100 },
    ],
    minimaliste: [
        { subject: "Romantisme", A: 40, fullMark: 100 },
        { subject: "Spontanéité", A: 60, fullMark: 100 },
        { subject: "Effort", A: 30, fullMark: 100 },
        { subject: "Chill", A: 90, fullMark: 100 },
        { subject: "Créativité", A: 50, fullMark: 100 },
    ],
    reveur: [
        { subject: "Romantisme", A: 100, fullMark: 100 },
        { subject: "Spontanéité", A: 70, fullMark: 100 },
        { subject: "Effort", A: 50, fullMark: 100 },
        { subject: "Chill", A: 50, fullMark: 100 },
        { subject: "Créativité", A: 100, fullMark: 100 },
    ],
    emotionnel: [
        { subject: "Romantisme", A: 90, fullMark: 100 },
        { subject: "Spontanéité", A: 80, fullMark: 100 },
        { subject: "Effort", A: 70, fullMark: 100 },
        { subject: "Chill", A: 40, fullMark: 100 },
        { subject: "Créativité", A: 70, fullMark: 100 },
    ],
    simple: [
        { subject: "Romantisme", A: 50, fullMark: 100 },
        { subject: "Spontanéité", A: 70, fullMark: 100 },
        { subject: "Effort", A: 40, fullMark: 100 },
        { subject: "Chill", A: 95, fullMark: 100 },
        { subject: "Créativité", A: 40, fullMark: 100 },
    ],
};

const LoveRadar = ({ profileId, traits }: LoveRadarProps) => {
    const data = traits ? [
        { subject: "Romantisme", A: traits.romantisme, fullMark: 100 },
        { subject: "Spontanéité", A: traits.spontaneite, fullMark: 100 },
        { subject: "Effort", A: traits.effort, fullMark: 100 },
        { subject: "Chill", A: traits.chill, fullMark: 100 },
        { subject: "Créativité", A: traits.creativite, fullMark: 100 },
    ] : profileStats[profileId];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full h-[250px] relative"
        >
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
                    />
                    <Radar
                        name="Vibe"
                        dataKey="A"
                        stroke="#dc3c78"
                        fill="#dc3c78"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default LoveRadar;
