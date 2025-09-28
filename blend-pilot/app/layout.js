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
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#007BFF" />
        
        {/* SEO Meta Tags */}
        <title>Blend Pilot - Digital Innovation & Web Development Solutions</title>
        <meta name="description" content="Transform your digital presence with Blend Pilot. Expert web development, mobile apps, and digital solutions that drive business growth. Get started today!" />
        <meta name="keywords" content="web development, mobile app development, digital solutions, software development, UI/UX design, business technology" />
        <meta name="author" content="Blend Pilot" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blend Pilot - Digital Innovation & Web Development Solutions" />
        <meta property="og:description" content="Transform your digital presence with Blend Pilot. Expert web development, mobile apps, and digital solutions that drive business growth." />
        <meta property="og:image" content="https://i.ibb.co/b5xP5KTS/Untitled-design-3-Photoroom.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Blend Pilot - Digital Innovation & Web Development Solutions" />
        <meta property="og:url" content="https://blendpilot.vercel.app" />
        <meta property="og:site_name" content="Blend Pilot" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blend Pilot - Digital Innovation & Web Development Solutions" />
        <meta name="twitter:description" content="Transform your digital presence with Blend Pilot. Expert web development, mobile apps, and digital solutions that drive business growth." />
        <meta name="twitter:image" content="https://i.ibb.co/b5xP5KTS/Untitled-design-3-Photoroom.png" />
        <meta name="twitter:image:alt" content="Blend Pilot - Digital Innovation & Web Development Solutions" />
        <meta name="twitter:creator" content="@blendpilot" />
        <meta name="twitter:site" content="@blendpilot" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="shortcut icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="Blend Pilot" />
        <meta name="apple-mobile-web-app-title" content="Blend Pilot" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://blendpilot.vercel.app" />
        
        {/* External Stylesheets */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Blend Pilot",
              "description": "Digital Innovation & Web Development Solutions",
              "url": "https://blendpilot.vercel.app",
              "logo": "https://i.ibb.co/4RsWLpz9/Artboard-4.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://twitter.com/blendpilot",
                "https://linkedin.com/company/blendpilot"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
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