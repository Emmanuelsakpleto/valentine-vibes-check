import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
} from "recharts";

const COLORS = {
  rose: "#dc3c78",
  lightRose: "#fd79a8",
  coral: "#e17055",
  red: "#d63031",
  gray: "#636e72",
  gold: "#e2a042",
  purple: "#a29bfe",
  teal: "#00b894",
};

const emotionData = [
  { name: "Excitation", value: 24, fill: COLORS.rose },
  { name: "Stress", value: 21, fill: COLORS.coral },
  { name: "Indifférence", value: 19, fill: COLORS.gray },
  { name: "Pression", value: 22, fill: COLORS.red },
  { name: "Nostalgie", value: 14, fill: COLORS.lightRose },
];

const loveLanguageData = [
  { name: "Cadeaux", value: 18, fill: COLORS.gold },
  { name: "Temps", value: 28, fill: COLORS.rose },
  { name: "Mots", value: 20, fill: COLORS.purple },
  { name: "Attentions", value: 22, fill: COLORS.teal },
  { name: "Contact", value: 12, fill: COLORS.lightRose },
];

const budgetData = [
  { name: "0 €", value: 15, fill: COLORS.gray },
  { name: "< 30 €", value: 28, fill: COLORS.teal },
  { name: "30-100 €", value: 32, fill: COLORS.rose },
  { name: "100 € +", value: 12, fill: COLORS.gold },
  { name: "Ça dépend", value: 13, fill: COLORS.purple },
];

const demoInsights = [
  "La majorité ressent plus de pression que d'excitation à l'approche du 14 février.",
  "« Juste être ensemble » revient dans 34% des réponses sur le cadeau idéal.",
  "Les réseaux sociaux amplifient les attentes chez 43% des répondants.",
];

const wordCloudWords = [
  { text: "ensemble", size: 28 },
  { text: "calme", size: 20 },
  { text: "dîner", size: 22 },
  { text: "surprise", size: 18 },
  { text: "voyage", size: 24 },
  { text: "maison", size: 16 },
  { text: "rire", size: 20 },
  { text: "musique", size: 14 },
  { text: "simplicité", size: 22 },
  { text: "étoiles", size: 16 },
  { text: "bougie", size: 18 },
  { text: "câlin", size: 20 },
  { text: "plage", size: 14 },
  { text: "cinéma", size: 16 },
];

function useAnimatedCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  return value;
}

const ChartCard = ({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="rounded-xl border border-border bg-card p-5"
  >
    <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
    {children}
  </motion.div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg">
        <span className="font-medium">{payload[0].name || payload[0].payload.name}</span>
        <span className="ml-2 text-primary">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

const DashboardLive = () => {
  const count = useAnimatedCounter(247);
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % demoInsights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      {/* Section title */}
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Dashboard live
        </p>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Ce que disent les autres
        </h2>
      </div>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center py-6 rounded-xl border border-primary/10 bg-card"
      >
        <span className="text-5xl md:text-6xl font-bold text-gradient-valentine tabular-nums">
          {count}
        </span>
        <p className="text-muted-foreground text-sm mt-2">
          personnes ont partagé leur vérité
        </p>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emotions */}
        <ChartCard title="😤 Émotions dominantes" delay={0.6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={emotionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fill: "hsl(260, 8%, 55%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                {emotionData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Love language */}
        <ChartCard title="💕 Langages amoureux" delay={0.7}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={loveLanguageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {loveLanguageData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {loveLanguageData.map((item) => (
              <span
                key={item.name}
                className="text-[10px] text-muted-foreground flex items-center gap-1"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.fill }}
                />
                {item.name}
              </span>
            ))}
          </div>
        </ChartCard>

        {/* Budget */}
        <ChartCard title="💸 Budget Valentine" delay={0.8}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={budgetData}>
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(260, 8%, 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                {budgetData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Word cloud */}
        <ChartCard title="✨ Saint-Valentin parfaite en un mot" delay={0.9}>
          <div className="flex flex-wrap gap-2 justify-center items-center min-h-[180px] py-4">
            {wordCloudWords.map((word, i) => (
              <motion.span
                key={word.text}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.05 }}
                className="text-foreground/70 hover:text-primary transition-colors cursor-default"
                style={{
                  fontSize: `${word.size}px`,
                  fontFamily: word.size > 20 ? '"Playfair Display", serif' : undefined,
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Live insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="rounded-xl border border-primary/10 bg-card p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-sm font-medium text-foreground">
            💡 Live Insights
          </h3>
        </div>
        <AnimatedInsight text={demoInsights[currentInsight]} />
        <p className="text-[10px] text-muted-foreground/40 italic">
          Analyse en continu par IA
        </p>
      </motion.div>
    </motion.div>
  );
};

function AnimatedInsight({ text }: { text: string }) {
  return (
    <motion.p
      key={text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="text-muted-foreground italic text-sm leading-relaxed"
    >
      "{text}"
    </motion.p>
  );
}

export default DashboardLive;
