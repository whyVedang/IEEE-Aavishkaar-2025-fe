import { ArrowRight } from "lucide-react";
import bgVideo from "../assets/bg.mp4";
import Countdown from "./Countdown";


const Hero = () => {
  return (
    <>
      {/* Import Arcade-Style Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      <section className="relative flex-1 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
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

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 sm:py-16 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          {/* RIT-B with Gold Glow Effect */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] text-center">
            RIT-B
          </h2>

          {/* TECHFEST with Arcade Style Font */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white text-center"
            style={{
              fontFamily: "'Press Start 2P', sans-serif",
              textShadow: "3px 3px 0px #FF007F, 6px 6px 0px rgba(0,0,0,0.2)",
            }}
          ><Countdown/>
            TECHFEST
          </h1>

          {/* Register Button */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center">
            <a
              href="#featured"
              className="group flex items-center space-x-2 text-lg sm:text-xl font-medium tracking-wide"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
