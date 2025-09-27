"use client";

import Head from "next/head";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blend Pilot | Grow Your Digital Presence</title>
        <meta
          name="description"
          content="Blend Pilot helps you build fast, modern, and scalable web applications. Let's take your business online."
        />
        <meta
          name="keywords"
          content="Blend Pilot, web development, Next.js, React, SEO, digital agency"
        />
        <meta name="author" content="Blend Pilot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Blend Pilot | Digital Agency" />
        <meta
          property="og:description"
          content="Blend Pilot builds modern websites and digital products that scale."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://blendpilot.space" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blend Pilot | Digital Agency" />
        <meta
          name="twitter:description"
          content="Build your web presence with Blend Pilot – fast, responsive, and beautiful websites."
        />
        <meta name="twitter:image" content="/og-image.png" />

        <link rel="icon" href="https://i.ibb.co/4RsWLpz9/Artboard-4.png" />
        <link rel="canonical" href="https://blendpilot.space" />
      </Head>

      <main>
        <Hero />
        <Process />
        <Services />
      </main>
    </>
  );
}
