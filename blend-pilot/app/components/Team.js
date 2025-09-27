// /components/Team.js
"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

// Swiper.js component ebong style import kora hocche
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// React Icons import kora hocche
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

// Apnar dewa JSON data
const teamMembers = [
  { name: "Mehefuj Ali", role: "Web Developer", image: "https://i.imgur.com/zxsK7aY.png", socials: { facebook: "#", linkedin: "#", github: "#", twitter: "#" } },
  { name: "MCCLINTOCK", role: "Sr Developer", image: "https://i.ibb.co/vkx23ZN/image.png", socials: { facebook: "#", linkedin: "#", github: "#", twitter: "#" } },
  { name: "R. FUENTES", role: "3d Designer", image: "https://i.ibb.co/t8G7F5T/man-taking-selfie.jpg", socials: { facebook: "#", linkedin: "#", github: "#", twitter: "#" } },
  { name: "DARIN WAITS", role: "Web Designer", image: "https://i.ibb.co/Ln9VhY1/images-1.jpg", socials: { facebook: "#", linkedin: "#", github: "#", twitter: "#" } },
  { name: "Sumon Mitra", role: "Web Developer", image: "https://i.ibb.co/QNWNPrF/profile-picture-maker-before.webp", socials: { facebook: "#", linkedin: "#", github: "#", twitter: "#" } },
];

// Alada Team Member Card component
const TeamMemberCard = ({ member }) => {
    const cardRef = useRef(null);
    const [showSocials, setShowSocials] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // 3D Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y / rect.height - 0.5) * -15;
            const rotateY = (x / rect.width - 0.5) * 15;
            gsap.to(card, { duration: 0.7, rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { duration: 1, rotationX: 0, rotationY: 0, ease: "elastic.out(1, 0.5)" });
        });
    }, []);
    
    useEffect(() => {
        // Social icon-gulor jonno animation
        gsap.fromTo(".social-icon", { scale: 0, opacity: 0 }, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
        });
    }, [showSocials]);


    return (
        <div ref={cardRef} className="team-card relative w-full h-[400px] glass-card p-6 flex flex-col justify-end items-center text-center overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '15px 15px' }}></div>
            
            {/* Social Hub Toggle Button */}
            <button onClick={() => setShowSocials(!showSocials)} className="absolute top-4 right-4 z-20 w-8 h-8 border border-white/30 rounded-full text-white/70 hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300">
                <i className={`fas ${showSocials ? 'fa-times' : 'fa-plus'}`}></i>
            </button>
            
            {/* Image ebong Social Icons */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36">
                 <Image src={member.image} alt={member.name} width={144} height={144} className="rounded-full object-cover border-4 border-white/20" />
                 {showSocials && (
                     <div className="absolute inset-0">
                        <a href={member.socials.facebook} className="social-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"><FaFacebookF /></a>
                        <a href={member.socials.twitter} className="social-icon absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"><FaTwitter /></a>
                        <a href={member.socials.linkedin} className="social-icon absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"><FaLinkedinIn /></a>
                        <a href={member.socials.github} className="social-icon absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"><FaGithub /></a>
                    </div>
                 )}
            </div>
            
            {/* Member Info */}
            <div className="relative z-10">
                <h3 className="text-2xl font-sora font-bold text-white">{member.name}</h3>
                <p className="text-[var(--neon-cyan)]">{member.role}</p>
            </div>
        </div>
    );
}

const Team = () => {
    return (
        <section id="team" className="content-wrapper py-20 lg:py-32 px-6">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-sora font-bold text-white">Meet Our Core Team</h2>
                </div>
                
                <Swiper
                    modules={[Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 80,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {teamMembers.map((member, index) => (
                        <SwiperSlide key={index} style={{ width: '350px', height: '450px' }}>
                            <div className="p-4">
                                <TeamMemberCard member={member} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Team;
