import Group2300 from '../../imports/Group2300/Group2300';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 border-b border-black">
      <div className="max-w-5xl w-full space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black tracking-tight relative inline-block">
            Perspectives
            <div className="absolute bottom-2 left-0 w-full h-4 bg-[#FF6B6B] -z-10"></div>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">
            A board game that reveals how systems—not individuals—create and sustain inequality over time
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 border border-black text-sm tracking-wide hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors cursor-default">
            Systems Design
          </span>
          <span className="px-4 py-2 border border-black text-sm tracking-wide hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors cursor-default">
            Game Design
          </span>
          <span className="px-4 py-2 border border-black text-sm tracking-wide hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors cursor-default">
            Research
          </span>
        </div>

        {/* Cover Image */}
        <div className="w-full h-[600px] border-2 border-black bg-white flex items-center justify-center overflow-hidden">
          <div className="w-[842px] h-[595px] relative">
            <Group2300 />
          </div>
        </div>
      </div>
    </section>
  );
}