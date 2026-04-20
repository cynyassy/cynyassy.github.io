import { useState } from 'react';

export function CardTypes() {
  const [activeTab, setActiveTab] = useState<'scenario' | 'media' | 'perk'>('scenario');

  const scenarioCards = [
    { name: 'Earthquake', effect: 'Lose a building if hit with an earthquake', defense: 'Hospital prevents loss' },
    { name: 'Famine', effect: "Can't extract Grain for 2 turns", defense: 'None' },
    { name: 'Flooding', effect: "Can't produce any resources for 1 turn", defense: 'None' },
    { name: 'Plague', effect: 'Lose a citizen and all lands they occupy', defense: 'Hospital protects region' },
    { name: 'Disease', effect: 'Produce only half of the resource for 1 turn', defense: 'Hospital protects region' },
    { name: 'Storm', effect: 'Lose 1 resource for each building in region', defense: 'Hospital prevents loss' },
    { name: 'Drought', effect: 'Lose 1 Grain per turn for 2 turns', defense: 'None' },
    { name: 'War', effect: 'Lose 1 building and possibly 1 citizen', defense: 'Hospital or School protect' },
    { name: 'Fire', effect: 'Lose 1 building and 1 resource per building', defense: 'Hospital prevents loss' },
    { name: 'Invasion', effect: 'Lose 1 building and 1 resource per building', defense: 'School prevents loss' }
  ];

  const mediaCards = [
    { name: 'Rival Campaign', effect: 'Lose 1 citizen and 1 resource', defense: 'School prevents' },
    { name: 'Religious Movement', effect: 'One piece converts to rival team', defense: 'School prevents' },
    { name: 'Scandal', effect: 'Lose 1 building', defense: 'None' },
    { name: 'Spy', effect: 'Lose 1 building and 1 resource to rival', defense: 'None' },
    { name: 'Fake News', effect: 'Lose 1 citizen', defense: 'School prevents' },
    { name: 'Hackers', effect: 'Lose 2 resources', defense: 'None' },
    { name: 'Obsolete Technology', effect: 'Lose 2 resources per turn', defense: 'None' },
    { name: 'Natural Disaster', effect: 'Lose 1 building and 1 resource', defense: 'None' }
  ];

  const perkCards = [
    { name: 'Bounty Hunter', effect: 'Take a resource from an opponent with 3+ resources' },
    { name: 'Charitable Donation', effect: 'Donate a resource to a player of your choice' },
    { name: 'City Planner', effect: 'Build two structures during your turn' },
    { name: 'Emergency Services', effect: 'Immune to one scenario card' },
    { name: 'Lucky Break', effect: 'Draw an additional resource card during your turn' },
    { name: 'Master Trader', effect: 'Initiate a trade with any player at any time' },
    { name: 'Resourceful', effect: 'Extract two additional resources during your turn' },
    { name: 'Survivor', effect: 'Ignore the effects of one scenario card' },
    { name: 'Visionary', effect: 'Gain an additional victory point for each unique structure' },
    { name: 'Wild Card', effect: 'Draw a scenario, media, or perk card of your choice' }
  ];

  return (
    <section className="px-6 py-24 border-b border-black bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Card Types</h2>
          <p className="text-xl text-gray-600">
            Each turn, roll the dice to determine which card you draw. Cards can drastically change the game!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b-4 border-black">
          <button
            onClick={() => setActiveTab('scenario')}
            className={`px-8 py-4 text-xl font-black border-2 border-black border-b-0 -mb-1 transition-colors ${
              activeTab === 'scenario' 
                ? 'bg-yellow-100' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            ⚠️ Scenario Cards
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-8 py-4 text-xl font-black border-2 border-black border-b-0 -mb-1 transition-colors ${
              activeTab === 'media' 
                ? 'bg-red-100' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            📰 Media Cards
          </button>
          <button
            onClick={() => setActiveTab('perk')}
            className={`px-8 py-4 text-xl font-black border-2 border-black border-b-0 -mb-1 transition-colors ${
              activeTab === 'perk' 
                ? 'bg-green-100' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            🎁 Perk Cards
          </button>
        </div>

        {/* Scenario Cards */}
        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-2">Natural Disasters & Events</h3>
              <p className="text-lg">These cards represent natural disasters and events that can devastate your civilization. Hospitals can protect against many of these!</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {scenarioCards.map((card, index) => (
                <div key={index} className="border-2 border-black p-6 bg-white hover:bg-yellow-50 transition-colors">
                  <h4 className="text-xl font-black mb-2">{card.name}</h4>
                  <p className="text-lg mb-2">{card.effect}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Defense:</span> {card.defense}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Cards */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-2">Information Warfare</h3>
              <p className="text-lg">Media cards represent espionage, propaganda, and information attacks. Schools (Education) can protect against many of these!</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mediaCards.map((card, index) => (
                <div key={index} className="border-2 border-black p-6 bg-white hover:bg-red-50 transition-colors">
                  <h4 className="text-xl font-black mb-2">{card.name}</h4>
                  <p className="text-lg mb-2">{card.effect}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Defense:</span> {card.defense}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perk Cards */}
        {activeTab === 'perk' && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-2">Good Fortune!</h3>
              <p className="text-lg">Perk cards give you advantages and special abilities. Use them wisely to get ahead!</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {perkCards.map((card, index) => (
                <div key={index} className="border-2 border-black p-6 bg-white hover:bg-green-50 transition-colors">
                  <h4 className="text-xl font-black mb-2">{card.name}</h4>
                  <p className="text-lg">{card.effect}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Design Insight */}
        <div className="bg-[#ffdf00] border-4 border-black p-8 space-y-4">
          <h3 className="text-3xl font-black">💡 Design Insight</h3>
          <p className="text-xl">
            The card system creates <span className="bg-black text-white px-2">unpredictability</span> that mirrors real-world inequity. 
            Some players will be hit harder by disasters, while others get lucky. But notice: those who can afford 
            <span className="font-bold"> hospitals and schools</span> have built-in protection — just like real privilege works.
          </p>
        </div>
      </div>
    </section>
  );
}
