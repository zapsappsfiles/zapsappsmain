import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const WhyUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const controls = useAnimation();
  const targetRef = useRef<HTMLDivElement>(null);
  
  const reasons = [
    {
      title: "Thoughtful Design",
      description: "We believe in purpose-driven design that solves real problems while maintaining aesthetic integrity.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/3o7btNa0RUYa5E7iiQ/giphy-grayscale.gif",
    },
    {
      title: "Attention to Detail",
      description: "Every pixel matters. We obsess over the details that others might overlook.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjk1YzJmMzgtZjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/d3mlE7uhX8KFgEmY/giphy-grayscale.gif",
    },
    {
      title: "Collaborative Process",
      description: "We work closely with you as partners, ensuring your vision is realized every step of the way.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/l0IylOPCNkiqOgMyA/giphy-grayscale.gif",
    },
    {
      title: "Technical Excellence",
      description: "Our designs aren't just beautiful, they're built with clean code and optimized performance.",
      gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM2YTJiMzQtYjQ4Ny00ZDM3LWE4NTAtYjM4YzY2NzM2YzFhMiZjdD1n/LmNwrBhejkK9EFP504/giphy-grayscale.gif",
    }
  ];

  // Game functions
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
    moveTarget();
  };

  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      setScore(score + 1);
      moveTarget();
    }
  };

  const moveTarget = () => {
    if (targetRef.current) {
      const maxX = window.innerWidth * 0.8 - 50;
      const maxY = 300 - 50;
      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);
      controls.start({
        x: newX,
        y: newY,
        transition: { type: "spring", duration: 0.3 }
      });
    }
  };

  // Timer for the game
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <section id="why-us" className="py-24 bg-light relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-xs uppercase tracking-widest mb-4 text-accent border-b border-accent/30 pb-1">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">We're different in the best ways</h2>
            <p className="text-accent/80 max-w-2xl mx-auto">
              Beyond our portfolio, here's why clients continue to choose ZapsApps for their design needs.
            </p>
          </motion.div>

          {/* Interactive Tabs */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center mb-8 border-b border-accent/10">
              {reasons.map((reason, index) => (
                <motion.button
                  key={index}
                  className={`px-4 py-3 font-mono text-xs uppercase relative ${
                    activeTab === index ? 'text-accent' : 'text-accent/50 hover:text-accent/80'
                  }`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {reason.title}
                  {activeTab === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                      layoutId="activeTabIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className="bg-paper p-8 shadow-sm">
                  <h3 className="font-serif text-xl mb-4">{reasons[activeTab].title}</h3>
                  <p className="text-accent/80 mb-6">{reasons[activeTab].description}</p>
                  <div className="font-mono text-xs">Why it matters →</div>
                </div>
                <div className="flex justify-center p-6 bg-paper/50 rounded-sm overflow-hidden">
                  <motion.img
                    src={reasons[activeTab].gif}
                    alt={reasons[activeTab].title}
                    className="max-w-full h-auto rounded-sm"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini game section */}
          <motion.div 
            className="mt-20 p-8 bg-paper relative rounded-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-xl mb-2 text-center">The ZapsApps Speed Challenge</h3>
            <p className="text-accent/80 mb-8 text-center max-w-xl mx-auto">
              Our team is lightning fast. Test your reflexes by clicking the target as many times as possible in 10 seconds.
            </p>

            <div className="relative h-80 bg-light/50 rounded-sm mb-4 overflow-hidden flex flex-col items-center justify-center">
              {!gameStarted ? (
                <motion.button
                  className="px-6 py-3 bg-accent text-paper font-mono text-sm uppercase"
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game
                </motion.button>
              ) : isPlaying ? (
                <>
                  <div className="absolute top-4 left-4 font-mono text-sm">Time: {timeLeft}s</div>
                  <div className="absolute top-4 right-4 font-mono text-sm">Score: {score}</div>
                  <motion.div
                    ref={targetRef}
                    className="absolute w-12 h-12 rounded-full bg-accent flex items-center justify-center cursor-pointer"
                    animate={controls}
                    initial={{ x: 100, y: 100 }}
                    onClick={handleClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-paper text-xl">!</span>
                  </motion.div>
                </>
              ) : (
                <div className="text-center">
                  <h4 className="font-serif text-xl mb-2">Game Over!</h4>
                  <p className="mb-4">Your score: {score}</p>
                  <p className="mb-6">High score: {highScore}</p>
                  <motion.button
                    className="px-6 py-3 bg-accent text-paper font-mono text-sm uppercase"
                    onClick={startGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Again
                  </motion.button>
                </div>
              )}
            </div>
            
            <p className="text-xs text-accent/60 text-center">
              Fun fact: Our team's average response time is under 4 hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 -z-10" />
    </section>
  );
};

export default WhyUs; 