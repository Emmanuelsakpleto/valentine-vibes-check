import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    AreaChart,
    Area,
} from "recharts";
import { BUDGET_INSIGHTS } from "@/data/dashboardData";

const COLORS = ["#dc3c78", "#e17055", "#fd79a8", "#a29bfe", "#636e72"];

const BudgetAnalysis = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Distribution */}
            <div className="h-[300px]">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                    Répartition des Budgets
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={BUDGET_INSIGHTS.distribution}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis
                            dataKey="range"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "0.5rem",
                            }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {BUDGET_INSIGHTS.distribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Average by Status */}
            <div className="h-[300px]">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                    Budget Moyen par Statut (€)
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={BUDGET_INSIGHTS.byStatus}>
                        <defs>
                            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#dc3c78" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#dc3c78" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis
                            dataKey="status"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                            interval={0}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "0.5rem",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="avg"
                            stroke="#dc3c78"
                            fillOpacity={1}
                            fill="url(#colorAvg)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BudgetAnalysis;
