import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from "recharts";
import { LOVE_PRESSURE } from "@/data/dashboardData";
import { motion } from "framer-motion";

const LovePressureIndex = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Score Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Love Pressure Index
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Indice composite de stress et attentes
                    </p>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient-valentine">
                        {LOVE_PRESSURE.score}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[250px]">
                {/* Radar Breakdown */}
                <div className="w-full h-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={LOVE_PRESSURE.breakdown}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} // reduced font size
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Pressure"
                                dataKey="A"
                                stroke="#d63031"
                                fill="#d63031"
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-0 right-0 text-[10px] text-muted-foreground font-mono bg-background/80 px-2 py-1 rounded border border-border">
                        Sources de pression
                    </div>
                </div>

                {/* Trend Line */}
                <div className="w-full h-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={LOVE_PRESSURE.history}>
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--popover))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "0.5rem",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="pressure"
                                stroke="#d63031"
                                strokeWidth={2}
                                dot={{ fill: "#d63031", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="absolute top-0 right-0 text-[10px] text-muted-foreground font-mono bg-background/80 px-2 py-1 rounded border border-border">
                        Évolution temporelle
                    </div>
                </div>
            </div>

            {/* Interpretation */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm text-destructive-foreground italic text-center">
                    "La pression sociale atteint un pic critique à J-1. Les attentes matérielles (cadeaux) et comparatives (réseaux sociaux) sont les principaux facteurs de stress."
                </p>
            </div>
        </div>
    );
};

export default LovePressureIndex;
