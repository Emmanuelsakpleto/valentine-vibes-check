import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  Heart,
  TrendingUp,
  BrainCircuit,
  PieChart as PieChartIcon,
  Lightbulb,
  Gift,
  Share2,
  Globe,
} from "lucide-react";

// Components
import DemographicsCharts from "./dashboard/DemographicsCharts";
import BudgetAnalysis from "./dashboard/BudgetAnalysis";
import LovePressureIndex from "./dashboard/LovePressureIndex";
import SentimentCloud from "./dashboard/SentimentCloud";
import PerceptionCharts from "./dashboard/PerceptionCharts";
import GiftInsights from "./dashboard/GiftInsights";
import CorrelationMatrix from "./dashboard/CorrelationMatrix";
import AdvancedScores from "./dashboard/AdvancedScores";
import GeographicMap from "./dashboard/GeographicMap";

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

const MetricCard = ({
  label,
  value,
  change,
  trend,
  icon,
  delay = 0,
}: {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
      {icon && <div className="text-primary/60">{icon}</div>}
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold tabular-nums">{value}</span>
      {change && (
        <span
          className={`text-xs font-medium mb-1 ${trend === "up" ? "text-green-500" : "text-red-500"
            }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      )}
    </div>
  </motion.div>
);

const SectionHeader = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-6 mt-12 bg-gradient-to-r from-background to-muted/20 p-2 rounded-lg border-b border-border/50">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      {icon || <Activity size={20} />}
    </div>
    <div>
      <h3 className="text-lg font-bold font-display">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);

const ChartContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

const DashboardLive = () => {
  const participantsCount = useAnimatedCounter(12453);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-8 max-w-7xl mx-auto pb-24"
    >
      {/* Header & Metrics */}
      <div className="space-y-6">
        <div className="text-center space-y-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Live Hub 2026
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            L'Observatoire du Love
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Big Data, Intelligence Artificielle & Sentiments Réels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Top Metrics */}
          <MetricCard
            label="Participants"
            value={participantsCount}
            change={12}
            trend="up"
            delay={0.1}
            icon={<Users size={16} />}
          />
          <MetricCard
            label="Love Pressure"
            value="68/100"
            change={5.4}
            trend="up"
            delay={0.2}
            icon={<Activity size={16} />}
          />
          <MetricCard
            label="Budget Moyen"
            value="54 €"
            change={-2.5}
            trend="down"
            delay={0.3}
            icon={<TrendingUp size={16} />}
          />
          <MetricCard
            label="Auth. Score"
            value="64/100"
            trend="neutral"
            delay={0.4}
            icon={<Heart size={16} />}
          />
        </div>

        {/* Advanced Composite Scores (New Row) */}
        <AdvancedScores />

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* === SECTION 1: DEMOGRAPHICS & PERCEPTION (Full Width) === */}
        <div className="lg:col-span-12">
          <SectionHeader
            title="1. Radiographie de la Cohorte"
            subtitle="Qui aime (ou déteste) la Saint-Valentin en 2026 ?"
            icon={<Users size={20} />}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer>
              <DemographicsCharts />
            </ChartContainer>
            <div className="space-y-6">
              <ChartContainer>
                <PerceptionCharts />
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* === SECTION 2: DEEP DIVE (3 Columns) === */}

        {/* Column 1: Psychology & Pressure */}
        <div className="lg:col-span-4 space-y-6">
          <SectionHeader
            title="2. Psychologie & Pression"
            subtitle="Analyse des tensions internes et sociales"
            icon={<BrainCircuit size={20} />}
          />
          <ChartContainer>
            <LovePressureIndex />
          </ChartContainer>
          <ChartContainer className="h-[300px]">
            <SentimentCloud />
          </ChartContainer>
        </div>

        {/* Column 2: Economics & Gifts */}
        <div className="lg:col-span-4 space-y-6">
          <SectionHeader
            title="3. Économie du Couple"
            subtitle="Budget, Cadeaux et Matérialisme"
            icon={<Gift size={20} />}
          />
          <ChartContainer>
            <BudgetAnalysis />
          </ChartContainer>
          <ChartContainer>
            <GiftInsights />
          </ChartContainer>
        </div>

        {/* Column 3: Correlations & Intelligence */}
        <div className="lg:col-span-4 space-y-6">
          <SectionHeader
            title="4. Intelligence Relationnelle"
            subtitle="Corrélations et Insights IA"
            icon={<Share2 size={20} />}
          />

          {/* Correlation Matrix */}
          <ChartContainer>
            <CorrelationMatrix />
          </ChartContainer>

          {/* AI Chat / Insight Feed */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 h-full min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase text-primary">Gemini Live Insights</span>
            </div>

            <ul className="space-y-4 text-sm text-foreground/80 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <li className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                <p className="font-semibold text-primary text-xs mb-1">TENDANCE ACTUELLE</p>
                "Le budget moyen des <span className="font-medium text-foreground">18-24 ans</span> a augmenté de 15% par rapport à l'année dernière."
              </li>
              <li className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                <p className="font-semibold text-primary text-xs mb-1">CORRÉLATION DÉTECTÉE</p>
                "Forte corrélation (0.8) entre l'utilisation de <span className="font-medium text-foreground">TikTok</span> et le sentiment de pression sociale."
              </li>
              <li className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                <p className="font-semibold text-primary text-xs mb-1">INSIGHT CADEAUX</p>
                "Les hommes sous-estiment l'envie d'expériences (voyages/restos) de 25% par rapport aux femmes."
              </li>
              <li className="bg-background/80 p-3 rounded-lg border border-border shadow-sm">
                <p className="font-semibold text-primary text-xs mb-1">MÉTÉO ÉMOTIONNELLE</p>
                "Pic de nostalgie détecté à Paris à 21h00."
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-primary/10 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Mise à jour toutes les 5 sec
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default DashboardLive;
