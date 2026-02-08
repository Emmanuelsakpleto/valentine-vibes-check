import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { SENTIMENT_ANALYSIS } from "@/data/dashboardData";

interface Word {
    text: string;
    size: number;
}

const SentimentCloud = () => {
    // This is a simplified static version using regular divs for layout
    // D3 cloud layout can be complex in React without a wrapper library
    // We'll mimic a nice random layout with CSS

    const words = SENTIMENT_ANALYSIS.keywords;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sentiment Gauge / Overview */}
            <div className="col-span-1 flex flex-col justify-center items-center space-y-4">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-muted">
                    <div
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary border-r-primary"
                        style={{ transform: "rotate(45deg)" }}
                    />
                    <div className="text-center">
                        <span className="text-2xl font-bold">{SENTIMENT_ANALYSIS.positive}%</span>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Positif</p>
                    </div>
                </div>
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs">
                        <span>Négatif ({SENTIMENT_ANALYSIS.negative}%)</span>
                        <span>Neutre ({SENTIMENT_ANALYSIS.neutral}%)</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
                        <div style={{ width: `${SENTIMENT_ANALYSIS.negative}%` }} className="bg-destructive h-full" />
                        <div style={{ width: `${SENTIMENT_ANALYSIS.neutral}%` }} className="bg-muted-foreground/30 h-full" />
                        <div style={{ width: `${SENTIMENT_ANALYSIS.positive}%` }} className="bg-primary h-full" />
                    </div>
                </div>
            </div>

            {/* Word Cloud */}
            <div className="col-span-1 md:col-span-2 relative min-h-[200px] bg-muted/20 rounded-xl p-4 flex flex-wrap justify-center items-center gap-3 overflow-hidden">
                {words.map((word, i) => (
                    <span
                        key={word.text}
                        className="inline-block transition-all hover:scale-110 hover:text-primary cursor-default select-none"
                        style={{
                            fontSize: `${12 + (word.value / 60) * 24}px`,
                            opacity: 0.4 + (word.value / 100),
                            color: i % 2 === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                            fontWeight: word.value > 40 ? 700 : 400,
                            transform: `rotate(${Math.random() > 0.7 ? (Math.random() > 0.5 ? 4 : -4) : 0}deg)`
                        }}
                    >
                        {word.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SentimentCloud;
