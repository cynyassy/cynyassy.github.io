import { motion } from 'motion/react';
import { Mail, Linkedin, Instagram, Github, ArrowRight } from 'lucide-react';
import { WireframeButton } from './wireframe/WireframeButton';
import { WireframeCard } from './wireframe/WireframeCard';

const socialLinks = [
  {
    name: 'Email',
    icon: <Mail size={24} />,
    href: 'mailto:cynyassy@gmail.com',
    label: 'cynyassy@gmail.com'
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={24} />,
    href: 'https://www.linkedin.com/in/shashank-sharma-6a18437a/',
    label: 'linkedin.com/in/shashank-sharma-6a18437a'
  },
  {
    name: 'Instagram',
    icon: <Instagram size={24} />,
    href: 'https://instagram.com/cynyassy',
    label: 'instagram.com/cynyassy'
  },
  {
    name: 'GitHub',
    icon: <Github size={24} />,
    href: 'https://github.com/cynyassy',
    label: 'github.com/cynyassy'
  }
];

const bootDevProfile = {
  href: 'https://www.boot.dev/u/cynyassy',
  image: 'https://api.boot.dev/v1/users/public/76e094d1-ba89-49fb-9372-b8e9ee053c16/thumbnail',
};

export function ContactSection() {
  return (
    <section className="min-h-screen py-24 px-6 bg-black text-white relative overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Main CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-24 h-24 border-4 border-[#FF4400] rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ArrowRight size={40} className="text-[#FF4400]" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] mb-8">
            Let's Build Something
            <br />
            <span className="text-[#FF4400]">Interesting</span>
          </h2>

          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto opacity-80">
            Whether you're tackling a complex problem, building a new product, 
            or just want to chat about systems and design—I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact methods */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <WireframeCard className="bg-white hover:bg-[#FF4400] transition-all duration-300 group h-full">
                <div className="mb-4 group-hover:scale-110 transition-transform inline-block [&_svg]:text-[#333] group-hover:[&_svg]:text-white">
                  {link.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#333] group-hover:text-white transition-colors">
                  {link.name}
                </h3>
                <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity break-all text-[#333] group-hover:text-white">
                  {link.label}
                </p>
              </WireframeCard>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
        >
          <motion.a
            href={bootDevProfile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            whileHover={{ y: -6 }}
          >
            <WireframeCard className="bg-white hover:bg-[#FF4400] transition-all duration-300 group">
              <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1.05fr)] gap-8 items-center">
                <div className="relative border-2 border-black rounded-[8px] overflow-hidden bg-[#f7f7f7]">
                  <img
                    src={bootDevProfile.image}
                    alt="Boot.dev profile badge for Cynyassy"
                    className="w-full h-auto block"
                  />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#666] group-hover:text-white transition-colors mb-3">
                    Learning Profile
                  </p>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#333] group-hover:text-white transition-colors mb-3">
                    Boot.dev
                  </h3>
                  <p className="text-base leading-relaxed text-[#333] group-hover:text-white transition-colors opacity-80 group-hover:opacity-100 mb-4">
                    A live snapshot of my backend learning path and coding practice. It fits here as a public proof-of-learning link alongside GitHub and the rest of the portfolio.
                  </p>
                  <p className="text-sm font-medium text-[#FF4400] group-hover:text-white transition-colors">
                    boot.dev/u/cynyassy
                  </p>
                </div>
              </div>
            </WireframeCard>
          </motion.a>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <WireframeCard accentBorder className="bg-white">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] mb-4 text-[#333]">What I'm Looking For</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="relative bg-white rounded-[4px] p-4 hover:bg-[#FF4400] transition-colors group">
                <div aria-hidden="true" className="absolute border-2 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="font-medium mb-2 text-[#333] group-hover:text-white">Product Roles</p>
                <p className="opacity-70 text-[#333] group-hover:text-white">Design • Strategy • Systems</p>
              </div>
              <div className="relative bg-white rounded-[4px] p-4 hover:bg-[#FF4400] transition-colors group">
                <div aria-hidden="true" className="absolute border-2 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="font-medium mb-2 text-[#333] group-hover:text-white">Collaborations</p>
                <p className="opacity-70 text-[#333] group-hover:text-white">Creative • Technical • Strategic</p>
              </div>
              <div className="relative bg-white rounded-[4px] p-4 hover:bg-[#FF4400] transition-colors group">
                <div aria-hidden="true" className="absolute border-2 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="font-medium mb-2 text-[#333] group-hover:text-white">Projects</p>
                <p className="opacity-70 text-[#333] group-hover:text-white">Challenging • Meaningful • Impactful</p>
              </div>
            </div>
          </WireframeCard>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm opacity-60 mb-4">
            Portfolio built with React, Motion, and attention to detail
          </p>
          <p className="text-sm opacity-40">
            © 2026 Shashank Sharma / Cynyassy. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Decorative corner illustrations */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 opacity-10"
        initial={{ rotate: 0, scale: 0 }}
        whileInView={{ rotate: 360, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
          <path d="M50,20 L50,80 M20,50 L80,50" stroke="white" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 opacity-10"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M10,50 Q30,20 50,50 T90,50 Q70,80 50,50 T10,50"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
}
