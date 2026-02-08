import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HookScreen from "@/components/valentine/HookScreen";
import FormVibe from "@/components/valentine/FormVibe";
import ProfileResult from "@/components/valentine/ProfileResult";
import DashboardLive from "@/components/valentine/DashboardLive";
import { calculateProfile, type Profile } from "@/lib/profiles";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
          if (parsed.answers) setAnswers(parsed.answers);
          setScreen("results");
        }
      } catch (e) {
        console.error("Failed to load saved result", e);
      }
    }
  }, []);

  const handleStart = () => setScreen("form");

  const handleFormComplete = async (allAnswers: Record<number, number | string>) => {
    setAnswers(allAnswers);
    const result = calculateProfile(allAnswers);
    setProfile(result);
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Persist locally
    localStorage.setItem("valentine_vibe_result", JSON.stringify({
      profile: result,
      answers: allAnswers
    }));

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("valentine_responses").insert([{
          profile_type: result.id,
          answers: allAnswers,
          gender: String(allAnswers[1] || ""),
          age_range: String(allAnswers[2] || ""),
          country: String(allAnswers[3] || ""),
          status: String(allAnswers[4] || ""),
          duration: String(allAnswers[5] || ""),
          celebrate_attitude: String(allAnswers[6] || ""),
          importance_level: Number(allAnswers[7] || 0),
          social_pressure: String(allAnswers[8] || ""),
          budget_range: String(allAnswers[9] || ""),
          gift_preference: String(allAnswers[10] || ""),
          financial_stress: String(allAnswers[12] || ""), // Q11 is Worst Gift (skipped in cols for now)
          social_influence_level: String(allAnswers[16] || ""),
          social_network: String(allAnswers[17] || ""),
        }]);

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          console.log("Response saved to Supabase!");
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
      }
    }
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
                onRetake={() => { }} // No-op since button is hidden
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
