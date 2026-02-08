import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, getSectionNumber } from "@/lib/questions";
import QuestionCard from "./QuestionCard";
import {
  ArrowLeft,
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

interface FormVibeProps {
  onComplete: (answers: Record<number, number | string>) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

const FormVibe = ({ onComplete }: FormVibeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const sectionNum = getSectionNumber(question.section);
  const SectionIcon = getIcon(question.sectionEmoji);

  const advance = useCallback(
    (newAnswers: Record<number, number | string>) => {
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete(newAnswers);
      }
    },
    [currentIndex, onComplete]
  );

  const handleAnswer = useCallback(
    (value: number | string) => {
      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);

      // Auto-advance for single choice after brief delay
      if (question.type === "single") {
        setTimeout(() => advance(newAnswers), 350);
      }
    },
    [answers, question, advance]
  );

  const handleNext = useCallback(() => {
    advance(answers);
  }, [answers, advance]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 pt-12">
        <div className="w-full max-w-lg">
          {/* Section label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.section}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mb-8 flex items-center gap-2"
            >
              {SectionIcon && <SectionIcon className="w-6 h-6 text-primary" />}
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Section {sectionNum} — {question.section}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Question card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <QuestionCard
                question={question}
                selectedAnswer={answers[question.id]}
                onSelect={handleAnswer}
                onNext={handleNext}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation footer */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={14} />
              Retour
            </button>
            <span className="text-xs text-muted-foreground/60 tabular-nums">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FormVibe;
