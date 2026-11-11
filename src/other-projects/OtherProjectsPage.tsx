import { useEffect } from 'react';
const destinations: Record<string, string> = {
  'design-adventure': '/projects/design-adventure.html',
  'emotion-identifier': 'https://cynyassy.github.io/emotions/',
  'not-everything-is-urgent': '/projects/not-everything-is-urgent.html',
  'film-festival-friday': '/projects/film-festival-friday.html',
};
export default function OtherProjectsPage() {
  const destination = destinations[window.location.hash.slice(1)] ?? '/#projects';
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <main style={{padding:32,fontFamily:'Helvetica, Arial, sans-serif'}}><h1>The work has a new home.</h1><p><a href={destination}>Continue to the project collection or selected project →</a></p></main>;
}
