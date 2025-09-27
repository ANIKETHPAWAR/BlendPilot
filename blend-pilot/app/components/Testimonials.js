// /components/Testimonials.js
"use client";

import React, { useEffect, useRef, useState } from "react";

// Testimonials-er data
const testimonialsData = [
  {
    quote:
      "The AI-powered tools have completely streamlined our workflow. Tasks that used to take hours now take minutes. It's like having an extra team member.",
    name: "Marvin McKinney",
    title: "Founder",
    company: "Waverio",
    // Placeholder images are used to avoid broken links
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=MM",
  },
  {
    quote:
      "We’ve seen a huge boost in productivity since working with DevsafeX. The platform they built is not just functional, it's game-changing.",
    name: "Kathryn Murphy",
    title: "CEO",
    company: "TechNova",
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=KM",
  },
  {
    quote:
      "Seamless integration and top-notch support. Our team's efficiency has skyrocketed, and the results speak for themselves.",
    name: "Albert Flores",
    title: "CTO",
    company: "InnoSoft",
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=AF",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay functionality for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 6000); // 6 second por por slide change hobe

    return () => clearInterval(interval);
  }, []);

  // Scroll animation for the section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#040919] py-20 lg:py-32 px-6 overflow-hidden"
    >
      <div className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white text-balance"
            style={{ textShadow: "0 0 10px rgba(0, 205, 243, 0.5)" }}
          >
            Trusted by Innovators
          </h2>
          <p className="text-lg text-gray-400 mt-6 text-balance">
            See what our clients have to say about our commitment to excellence
            and innovation.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto min-h-[450px]">
          {/* Testimonial Cards */}
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                zIndex: activeIndex === index ? 10 : 1,
              }}
            >
              <div className="p-10 md:p-12 flex items-center justify-center h-full bg-slate-900/50 border border-cyan-400/20 rounded-2xl backdrop-blur-md">
                <div className="text-center">
                  {/* Standard img tag byabohar kora hoyeche */}
                  <img
                    src={testimonial.clientImage}
                    alt={testimonial.name}
                    style={{ width: "80px", height: "80px" }}
                    className="rounded-full mx-auto mb-4 border-4 border-cyan-400/30"
                  />
                  <h3 className="text-xl font-bold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    {testimonial.title} @ {testimonial.company}
                  </p>
                  <blockquote className="text-lg md:text-xl text-gray-200 italic leading-relaxed max-w-2xl mx-auto text-balance">
                    {`"${testimonial.quote}"`}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? "bg-[#00cdf3]" : "bg-slate-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
