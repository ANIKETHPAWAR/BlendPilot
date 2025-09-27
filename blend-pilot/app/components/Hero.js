"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
    const heroRef = useRef(null);
    const animatedTextRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const animatedText = animatedTextRef.current;
        const cursor = cursorRef.current;
        const textToAnimate = "Building Your Future.";

        const ctx = gsap.context(() => {

            gsap.from(".hero-element", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2,
                delay: 0.5,
            });

            const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

            masterTl.to(animatedText, {
                duration: 2,
                text: textToAnimate,
                ease: "none",
            })
                .to(animatedText, {
                    duration: 2,
                    delay: 2,
                })
                .to(animatedText, {
                    duration: 2,
                    text: "",
                    ease: "none",
                });

            gsap.to(cursor, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.5,
                ease: "power1.inOut",
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center"
        >
            <div className="relative z-10 p-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1
                        className="hero-element text-4xl sm:text-6xl md:text-7xl font-rajdhani font-bold text-white mb-6 text-balance tracking-wide"
                        style={{ textShadow: "0 0 30px rgba(0, 123, 255, 0.7)" }}
                    >
                        Architects of the Digital Age,{" "}
                        <span className="gradient-noise-text relative">
                            <span ref={animatedTextRef}></span>
                            <span ref={cursorRef} className="typing-cursor">|</span>
                        </span>
                    </h1>
                    <p
                        className="hero-element text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-sora"
                    >
                        We deliver powerful, custom software solutions that drive innovation, optimize performance, and create undeniable market advantages.
                    </p>
                    <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/book-a-meeting"
                            className="w-full sm:w-auto inline-block px-10 py-4 text-lg font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
                        >
                            {`Book a Meeting`}
                        </Link>
                        <Link
                            href="/portfolio"
                            className="w-full sm:w-auto inline-block px-10 py-4 text-lg font-semibold text-[#007BFF] border-2 border-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#007BFF] hover:text-white transform hover:scale-105"
                        >
                            See Our Impact
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;