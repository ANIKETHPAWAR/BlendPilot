"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

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

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#010409] text-white">
      <section className="relative pt-40 pb-20 text-center border-b border-blue-500/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4 font-rajdhani"
              style={{ textShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
            >
              Terms of Service
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
            <LegalContent title="Agreement to Terms">
              <p>
                {`Thank you for using the BlendPilot website ("Site"). By accessing
                or using this Site, you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree with these Terms, please
                do not use our Site.`}
              </p>
            </LegalContent>

            <LegalContent title="Use of Our Website">
              <p>
                {`You are permitted to use our Site for lawful purposes only. You
                may not engage in any activity that could harm our Site or
                interfere with others' use of it. Spamming, hacking, or any form
                of illegal activity is strictly prohibited.`}
              </p>
            </LegalContent>

            <LegalContent title="Intellectual Property">
              <p>
                All content on this Site, such as text, graphics, logos, and
                images, is the property of BlendPilot and is protected by
                copyright law. You may not use, reproduce, or distribute any
                part of this Site for commercial purposes without our written
                permission.
              </p>
            </LegalContent>

            <LegalContent title="Services and Deliverables">
              <p>
                BlendPilot provides digital solutions and software development services.
                All deliverables remain the property of BlendPilot until full payment
                is received. Upon completion of payment, clients receive appropriate
                usage rights as outlined in individual service agreements.
              </p>
            </LegalContent>

            <LegalContent title="Payment Terms">
              <p>
                Payment terms are specified in individual project agreements. 
                Late payments may result in project delays or suspension of services.
                All prices are subject to change with 30 days' notice.
              </p>
            </LegalContent>

            <LegalContent title="Limitation of Liability">
              <p>
                While we strive to provide accurate and up-to-date information,
                we do not guarantee the accuracy or completeness of any
                information. BlendPilot will not be liable for any direct or
                indirect damages resulting from your use of our Site or services.
              </p>
            </LegalContent>

            <LegalContent title="Changes to Terms">
              <p>
                {`We reserve the right to modify these Terms at any time. If
                changes are made, we will update the "Last Updated" date on this
                page. It is your responsibility to review this page
                periodically.`}
              </p>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                If you have any questions about these Terms, please{" "}
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
