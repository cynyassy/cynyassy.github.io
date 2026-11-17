import { useEffect, useId, useState } from 'react';
import { places, type Language, type PlaceId } from './data';
import { mapPoints, upBoundary } from './up-boundary';
import { CityInterviews } from './CityInterviews';
import { MapAttribution } from './MapAttribution';
import type {ArchiveReadingRequest} from './archive-types';

// A visual network, not a claimed chronological itinerary.
const connections: [PlaceId, PlaceId][] = [
  ['gautam-buddh-nagar','meerut'], ['meerut','bijnor'], ['bijnor','bareilly'],
  ['bareilly','pilibhit'], ['bareilly','badaun'], ['badaun','shahjahanpur'],
];
const labels: Record<PlaceId, {dx:number;dy:number;anchor:'start'|'end'|'middle';short?:string}> = {
  meerut: {dx:-24,dy:-24,anchor:'end'}, bijnor: {dx:8,dy:-32,anchor:'start'},
  bareilly: {dx:44,dy:2,anchor:'start'}, pilibhit: {dx:24,dy:-36,anchor:'start'},
  badaun: {dx:-8,dy:47,anchor:'middle'}, shahjahanpur: {dx:22,dy:46,anchor:'start'},
  'gautam-buddh-nagar': {dx:-40,dy:48,anchor:'start',short:'Bisrakh / G.B. Nagar'},
};
export function FieldMap({language,story=false,request}: {language: Language;story?:boolean;request?:ArchiveReadingRequest}) {
  const [selected, setSelected] = useState<PlaceId>('meerut');
  const [selection, setSelection] = useState(0);
  const [hovered, setHovered] = useState<PlaceId | null>(null);
  const [close, setClose] = useState(false);
  const id = useId().replaceAll(':', '');
  const place = places.find(item => item.id === selected)!;
  const active = hovered ?? selected;
  useEffect(()=>{if(request?.cityId&&places.some(item=>item.id===request.cityId)){setSelected(request.cityId as PlaceId);setHovered(null);}},[request]);
  function selectPlace(placeId:PlaceId){setSelected(placeId);setHovered(null);setSelection(value=>value+1);}
  return <section className="fl-section fl-map-section" id="map" aria-labelledby="map-heading">
    <div className="fl-section-top"><p className="fl-kicker">{story?'The fieldwork':'03 / The fieldwork'}</p><span className="fl-font-note">{story?'Western Uttar Pradesh · 2016':'Khand + Mukta'}</span></div>
    <div className="fl-map-heading"><div><h2 id="map-heading"><span lang="hi">उत्तर प्रदेश</span><span>{story?'Conversations across western Uttar Pradesh':'Uttar Pradesh'}</span></h2>{!story&&<p>Seven stops from my fieldwork. Choose one to read more.</p>}</div>
    </div>
    <div className="fl-map-grid fl-map-reset">
      <div className="fl-map-art">
        <div className="fl-map-art-top"><span lang="hi">उत्तर प्रदेश</span><button type="button" aria-pressed={close} onClick={() => {setClose(value => !value);setHovered(null);}}>{close ? 'Show all of UP ↗' : 'Enlarge the stops ↗'}</button></div>
        <svg className="fl-up-map" viewBox={close ? '35 75 395 255' : '0 0 640 600'} role="group" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>Uttar Pradesh fieldwork map, {place.en} selected</title>
          <desc id={`${id}-desc`}>Uttar Pradesh with seven connected location buttons. Hover or focus to preview a stop. Click, Enter or Space opens its note. Connections are illustrative, not roads or a confirmed travel order. The same controls are in the location list.</desc>
          <defs><pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.25" className="fl-map-dot"/></pattern></defs>
          <path d={upBoundary} fill={`url(#${id}-dots)`} fillRule="evenodd"/>
          <path d={upBoundary} className="fl-map-outline"/>
          <g aria-hidden="true">{connections.map(([from,to]) => {
            const a=mapPoints[from], b=mapPoints[to];
            return <path key={`${from}-${to}`} d={`M${a[0]},${a[1]} Q${(a[0]+b[0])/2+5},${(a[1]+b[1])/2-6} ${b[0]},${b[1]}`} className={`fl-map-connection ${active===from||active===to?'is-active':''}`}/>;
          })}</g>
          {places.map((item,index) => {
            const [x,y]=mapPoints[item.id], label=labels[item.id];
            return <g key={item.id} transform={`translate(${x} ${y})`} className={`fl-map-stop ${selected===item.id?'is-selected':''} ${hovered===item.id?'is-hovered':''}`} role="button" tabIndex={0} aria-pressed={selected===item.id} aria-controls="city-interviews" aria-label={`Open ${item.en} note`} onMouseEnter={()=>setHovered(item.id)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.id)} onBlur={()=>setHovered(null)} onClick={()=>selectPlace(item.id)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectPlace(item.id);}}}>
              <circle r="20" fill="transparent" className="fl-map-hit"/>
              <circle r="14" className="fl-map-halo"/>
              <circle r="8" className="fl-map-node"/>
              <text className="fl-map-node-number" textAnchor="middle" y="3" aria-hidden="true">{index+1}</text>
              <path d={`M${label.dx*.23},${label.dy*.23} L${label.dx},${label.dy-6}`} className="fl-map-label-line" aria-hidden="true"/>
              <text className="fl-map-city-label" x={label.dx} y={label.dy} textAnchor={label.anchor} lang={language==='hi'?'hi':'en'} aria-hidden="true">{language==='hi'?item.hi:(label.short??item.en)}</text>
            </g>;
          })}
          {hovered && (()=>{
            const item=places.find(p=>p.id===hovered)!;const [x,y]=mapPoints[item.id];
            return <g transform={`translate(${x+14} ${y-69})`} className="fl-map-hover-card" pointerEvents="none" aria-hidden="true"><rect width="166" height="51" rx="3"/><text x="11" y="22" lang={language==='hi'?'hi':'en'}>{language==='hi'?item.hi:(labels[item.id].short??item.en)}</text><text x="11" y="40" className="fl-map-hover-hint">Click to open note ↗</text></g>;
          })()}
        </svg>
        <p className="fl-map-art-bottom">Uttar Pradesh / {close ? 'travel stops enlarged' : 'fieldwork locations'}</p>
      </div>
      <div className="fl-place-panel"><p className="fl-kicker">Choose a stop</p><div className="fl-place-buttons" role="group" aria-label="Locations">{places.map((item,index) => <button type="button" key={item.id} aria-pressed={selected === item.id} aria-controls="city-interviews" onClick={() => selectPlace(item.id)}><span className="fl-place-number">0{index + 1}</span><span>{language !== 'en' && <span lang="hi">{item.hi}</span>}{language !== 'hi' && <span>{item.en}{item.id==='gautam-buddh-nagar'?' / Bisrakh':''}</span>}</span><span aria-hidden="true">↗</span></button>)}</div>
        {!story&&<div className="fl-place-detail" aria-live="polite" aria-atomic="true"><h3>{language === 'hi' ? <span lang="hi">{place.hi}</span> : place.en}</h3><p>{place.note}</p></div>}
        {!story&&<p className="fl-map-caption">Approximate town locations. Connections are a layout study, not a confirmed travel order.</p>}
      </div>
    </div>
    <CityInterviews cityId={selected} selection={selection} language={language} request={request} compact={story}/>
    {!story&&<MapAttribution/>}
  </section>;
}
