"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const portfolioData = [

    {
        image: "https://i.ibb.co/zH4vvYvX/image.png",
        title: "Sangbad Bangla",
        description: "A dynamic and modern news portal delivering the latest news and information with an emphasis on a clean user experience.",
        technologies: ["Next.js", "React", "Tailwind CSS", "CMS"],
        client: "Sangbad Bangla",
        projectType: "News Portal",
        liveUrl: "https://sangbadbangla.news/",
    },
    {
        image: "https://i.ibb.co/ddDpW6Z/image.png",
        title: "Axellliance Infotech",
        description: "A job placement and career guidance portal with a focus on empowering futures and connecting talent with opportunity.",
        technologies: ["React", "Express.js", "MongoDB", "Redux"],
        client: "Axellliance Infotech",
        projectType: "Job Placement Portal",
        liveUrl: "https://axelllianceinfotech.com/",
    },
    {
        image: "https://i.ibb.co/pjMhfptf/image.png",
        title: "Kerala State Lottery",
        description: "A platform to check Kerala State Lottery results and book tickets, providing users with the latest information and payment options.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Payments"],
        client: "Kerala State Lottery",
        projectType: "Lottery Results Portal",
        liveUrl: "https://keralastatelotteryresults.store/",
    },
];

const PortfolioPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".portfolio-card", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                delay: 0.5,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-transparent text-white">
            <section className="relative pt-40 pb-20 text-center border-b border-blue-500/20">
                <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#007BFF1A_1px,transparent_1px),linear-gradient(to_bottom,#007BFF1A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative z-10 p-6 container mx-auto">
                    <p className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora">Our Work</p>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-rajdhani font-bold text-white mt-4 text-balance" style={{ textShadow: '0 0 20px rgba(0, 123, 255, 0.5)' }}>
                        Our Portfolio
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto text-balance font-sora">
                        We take pride in our work. Explore a selection of our projects that showcase our commitment to quality, innovation, and digital excellence.
                    </p>
                </div>
            </section>

            <section className="py-20 lg:py-32 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioData.map((project, index) => (
                            <div
                                key={index}
                                className="portfolio-card bg-slate-900/50 border border-blue-500/20 rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2 opacity-0 transform translate-y-12"
                            >
                                <div className="relative w-full h-56">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-2 font-rajdhani">{project.title}</h3>
                                    <p className="text-gray-400 text-balance flex-grow mb-6 font-sora text-sm">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="bg-blue-500/10 text-blue-300 text-xs px-3 py-1 rounded-full">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-blue-500/10 flex justify-between items-center w-full">
                                        <div>
                                            <p className="text-xs text-gray-500">CLIENT</p>
                                            <p className="text-sm font-semibold text-gray-300">{project.client}</p>
                                        </div>
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-6 py-2 font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400"
                                        >
                                            Live Preview
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PortfolioPage;