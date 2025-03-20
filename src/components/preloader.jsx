import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({setLoading}) => {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState(false);
  const [scanlineOpacity, setScanlineOpacity] = useState(0.2);

  // Slower, more deliberate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Reduced increment for slower progression
        const increment = Math.floor(Math.random() * 2) + 2; // Random increase between 2-3
        const nextProgress = prevProgress + increment;
        
        if (nextProgress >= 100) {
          setLoading(false) 
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
      
      // Random glitch effect on the text
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 120); // Longer glitch duration
      }
      
      // Slower pulsating scanlines
      setScanlineOpacity(prev => Math.sin(Date.now() * 0.004) * 0.3 + 0.2);
      
    }, 45); // Slower interval (was 30ms in original)

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0wIDBoMXY0MGgtMXoiIGZpbGw9IiMzMzMiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTAgMHY0MGg0MHYtNDB6TTM5IDFoLTM4djM4aDM4eiIgZmlsbD0iIzMzMyIgb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-20" />

      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
          backgroundSize: '100% 4px',
          opacity: scanlineOpacity
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-indigo-900 opacity-5 animate-pulse" />
      
      {/* Main content */}
      <div className="z-10 w-full max-w-md px-8">
        {/* Cyberpunk logo/title */}
        <motion.div 
          className="mb-8" // Restored original spacing
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Restored original timing
        >
          <h1 className="text-5xl font-bold tracking-wider text-violet-500">
            <motion.span
              animate={{
                textShadow: ['0 0 5px #8b5cf6', '0 0 15px #8b5cf6', '0 0 5px #8b5cf6']
              }}
              transition={{ duration: 1.2, repeat: Infinity }} // Slower animation
            >
              RIT
            </motion.span>
            <motion.span
              animate={{
                textShadow: ['0 0 5px #3b82f6', '0 0 15px #3b82f6', '0 0 5px #3b82f6']
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} // Slower animation
              className="text-blue-500"
            >
              Techfest
            </motion.span>
          </h1>
        </motion.div>

        {/* Progress container */}
        <div className="relative mb-6"> {/* Original spacing */}
          {/* Glitch lines that appear randomly */}
          {Math.random() > 0.8 && ( // Reduced frequency of glitches
            <motion.div
              className="absolute h-px bg-violet-500"
              style={{ 
                width: Math.random() * 100 + '%',
                left: Math.random() * 50 + '%',
                top: Math.random() * 30 + 'px',
                opacity: 0.7
              }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.15 }} // Slower fade
            />
          )}

          {/* Animated progress bar */}
          <div className="relative w-full h-1 overflow-hidden bg-gray-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Animated brackets around the progress bar */}
          <div className="absolute w-4 h-4 border-t-2 border-l-2 -left-2 -top-2 border-violet-500" />
          <div className="absolute w-4 h-4 border-t-2 border-r-2 -right-2 -top-2 border-violet-500" />
          <div className="absolute w-4 h-4 border-b-2 border-l-2 -left-2 -bottom-2 border-violet-500" />
          <div className="absolute w-4 h-4 border-b-2 border-r-2 -right-2 -bottom-2 border-violet-500" />
          
          {/* Digital percentage display */}
          <div className="mt-4 text-center"> {/* Original spacing */}
            <motion.div
              className={`inline-block font-mono text-2xl font-bold ${glitchText ? 'text-red-500' : 'text-violet-400'}`}
              animate={glitchText ? {
                x: [0, -2, 3, -1, 0],
                opacity: [1, 0.8, 1]
              } : {}}
              transition={{ duration: 0.15 }} // Slowed down
            >
              {progress.toString().padStart(3, '0')}
              <span className="text-blue-500">%</span>
            </motion.div>
          </div>
        </div>

        {/* Animated text */}
        <motion.div 
          className="font-mono text-sm text-center text-blue-400 opacity-80"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }} // Slower pulse
        >
          <p>GET TIRED WITH TECH</p>
          
          {/* Matrix-style loading effect */}
          <div className="flex justify-center mt-2 space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-violet-500"
                animate={{
                  height: [4, 16, 4],
                  backgroundColor: ['#8b5cf6', '#3b82f6', '#8b5cf6']
                }}
                transition={{
                  duration: 0.8, // Slower animation
                  repeat: Infinity,
                  delay: i * 0.1, // Original timing
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Animated circuit lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => ( // Restored all circuit lines
            <motion.div
              key={i}
              className="absolute bg-blue-500"
              style={{
                height: '1px',
                width: Math.random() * 100 + 50,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: 0.3
              }}
              animate={{
                width: [0, Math.random() * 100 + 50, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 2.5 + 2, // Slower animations
                repeat: Infinity,
                delay: Math.random() * 3 // Longer delays
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;