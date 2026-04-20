import UpgradeAndCostSheetV from '../../imports/UpgradeAndCostSheetV1/UpgradeAndCostSheetV1';

export function SystemDesign() {
  return (
    <section className="px-6 py-24 border-b border-black">
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 className="text-5xl font-black">System Design</h2>
        
        <div className="space-y-6 text-lg leading-relaxed max-w-3xl">
          <p>
            The game simulates intergenerational privilege through a progression system where players navigate from basic survival to advanced development. Each "world" represents a different socioeconomic tier, with specific requirements and unlockable opportunities.
          </p>
          <p>
            Players experience firsthand how access to education, healthcare, and industry creates compounding advantages—and how those without these resources face exponential barriers.
          </p>
        </div>

        {/* System mechanics breakdown */}
        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-black mb-8">World Progression & Upgrade System</h3>
            <div className="border-2 border-black overflow-x-auto">
              <div className="min-w-[600px]">
                <UpgradeAndCostSheetV />
              </div>
            </div>
          </div>

          {/* Additional diagrams */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black">Flow Diagram</h3>
              <div className="aspect-square border-2 border-black bg-gray-50 flex items-center justify-center">
                <p className="text-gray-400">Flow Diagram</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black">Mechanics Breakdown</h3>
              <div className="aspect-square border-2 border-black bg-gray-50 flex items-center justify-center">
                <p className="text-gray-400">Mechanics Diagram</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
