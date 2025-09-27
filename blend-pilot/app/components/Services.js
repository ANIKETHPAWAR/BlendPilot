"use client";

import React from 'react';
import Link from 'next/link';

const servicesData = [
  {
    icon: "fas fa-laptop-code",
    title: "Web Development",
    description:
      "We specialize in bespoke, high-performance web applications, crafting visually stunning and highly functional websites tailored to your business needs.",
  },
  {
    icon: "fas fa-store",
    title: "E-Commerce Website",
    description:
      "We build secure and scalable e-commerce platforms, from simple online stores to complex multi-vendor marketplaces, with a focus on user experience.",
  },
  {
    icon: "fas fa-bullhorn",
    title: "Digital Marketing",
    description:
      "We boost your online presence with strategic, data-driven marketing campaigns that deliver measurable results and significant ROI.",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description:
      "We build intuitive and high-performance native applications for both Android and iOS platforms, designed to provide a seamless user experience.",
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-transparent py-20 lg:py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 text-balance font-rajdhani" style={{textShadow: '0 0 20px rgba(0, 123, 255, 0.5)'}}>
            Elevating Your Brand with Expert Solutions
          </h2>
          <p className="text-lg text-gray-300 mt-6 text-balance font-sora">
            We provide top-notch services to enhance your digital presence, ensuring excellence and innovation in every project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-[#007BFF]/20 p-8 rounded-2xl flex flex-col items-start h-full transition-all duration-300 hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/10 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/20 flex items-center justify-center mb-6">
                <i className={`${service.icon} text-3xl text-[#007BFF]`}></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-rajdhani">{service.title}</h3>
              <p className="text-gray-400 text-balance flex-grow mb-8 font-sora">{service.description}</p>
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center font-semibold text-[#007BFF] hover:text-[#007BFF]/80 transition-colors duration-300"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;