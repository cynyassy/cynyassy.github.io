import { motion } from 'motion/react';

const processSteps = [
  {
    number: '01',
    title: 'Observe',
    description: 'Deep research and understanding of context, users, and constraints'
  },
  {
    number: '02',
    title: 'Frame',
    description: 'Define the real problem and identify opportunity spaces'
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create systems, interfaces, and experiences that solve problems'
  },
  {
    number: '04',
    title: 'Build',
    description: 'Bring ideas to life with clean code and thoughtful execution'
  },
  {
    number: '05',
    title: 'Iterate',
    description: 'Learn, measure, refine—repeat until it works beautifully'
  }
];

export function HowIWork() {
  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
          <defs>
            <pattern id="work-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
              <circle cx="0" cy="0" r="2" fill="white" />
              <circle cx="40" cy="40" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#work-pattern)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Patrick_Hand',sans-serif] text-5xl md:text-6xl mb-4">How I Work</h2>
          <p className="font-['Patrick_Hand',sans-serif] text-lg opacity-60">A structured yet flexible approach</p>
        </motion.div>

        {/* Process flow */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-20" />

          <div className="grid md:grid-cols-5 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step card */}
                <motion.div
                  className="border-2 border-white p-6 bg-black hover:bg-white hover:text-black transition-all duration-300 group cursor-default h-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Number badge */}
                  <div className="inline-block mb-4">
                    <div className="w-12 h-12 border-2 border-white group-hover:border-black group-hover:bg-[#FF4400] group-hover:text-white flex items-center justify-center transition-all">
                      <span className="text-sm font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Patrick_Hand',sans-serif] text-2xl mb-3 group-hover:text-[#FF4400] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-['Patrick_Hand',sans-serif] text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow (desktop) */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.6, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Arrow (mobile) */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="md:hidden flex justify-center my-4"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.6, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M12 5v14M5 12l7 7 7-7"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy note */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="border-2 border-white p-8 relative">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-[#FF4400]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FF4400]" />
            
            <p className="font-['Patrick_Hand',sans-serif] text-lg leading-relaxed">
              This isn't a rigid formula—it's a mindset. Every project is different. 
              The key is knowing when to be structured and when to be flexible.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10,5" />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,3" />
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
}