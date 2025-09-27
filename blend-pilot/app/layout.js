"use client";

import { Sora, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import FloatingButtons from "./components/FloatingButtons";
import { useEffect, useState, useRef } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { gsap } from "gsap";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-rajdhani", display: "swap" });

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressCounterRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const counter = { value: 0 };
        const tl = gsap.timeline({ onComplete });

        tl.to(counter, {
          value: 100,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            const progress = Math.round(counter.value);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress}%`;
            }
            if (progressCounterRef.current) {
              progressCounterRef.current.textContent = `${progress}%`;
            }
          },
        })
          .to(preloaderRef.current, {
            y: "-100%",
            duration: 1,
            ease: "power3.inOut",
          }, "+=0.5");
      } catch (error) {
        console.error('GSAP preloader error:', error);
        if (onComplete) onComplete();
      }
    } else if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  return (
    <div ref={preloaderRef} id="preloader-container">
      <div id="progress-bar-container">
        <div ref={progressBarRef} id="progress-bar"></div>
      </div>
      <div ref={progressCounterRef} id="progress-counter">0%</div>
    </div>
  );
};

const AnimatedLights = () => {
  const lightsRef = useRef(null);

  useEffect(() => {
    const lights = lightsRef.current.children;
    gsap.to(lights[0], { x: "50vw", y: "10vh", duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(lights[1], { x: "-30vw", y: "-20vh", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
    gsap.to(lights[2], { x: "-40vw", y: "30vh", duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
  }, []);

  return (
    <div ref={lightsRef} className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="glow-ball one"></div>
      <div className="glow-ball two"></div>
      <div className="glow-ball three"></div>
    </div>
  );
};


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en" className={`${sora.variable} ${orbitron.variable} ${rajdhani.variable} scroll-smooth`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="shortcut icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning={true} className="bg-deep-space">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="animated-gradient-bg"></div>
          <AnimatedLights />

          {!isAdminPage && <Header />}
          <main className={`relative z-10 transition-opacity duration-700 ${!loading ? 'opacity-100' : 'opacity-0'} ${isAdminPage ? "" : "min-h-[55vh]"}`}>
            {children}
          </main>
          {!isAdminPage && <Footer />}
          {!isAdminPage && <FloatingButtons />}
        </AuthProvider>
      </body>
    </html>
  );
}