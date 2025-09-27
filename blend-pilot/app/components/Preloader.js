"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const preloaderElement = document.getElementById('preloader');
    
    if (!preloaderElement) {
        if(onComplete) onComplete();
        return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
            onComplete();
        }
      }
    });

    const counter = { val: 0 };
    
    tl.to(counter, {
        val: 100,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
            const percentageElement = document.getElementById('loading-percentage');
            if(percentageElement) {
                percentageElement.textContent = `${Math.round(counter.val)}%`;
            }
        }
    })
    .fromTo('#preloader-logo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.75)' }, 0)
    .to('#loading-percentage', { opacity: 1, duration: 1 }, 0)
    .fromTo('.preloader-text', { opacity: 0, y: '100%' }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.5)
    .to(['.preloader-text', '#preloader-logo', '#loading-percentage'], { 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power2.in',
     }, '+=0.5')
    .to(preloaderElement, {
        y: '-100%',
        duration: 1,
        ease: 'power3.inOut',
    }, "-=0.5");

  }, [onComplete]);

  return (
    <div id="preloader" className="fixed top-0 left-0 w-full h-screen bg-[#010409] z-[99999] flex justify-center items-center flex-col text-white overflow-hidden">
      <Image 
        id="preloader-logo" 
        src="https://i.ibb.co/b5xP5KTS/Untitled-design-3-Photoroom.png"
        alt="BlendPilot Logo" 
        width={120} 
        height={80}
        priority={true}
        className="opacity-0 transform scale-80 invert brightness-0"
      />
      <div className="preloader-text-wrapper mt-4 overflow-hidden">
        <div className="preloader-text font-rajdhani text-lg tracking-[0.2em] uppercase opacity-0 transform translate-y-full">
          Initializing BlendPilot...
        </div>
      </div>
      <div id="loading-percentage" className="font-orbitron absolute bottom-[10%] text-2xl opacity-0">
        0%
      </div>
    </div>
  );
};

export default Preloader;