import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/questions";
import { useState } from "react";
// @ts-ignore
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | string | undefined;
  onSelect: (value: number | string) => void;
  onNext: () => void;
}

const optionVariants = {
  hidden: { opacity: 0, x: 20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" as const },
  }),
};

const QuestionCard = ({
  question,
  selectedAnswer,
  onSelect,
  onNext,
}: QuestionCardProps) => {

  if (question.type === "select") {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {question.text}
        </h2>

        <div className="relative z-50 text-foreground">
          <CountrySelect
            onChange={(e: any) => {
              onSelect(e.name);
            }}
            placeHolder="Sélectionner un pays..."
            containerClassName="rounded-xl w-full"
            inputClassName="w-full h-14 text-lg px-4 rounded-xl border border-border bg-card text-foreground"
          />
        </div>

        <Button
          variant="valentine"
          onClick={onNext}
          className="w-full mt-4"
          disabled={!selectedAnswer}
        >
          Valider →
        </Button>
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {question.text}
        </h2>
        <textarea
          value={(selectedAnswer as string) || ""}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Écris ici… (ou passe directement)"
          rows={4}
          className="w-full rounded-xl border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 resize-none transition-all duration-200"
        />
        <Button variant="valentine" onClick={onNext} className="w-full">
          Suivant →
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <motion.button
            key={index}
            custom={index}
            variants={optionVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)} /* Changed to pass option string directly for consistency */
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm md:text-base",
              selectedAnswer === option /* Check against option string */
                ? "border-primary bg-primary/10 text-foreground shadow-valentine"
                : "border-border bg-card text-foreground/80 hover:border-primary/30 hover:bg-primary/5"
            )}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
