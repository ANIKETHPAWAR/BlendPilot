"use client";

import React, { useEffect, useRef, useState } from 'react';

const processSteps = [
    { num: "01", title: "Discovery & Analysis", description: "We begin by deeply understanding your brand, goals, and target audience to craft a strategic foundation." },
    { num: "02", title: "Strategy & Blueprint", description: "A detailed roadmap is created, outlining the technology stack, architecture, and key project milestones." },
    { num: "03", title: "Design & Prototyping", description: "We design intuitive user interfaces and interactive prototypes to visualize the final product's experience." },
    { num: "04", title: "Development & Build", description: "Our expert engineers bring the design to life with clean, efficient, and scalable code." },
    { num: "05", title: "Testing & QA", description: "Rigorous testing is performed to ensure a bug-free, high-performance, and secure digital solution." },
    { num: "06", title: "Launch & Support", description: "We handle the seamless deployment of your project and provide ongoing support and maintenance." }
];

const ProcessStep = ({ step, index }) => {
    const stepRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.4,
            }
        );

        const currentRef = stepRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const isOdd = index % 2 !== 0;

    return (
        <div
            ref={stepRef}
            className={`relative flex items-center ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} md:justify-between`}
        >
            <div className="hidden md:block w-5/12"></div>
            
            <div className={`hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center w-1/2 ${isOdd ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`h-px w-full bg-gradient-to-l from-[#007BFF] to-transparent transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                     style={{
                         transitionDelay: '300ms',
                         clipPath: isVisible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'
                     }}
                ></div>
                <div className={`w-4 h-4 rounded-full bg-[#010409] border-2 border-[#007BFF] transition-all duration-500 ease-in-out delay-300 ${isVisible ? 'scale-100 shadow-[0_0_15px_#007BFF]' : 'scale-0'}`}></div>
            </div>

            <div className={`md:w-5/12 transition-all duration-1000 ease-out 
                ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-10'}
            `}
            style={{
                transitionDelay: '200ms',
                transformStyle: 'preserve-3d', 
                transform: isVisible ? 'perspective(1000px) rotateY(0deg)' : `perspective(1000px) ${isOdd ? 'rotateY(45deg)' : 'rotateY(-45deg)'}`
            }}
            >
                <div className="group p-8 rounded-xl bg-slate-900/70 border border-[#007BFF]/20 backdrop-blur-md relative overflow-hidden hover:-translate-y-2 hover:border-[#007BFF]/50 transition-all duration-300">
                     <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-[#007BFF]/30 to-transparent animate-aurora-spin group-hover:opacity-100 opacity-0 transition-opacity duration-500 -z-10"></div>
                     <div className="text-left relative">
                        <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-2xl font-bold text-white font-rajdhani">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 text-balance font-sora">{step.description}</p>
                        <span className="text-7xl font-orbitron font-black text-white/5 absolute -top-4 -left-4 -z-10 select-none">{step.num}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Process = () => {
  return (
    <section id="process" className="bg-transparent backdrop-blur-md py-20 lg:py-32 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora">Our Working Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 text-balance font-rajdhani" style={{textShadow: '0 0 20px rgba(0, 123, 255, 0.5)'}}>
            How We Engineer Your Vision
          </h2>
          <p className="text-lg text-gray-400 mt-6 text-balance font-sora">
            Our process is a finely-tuned symphony of strategy, design, and technology, ensuring every project is a masterpiece of digital engineering.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#007BFF]/20"></div>
          
          <div className="relative z-10 space-y-16 md:space-y-0">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;