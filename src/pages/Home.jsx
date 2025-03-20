import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import AnimatedFooter from "../components/AnimatedFooter";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Listen for the custom event from preloader if using that approach
    const handleAppLoaded = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('appLoaded', handleAppLoaded);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener('appLoaded', handleAppLoaded);
    };
  }, []);
  
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <>
        <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full h-full"
    >
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FeaturedEvents />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <AnimatedFooter />
      </motion.div>
    </motion.div>
</>
  );
};
export default Home;