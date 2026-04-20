export function Navigation() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <a 
          href="#" 
          className="inline-flex items-center gap-3 text-lg hover:translate-x-[-8px] transition-transform group"
        >
          <span className="text-2xl group-hover:translate-x-[-4px] transition-transform">←</span>
          <span className="border-b-2 border-black group-hover:border-[#FF6B6B] pb-1 transition-colors">Back to Projects</span>
        </a>
      </div>
    </section>
  );
}