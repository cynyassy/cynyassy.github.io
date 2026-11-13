import schoolCover from './assets/gallery/four-names.png';
import {ResetArtwork} from '../shared/ResetArtwork';
import docs from './assets/gallery/algotest.webp';
import firstBook from './assets/gallery/book-first.webp';
import secondBook from './assets/gallery/book-then.webp';
import comicOne from './assets/i-get-to-decide-1.webp';
import comicTwo from './assets/i-get-to-decide-2.webp';
import comicThree from './assets/i-get-to-decide-3.webp';
import comicFour from './assets/i-get-to-decide-4.webp';
import coffee from './assets/brew-tracker.webp';
import emotions from './assets/emotion-identifier.webp';
import farmer from '../assets/perspectives/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import king from '../assets/perspectives/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';
import woman from '../assets/perspectives/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
const imgProps={loading:'lazy' as const,decoding:'async' as const};
export function ProjectCover({id}:{id:string}){
 if(id==='reset')return <div className="project-cover cover-reset"><ResetArtwork/></div>;
 if(id==='school')return <div className="project-cover cover-school"><img {...imgProps} src={schoolCover} width="1200" height="630" alt="Four Names, a classroom and four selected student files: the list is submitted, then the stories open"/></div>;
 if(id==='algotest')return <div className="project-cover cover-docs"><img {...imgProps} src={docs} width="1200" height="751" alt="AlgoTest documentation with strategy guides and product navigation"/></div>;
 if(id==='chaddiman')return <div className="project-cover cover-comic"><div className="cover-comic-grid">{[comicOne,comicTwo,comicThree,comicFour].map((src,i)=><img {...imgProps} key={src} src={src} width="720" height="720" alt={i===0?'I get to decide, a four-panel ChaddiMan comic':''}/>)}</div></div>;
 if(id==='adventure')return <div className="project-cover cover-adventure"><img {...imgProps} src="/og/design-adventure.jpg" width="1200" height="630" alt="Design Adventure’s Mars reactor in Swiss Design, Neo-Brutalism and Pixel Art"/></div>;
 if(id==='perspectives')return <div className="project-cover cover-perspectives" role="img" aria-label="Perspectives thesis artwork with illustrated characters and a board of unequal starting positions"><div className="perspectives-copy"><span>SAME RULES.</span><strong>Different<br/>starting points.</strong><div className="perspectives-characters">{[farmer,king,woman].map(src=><img {...imgProps} key={src} src={src} alt="" width="100" height="110"/>)}</div></div><div className="perspectives-board" aria-hidden="true">{Array.from({length:35},(_,i)=><span key={i} className={`terrain-${i%5}`}>{[3,18,29].includes(i)&&<i/>}</span>)}</div></div>;
 if(id==='brew')return <div className="project-cover cover-coffee"><img {...imgProps} src={coffee} width="960" height="600" alt="Indian Coffee Stories publication alongside the Brew Tracker coffee shelf"/></div>;
 if(id==='emotions')return <div className="project-cover cover-emotions"><img {...imgProps} src={emotions} width="720" height="378" alt="Emotion Identifier interface: Name what you feel, with Good and Bad starting choices"/></div>;
 if(id==='book')return <div className="project-cover cover-books"><img {...imgProps} src={firstBook} width="540" height="765" alt="Not Everything Is Urgent: First This book cover"/><img {...imgProps} src={secondBook} width="540" height="765" alt="Not Everything Is Urgent: Then This book cover"/></div>;
 return <div className="project-cover cover-film"><svg viewBox="0 0 600 375" role="img" aria-label="Film Festival Friday, a clapperboard illustration with Watch, Notice, Make"><defs><pattern id="film-stripes" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><rect width="25" height="50" fill="#f5f3ee"/></pattern></defs><rect width="600" height="375" fill="#111b2e"/><g fill="none" stroke="#53617a"><rect x="30" y="28" width="540" height="319" rx="3"/><path d="M30 78h540M30 298h540"/></g><text x="54" y="59" fill="#bac5d7" fontSize="12" fontFamily="monospace" letterSpacing="2">FILM FESTIVAL FRIDAY</text><g transform="translate(325 114) rotate(9 100 80)"><rect y="30" width="185" height="140" rx="3" fill="#f5f3ee"/><rect width="185" height="35" fill="#353535"/><rect width="185" height="35" fill="url(#film-stripes)"/><path d="M18 74h148M18 116h148M78 74v75" stroke="#a4a7ac"/><text x="18" y="65" fill="#353535" fontSize="11" fontFamily="monospace">ONE PROMPT / EACH WEEK</text><text x="92" y="142" fill="#353535" fontSize="18" fontFamily="monospace">TAKE 01</text></g><text x="54" y="143" fill="#f5f3ee" fontSize="39" fontWeight="650" fontFamily="Helvetica,Arial,sans-serif"><tspan x="54">Watch.</tspan><tspan x="54" dy="47">Notice.</tspan><tspan x="54" dy="47" fill="#ffba08">Make.</tspan></text><text x="54" y="326" fill="#bac5d7" fontSize="11" fontFamily="monospace">A WEEKLY REASON TO MAKE SOMETHING.</text></svg></div>;
}
