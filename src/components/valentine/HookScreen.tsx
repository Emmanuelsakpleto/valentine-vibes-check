import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HookScreenProps {
  onStart: () => void;
}

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  duration: `${12 + Math.random() * 18}s`,
  delay: `${Math.random() * 10}s`,
  size: `${14 + Math.random() * 18}px`,
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HookScreen = ({ onStart }: HookScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-glow-valentine pointer-events-none" />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-primary/20 animate-float-heart select-none"
            style={{
              left: heart.left,
              fontSize: heart.size,
              "--duration": heart.duration,
              "--delay": heart.delay,
              bottom: "-20px",
            } as React.CSSProperties}
          >
            ♥
          </span>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-lg w-full text-center space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.div variants={item} className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-valentine leading-tight">
            Saint-Valentin
          </h1>
          <p className="font-display text-xl md:text-2xl italic text-foreground/80">
            Amour sincère ou pression déguisée ?
          </p>
        </motion.div>

        {/* Hook text */}
        <motion.div
          variants={item}
          className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-2"
        >
          <p>Soyons honnêtes…</p>
          <p>Tout le monde parle d'amour le 14 février.</p>
          <p>
            Mais entre attentes, budget, pression sociale et réseaux sociaux…
          </p>
          <p className="text-foreground font-medium text-lg">
            Est-ce vraiment romantique ?
          </p>
        </motion.div>

        {/* What you'll discover */}
        <motion.div variants={item} className="space-y-4">
          <p className="text-foreground/90 font-medium">
            Réponds à ce test et découvre :
          </p>
          <div className="flex flex-col gap-2 text-left max-w-xs mx-auto">
            <span className="text-foreground/80">
              ❤️ Ton profil amoureux
            </span>
            <span className="text-foreground/80">
              💸 Ton niveau de pression Valentine
            </span>
            <span className="text-foreground/80">
              💌 Ton style relationnel
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <Button
            variant="valentine"
            size="xl"
            onClick={onStart}
            className="mt-4"
          >
            Commencer le test ❤️
          </Button>
          <p className="text-muted-foreground/60 text-xs mt-4">
            100% anonyme · 2 min · pas de cookies
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HookScreen;
