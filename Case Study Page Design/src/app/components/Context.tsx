export function Context() {
  return (
    <section className="px-6 py-24 border-b border-black">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[2fr,1fr] gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8">Context</h2>
            <p className="text-lg leading-relaxed">
              Systems shape who gets ahead and who gets left behind.<br></br>
Most of these systems are invisible.<br></br>
This project makes them visible—and playable.
            </p>
          </div>
          
          {/* Small illustration placeholder */}
          <div className="border border-black aspect-square flex items-center justify-center bg-gray-50">
            <p className="text-gray-400 text-sm">Illustration</p>
          </div>
        </div>
      </div>
    </section>
  );
}
