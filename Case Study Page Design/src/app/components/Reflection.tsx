export function Reflection() {
  return (
    <section className="px-6 py-24 border-b border-black">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-5xl font-black">What this shows</h2>
        
        <div className="space-y-8 max-w-3xl">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-3 h-3 bg-[#FF6B6B] mt-2"></div>
            <div>
              <p className="text-xl font-black mb-2">Systems thinking</p>
              <p className="text-lg leading-relaxed">
                The ability to map complex social structures and translate them into interactive models that reveal hidden dynamics.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-3 h-3 bg-[#FF6B6B] mt-2"></div>
            <div>
              <p className="text-xl font-black mb-2">Translation of complexity</p>
              <p className="text-lg leading-relaxed">
                Converting abstract concepts of privilege and power into tangible mechanics that can be experienced and understood.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-3 h-3 bg-[#FF6B6B] mt-2"></div>
            <div>
              <p className="text-xl font-black mb-2">Iterative design</p>
              <p className="text-lg leading-relaxed">
                Balancing educational impact with engagement through continuous testing, refinement, and integration of player feedback.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-3 h-3 bg-[#FF6B6B] mt-2"></div>
            <div>
              <p className="text-xl font-black mb-2">Cross-disciplinary execution</p>
              <p className="text-lg leading-relaxed">
                Synthesizing insights from sociology, game design, education theory, and systems science into a cohesive learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}