import {
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

export const getIcon = (name: string): LucideIcon | null => {
    switch (name) {
        case "Heart": return Heart;
        case "Rose": return Flower; // Using Flower as Rose substitute
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
