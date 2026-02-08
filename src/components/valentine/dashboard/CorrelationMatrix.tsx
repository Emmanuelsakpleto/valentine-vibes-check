import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { SCATTER_DATA } from "@/data/dashboardData";

const CorrelationMatrix = () => {
    return (
        <div className="h-[350px] border border-border rounded-xl p-4 bg-card/50">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                Corrélation : Budget vs Pression (Taille = Importance)
            </h4>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                        type="number"
                        dataKey="x"
                        name="Budget"
                        unit="€"
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        name="Pression"
                        unit="%"
                        tick={{ fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Importance" />
                    <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        contentStyle={{ borderRadius: "8px", border: "none" }}
                    />
                    <Scatter name="Répondants" data={SCATTER_DATA.budgetVsPressure} fill="#dc3c78" fillOpacity={0.6} />
                </ScatterChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-muted-foreground text-center mt-2 italic">
                Analyse multivariée : Plus le budget (X) augmente, plus la pression (Y) tend à augmenter.
            </p>
        </div>
    );
};

export default CorrelationMatrix;
