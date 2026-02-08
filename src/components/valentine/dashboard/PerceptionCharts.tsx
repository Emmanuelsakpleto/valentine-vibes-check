import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend,
} from "recharts";
import { PERCEPTION_DATA, SOCIAL_IMPACT } from "@/data/dashboardData";

const COLORS = ["#dc3c78", "#e17055", "#fd79a8", "#a29bfe", "#636e72"];

const PerceptionCharts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Importance - Donut */}
            <div className="h-[250px] border border-border rounded-xl p-4 bg-card/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                    Importance de la date
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={PERCEPTION_DATA.importance}
                            cx="50%"
                            cy="50%"
                            innerRadius="50%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {PERCEPTION_DATA.importance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none" }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Attitude - Horizontal Bar */}
            <div className="h-[250px] border border-border rounded-xl p-4 bg-card/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                    Perception Globale
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={PERCEPTION_DATA.attitude}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: "8px", border: "none" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {PERCEPTION_DATA.attitude.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Social Networks Impact */}
            <div className="h-[250px] border border-border rounded-xl p-4 bg-card/50 md:col-span-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                    Pression vs Satisfaction par Réseau Social
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={SOCIAL_IMPACT.networkComparison}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", fontSize: "12px" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                        <Bar dataKey="pressure" name="Pression" fill="#d63031" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="satisfaction" name="Satisfaction" fill="#00b894" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerceptionCharts;
