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

export default function ShippingAndDeliveryPage() {
  return (
    <main className="bg-[#010409] text-white">
      <section className="relative pt-40 pb-20 text-center border-b border-blue-500/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4 font-rajdhani"
              style={{ textShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
            >
              Shipping & Delivery Policy
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
            <LegalContent title="Digital Service Delivery">
              <p>
                As a digital solutions provider, BlendPilot primarily delivers software, websites, and digital assets electronically. Our delivery process is designed to be efficient, secure, and transparent.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Digital Deliverables:</strong> All software, websites, and digital assets are delivered through secure cloud platforms or direct file transfer.
                </li>
                <li>
                  <strong>Access Credentials:</strong> Login credentials and access information are provided through encrypted communication channels.
                </li>
                <li>
                  <strong>Documentation:</strong> Complete project documentation and user guides are included with all deliveries.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Delivery Timeline">
              <p>
                Project delivery timelines vary based on complexity and scope. Here are our standard delivery schedules:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Website Development:</strong> 2-8 weeks depending on complexity
                </li>
                <li>
                  <strong>Mobile Applications:</strong> 4-12 weeks for full development
                </li>
                <li>
                  <strong>E-commerce Solutions:</strong> 3-10 weeks including setup and testing
                </li>
                <li>
                  <strong>Custom Software:</strong> 6-16 weeks based on requirements
                </li>
                <li>
                  <strong>Consulting Services:</strong> Immediate to 2 weeks for reports and recommendations
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Delivery Process">
              <p>
                Our structured delivery process ensures quality and client satisfaction:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>
                  <strong>Project Kickoff:</strong> Initial meeting to confirm requirements and timeline
                </li>
                <li>
                  <strong>Development Milestones:</strong> Regular updates and progress reports
                </li>
                <li>
                  <strong>Testing Phase:</strong> Comprehensive testing and quality assurance
                </li>
                <li>
                  <strong>Client Review:</strong> Final review and approval process
                </li>
                <li>
                  <strong>Delivery & Handover:</strong> Complete project delivery with documentation
                </li>
                <li>
                  <strong>Support Period:</strong> Post-delivery support and maintenance
                </li>
              </ol>
            </LegalContent>

            <LegalContent title="Delivery Methods">
              <p>
                We use multiple secure delivery methods based on project requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Cloud Deployment:</strong> Direct deployment to client's preferred hosting platform
                </li>
                <li>
                  <strong>Secure File Transfer:</strong> Encrypted file sharing for source code and assets
                </li>
                <li>
                  <strong>Version Control Access:</strong> Git repository access for ongoing development
                </li>
                <li>
                  <strong>Live Demo:</strong> Online demonstration and walkthrough sessions
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Quality Assurance">
              <p>
                Every project undergoes rigorous quality assurance before delivery:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Cross-browser compatibility testing</li>
                <li>Mobile responsiveness verification</li>
                <li>Performance optimization and speed testing</li>
                <li>Security vulnerability assessment</li>
                <li>Code quality and documentation review</li>
                <li>User experience testing and optimization</li>
              </ul>
            </LegalContent>

            <LegalContent title="Post-Delivery Support">
              <p>
                Our relationship doesn't end at delivery. We provide comprehensive post-delivery support:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Warranty Period:</strong> 30-day warranty on all delivered work
                </li>
                <li>
                  <strong>Bug Fixes:</strong> Free bug fixes for issues not caused by client modifications
                </li>
                <li>
                  <strong>Training:</strong> User training and documentation for complex systems
                </li>
                <li>
                  <strong>Maintenance Plans:</strong> Ongoing maintenance and update services available
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Delivery Confirmation">
              <p>
                Upon successful delivery, you will receive:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Complete project files and source code</li>
                <li>Deployment instructions and documentation</li>
                <li>User manuals and training materials</li>
                <li>Warranty and support information</li>
                <li>Final invoice and payment confirmation</li>
              </ul>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                For questions about delivery timelines or project status, please{" "}
                <Link href="/contact" className="text-[#007BFF] hover:underline">
                  contact us
                </Link>
                {" "}and we'll provide updates within 24 hours.
              </p>
            </LegalContent>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
