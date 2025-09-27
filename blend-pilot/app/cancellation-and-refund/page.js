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

export default function CancellationAndRefundPage() {
  return (
    <main className="bg-[#010409] text-white">
      <section className="relative pt-40 pb-20 text-center border-b border-blue-500/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4 font-rajdhani"
              style={{ textShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
            >
              Cancellation & Refund Policy
            </h1>
            <p className="text-lg text-gray-200 mt-4 font-sora">
              Last Updated: January 15, 2025
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <LegalContent title="Cancellation Policy">
              <p>
                At BlendPilot, we understand that circumstances may change. Our cancellation policy is designed to be fair to both parties while protecting our business interests.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Project Cancellation:</strong> Clients may cancel a project at any time with written notice. However, cancellation fees may apply based on the project stage and work completed.
                </li>
                <li>
                  <strong>Service Cancellation:</strong> Ongoing services (maintenance, hosting, etc.) can be cancelled with 30 days&apos; written notice.
                </li>
                <li>
                  <strong>Meeting Cancellations:</strong> Booked meetings can be cancelled up to 24 hours in advance without penalty.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Refund Policy">
              <p>
                We strive to deliver exceptional value in all our services. Our refund policy reflects our commitment to client satisfaction while maintaining business sustainability.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Full Refund:</strong> Available within 48 hours of initial payment if no work has commenced.
                </li>
                <li>
                  <strong>Partial Refund:</strong> If work has begun, refunds are calculated based on completed work and materials used, minus a 15% administrative fee.
                </li>
                <li>
                  <strong>No Refund:</strong> After project completion and delivery, no refunds are provided unless there&apos;s a breach of contract on our part.
                </li>
                <li>
                  <strong>Refund Processing:</strong> Approved refunds will be processed within 5-10 business days via the original payment method.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Project Stages and Cancellation Fees">
              <p>
                Cancellation fees vary based on the project stage and work completed:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Planning Phase (0-25% complete):</strong> 25% of total project cost
                </li>
                <li>
                  <strong>Development Phase (25-75% complete):</strong> 50% of total project cost
                </li>
                <li>
                  <strong>Testing Phase (75-90% complete):</strong> 75% of total project cost
                </li>
                <li>
                  <strong>Final Phase (90-100% complete):</strong> 100% of total project cost
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Special Circumstances">
              <p>
                We understand that exceptional circumstances may arise. In cases of:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Force majeure events</li>
                <li>Client bankruptcy or business closure</li>
                <li>Significant changes in project requirements that make completion impossible</li>
              </ul>
              <p>
                We will work with you to find a fair resolution, which may include project suspension, scope adjustment, or alternative arrangements.
              </p>
            </LegalContent>

            <LegalContent title="Dispute Resolution">
              <p>
                If you&apos;re not satisfied with our services or have concerns about billing, please contact us immediately. We&apos;re committed to resolving disputes fairly and promptly through:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Direct communication and negotiation</li>
                <li>Mediation if necessary</li>
                <li>Arbitration as a last resort</li>
              </ul>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                For questions about cancellations or refunds, please{" "}
                <Link href="/contact" className="text-[#007BFF] hover:underline">
                  contact us
                </Link>
                {" "}with your project details and we&apos;ll respond within 24 hours.
              </p>
            </LegalContent>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
