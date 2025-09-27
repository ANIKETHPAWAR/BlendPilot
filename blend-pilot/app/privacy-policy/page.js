"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (ref.current) {
            // Set initial state to visible
            setIsVisible(true);
            
            // Run animation
            gsap.fromTo(ref.current, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: 0.1
                }
            );
        }
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ visibility: 'visible' }}
        >
            {children}
        </div>
    );
};

const LegalContent = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-[#007BFF] mb-4 font-rajdhani">{title}</h2>
    <div className="text-white leading-relaxed space-y-4 font-sora">{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#010409] text-white">
      <section className="relative pt-40 pb-20 text-center border-b border-blue-500/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4 font-rajdhani"
              style={{ textShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-200 mt-4 font-sora">
              Last Updated: September 05, 2025
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <LegalContent title="Introduction">
              <p>
                {`At BlendPilot , protecting your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website (blendpilot.space). By using our services, you agree to the terms described in this policy.`}
              </p>
            </LegalContent>

            <LegalContent title="Information We Collect">
              <p>We may collect various types of information, including:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Personal Information:</strong> When you fill out our
                  contact form or book a meeting, we collect information such as
                  your name, email address, and phone number.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect information on how
                  you use our website, such as your IP address, browser type,
                  and the pages you visit.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="How Your Information Is Used">
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To provide and manage our services for you.</li>
                <li>To answer your questions and communicate with you.</li>
                <li>To improve our website and services.</li>
                <li>
                  To send you relevant marketing information, if you consent.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Data Security">
              <p>
                We are committed to keeping your personal information secure. We
                have implemented various technical and organizational security
                measures to prevent unauthorized access or disclosure. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </LegalContent>

            <LegalContent title="Your Rights">
              <p>
                You have certain rights regarding your personal information. You
                can request a copy of your data, ask us to correct any
                inaccuracies, or request the deletion of your information.
              </p>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please{" "}
                <Link href="/contact" className="text-[#007BFF] hover:underline">
                  contact us
                </Link>
                .
              </p>
            </LegalContent>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}