import { motion } from 'motion/react';

interface Client {
  name: string;
  logoUrl: string;
}

const clients: Client[] = [
  { name: 'KPMG', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=kpmg.com' },
  { name: 'Teach For India', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=teachforindia.org' },
  { name: 'Bahrisons', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=booksatbahri.com' },
  { name: 'Jamboree Education', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=jamboreeindia.com' },
  { name: 'Dextra', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=dextra.com' },
  { name: 'Slam Out Loud', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=slamoutloud.org' },
  { name: 'CreatNet Consulting', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=creatnet.co' },
  { name: 'CreatNet Education', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=creatnet.org' },
  { name: 'Kama Ayurveda', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=kamaayurveda.in' },
  { name: 'Studio Lotus', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=studiolotus.in' },
  { name: 'Indus Action', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=indusaction.org' },
  { name: 'Kaivalya Plays', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=kaivalyaplays.org' },
  { name: 'AlgoTest', logoUrl: 'https://www.google.com/s2/favicons?sz=256&domain_url=docs.algotest.in' }
];

const duplicatedClients = [...clients, ...clients];

export function ClientsCarousel() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <style>{`
        @keyframes employers-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] mb-4">Employers & Collaborations</h2>
          <p className="text-lg opacity-60">Organizations I have worked with across teaching, design, publishing, and consulting</p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/90 to-transparent" />

          <div className="overflow-hidden rounded-[10px] border-y-2 border-black bg-white py-6">
            <div
              className="flex w-max items-center gap-10"
              style={{ animation: 'employers-marquee 40s linear infinite' }}
            >
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 w-56 text-center group cursor-pointer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % clients.length) * 0.04 }}
                  whileHover={{ y: -4 }}
                  title={client.name}
                >
                  <div className="h-24 flex items-center justify-center px-6">
                    <img
                      src={client.logoUrl}
                      alt={`${client.name} logo`}
                      className="max-h-16 max-w-full object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] mt-3 group-hover:text-[#FF4400] transition-colors">
                    {client.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional credibility note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm opacity-60">
            Worked across education, publishing, wellness, design studios, and international organizations
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black opacity-5" />
    </section>
  );
}
