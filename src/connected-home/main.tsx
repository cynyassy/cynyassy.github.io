import {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrickHomepage} from '../brick-trail/BrickHomepage';
import {ConnectedHero} from './ConnectedHero';
type Layout='split'|'surround';
const readLayout=():Layout=>new URLSearchParams(location.search).get('layout')==='surround'?'surround':'split';
function HomepagePreview(){
 const [layout,setLayout]=useState<Layout>(readLayout);
 useEffect(()=>{const update=()=>setLayout(readLayout());addEventListener('popstate',update);return()=>removeEventListener('popstate',update);},[]);
 function choose(value:Layout){setLayout(value);const url=new URL(location.href);url.searchParams.set('layout',value);history.pushState(null,'',url);}
 return <BrickHomepage introduction={<><div className="home-layout-comparison" role="group" aria-label="Compare homepage layouts"><span>Compare layout</span><button aria-pressed={layout==='split'} onClick={()=>choose('split')}>Intro left</button><button aria-pressed={layout==='surround'} onClick={()=>choose('surround')}>Surrounding artwork</button></div><ConnectedHero layout={layout}/></>}/>;
}
createRoot(document.getElementById('root')!).render(<HomepagePreview/>);
