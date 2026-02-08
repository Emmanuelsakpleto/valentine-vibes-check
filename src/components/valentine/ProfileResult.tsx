import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Share2,
  RotateCcw,
  BarChart3,
  Heart,
  Flower,
  Target,
  Ghost,
  Smartphone,
  Sparkles,
  CloudMoon,
  Zap,
  Sun,
  Gift,
  HeartCrack,
  MessageCircle,
  PenTool,
  Lock,
  Frown,
  Meh,
  Smile,
  type LucideIcon,
} from "lucide-react";
import type { Profile } from "@/lib/profiles";
import { toast } from "sonner";
import LoveRadar from "./LoveRadar";

const getIcon = (name: string): LucideIcon | null => {
  switch (name) {
    case "Heart": return Heart;
    case "Rose": return Flower;
    case "Target": return Target;
    case "Ghost": return Ghost;
    case "Smartphone": return Smartphone;
    case "Sparkles": return Sparkles;
    case "CloudMoon": return CloudMoon;
    case "Zap": return Zap;
    case "Sun": return Sun;
    case "Gift": return Gift;
    case "HeartCrack": return HeartCrack;
    case "MessageCircle": return MessageCircle;
    case "PenTool": return PenTool;
    case "Lock": return Lock;
    case "Frown": return Frown;
    case "Meh": return Meh;
    case "Smile": return Smile;
    default: return null;
  }
};

interface ProfileResultProps {
  profile: Profile;
  onRetake: () => void;
  onViewDashboard: () => void;
}

const ProfileResult = ({
  profile,
  onRetake,
  onViewDashboard,
}: ProfileResultProps) => {
  const Icon = getIcon(profile.emoji);

  const handleShare = async () => {
    const text = `Mon profil Valentine : ${profile.name} — "${profile.tagline}"\n\nDécouvre le tien 👇`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon profil Valentine",
          text,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      toast.success("Copié dans le presse-papier ! 💌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Result card */}
      <div className="relative rounded-2xl border border-primary/20 bg-card p-8 text-center space-y-6 overflow-hidden">
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-glow-valentine-sm pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Emoji / Icon */}
          <motion.div
            className="flex justify-center"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {Icon && <Icon className="w-24 h-24 text-primary" strokeWidth={1.5} />}
          </motion.div>

          {/* Label */}
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Ton profil amoureux
          </p>

          {/* Name */}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-valentine">
            {profile.name}
          </h2>

          {/* Tagline */}
          <p className="font-display text-lg italic text-foreground/70">
            "{profile.tagline}"
          </p>

          {/* Radar Chart */}
          <div className="py-2">
            <LoveRadar profileId={profile.id} />
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="valentine"
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 size={16} />
              Partager 💌
            </Button>
            <Button
              variant="valentine-outline"
              className="flex-1"
              onClick={onViewDashboard}
            >
              <BarChart3 size={16} />
              Voir les stats
            </Button>
          </div>

          <button
            onClick={onRetake}
            className="flex items-center gap-1 mx-auto text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <RotateCcw size={12} />
            Refaire le test
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileResult;
