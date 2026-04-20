export function MyLens() {
  return (
    <section className="px-6 py-24 border-b border-black bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-5xl font-black">How I approached this</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Block 1 */}
          <div className="space-y-4 border-l-4 border-[#FF6B6B] pl-6">
            <h3 className="text-2xl font-black">Systems as mechanics</h3>
            <p className="text-base leading-relaxed">
              I translated real-world systems into playable game mechanics, making abstract privilege concrete and observable.
            </p>
          </div>

          {/* Block 2 */}
          <div className="space-y-4 border-l-4 border-[#FF6B6B] pl-6">
            <h3 className="text-2xl font-black">Safe exploration</h3>
            <p className="text-base leading-relaxed">
              Games offer a judgment-free space to explore difficult topics, allowing players to engage without personal defensiveness.
            </p>
          </div>

          {/* Block 3 */}
          <div className="space-y-4 border-l-4 border-[#FF6B6B] pl-6">
            <h3 className="text-2xl font-black">Iterative design</h3>
            <p className="text-base leading-relaxed">
              Through playtesting and refinement, I balanced educational impact with engaging gameplay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}