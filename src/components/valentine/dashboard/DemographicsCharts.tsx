import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { motion } from "framer-motion";
import { DEMOGRAPHICS } from "@/data/dashboardData";

const PieChartCard = ({ title, data }: { title: string; data: any[] }) => (
    <div className="h-[250px] w-full">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
            {title}
        </h4>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="70%"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                    }}
                    itemStyle={{ color: "hsl(var(--popover-foreground))" }}
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ fontSize: "10px", width: "100%" }}
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

const DemographicsCharts = ({ statusData }: { statusData?: typeof DEMOGRAPHICS.status }) => {
    const status = statusData || DEMOGRAPHICS.status;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <PieChartCard title="Genre" data={DEMOGRAPHICS.gender} />
            <PieChartCard title="Statut Relationnel" data={status} />
            <PieChartCard title="Âge" data={DEMOGRAPHICS.age} />
        </div>
    );
};

export default DemographicsCharts;
