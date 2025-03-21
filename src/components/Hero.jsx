import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Countdown from "./Countdown";
import { ArrowRight, ChevronDown } from "lucide-react";
import bgVideo from "../assets/bg.mp4";
import logoImage from "../assets/logo.png";
import { motion } from 'framer-motion';

const Hero = () => {
  const ritRef = useRef(null);
  const techfestRef = useRef(null);
  const registerRef = useRef(null);
  const countdownRef = useRef(null);
  const countdownTextRef = useRef(null);
  const scrollDownRef = useRef(null);
  const logoRef = useRef(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Animation sequence
    const tl = gsap.timeline();
    
    // Animate logo first
    tl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    )
    // Then animate the RIT-B and TECHFEST titles
    .fromTo(
      ritRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out",
      },
      "-=0.5"
    )
    .fromTo(
      techfestRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "bounce.out",
      },
      "-=0.5"
    )
    // Register button after techfest title
    .fromTo(
      registerRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    )
    // Then animate countdown
    .fromTo(
      countdownRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    )
    .fromTo(
      countdownTextRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    )
    .fromTo(
      scrollDownRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        repeat: -1,
        yoyoEase: true,
      }
    );
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      <section className="relative flex-1 min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D1A]/80 to-[#4F33B3]/30"></div>
        </div>

        {/* Main Content - Centered vertically and horizontally */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
          {/* Logo/Image Container */}
          <div className="relative mb-4">
            <img
              ref={logoRef}
              src={logoImage}
              alt="Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>


          <h2
            ref={ritRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold tracking-wide text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] text-center"
          >
            RIT-B
          </h2>

          {/* TECHFEST with Arcade Style Font */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white text-center mt-4"
            style={{
              fontFamily: "'Press Start 2P', sans-serif",
              textShadow: "3px 3px #FF007F, 6px 6px rgba(0,0,0,0.2)",
            }}
          >
            <span ref={techfestRef}>TECHFEST</span>
            <Countdown />
          </h1>
          {/* Register Button - Now below TECHFEST text */}
          <div ref={registerRef} className="mt-6">
            <a
              href="#featured"
              className="group flex items-center justify-center space-x-2 text-base sm:text-lg font-medium tracking-wide"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: "#FFD700",
                textShadow: "2px 2px #FF007F, 4px 4px rgba(0,0,0,0.2)",
              }}
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>


          {/* Scroll Down Icon */}
          <div 
            ref={scrollDownRef} 
            className="absolute bottom-8 cursor-pointer"
            onClick={() => document.querySelector("#featured").scrollIntoView({ behavior: "smooth" })}
          >
            <ChevronDown className="h-8 w-8 text-white animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;