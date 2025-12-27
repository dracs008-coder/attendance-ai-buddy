// Simplified hero scroll demo for the UI-only workspace.
// This keeps the general card layout from the GigaEase homepage
// without depending on advanced scroll/3D libraries.

import React from "react";

const HeroScrollDemo: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black py-10 sm:py-12 md:py-16 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-300 mb-1">
              For customers
            </p>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              See every request at a glance
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Track active repairs, completed jobs, and payments in one clean dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-300 mb-1">
              For technicians
            </p>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Plan visits and follow-ups
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              See upcoming jobs, prioritize urgent tickets, and keep customers updated.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-300 mb-1">
              For admins
            </p>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Monitor platform health
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Get a snapshot of requests, technicians, and products across GigaEase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroScrollDemo;
