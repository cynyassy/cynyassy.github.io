/** Read-only local archive bridge. This plugin is never applied to production builds. */
import type {Plugin} from 'vite';
import type {IncomingMessage, ServerResponse} from 'node:http';
import {readFile, readdir, stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import type {ArchiveCatalogue, ArchiveRecording, ArchiveTranscript, FeaturedExcerpt} from '../src/field-notes-lab/archive-types';
import {candidates} from '../unicef-fieldwork/content';

const prefix = '/__field-notes-archive';
type Source = {id:string;name:string;duration_seconds:number};
type Index = {cities:ArchiveCatalogue['cities'];recordings:Record<string,{cityId:string|null;title:string;description:string}>};
type Draft = {chunks:{transcribe:{offset_seconds:number;source_language:'hi'|'en';result:{segments:{start:number;end:number;text:string}[]}};translate:{result:{segments:{text:string}[]}}}[]};

function localRequest(req:IncomingMessage):boolean {
  try {
    const host=new URL(`http://${req.headers.host}`);
    if(!['127.0.0.1','localhost','[::1]'].includes(host.hostname))return false;
    const address=req.socket.remoteAddress?.replace('::ffff:','');
    if(!['127.0.0.1','::1'].includes(address??''))return false;
    if(req.headers['sec-fetch-site']==='cross-site')return false;
    return !req.headers.origin || new URL(req.headers.origin).host===host.host;
  } catch {return false;}
}
function json(req:IncomingMessage,res:ServerResponse,status:number,value:unknown){
  const body=JSON.stringify(value);
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(body),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:body);
}

export function fieldNotesArchive():Plugin {
  return {name:'local-field-notes-archive',apply:'serve',configureServer(server){
    const research=path.resolve(server.config.root,'../research/unicef-2016');
    const archive=path.join(research,'UNICEF Interview Archive');
    const cache=new Map<string,{mtime:number;data:ArchiveTranscript}>();
    let cataloguePromise:Promise<{catalogue:ArchiveCatalogue;directories:Map<string,string>}>|undefined;
    let catalogueMtime=0;
    async function catalogue(){
      const updated=(await stat(path.join(research,'reader-index.json'))).mtimeMs;
      if(updated!==catalogueMtime){cataloguePromise=undefined;catalogueMtime=updated;}
      if(!cataloguePromise)cataloguePromise=(async()=>{
        const [sources,index,folders]=await Promise.all([
          readFile(path.join(research,'inventory.json'),'utf8').then(text=>JSON.parse(text)as Source[]),
          readFile(path.join(research,'reader-index.json'),'utf8').then(text=>JSON.parse(text)as Index),
          readdir(path.join(archive,'Transcripts')),
        ]);
        const directories=new Map<string,string>();
        const recordings:ArchiveRecording[]=sources.map(source=>{
          const folder=folders.find(name=>name.startsWith(source.id+'-'));
          const entry=index.recordings[source.id];
          if(!folder||!entry||(entry.cityId!==null&&!index.cities[entry.cityId]))throw new Error('Archive index incomplete');
          directories.set(source.id,path.join(archive,'Transcripts',folder));
          return {id:source.id,title:entry.title,description:entry.description,cityId:entry.cityId,
            duration:source.duration_seconds,sourceLanguage:source.id==='UNICEF-19'?'en':'hi'};
        });
        return {catalogue:{cities:index.cities,recordings},directories};
      })().catch(error=>{cataloguePromise=undefined;throw error});
      return cataloguePromise;
    }
    async function transcript(recording:ArchiveRecording,directory:string){
      const file=path.join(directory,'source-and-transcript.json');
      const fileStat=await stat(file);
      let item=cache.get(recording.id);
      if(!item||item.mtime!==fileStat.mtimeMs){
        const source=JSON.parse(await readFile(file,'utf8'))as Draft;
        const passages=source.chunks.flatMap(pair=>pair.transcribe.result.segments.map((segment,index)=>({
          start:pair.transcribe.offset_seconds+segment.start,end:pair.transcribe.offset_seconds+segment.end,
          original:segment.text.trim()||'[No text recovered by recognition. Check the audio.]',
          english:pair.translate.result.segments[index]?.text.trim()||'[English draft not available for this passage.]',
        })));
        item={mtime:fileStat.mtimeMs,data:{...recording,status:'draft',passages}};cache.set(recording.id,item);
      }
      return item.data;
    }
    async function route(req:IncomingMessage,res:ServerResponse){
      if(!localRequest(req)){json(req,res,403,{message:'This reading archive is available on the local preview only.'});return;}
      if(!['GET','HEAD'].includes(req.method??'')){res.setHeader('Allow','GET, HEAD');json(req,res,405,{message:'Read-only archive.'});return;}
      const pathname=new URL(req.url??'/',`http://${req.headers.host}`).pathname;
      const state=await catalogue();
      if(pathname===prefix+'/catalogue'){json(req,res,200,state.catalogue);return;}
      if(pathname===prefix+'/featured-excerpts'){
        const excerpts=JSON.parse(await readFile(path.join(research,'featured-excerpts.json'),'utf8'))as FeaturedExcerpt[];
        for(const excerpt of excerpts){
          const recording=state.catalogue.recordings.find(item=>item.id===excerpt.recordingId);
          if(!recording)throw new Error('Excerpt recording missing');
          const data=await transcript(recording,state.directories.get(recording.id)!);
          if(excerpt.status!=='draft'||!data.passages.some(passage=>passage.start===excerpt.start&&passage.end===excerpt.end&&passage.original.includes(excerpt.sourceText??excerpt.hi)))throw new Error('Excerpt does not match its source draft');
        }
        json(req,res,200,excerpts);return;
      }
      if(pathname===prefix+'/excerpts'){
        const excerpts=await Promise.all(candidates.map(async candidate=>{
          const recording=state.catalogue.recordings.find(item=>item.id===candidate.recordingId);
          if(!recording)throw new Error('Candidate recording missing');
          const data=await transcript(recording,state.directories.get(recording.id)!);
          return {...candidate,passages:data.passages.filter(passage=>passage.end>candidate.start&&passage.start<candidate.end)};
        }));
        json(req,res,200,excerpts);return;
      }
      const match=pathname.match(/^\/__field-notes-archive\/(recordings|audio)\/(UNICEF-\d{2})$/);
      const recording=match&&state.catalogue.recordings.find(item=>item.id===match[2]);
      if(!match||!recording){json(req,res,404,{message:'Recording not found.'});return;}
      if(match[1]==='recordings'){
        json(req,res,200,await transcript(recording,state.directories.get(recording.id)!));return;
      }
      const audio=path.join(archive,'Recordings',recording.id+'.m4a');
      const size=(await stat(audio)).size;
      let start=0,end=size-1;
      const range=req.headers.range;
      if(range){
        const parts=range.match(/^bytes=(\d*)-(\d*)$/);
        if(!parts||(!parts[1]&&!parts[2])){res.setHeader('Content-Range',`bytes */${size}`);json(req,res,416,{message:'Invalid audio range.'});return;}
        if(!parts[1])start=Math.max(0,size-Number(parts[2]));
        else {start=Number(parts[1]);if(parts[2])end=Math.min(size-1,Number(parts[2]));}
        if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=size){res.setHeader('Content-Range',`bytes */${size}`);json(req,res,416,{message:'Invalid audio range.'});return;}
      }
      res.writeHead(range?206:200,{'Content-Type':'audio/mp4','Content-Length':end-start+1,'Accept-Ranges':'bytes','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff',...(range?{'Content-Range':`bytes ${start}-${end}/${size}`}:{})});
      if(req.method==='HEAD'){res.end();return;}
      const stream=createReadStream(audio,{start,end});
      stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
    }
    server.middlewares.use((req,res,next)=>{
      if(!(req.url??'').split('?')[0].startsWith(prefix)){next();return;}
      void route(req,res).catch(()=>{if(!res.headersSent)json(req,res,503,{message:'The local archive is unavailable. Check that Crucial is connected, then retry.'});else res.destroy();});
    });
  }};
}
