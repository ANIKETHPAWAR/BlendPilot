"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

gsap.registerPlugin(ScrollTrigger);


const AnimatedSection = ({ children, className }) => {
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

const ConnectionGlobe = () => {
  const groupRef = useRef();

  const particles = React.useMemo(() => {
    const temp = [];
    const radius = 2.5;
    for (let i = 0; i < 400; i++) {
      const phi = Math.acos(-1 + (2 * i) / 400);
      const theta = Math.sqrt(400 * Math.PI) * phi;
      temp.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      );
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#007BFF"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-blue-500/20 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold text-white font-rajdhani">{question}</h4>
        <i
          className={`fas fa-chevron-down text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        ></i>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-400 font-sora">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus("Sending...");
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // Real API call to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setFormStatus("Message sent successfully! We will get back to you soon.");
        e.target.reset();
      } else {
        throw new Error(result.message || 'Failed to send message&apos;');
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error('fail to send error');
      setFormStatus(error.message || "Failed to send message. Please try again.");
      setTimeout(() => setFormStatus(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      q: "What is the typical timeline for a web development project?",
      a: "A typical project timeline ranges from 4 to 12 weeks, depending on the complexity, features, and client feedback. We provide a detailed project roadmap after the initial discovery phase.",
    },
    {
      q: "How do you handle project communication and updates?",
      a: "We believe in transparent communication. We use tools like Slack, Jira, and schedule regular weekly calls to keep you updated on the project&apos;s progress and gather your valuable feedback.",
    },
    {
      q: "Do you provide ongoing support and maintenance after launch?",
      a: "Yes, we offer various support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally long after the initial launch.",
    },
  ];

  return (
    <main className="bg-transparent text-white">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ConnectionGlobe />
            </Canvas>
          </Suspense>
        </div>
        <div className="relative z-10 p-6">
          <p className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora">
            Contact Us
          </p>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-rajdhani font-bold text-white mt-4 text-balance"
            style={{ textShadow: "0 0 20px rgba(0, 123, 255, 0.5)" }}
          >
            {`Let&apos;s Create Something Extraordinary`}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto text-balance font-sora">
            {`Have a project, an idea, or just want to talk about the future of the web? We&apos;re here to listen.`}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="bg-slate-900/50 border border-blue-500/20 max-w-6xl mx-auto p-8 md:p-12 rounded-2xl grid md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4 font-rajdhani">
                Send Us a Message
              </h3>
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-gray-400 font-sora">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-400 font-sora">Email Address</label>
                <input type="email" id="email" name="email" required className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-gray-400 font-sora">Your Message</label>
                <textarea id="message" name="message" rows="5" required className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-300"></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full inline-block px-10 py-4 text-lg font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
                {formStatus && (
                  <p className="text-center mt-4 text-[#007BFF] font-sora">
                    {formStatus}
                  </p>
                )}
              </div>
            </form>
            <div className="space-y-8 pt-2">
              <h3 className="text-3xl font-bold text-white mb-4 font-rajdhani">
                Direct Contact
              </h3>
              <div className="flex items-start gap-4 group">
                <i className="fas fa-envelope text-2xl text-[#007BFF] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg font-rajdhani">Email Us</h4>
                  <p className="text-gray-400 font-sora">Our team is here to help.</p>
                  <a href="mailto:support@blendpilot.space" className="text-[#007BFF] hover:underline font-sora">
                    support@blendpilot.space
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <i className="fas fa-phone-alt text-2xl text-[#007BFF] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg font-rajdhani">Call Us</h4>
                  <p className="text-gray-400 font-sora">Mon-Fri from 9am to 6pm.</p>
                  <a href="tel:+919734520031" className="text-[#007BFF] hover:underline font-sora">
                    +91 97345 20031
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <i className="fas fa-map-marker-alt text-2xl text-[#007BFF] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg font-rajdhani">Our Location</h4>
                  <p className="text-gray-400 font-sora">Kharagpur, West Bengal, India</p>
                  <p className="text-gray-500 text-sm font-sora">(Serving Clients Worldwide)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold text-white mb-6 text-balance text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 mb-12 text-balance text-center font-sora">
            Have questions? We have answers. Here are some of the most common queries we receive.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}