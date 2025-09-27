"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
      icon: "fas fa-laptop-code",
      title: "Custom Web Development",
      description:
        "We build bespoke, high-performance websites and web applications from the ground up, tailored precisely to your business logic and user needs.",
      details: [
        "Full-Stack MERN/Next.js Development",
        "Headless CMS Integration",
        "Progressive Web Apps (PWAs)",
        "API Development & Integration",
      ],
    },
    {
      icon: "fas fa-shopping-basket",
      title: "E-Commerce Website",
      description:
        "We build robust and secure online stores with advanced features like product management, payment gateways, and seamless user experiences to drive your sales.",
      details: [
        "Custom Online Store Development",
        "Payment Gateway Integration",
        "Inventory & Order Management",
        "Marketing & Analytics Integration",
      ],
    },
    {
      icon: "fas fa-bullhorn",
      title: "Digital Marketing & SEO",
      description:
        "Boosting your online presence with strategic marketing and SEO campaigns that drive organic traffic, generate leads, and deliver measurable results.",
      details: [
        "Search Engine Optimization (SEO)",
        "Social Media Management (SMM)",
        "Content Strategy",
        "Paid Advertising (PPC)",
      ],
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile App Development",
      description:
        "Building intuitive and high-performance native applications for both Android and iOS platforms, designed to provide a seamless user experience.",
      details: [
        "Native Android (Kotlin/Java)",
        "Native iOS (Swift)",
        "Cross-Platform Solutions",
        "App Store & Play Store Deployment",
      ],
    },
];

const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        }
    }, []);

    return <div ref={ref} className={className}>{children}</div>;
};

export default function ServicesPage() {
  return (
    <main className="bg-transparent text-white">
      <section className="animated-section relative pt-40 pb-20 text-center border-b border-blue-500/20">
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#007BFF1A_1px,transparent_1px),linear-gradient(to_bottom,#007BFF1A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative z-10 p-6 container mx-auto">
            <p className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora">Our Services</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-rajdhani font-bold text-white mt-4 text-balance" style={{textShadow: '0 0 20px rgba(0, 123, 255, 0.5)'}}>
                Solutions Engineered for Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto text-balance font-sora">
                Discover our comprehensive suite of services, designed to elevate your brand and deliver powerful, scalable, and futuristic digital solutions.
            </p>
        </div>
      </section>

      <section className="animated-section py-20 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-900/50 border border-blue-500/20 p-8 rounded-2xl flex flex-col h-full transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                    <i className={`${service.icon} text-3xl text-[#007BFF]`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-rajdhani">{service.title}</h3>
                  <p className="text-gray-400 text-balance mb-6 font-sora">{service.description}</p>
                  <ul className="space-y-3 text-left mb-8 flex-grow">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 font-sora">
                        <i className="fas fa-check-circle text-blue-500/50"></i>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                      href="/book-a-meeting"
                      className="mt-auto w-full text-center inline-block px-8 py-3 font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400"
                  >
                      Book a Meeting
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="animated-section py-20 lg:py-32 px-6 bg-slate-900/50">
        <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-rajdhani font-bold text-white mb-6 text-balance">
                Have a Project in Mind?
            </h2>
            <p className="text-lg text-gray-400 mb-12 text-balance font-sora">
                {`Whether you have a detailed specification or just a spark of an idea, our team is ready to listen. Let's collaborate to transform your vision into a stunning digital reality.`}
            </p>
            <Link
                href="/book-a-meeting"
                className="inline-block px-12 py-4 text-xl font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400 hover:shadow-2xl hover:shadow-blue-500/50"
            >
                {`Book a Free Consultation`}
            </Link>
        </div>
      </section>
    </main>
  );
}
