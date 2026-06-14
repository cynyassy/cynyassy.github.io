import { motion } from 'motion/react';
import { Mail, Linkedin, Instagram, Github, ArrowRight } from 'lucide-react';
import { WireframeCard } from './wireframe/WireframeCard';

const socialLinks = [
  {
    name: 'Email',
    icon: <Mail size={24} />,
    href: 'mailto:cynyassy@gmail.com',
    label: 'cynyassy@gmail.com',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={24} />,
    href: 'https://www.linkedin.com/in/shashank-sharma-6a18437a/',
    label: 'linkedin.com/in/shashank-sharma-6a18437a',
  },
  {
    name: 'Instagram',
    icon: <Instagram size={24} />,
    href: 'https://instagram.com/cynyassy',
    label: 'instagram.com/cynyassy',
  },
  {
    name: 'GitHub',
    icon: <Github size={24} />,
    href: 'https://github.com/cynyassy',
    label: 'github.com/cynyassy',
  },
];

export function ContactSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-8 inline-block"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FF4400]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ArrowRight size={40} className="text-[#FF4400]" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="mb-8 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            Let&apos;s make something clear,{' '}
            <br />
            <span className="text-[#FF4400]">useful, and memorable.</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed opacity-80 md:text-2xl">
            I&apos;m open to thoughtful projects and roles across product, storytelling, growth, design, and
            technology.
          </p>
        </motion.div>

        <motion.div
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <WireframeCard className="group h-full bg-white transition-all duration-300 hover:bg-[#FF4400]">
                <div className="mb-4 inline-block transition-transform group-hover:scale-110 [&_svg]:text-[#333] group-hover:[&_svg]:text-white">
                  {link.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#333] transition-colors group-hover:text-white">
                  {link.name}
                </h3>
                <p className="break-all text-sm text-[#333] opacity-60 transition-opacity group-hover:text-white group-hover:opacity-100">
                  {link.label}
                </p>
              </WireframeCard>
            </motion.a>
          ))}
        </motion.div>

        <motion.blockquote
          className="mx-auto max-w-3xl border-l-4 border-[#FF4400] py-2 pl-6 text-lg font-semibold leading-relaxed text-white/85 md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          Understand deeply. Communicate clearly. Build thoughtfully.
        </motion.blockquote>

        <motion.div
          className="mt-16 border-t border-white/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <p className="mb-4 text-sm opacity-60">Portfolio built with React, Motion, and attention to detail</p>
          <p className="text-sm opacity-40">© 2026 Shashank Sharma / Cynyassy. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}
