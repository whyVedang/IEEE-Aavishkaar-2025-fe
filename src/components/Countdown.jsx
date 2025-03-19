import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import scheduleData from '../configs/schedule.json';

const Countdown = () => {
  const hoursCanvasRef = useRef(null);
  const minutesCanvasRef = useRef(null);
  const secondsCanvasRef = useRef(null);
  const hoursDotsCanvasRef = useRef(null);
  const minutesDotsCanvasRef = useRef(null);
  const secondsDotsCanvasRef = useRef(null);
  const daysCanvasRef = useRef(null);
  const daysDotsCanvasRef = useRef(null);
  
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00',
    isLessThanDay: false
  });
  
  const hoursDotsRef = useRef([]);
  const minutesDotsRef = useRef([]);
  const secondsDotsRef = useRef([]);
  const daysDotsRef = useRef([]);
  
  const hoursPixelCoordinatesRef = useRef([]);
  const minutesPixelCoordinatesRef = useRef([]);
  const secondsPixelCoordinatesRef = useRef([]);
  const daysPixelCoordinatesRef = useRef([]);
  
  const animationFrameRefs = useRef({
    hours: null,
    minutes: null,
    seconds: null,
    days: null
  });
  
  const tweenAnimationsRefs = useRef({
    hours: [],
    minutes: [],
    seconds: [],
    days: []
  });
  
  const colors = ['61, 207, 236', '255, 244, 174', '255, 211, 218', '151, 211, 226'];
  const circleRadius = 2;
  const canvasWidth = 300;
  const canvasHeight = 200;
  
  const previousValuesRef = useRef({
    hours: '00',
    minutes: '00',
    seconds: '00',
    days: 0
  });
  
  const isInitialRenderRef = useRef({
    hours: true,
    minutes: true,
    seconds: true,
    days: true
  });

  // Update countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      try {
        const startDate = new Date(scheduleData.startDate);
        const currentDate = new Date();
        const timeDiff = startDate - currentDate;

        if (timeDiff <= 0) {
          // Event has started
          setTimeRemaining({
            days: 0,
            hours: '00',
            minutes: '00',
            seconds: '00',
            isLessThanDay: true
          });
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 3600 * 24));
        const hours = String(Math.floor((timeDiff / (1000 * 3600)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');
        
        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          isLessThanDay: days < 1
        });
      } catch (error) {
        console.error('Error calculating time difference:', error);
        setTimeRemaining({
          days: 40,
          hours: '00',
          minutes: '00',
          seconds: '00',
          isLessThanDay: false
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Setup canvas and animation for each time unit
  const setupCanvas = (canvasRef, dotsCanvasRef, containerId, dotsRef) => {
    if (!canvasRef.current || !dotsCanvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const dotsCanvas = dotsCanvasRef.current;
    const dotsCtx = dotsCanvas.getContext('2d');
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    dotsCanvas.width = container.offsetWidth;
    dotsCanvas.height = container.offsetHeight;
    
    // Clear existing dots
    dotsRef.current = [];
    
    // Create dots
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const dotCount = Math.floor((dotsCanvas.width * dotsCanvas.height) / 500);
    
    for (let i = 0; i < dotCount; i++) {
      dotsRef.current.push({
        x: randomNumber(0, dotsCanvas.width),
        y: randomNumber(0, dotsCanvas.height),
        color: colors[randomNumber(0, colors.length)],
        alpha: 0.3,
        draw: function() {
          dotsCtx.beginPath();
          dotsCtx.arc(this.x, this.y, circleRadius, 0, 2 * Math.PI, false);
          dotsCtx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          dotsCtx.fill();
        }
      });
    }
    
    return {
      canvas,
      ctx,
      dotsCanvas,
      dotsCtx,
      offsetX: (dotsCanvas.width - canvasWidth) / 2,
      offsetY: (dotsCanvas.height - canvasHeight) / 2
    };
  };

  // Draw number and get pixel coordinates
  const drawNumber = (ctx, text, pixelCoordinatesRef) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgba(36, 40, 47, 0)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.fillStyle = "rgba(13, 13, 26, 0.1)";
    ctx.textAlign = 'center';
    ctx.font = "bold 120px Lato";
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2 + 30);
    
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    pixelCoordinatesRef.current = [];
    
    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i] !== 0) {
        const x = (i / 4) % canvasWidth;
        const y = Math.floor(i / 4 / canvasWidth);
        
        if ((x % (circleRadius * 2 + 3) === 0) && (y % (circleRadius * 2 + 3) === 0)) {
          pixelCoordinatesRef.current.push({ x, y });
        }
      }
    }
  };

  // Animate dots to form numbers
  const animateDots = (dotsRef, pixelCoordinatesRef, offsetX, offsetY, tweenAnimationsRef) => {
    tweenAnimationsRef.forEach(tween => tween?.kill());
    tweenAnimationsRef.length = 0;
    
    const limit = Math.min(pixelCoordinatesRef.current.length, dotsRef.current.length);
    
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
    
    // Function to create tweens for dots
    const tweenDot = (dot, pos, canvasWidth, canvasHeight) => {
      dot.tween?.kill();
      
      dot.tween = gsap.to(dot, {
        x: pos ? pos.x + offsetX : randomNumber(0, canvasWidth),
        y: pos ? pos.y + offsetY : randomNumber(0, canvasHeight),
        alpha: pos ? 1 : 0.3,
        duration: pos ? 1 + Math.random() * 0.5 : 2 + Math.random() * 1,
        ease: "power2.out"
      });
      
      tweenAnimationsRef.push(dot.tween);
    };
    
    // Animate dots to form the number
    for (let i = 0; i < limit; i++) {
      tweenDot(dotsRef.current[i], pixelCoordinatesRef.current[i], offsetX * 2 + canvasWidth, offsetY * 2 + canvasHeight);
    }
    
    // Move remaining dots randomly
    for (let j = limit; j < dotsRef.current.length; j++) {
      tweenDot(dotsRef.current[j], null, offsetX * 2 + canvasWidth, offsetY * 2 + canvasHeight);
    }
  };

  // Setup animation loop for each unit
  const setupAnimationLoop = (dotsRef, dotsCtx, canvasWidth, canvasHeight, animationFrameRef) => {
    const loop = () => {
      dotsCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      dotsRef.current.forEach(dot => dot.draw());
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    loop();
  };

  // Effect for days display
  useEffect(() => {
    if (timeRemaining.isLessThanDay) return; // Don't run for less than a day
    
    const setup = setupCanvas(daysCanvasRef, daysDotsCanvasRef, 'days-container', daysDotsRef);
    if (!setup) return;
    
    // Skip if value hasn't changed
    if (previousValuesRef.current.days === timeRemaining.days && !isInitialRenderRef.current.days) return;
    previousValuesRef.current.days = timeRemaining.days;
    
    if (isInitialRenderRef.current.days) {
      setupAnimationLoop(daysDotsRef, setup.dotsCtx, setup.dotsCanvas.width, setup.dotsCanvas.height, 
        { current: animationFrameRefs.current.days });
      isInitialRenderRef.current.days = false;
    }
    
    drawNumber(setup.ctx, timeRemaining.days.toString(), daysPixelCoordinatesRef);
    animateDots(daysDotsRef, daysPixelCoordinatesRef, setup.offsetX, setup.offsetY, tweenAnimationsRefs.current.days);
    
    return () => {
      if (animationFrameRefs.current.days) {
        cancelAnimationFrame(animationFrameRefs.current.days);
      }
      tweenAnimationsRefs.current.days.forEach(tween => tween?.kill());
    };
  }, [timeRemaining.days, timeRemaining.isLessThanDay]);

  // Effect for hours display
  useEffect(() => {
    if (!timeRemaining.isLessThanDay) return; // Only run for less than a day
    
    const setup = setupCanvas(hoursCanvasRef, hoursDotsCanvasRef, 'hours-container', hoursDotsRef);
    if (!setup) return;
    
    // Skip if value hasn't changed
    if (previousValuesRef.current.hours === timeRemaining.hours && !isInitialRenderRef.current.hours) return;
    previousValuesRef.current.hours = timeRemaining.hours;
    
    if (isInitialRenderRef.current.hours) {
      setupAnimationLoop(hoursDotsRef, setup.dotsCtx, setup.dotsCanvas.width, setup.dotsCanvas.height, 
        { current: animationFrameRefs.current.hours });
      isInitialRenderRef.current.hours = false;
    }
    
    drawNumber(setup.ctx, timeRemaining.hours, hoursPixelCoordinatesRef);
    animateDots(hoursDotsRef, hoursPixelCoordinatesRef, setup.offsetX, setup.offsetY, tweenAnimationsRefs.current.hours);
    
    return () => {
      if (animationFrameRefs.current.hours) {
        cancelAnimationFrame(animationFrameRefs.current.hours);
      }
      tweenAnimationsRefs.current.hours.forEach(tween => tween?.kill());
    };
  }, [timeRemaining.hours, timeRemaining.isLessThanDay]);

  // Effect for minutes display
  useEffect(() => {
    if (!timeRemaining.isLessThanDay) return; // Only run for less than a day
    
    const setup = setupCanvas(minutesCanvasRef, minutesDotsCanvasRef, 'minutes-container', minutesDotsRef);
    if (!setup) return;
    
    // Skip if value hasn't changed
    if (previousValuesRef.current.minutes === timeRemaining.minutes && !isInitialRenderRef.current.minutes) return;
    previousValuesRef.current.minutes = timeRemaining.minutes;
    
    if (isInitialRenderRef.current.minutes) {
      setupAnimationLoop(minutesDotsRef, setup.dotsCtx, setup.dotsCanvas.width, setup.dotsCanvas.height, 
        { current: animationFrameRefs.current.minutes });
      isInitialRenderRef.current.minutes = false;
    }
    
    drawNumber(setup.ctx, timeRemaining.minutes, minutesPixelCoordinatesRef);
    animateDots(minutesDotsRef, minutesPixelCoordinatesRef, setup.offsetX, setup.offsetY, tweenAnimationsRefs.current.minutes);
    
    return () => {
      if (animationFrameRefs.current.minutes) {
        cancelAnimationFrame(animationFrameRefs.current.minutes);
      }
      tweenAnimationsRefs.current.minutes.forEach(tween => tween?.kill());
    };
  }, [timeRemaining.minutes, timeRemaining.isLessThanDay]);

  // Effect for seconds display
  useEffect(() => {
    if (!timeRemaining.isLessThanDay) return; // Only run for less than a day
    
    const setup = setupCanvas(secondsCanvasRef, secondsDotsCanvasRef, 'seconds-container', secondsDotsRef);
    if (!setup) return;
    
    // Skip if value hasn't changed
    if (previousValuesRef.current.seconds === timeRemaining.seconds && !isInitialRenderRef.current.seconds) return;
    previousValuesRef.current.seconds = timeRemaining.seconds;
    
    if (isInitialRenderRef.current.seconds) {
      setupAnimationLoop(secondsDotsRef, setup.dotsCtx, setup.dotsCanvas.width, setup.dotsCanvas.height, 
        { current: animationFrameRefs.current.seconds });
      isInitialRenderRef.current.seconds = false;
    }
    
    drawNumber(setup.ctx, timeRemaining.seconds, secondsPixelCoordinatesRef);
    animateDots(secondsDotsRef, secondsPixelCoordinatesRef, setup.offsetX, setup.offsetY, tweenAnimationsRefs.current.seconds);
    
    return () => {
      if (animationFrameRefs.current.seconds) {
        cancelAnimationFrame(animationFrameRefs.current.seconds);
      }
      tweenAnimationsRefs.current.seconds.forEach(tween => tween?.kill());
    };
  }, [timeRemaining.seconds, timeRemaining.isLessThanDay]);

  // Cleanup all animations on component unmount
  useEffect(() => {
    return () => {
      Object.values(animationFrameRefs.current).forEach(frame => {
        if (frame) cancelAnimationFrame(frame);
      });
      
      Object.values(tweenAnimationsRefs.current).forEach(tweens => {
        tweens.forEach(tween => tween?.kill());
      });
    };
  }, []);

  return (
    <section className="relative flex-1">
      <div className="relative z-10 px-4 py-3 h-full">
        <div className="mb-6 pt-10 text-center">
          {timeRemaining.isLessThanDay ? (
            // Display HH:MM:SS format when less than a day remains
            <div className="flex justify-center items-center">
              {/* Hours */}
              <div id="hours-container" className="relative h-48 w-full max-w-xs">
                <canvas ref={hoursCanvasRef} className="absolute top-0 left-0 z-20"></canvas>
                <canvas ref={hoursDotsCanvasRef} className="absolute top-0 left-0 z-30"></canvas>
              </div>
              
              {/* Separator */}
              <div className="mx-1 flex items-center">
                <div className="text-4xl font-bold">:</div>
              </div>
              
              {/* Minutes */}
              <div id="minutes-container" className="relative h-48 w-full max-w-xs">
                <canvas ref={minutesCanvasRef} className="absolute top-0 left-0 z-20"></canvas>
                <canvas ref={minutesDotsCanvasRef} className="absolute top-0 left-0 z-30"></canvas>
              </div>
              
              {/* Separator */}
              <div className="mx-1 flex items-center">
                <div className="text-4xl font-bold">:</div>
              </div>
              
              {/* Seconds */}
              <div id="seconds-container" className="relative h-48 w-full max-w-xs">
                <canvas ref={secondsCanvasRef} className="absolute top-0 left-0 z-20"></canvas>
                <canvas ref={secondsDotsCanvasRef} className="absolute top-0 left-0 z-30"></canvas>
              </div>
            </div>
          ) : (
            // Display days remaining when more than a day remains
            <div className="flex justify-center items-center">
              <div id="days-container" className="relative h-48 w-full max-w-md">
                <canvas ref={daysCanvasRef} className="absolute top-0 left-0 z-20"></canvas>
                <canvas ref={daysDotsCanvasRef} className="absolute top-0 left-0 z-30"></canvas>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Countdown;