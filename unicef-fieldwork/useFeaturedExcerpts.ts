import {useEffect,useState} from 'react';
import type {FeaturedExcerpt} from '../src/field-notes-lab/archive-types';

export function useFeaturedExcerpts(){
 const [excerpts,setExcerpts]=useState<FeaturedExcerpt[]>([]);
 const [failed,setFailed]=useState(false);
 const local=import.meta.env.DEV&&['localhost','127.0.0.1','[::1]'].includes(location.hostname);
 useEffect(()=>{
  const controller=new AbortController();
  void fetch(local?'/__field-notes-archive/featured-excerpts':'/content/unicef-excerpts.json',{signal:controller.signal,cache:local?'no-store':'default'}).then(async response=>{
   if(!response.ok)throw new Error('Unavailable');
   const result=await response.json()as FeaturedExcerpt[];
   if(!controller.signal.aborted)setExcerpts(result);
  }).catch(()=>{if(!controller.signal.aborted)setFailed(true)});
  return()=>controller.abort();
 },[local]);
 return {excerpts,failed,local};
}
