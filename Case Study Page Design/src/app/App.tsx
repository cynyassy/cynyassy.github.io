import { Hero } from './components/Hero';
import { Context } from './components/Context';
import { GameNarrative } from './components/GameNarrative';
import { Problem } from './components/Problem';
import { MyLens } from './components/MyLens';
import { SystemDesign } from './components/SystemDesign';
import { Gameplay } from './components/Gameplay';
import { CardTypes } from './components/CardTypes';
import { InteractiveSimulation } from './components/InteractiveSimulation';
import { Impact } from './components/Impact';
import { Reflection } from './components/Reflection';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Context />
      <GameNarrative />
      <Problem />
      <MyLens />
      <SystemDesign />
      <Gameplay />
      <CardTypes />
      <InteractiveSimulation />
      <Impact />
      <Reflection />
      <Navigation />
    </div>
  );
}