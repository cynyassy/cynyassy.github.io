import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md w-full px-8">
            {/* Logo/Name */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl mb-2">Cynyassy</h1>
              <p className="text-sm opacity-60 tracking-wider">Loading Portfolio...</p>
            </motion.div>

            {/* Progress bar */}
            <div className="relative">
              <div className="w-full h-2 border-2 border-black bg-white">
                <motion.div
                  className="h-full bg-[#FF4400]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="text-center mt-4 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {progress}%
              </motion.div>
            </div>

            {/* Comic-style illustration */}
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.path
                  d="M30,50 L45,50 M55,50 L70,50"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="50"
                  cy="65"
                  r="8"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
