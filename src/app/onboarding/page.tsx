"use client";

import { useState } from "react";

const steps = [
  {
    title: "Welcome to Acme",
    subtitle: "Let's get your workspace set up in under 2 minutes.",
    icon: "👋",
  },
  {
    title: "Tell us about yourself",
    subtitle: "This helps us personalize your experience.",
    icon: "🧑‍💻",
  },
  {
    title: "You're all set!",
    subtitle: "Your workspace is ready. Let's go.",
    icon: "🚀",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({ company: "", role: "" });

  const step = steps[currentStep];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= currentStep ? "bg-cyan-400" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-slate-800/80 p-8 shadow-2xl backdrop-blur-sm border border-slate-700/50">
          <div className="mb-6 text-center">
            <span className="mb-4 block text-5xl">{step.icon}</span>
            <h1 className="mb-2 text-2xl font-bold text-white">
              {step.title}
            </h1>
            <p className="text-slate-400">{step.subtitle}</p>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Company
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, company: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Role
                </label>
                <select
                  value={profile.role}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, role: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="">Select your role</option>
                  <option value="engineer">Engineer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="designer">Designer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-xl bg-slate-700/30 p-6 text-center">
              <p className="text-lg text-slate-300">
                Welcome aboard,{" "}
                <span className="font-semibold text-cyan-400">
                  {profile.company || "friend"}
                </span>
                ! Your workspace is ready.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="rounded-lg px-6 py-2.5 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
              }
              disabled={currentStep === steps.length - 1}
              className="rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? "Done" : "Continue"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Acme Onboarding Portal &middot; Demo Project
        </p>
      </div>
    </main>
  );
}
