import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HookScreen from "@/components/valentine/HookScreen";
import FormVibe from "@/components/valentine/FormVibe";
import ProfileResult from "@/components/valentine/ProfileResult";
import DashboardLive from "@/components/valentine/DashboardLive";
import { calculateProfile, type Profile } from "@/lib/profiles";

type Screen = "hook" | "form" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("hook");
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("valentine_vibe_result");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.profile) {
          setProfile(parsed.profile);
          // Verify if answers are needed for Dashboard? 
          // Currently Dashboard uses Mock Data, so answers are just for Profile calculation.
          // But good to restore them if we ever use them.
          if (parsed.answers) setAnswers(parsed.answers);
          setScreen("results");
        }
      } catch (e) {
        console.error("Failed to load saved result", e);
      }
    }
  }, []);

  const handleStart = () => setScreen("form");

  const handleFormComplete = (allAnswers: Record<number, number | string>) => {
    setAnswers(allAnswers);
    const result = calculateProfile(allAnswers);
    setProfile(result);
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Persist result
    localStorage.setItem("valentine_vibe_result", JSON.stringify({
      profile: result,
      answers: allAnswers
    }));
  };

  const handleRetake = () => {
    setAnswers({});
    setProfile(null);
    setScreen("hook");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background relative">
      <AnimatePresence mode="wait">
        {screen === "hook" && <HookScreen key="hook" onStart={handleStart} />}
        {screen === "form" && (
          <FormVibe key="form" onComplete={handleFormComplete} />
        )}
        {screen === "results" && profile && (
          <div key="results" className="min-h-screen">
            {/* Background glow */}
            <div className="fixed inset-0 bg-glow-valentine pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-16">
              <ProfileResult
                profile={profile}
                onRetake={handleRetake}
                onViewDashboard={handleViewDashboard}
              />

              <div ref={dashboardRef}>
                <DashboardLive />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
