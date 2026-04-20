import { motion } from 'motion/react';
import { WireframeCard } from './wireframe/WireframeCard';

const aboutBlocks = [
  {
    title: 'What I Care About',
    content: 'Building things that matter. Clarity over complexity. Systems that empower people. Stories that stick. Work that creates lasting value.',
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <path d="M30,10 L30,50 M10,30 L50,30" stroke="black" strokeWidth="2" />
        <circle cx="30" cy="30" r="20" stroke="black" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    title: 'How I Think',
    content: 'In patterns and connections. From the macro to the micro. With empathy for the user and respect for the system. Always asking "why" before "how."',
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <circle cx="15" cy="30" r="8" stroke="black" strokeWidth="2" fill="none" />
        <circle cx="30" cy="15" r="8" stroke="black" strokeWidth="2" fill="none" />
        <circle cx="45" cy="30" r="8" stroke="black" strokeWidth="2" fill="none" />
        <line x1="22" y1="28" x2="38" y2="22" stroke="black" strokeWidth="2" />
        <line x1="22" y1="32" x2="38" y2="32" stroke="black" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'What I Build',
    content: 'Interfaces that feel natural. Systems that scale. Narratives that guide. Products that solve real problems. Experiences that people actually want to use.',
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <rect x="10" y="15" width="40" height="30" stroke="black" strokeWidth="2" fill="none" />
        <line x1="10" y1="25" x2="50" y2="25" stroke="black" strokeWidth="2" />
        <circle cx="20" cy="35" r="3" fill="black" />
        <circle cx="30" cy="35" r="3" fill="black" />
        <circle cx="40" cy="35" r="3" fill="black" />
      </svg>
    )
  }
];

export function AboutSection() {
  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Patrick_Hand',sans-serif] text-5xl md:text-6xl mb-4">About Me</h2>
          <div className="w-24 h-1 bg-[#FF4400] mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {aboutBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <WireframeCard className="h-full bg-white hover:bg-[#FF4400] transition-all duration-300 group">
                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="transform group-hover:scale-110 transition-transform [&_path]:stroke-[#333] [&_line]:stroke-[#333] [&_circle]:stroke-[#333] group-hover:[&_path]:stroke-white group-hover:[&_line]:stroke-white group-hover:[&_circle]:stroke-white [&_circle[fill]]:fill-[#333] group-hover:[&_circle[fill]]:fill-white">
                    {block.icon}
                  </div>
                </div>
                <h3 className="font-['Patrick_Hand',sans-serif] text-2xl mb-4 text-[#333] group-hover:text-white">{block.title}</h3>
                <p className="font-['Patrick_Hand',sans-serif] text-[18px] leading-[24px] opacity-80 group-hover:opacity-100 text-[#333] group-hover:text-white">
                  {block.content}
                </p>
              </WireframeCard>
            </motion.div>
          ))}
        </div>

        {/* Quote or additional context */}
        <motion.div
          className="mt-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="border-l-4 border-[#FF4400] pl-6 py-4 text-left">
            <p className="font-['Patrick_Hand',sans-serif] text-xl md:text-2xl leading-relaxed italic opacity-90">
              "I believe in making complex things simple, invisible systems visible, and boring processes beautiful."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 opacity-10"
        initial={{ rotate: -45, scale: 0 }}
        whileInView={{ rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M10,50 Q30,30 50,50 T90,50 M50,10 Q30,30 50,50 T50,90"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>
    </section>
  );
}