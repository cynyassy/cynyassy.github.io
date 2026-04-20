export function Impact() {
  const reflectionQuestions = [
    "What did you see unfold in front of you? What is the story of the game for you?",
    "Who won? Who does this country belong to? Who controls the centers of power?",
    "What culture advanced and succeeded? Why?",
    "Does that mean one culture is better than the other?",
    "Who holds the most power in the game? Who holds the least? What do you think that means?",
    "How did privilege play a role in the outcome of the game?",
    "How did the structures and systems in the game reinforce privilege and inequity?",
    "How did cultural stereotypes and biases impact the game?",
    "How did collaboration and cooperation impact the game?",
    "What role did chance and luck play in the game?",
    "How did the game reflect real-world power dynamics and social inequalities?",
    "How might the game be adapted to better reflect diverse perspectives?"
  ];

  return (
    <section className="px-6 py-24 border-b border-black bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Impact</h2>
          <p className="text-xl text-gray-600">
            How the game creates understanding and sparks critical conversations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-lg">
          <div className="space-y-6">
            <div className="border-l-4 border-[#FF6B6B] pl-6">
              <p className="font-black text-2xl mb-2">Made systems visible</p>
              <p className="leading-relaxed">
                Players reported new awareness of how privilege compounds across generations through interconnected systems.
              </p>
            </div>
            
            <div className="border-l-4 border-[#FF6B6B] pl-6">
              <p className="font-black text-2xl mb-2">Sparked dialogue</p>
              <p className="leading-relaxed">
                Facilitated conversations about inequality without defensiveness, creating space for reflection and understanding.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-[#FF6B6B] pl-6">
              <p className="font-black text-2xl mb-2">Demonstrated complexity</p>
              <p className="leading-relaxed">
                Revealed how seemingly meritocratic systems contain invisible barriers that perpetuate inequality.
              </p>
            </div>
            
            <div className="border-l-4 border-[#FF6B6B] pl-6">
              <p className="font-black text-2xl mb-2">Informed practice</p>
              <p className="leading-relaxed">
                Equipped intervention designers and educators with frameworks for recognizing and addressing systemic bias.
              </p>
            </div>
          </div>
        </div>

        {/* Post-Game Reflection */}
        <div className="space-y-8">
          <div className="bg-[#ffdf00] border-4 border-black p-8 space-y-4">
            <h3 className="text-4xl font-black">Post-Game Reflection Questions</h3>
            <p className="text-xl">
              After playing, facilitators use these questions to guide critical reflection and dialogue about systems of privilege and power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reflectionQuestions.map((question, index) => (
              <div 
                key={index} 
                className="border-2 border-black bg-white p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B6B] flex items-center justify-center font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-lg leading-relaxed">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Goal */}
        <div className="border-l-4 border-[#FF6B6B] pl-8 space-y-4">
          <h3 className="text-3xl font-black">The Goal</h3>
          <p className="text-xl leading-relaxed">
            These questions are designed to help players connect their in-game experience to real-world systems. 
            By asking "Does that mean one culture is better than the other?" after players see one civilization dominate, 
            we create space to examine how <span className="bg-[#FF6B6B] bg-opacity-20 px-2 font-bold">systems — not individuals — create and perpetuate inequality</span>.
          </p>
        </div>
      </div>
    </section>
  );
}