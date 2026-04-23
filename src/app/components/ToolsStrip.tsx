import { motion } from 'motion/react';
import awsIcon from '../../assets/aws-icon.webp';

type Tool = {
  name: string;
  usage: string;
  logo?: string;
  monogram?: string;
};

const tools: Tool[] = [
  {
    name: 'Python',
    logo: 'https://cdn.simpleicons.org/python/3776AB',
    usage: 'Used in Simulation Engine and backend experimentation.',
  },
  {
    name: 'Go',
    logo: 'https://cdn.simpleicons.org/go/00ADD8',
    usage: 'Used in systems-oriented backend exploration and tooling.',
  },
  {
    name: 'C',
    logo: 'https://cdn.simpleicons.org/c/A8B9CC',
    usage: 'Learned through lower-level systems and memory-management work.',
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.simpleicons.org/typescript/3178C6',
    usage: 'Used in Coffee Tools API and portfolio product work.',
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    usage: 'Used across prototypes, frontend logic, and creative tools.',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.simpleicons.org/docker/2496ED',
    usage: 'Used for packaging and running reproducible development environments.',
  },
  {
    name: 'RabbitMQ',
    logo: 'https://cdn.simpleicons.org/rabbitmq/FF6600',
    usage: 'Learned through pub/sub and queue-based systems work.',
  },
  {
    name: 'Kubernetes',
    logo: 'https://cdn.simpleicons.org/kubernetes/326CE5',
    usage: 'Learned through container orchestration and deployment concepts.',
  },
  {
    name: 'AWS',
    logo: awsIcon,
    usage: 'Used in deployment-oriented and cloud-adjacent product work.',
  },
  {
    name: 'Linux',
    logo: 'https://cdn.simpleicons.org/linux/FCC624',
    usage: 'Used across development environments, servers, and tooling.',
  },
  {
    name: 'SQL',
    monogram: 'SQL',
    usage: 'Learned directly and used through relational data modeling and queries.',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.simpleicons.org/postgresql/4169E1',
    usage: 'Used in backend systems and structured application data models.',
  },
  {
    name: 'Figma',
    logo: 'https://cdn.simpleicons.org/figma/F24E1E',
    usage: 'Used in interface design, systems thinking, and product flows.',
  },
  {
    name: 'GitHub',
    logo: 'https://cdn.simpleicons.org/github/181717',
    usage: 'Used for versioning, documentation systems, and shipping work.',
  },
  {
    name: 'Sketch',
    logo: 'https://cdn.simpleicons.org/sketch/F7B500',
    usage: 'Used on iPad for interface thinking and design exploration.',
  },
  {
    name: 'Origami Studio',
    monogram: 'OS',
    usage: 'Used for interaction prototyping and motion-led interface experiments.',
  },
  {
    name: 'Codex',
    monogram: 'CX',
    usage: 'Used as part of the building workflow for implementation and iteration.',
  },
];

const duplicatedTools = [...tools, ...tools];

export function ToolsStrip() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <style>{`
        @keyframes tools-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <motion.div
        className="max-w-5xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Tools</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-[#111] mb-4">
          Tools I Use to Build
        </h2>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/90 to-transparent" />

        <div className="overflow-hidden rounded-[10px] border-y-2 border-black bg-white py-8">
          <div
            className="flex w-max items-center gap-12"
            style={{ animation: 'tools-marquee 38s linear infinite' }}
          >
            {duplicatedTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="group flex h-16 w-24 shrink-0 items-center justify-center"
                title={`${tool.name}: ${tool.usage}`}
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="h-11 w-11 object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-11 min-w-[3.25rem] items-center justify-center rounded-full border border-black px-3 text-sm font-semibold tracking-[0.18em] text-[#111] opacity-80 transition-all duration-300 group-hover:border-[#FF4400] group-hover:text-[#FF4400] group-hover:opacity-100">
                    {tool.monogram}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto mt-8 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-lg text-[#555]">
          Built and used across real systems — APIs, simulations, product tools, and content platforms.
        </p>
        <p className="mt-3 text-sm font-medium tracking-[0.02em] text-[#111]">
          Used in: Coffee Tools API · Simulation Engine · AlgoTest Docs System · Cynyassy
        </p>
      </motion.div>
    </section>
  );
}
