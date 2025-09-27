// /components/Contact.js
"use client";

import React, { useEffect, useRef, useState } from "react";

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    // Section-er jonno reveal animation
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setFormStatus("Message sent successfully!");
        e.target.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus(error.message || "Failed to send message. Please try again.");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  // Animation style function
  const animateStyle = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(50px)",
    transition: "opacity 1s ease-out, transform 1s ease-out",
    transitionDelay: `${index * 150}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#040919] py-20 lg:py-32 px-6 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-slate-900/50 border border-cyan-400/20 backdrop-blur-md">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold text-white text-balance"
              style={{
                ...animateStyle(0),
                textShadow: "0 0 10px rgba(0, 205, 243, 0.5)",
              }}
            >
             {` Let's Build Something Amazing Together`}
            </h2>
            <p
              className="text-lg text-gray-300 mt-4 text-balance"
              style={animateStyle(1)}
            >
              Have a project in mind or just want to say hello? Drop us a
              message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div style={animateStyle(2)}>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-400"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3] focus:ring-2 focus:ring-[#00cdf3]/50 focus:outline-none transition-all duration-300"
                />
              </div>
              <div style={animateStyle(3)}>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3] focus:ring-2 focus:ring-[#00cdf3]/50 focus:outline-none transition-all duration-300"
                />
              </div>
              <div style={animateStyle(4)}>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-400"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 resize-none focus:border-[#00cdf3] focus:ring-2 focus:ring-[#00cdf3]/50 focus:outline-none transition-all duration-300"
                ></textarea>
              </div>
              <div style={animateStyle(5)}>
                <button
                  type="submit"
                  className="w-full inline-block px-10 py-4 text-lg font-semibold text-black bg-[#00cdf3] rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:shadow-2xl hover:shadow-[#00cdf3]/50"
                >
                  Send Message
                </button>
                {formStatus && (
                  <p className="text-center mt-4 text-[#00cdf3]">
                    {formStatus}
                  </p>
                )}
              </div>
            </form>

            {/* Direct Contact Info */}
            <div className="space-y-8 pt-2">
              {/* Proti-ta info item-er jonno alada animation */}
              <div
                className="flex items-start gap-4 group"
                style={animateStyle(6)}
              >
                <i className="fas fa-envelope text-2xl text-[#00cdf3] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg">Email Us</h4>
                  <p className="text-gray-400">Our team is here to help.</p>
                  <a
                    href="mailto:info@nexorzen.com"
                    className="text-[#00cdf3] hover:underline"
                  >
                    info@nexorzen.com
                  </a>
                </div>
              </div>
              <div
                className="flex items-start gap-4 group"
                style={animateStyle(7)}
              >
                <i className="fas fa-globe text-2xl text-[#00cdf3] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg">Our Website</h4>
                  <p className="text-gray-400">Explore our digital presence.</p>
                  <a
                    href="https://www.nexorzen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00cdf3] hover:underline"
                  >
                    www.nexorzen.com
                  </a>
                </div>
              </div>
              <div
                className="flex items-start gap-4 group"
                style={animateStyle(8)}
              >
                <i className="fas fa-map-marker-alt text-2xl text-[#00cdf3] mt-1 transition-transform duration-300 group-hover:scale-110"></i>
                <div>
                  <h4 className="font-bold text-white text-lg">Our Location</h4>
                  <p className="text-gray-400">Kolkata, West Bengal, India</p>
                  <p className="text-gray-500 text-sm">
                    (Serving Clients Worldwide)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
