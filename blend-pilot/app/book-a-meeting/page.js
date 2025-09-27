"use client";

import React from "react";
import { InlineWidget } from "react-calendly";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function BookMeetingPage() {
  return (
    <main className="bg-[#040919] text-white">
      <section className="py-20 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance"
              style={{ textShadow: "0 0 10px rgba(0, 205, 243, 0.5)" }}
            >
              Schedule a Meeting with Us
            </h1>
            <p className="text-lg text-gray-400 text-balance">
              Choose a time that works best for you. We are excited to discuss
              your project and how we can help you achieve your goals.
            </p>
          </div>

          <div className="glass-card max-w-4xl mx-auto p-4 md:p-6 rounded-2xl">
            <InlineWidget
              url="https://calendly.com/mehefujali30/30min"
              styles={{
                height: "1000px",
                borderRadius: "1rem",
              }}
              pageSettings={{
                backgroundColor: "transparent",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "00cdf3",
                textColor: "ffffff",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
