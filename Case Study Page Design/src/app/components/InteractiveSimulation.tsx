export function InteractiveSimulation() {
  return (
    <section className="px-6 py-24 border-b border-black">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-5xl font-black">Interactive Simulation</h2>
        
        <div className="border-2 border-black bg-white min-h-[500px] flex flex-col">
          {/* Placeholder content */}
          <div className="flex-1 flex items-center justify-center p-16">
            <p className="text-2xl font-black text-center max-w-2xl">
              This section will include a playable simulation of the system
            </p>
          </div>
          
          {/* Control bar */}
          <div className="border-t-2 border-black p-6 bg-gray-50">
            <div className="flex items-center justify-center gap-6">
              <button className="px-8 py-3 border-2 border-black bg-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors font-bold">
                Play
              </button>
              <button className="px-8 py-3 border-2 border-black bg-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors font-bold">
                Pause
              </button>
              <button className="px-8 py-3 border-2 border-black bg-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-colors font-bold">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}