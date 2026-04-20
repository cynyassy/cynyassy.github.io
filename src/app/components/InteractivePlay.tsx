import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee, Book, Music, Code, Lightbulb } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  icon: React.ReactNode;
  text: string;
  color: string;
}

const balloons: Balloon[] = [
  {
    id: 1,
    x: 15,
    y: 20,
    icon: <Coffee size={24} />,
    text: 'Coffee is not optional. It\'s a creative fuel source.',
    color: '#000'
  },
  {
    id: 2,
    x: 35,
    y: 60,
    icon: <Book size={24} />,
    text: 'Always reading. Currently into systems thinking and narrative design.',
    color: '#000'
  },
  {
    id: 3,
    x: 55,
    y: 30,
    icon: <Music size={24} />,
    text: 'Lo-fi beats and soundtracks make the best work companions.',
    color: '#000'
  },
  {
    id: 4,
    x: 75,
    y: 55,
    icon: <Code size={24} />,
    text: 'I believe the best designers should understand code.',
    color: '#000'
  },
  {
    id: 5,
    x: 25,
    y: 75,
    icon: <Lightbulb size={24} />,
    text: 'Ideas are worthless without execution.',
    color: '#000'
  },
  {
    id: 6,
    x: 65,
    y: 85,
    icon: <Sparkles size={24} />,
    text: 'Small details make big differences.',
    color: '#000'
  }
];

export function InteractivePlay() {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [hoveredBalloon, setHoveredBalloon] = useState<number | null>(null);

  const popBalloon = (id: number) => {
    if (!poppedBalloons.includes(id)) {
      setPoppedBalloons([...poppedBalloons, id]);
      setTimeout(() => {
        setPoppedBalloons(prev => prev.filter(balloonId => balloonId !== id));
      }, 5000);
    }
  };

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Patrick_Hand',sans-serif] text-5xl md:text-6xl mb-4">A Little More Human</h2>
          <p className="font-['Patrick_Hand',sans-serif] text-lg opacity-60">Click the floating thoughts to learn more about me</p>
        </motion.div>

        <div className="relative h-[600px] border-4 border-black bg-[#fafafa] rounded-[8px]">
          {/* Background grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="play-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="black" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#play-grid)" />
          </svg>

          {/* Floating balloons */}
          {balloons.map((balloon, index) => (
            <motion.div
              key={balloon.id}
              className="absolute cursor-pointer"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                y: {
                  repeat: Infinity,
                  duration: 3 + index * 0.5,
                  ease: 'easeInOut'
                }
              }}
              onMouseEnter={() => setHoveredBalloon(balloon.id)}
              onMouseLeave={() => setHoveredBalloon(null)}
              onClick={() => popBalloon(balloon.id)}
            >
              {/* Balloon */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-20 h-20 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-lg transition-colors duration-300 ${
                  hoveredBalloon === balloon.id ? 'bg-[#FF4400] text-white' : ''
                }`}>
                  {balloon.icon}
                </div>
                
                {/* String */}
                <div className="absolute left-1/2 top-full w-0.5 h-8 bg-black opacity-30" />
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {poppedBalloons.includes(balloon.id) && (
                  <motion.div
                    className="absolute top-24 left-1/2 -translate-x-1/2 w-64 bg-[#FF4400] text-white p-4 border-4 border-black z-20 shadow-xl rounded-[4px]"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF4400] border-l-4 border-t-4 border-black rotate-45" />
                    <p className="font-['Patrick_Hand',sans-serif] text-sm leading-relaxed">{balloon.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Instruction hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2 }}
          >
            <p className="font-['Patrick_Hand',sans-serif] text-sm">Click any bubble to reveal a thought</p>
          </motion.div>
        </div>

        {/* Counter */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-['Patrick_Hand',sans-serif] text-sm opacity-60">
            {poppedBalloons.length > 0 ? `${poppedBalloons.length} thought${poppedBalloons.length > 1 ? 's' : ''} revealed` : 'Hover and click to explore'}
          </p>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="4" fill="none" strokeDasharray="20,10" />
        </svg>
      </motion.div>
    </section>
  );
}
