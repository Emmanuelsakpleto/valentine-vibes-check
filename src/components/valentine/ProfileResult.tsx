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
  Download,
} from "lucide-react";
import type { Profile, TraitScores } from "@/lib/profiles";
import { toast } from "sonner";
import LoveRadar from "./LoveRadar";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface ProfileResultProps {
  profile: Profile;
  traits?: TraitScores | null;
  onRetake: () => void;
  onViewDashboard: () => void;
}

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

const ProfileResult = ({
  profile,
  traits,
  onRetake,
  onViewDashboard,
}: ProfileResultProps) => {
  const Icon = getIcon(profile.emoji);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsSharing(true);

    const shareText = "Mon profil Valentine : " + profile.name + " — \"" + profile.tagline + "\"\n\nDécouvre le tien 👇";
    const shareUrl = window.location.href;

    try {
      // 1. Capture Image
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1a1a1a", // Force dark background for consistent look
        scale: 2, // High resolution
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          // Fix text-gradient-valentine glitch in html2canvas
          // html2canvas doesn't support background-clip: text well -> shows background rect
          const title = clonedDoc.querySelector('h2');
          if (title) {
            title.style.background = 'none';
            title.style.webkitTextFillColor = 'initial';
            title.style.color = '#ff4d8d'; // Solid Valentine Pink
          }
        }
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png', 1.0)
      );

      if (!blob) throw new Error("Image generation failed");

      // 2. Prepare File for Sharing
      const file = new File([blob], "valentine-profile-" + profile.id + ".png", { type: 'image/png' });

      // 3. Try Native Share (Mobile)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Mon profil Valentine Vibes Check",
          text: shareText,
          url: shareUrl,
          files: [file],
        });
        toast.success("Profil partagé !");
      } else {
        // 4. Fallback: Download Image + Copy Text
        const link = document.createElement('a');
        link.download = "valentine-profile-" + profile.id + ".png";
        link.href = canvas.toDataURL('image/png');
        link.click();

        await navigator.clipboard.writeText(shareText + "\n" + shareUrl);
        toast.success("Image téléchargée et lien copié ! 💌");
      }

    } catch (err) {
      console.error("Share failed", err);
      // Fallback text only if image fails completely
      try {
        await navigator.clipboard.writeText(shareText + "\n" + shareUrl);
        toast.success("Lien copié (Image non supportée) !");
      } catch (e) {
        toast.error("Impossible de partager.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Result card (Ref for capture) */}
      <div
        ref={cardRef}
        className="relative rounded-2xl border border-primary/20 bg-card p-8 text-center space-y-6 overflow-hidden shadow-2xl"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-glow-valentine-sm pointer-events-none opacity-80" />

        <div className="relative z-10 space-y-4">
          {/* Header Branding (Visible on share image) */}
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">
            VALENTINE VIBES CHECK 2026
          </p>

          {/* Emoji / Icon */}
          <motion.div
            className="flex justify-center"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {Icon && <Icon className="w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(220,60,120,0.5)]" strokeWidth={1.5} />}
          </motion.div>

          {/* Name & Tagline */}
          <div className="-mt-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-valentine mb-1 leading-none py-1">
              {profile.name}
            </h2>
            <p className="font-display text-lg italic text-foreground/80">
              "{profile.tagline}"
            </p>
          </div>

          {/* Radar Chart */}
          <div className="py-2 bg-black/20 rounded-xl">
            <LoveRadar profileId={profile.id} traits={traits} />
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed max-w-[90%] mx-auto">
            {profile.description}
          </p>

          <div className="pt-2 text-[10px] text-muted-foreground">
            valentine-vibes.app
          </div>

        </div>
      </div>

      {/* Actions (Outside of capture area) */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <Button
          variant="valentine"
          className="flex-1 h-12 text-base shadow-lg hover:scale-[1.02] transition-transform"
          onClick={handleShare}
          disabled={isSharing}
        >
          {isSharing ? (
            <span className="animate-pulse">Génération... ✨</span>
          ) : (
            <>
              <Share2 size={18} className="mr-2" />
              Partager mon Vibe 💌
            </>
          )}
        </Button>
        <Button
          variant="valentine-outline"
          className="flex-1 h-12 text-base hover:bg-muted/50 transition-colors"
          onClick={onViewDashboard}
        >
          <BarChart3 size={18} className="mr-2" />
          Voir les stats mondiales
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileResult;
