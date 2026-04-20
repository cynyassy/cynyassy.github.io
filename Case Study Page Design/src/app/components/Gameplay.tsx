import { useState } from 'react';
import farmerImg from 'figma:asset/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import kingImg from 'figma:asset/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';
import womanImg from 'figma:asset/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
import gentlemanImg from 'figma:asset/040a89687a081c8922d47ce01181afc7f12d47d4.png';

export function Gameplay() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "You're probably wondering...",
      content: "How to play this game? What does it all mean? What is this supposed to do? Well, fear no more because we are here to help you out!",
      image: farmerImg
    },
    {
      title: "Step 1: Set Up the Board",
      content: "Place the board in front of you. For beginners we have the basic layout already placed for you, but for advanced players they can move and place the tiles anywhere they want!",
      image: null
    },
    {
      title: "Step 2: Who Goes First?",
      content: "Look around. Who among you belongs to a minority? Which is the minoritest minority? That person will play last. The person left of this minority begins to play first.",
      image: womanImg,
      highlight: true
    },
    {
      title: "Step 3: Choose Your Representative",
      content: "Choose the colors of your representative and place them at the intersection of a tile. You want to make sure that you place your player at the intersection of tiles with a lot of resources on them.",
      image: gentlemanImg
    },
    {
      title: "Step 4: Define Your Culture",
      content: "Before you proceed further, fill out this small sheet about your people. Who are they? Where do they come from? What is the native language they speak? What does their traditional clothing look like? What are some of the unique rituals and culture? When you win, all of this will win too!",
      image: kingImg
    },
    {
      title: "Acquiring Resources",
      content: "You acquire resources from all of the tiles around you. However on any move you can only get 1-2 resources at a time, so you have to choose which resources you want to have.",
      image: null
    },
    {
      title: "Movement Rules",
      content: "You can move around tiles by placing your player with a space between them — never right next to each other.",
      image: null
    },
    {
      title: "Capturing Tiles",
      content: "You can capture tiles and the resources on them by placing houses onto them. When you capture a tile it cannot give resources to anyone else. It will only yield resources for you. Plus, you get one additional resource capability from each house!",
      image: null
    }
  ];

  return (
    <section className="px-6 py-24 border-b border-black bg-white">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-black">How to Play</h2>
          <p className="text-xl text-gray-600">An interactive tutorial (inspired by playful learning)</p>
        </div>

        {/* Interactive Tutorial Steps */}
        <div className="space-y-8">
          <div className={`border-4 border-black p-8 space-y-6 transition-all ${steps[currentStep].highlight ? 'bg-[#ffdf00]' : 'bg-gray-50'}`}>
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-black">{steps[currentStep].title}</h3>
                <p className="text-xl leading-relaxed">{steps[currentStep].content}</p>
              </div>
              {steps[currentStep].image && (
                <img 
                  src={steps[currentStep].image} 
                  alt="Character" 
                  className="w-32 h-32 object-contain flex-shrink-0"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-black">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black transition-colors"
              >
                ← Previous
              </button>
              
              <div className="text-sm font-bold">
                {currentStep + 1} / {steps.length}
              </div>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-3 border-2 border-black font-bold hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black transition-colors"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 flex-1 transition-all ${
                  index === currentStep 
                    ? 'bg-[#FF6B6B]' 
                    : index < currentStep 
                    ? 'bg-black' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Game Components */}
        <div className="space-y-8">
          <h3 className="text-4xl font-black">Game Components</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-black p-6 space-y-3 bg-white">
              <h4 className="text-xl font-black">Board & Tiles</h4>
              <ul className="space-y-2 text-lg">
                <li>• 37 Terrain Tiles</li>
                <li>• Resource Cards</li>
                <li>• 2 Dice</li>
              </ul>
            </div>
            <div className="border-2 border-black p-6 space-y-3 bg-white">
              <h4 className="text-xl font-black">Playing Pieces</h4>
              <ul className="space-y-2 text-lg">
                <li>• 32 Citizens (8 per color)</li>
                <li>• 32 Houses</li>
                <li>• 32 Hospitals</li>
                <li>• 32 Schools</li>
              </ul>
            </div>
            <div className="border-2 border-black p-6 space-y-3 bg-white">
              <h4 className="text-xl font-black">Cards</h4>
              <ul className="space-y-2 text-lg">
                <li>• Scenario Cards</li>
                <li>• Media Cards</li>
                <li>• Perk Cards</li>
              </ul>
            </div>
            <div className="border-2 border-black p-6 space-y-3 bg-white">
              <h4 className="text-xl font-black">Tracking</h4>
              <ul className="space-y-2 text-lg">
                <li>• 4 Player Boards</li>
                <li>• 4 Building Cost Cards</li>
                <li>• Game Booklet</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Building Costs */}
        <div className="space-y-8">
          <h3 className="text-4xl font-black">Building Costs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-4 border-black p-6 space-y-2 bg-white hover:bg-[#ffdf00] transition-colors">
              <h4 className="text-2xl font-black">Player Movement</h4>
              <p className="text-lg">1 Grain + 1 Wood</p>
            </div>
            <div className="border-4 border-black p-6 space-y-2 bg-white hover:bg-[#ffdf00] transition-colors">
              <h4 className="text-2xl font-black">House</h4>
              <p className="text-lg">1 Grain + 1 Wood + 1 Brick</p>
            </div>
            <div className="border-4 border-black p-6 space-y-2 bg-white hover:bg-[#ffdf00] transition-colors">
              <h4 className="text-2xl font-black">Hospital</h4>
              <p className="text-lg">2 Wood + 2 Brick + 2 Ore/Metal</p>
            </div>
            <div className="border-4 border-black p-6 space-y-2 bg-white hover:bg-[#ffdf00] transition-colors">
              <h4 className="text-2xl font-black">School</h4>
              <p className="text-lg">2 Grain + 2 Wood + 2 Brick + 2 Ore/Metal</p>
            </div>
          </div>
        </div>

        {/* Three Centers of Power */}
        <div className="bg-[#FF6B6B] bg-opacity-10 border-4 border-[#FF6B6B] p-8 space-y-6">
          <h3 className="text-4xl font-black">The Three Centers of Power</h3>
          <p className="text-xl">Your goal is to capture these centers of power to rule over this fictional land!</p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white border-2 border-black p-6 space-y-3">
              <h4 className="text-2xl font-black">💰 Wealth</h4>
              <p className="text-lg">Build 3+ houses to obtain Banking Card</p>
              <p className="font-bold">+2 Victory Points</p>
            </div>
            <div className="bg-white border-2 border-black p-6 space-y-3">
              <h4 className="text-2xl font-black">🏥 Health</h4>
              <p className="text-lg">Build 2+ hospitals</p>
              <p className="font-bold">Immunity from health scenarios + Victory Point</p>
            </div>
            <div className="bg-white border-2 border-black p-6 space-y-3">
              <h4 className="text-2xl font-black">📚 Education</h4>
              <p className="text-lg">Build 1+ school</p>
              <p className="font-bold">Immunity from media cards + Victory Point</p>
            </div>
          </div>
        </div>

        {/* Resource & Trading Policy */}
        <div className="space-y-8">
          <h3 className="text-4xl font-black">Key Rules</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-black p-6 space-y-4 bg-gray-50">
              <h4 className="text-2xl font-black">Resource Policy</h4>
              <ul className="space-y-2 text-lg">
                <li>• You can only store 4 resources at a time</li>
                <li>• Extract 2 resources each turn</li>
                <li>• Each house expands storage by 1 slot</li>
              </ul>
            </div>
            <div className="border-2 border-black p-6 space-y-4 bg-gray-50">
              <h4 className="text-2xl font-black">Trading Policy</h4>
              <ul className="space-y-2 text-lg">
                <li>• Only trade on your turn</li>
                <li>• 1:1 trades only</li>
                <li>• Trade with any willing player</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dice & Cards */}
        <div className="bg-gray-50 border-2 border-black p-8 space-y-6">
          <h3 className="text-3xl font-black">🎲 Roll the Dice Each Turn!</h3>
          <p className="text-xl">Each turn you roll the dice to see what kind of card you get...</p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-100 border-2 border-black p-4">
              <p className="font-bold">Perk Cards 🎁</p>
              <p className="text-sm mt-2">Extra resources, immunity, building bonuses!</p>
            </div>
            <div className="bg-yellow-100 border-2 border-black p-4">
              <p className="font-bold">Scenario Cards ⚠️</p>
              <p className="text-sm mt-2">Natural disasters, famine, plague, war...</p>
            </div>
            <div className="bg-red-100 border-2 border-black p-4">
              <p className="font-bold">Media Cards 📰</p>
              <p className="text-sm mt-2">The worst! Can flip tiles to other players</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}