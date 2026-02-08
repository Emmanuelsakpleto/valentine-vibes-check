import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from "recharts";
import { GIFT_INSIGHTS } from "@/data/dashboardData";

const GiftInsights = () => {
    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="h-[300px] border border-border rounded-xl p-4 bg-card/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                    Préférences Cadeaux : Hommes vs Femmes
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={GIFT_INSIGHTS.byGender}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="Hommes" fill="#636e72" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Femmes" fill="#dc3c78" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="h-[250px] border border-border rounded-xl p-4 bg-card/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                    Top Catégories Cadeaux
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={GIFT_INSIGHTS.preferences} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "8px", border: "none" }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {GIFT_INSIGHTS.preferences.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GiftInsights;
