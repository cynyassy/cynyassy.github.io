import { motion } from 'motion/react';
import { TrendingUp, Zap, Target } from 'lucide-react';

const currentFocusItems = [
  {
    icon: <Target size={32} />,
    title: 'Developing Core Case Studies',
    description: 'Turning the four core personas into clear portfolio case studies with sharper framing, stronger narrative flow, and better proof of work.',
    status: 'In Progress',
    timeline: 'Current'
  },
  {
    icon: <Zap size={32} />,
    title: 'Learning & Experiments',
    description: 'Exploring generative AI workflows, animation systems, and the intersection of design and code.',
    status: 'Ongoing',
    timeline: 'Continuous'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Growing Cynyassy',
    description: 'Publishing weekly content on systems thinking, design philosophy, and multidisciplinary work.',
    status: 'Active',
    timeline: 'Weekly'
  }
];

export function CurrentFocus() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block border-2 border-black px-4 py-2 mb-4 bg-[#FF4400] text-white">
            <span className="font-['Patrick_Hand',sans-serif] text-sm uppercase tracking-wider">Now</span>
          </div>
          <h2 className="font-['Patrick_Hand',sans-serif] text-5xl md:text-6xl mb-4">Current Focus</h2>
          <p className="font-['Patrick_Hand',sans-serif] text-lg opacity-60">What I'm building and learning right now</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {currentFocusItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="border-2 border-black p-8 bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6 text-black group-hover:text-[#FF4400] transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {item.icon}
              </motion.div>

              {/* Status badge */}
              <div className="font-['Patrick_Hand',sans-serif] inline-block px-3 py-1 border border-black text-xs mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                {item.status}
              </div>

              {/* Title */}
              <h3 className="font-['Patrick_Hand',sans-serif] text-2xl mb-3 group-hover:text-[#FF4400] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-['Patrick_Hand',sans-serif] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity mb-4">
                {item.description}
              </p>

              {/* Timeline */}
              <div className="font-['Patrick_Hand',sans-serif] flex items-center gap-2 text-sm opacity-60">
                <div className="w-2 h-2 bg-[#FF4400] rounded-full animate-pulse" />
                <span>{item.timeline}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-16 text-center border-2 border-black p-8 bg-[#fafafa] max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-['Patrick_Hand',sans-serif] text-lg leading-relaxed mb-4">
            I'm always open to interesting projects and collaborations.
          </p>
          <p className="font-['Patrick_Hand',sans-serif] opacity-60">
            If you're working on something that involves systems thinking, design, or building 
            something that matters—let's talk.
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-5"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M50,10 L90,50 L50,90 L10,50 Z"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="15" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 opacity-5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" stroke="black" strokeWidth="2" fill="none" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="black" strokeWidth="2" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="black" strokeWidth="2" />
        </svg>
      </motion.div>
    </section>
  );
}
