import React from "react";
import { Link } from "react-router";
import {
  Linkedin,
  Instagram,
  Github,
  ArrowUp,
  Mail,
  MapPin,
} from "lucide-react";
import ieeeData from "../configs/ieee-data.config.json";

// Linktree Logo SVG Component
const LinktreeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12 2v20" />
    <path d="M6 7l6-5 6 5" />
    <path d="M6 12l6-5 6 5" />
    <path d="M6 17l6-5 6 5" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-10 relative bg-[#0c0c18] border-t border-neon-pink/30 transition-footer">
      <div className="relative py-12 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-2 justify-center md:justify-start"
            >
              <span className="font-orbitron font-bold text-xl">
                RIT-B TechFest-2025
              </span>
            </Link>
            <p className="text-gray-300">
              Experience the future of technology at the most immersive tech
              festival of the year.
            </p>
          </div>
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-neon-pink transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="text-gray-300 hover:text-neon-pink transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/sponsors"
                  className="text-gray-300 hover:text-neon-pink transition-colors"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-300 hover:text-neon-pink transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-neon-pink flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-sm">
                  <a href={`mailto:${ieeeData.email}`}>{ieeeData.email}</a>
                </span>
              </li>
              <li className="flex items-center space-x-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-hacker-green flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-sm">
                  <a href="https://maps.app.goo.gl/fkGesiVRNP8qBArJ9">
                    {ieeeData.address}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href={ieeeData.socials.linkedin}
                className="text-gray-300 hover:text-neon-pink transition-colors"
                target="_blank"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={ieeeData.socials.instagram}
                className="text-gray-300 hover:text-neon-pink transition-colors"
                target="_blank"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={ieeeData.socials.github}
                className="text-gray-300 hover:text-neon-pink transition-colors"
                target="_blank"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={ieeeData.socials.linktree}
                className="text-gray-300 hover:text-neon-pink transition-colors"
                target="_blank"
              >
                <LinktreeIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neon-pink/30 flex flex-col md:flex-row justify-between items-center feature-white">
          <p className="text-gray-300 text-sm text-center md:text-left">
            © 2025 TechFest. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-neon-pink hover:text-electric-blue transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
