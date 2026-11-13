import type {Ref} from 'react';
import {relatedProjects,type HeroPiece,type HeroProjectId} from './artwork';

/** Shared body; CSS places the visible instance for each layout and viewport. */
export function ConnectionPreview({piece,onSelect,onClose,mobile=false,headingRef}:{
 piece:HeroPiece;onSelect:(id:HeroProjectId)=>void;onClose:()=>void;
 mobile?:boolean;headingRef?:Ref<HTMLHeadingElement>;
}){
 return <div className={mobile?'connected-mobile-preview':'connected-home-preview'} aria-live={mobile?undefined:'polite'}>
  <div className="connected-home-preview-inner">
   <div className="home-preview-heading">
    <h2 ref={headingRef} tabIndex={-1}>{piece.title}</h2>
    <button onClick={onClose} aria-label="Close connection preview">×</button>
   </div>
   <p>{piece.description}</p>
   <p className="home-preview-role">{piece.role}</p>
   <div className="home-preview-actions">
    <a href={piece.url}>View project ↗</a>
    <p className="home-related-label">Connected through</p>
    <div className="home-preview-related" role="group" aria-label={`Related to ${piece.title}`}>
     {relatedProjects(piece.id).map(({piece:related,skill})=><button key={related.id}
      onClick={()=>onSelect(related.id)} aria-label={`${skill}: ${related.title}`}>
      <small>{skill}</small><span>{related.title} ↗</span>
     </button>)}
    </div>
   </div>
  </div>
 </div>;
}
