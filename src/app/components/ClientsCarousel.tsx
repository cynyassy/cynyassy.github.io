import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export function ClientsCarousel() {
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('clients-scroll');
    if (container) {
      const scrollAmount = 300;
      const currentPosition = container.scrollLeft;
      const newPosition = direction === 'left' 
        ? Math.max(0, currentPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, currentPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
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
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black p-3 hover:bg-black hover:text-white transition-colors -ml-4 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black p-3 hover:bg-black hover:text-white transition-colors -mr-4 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel */}
          <div
            id="clients-scroll"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                className="flex-shrink-0 w-56 text-center group cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="h-28 flex items-center justify-center px-6">
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    className="max-h-20 max-w-full object-contain"
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
