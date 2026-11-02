import type {LandmarkId} from './data';

/** Original scenery on a shared pixel grid. These shapes have no collision or input. */
export function drawLandmark(ctx:CanvasRenderingContext2D,kind:LandmarkId,x:number,ground:number,opened:boolean,unit=3){
 const ink='#353535',paper='#f2f0e8',steel='#718099',blue='#3f88c5',red='#d00000',gold='#ffba08',dark='#101829';
 ctx.save();ctx.translate(Math.round(x-24*unit),ground-48*unit);ctx.scale(unit,unit);
 const r=(x:number,y:number,w:number,h:number,color:string)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
 const light=opened?gold:steel;
 // The low plinth anchors each object in the landscape instead of framing it as a card.
 r(3,46,44,2,ink);
 switch(kind){
 case 'coffee-cart':
  r(5,8,38,3,steel);r(5,11,38,5,paper);for(let i=5;i<43;i+=8)r(i,11,4,5,red);
  r(7,16,2,16,steel);r(39,16,2,16,steel);r(5,31,38,3,paper);r(7,34,34,9,steel);r(12,36,23,4,dark);
  r(9,43,6,4,ink);r(33,43,6,4,ink);r(11,44,2,2,paper);r(35,44,2,2,paper);
  r(13,21,10,9,paper);r(15,19,6,2,steel);r(16,23,4,4,light);r(23,24,3,2,steel);r(26,26,4,4,paper);
  r(30,23,6,7,'#b77441');r(31,21,4,2,gold);r(9,34,5,5,paper);r(10,35,3,1,red);r(33,34,6,6,paper);r(34,35,4,1,blue);
  if(opened){r(17,13,14,2,gold);r(26,23,1,2,paper);r(28,21,1,3,paper);}break;
 case 'terminal':
  r(6,10,36,25,steel);r(9,13,30,19,dark);r(20,35,8,5,steel);r(14,40,20,3,paper);r(9,43,30,3,steel);
  r(12,16,9,2,paper);r(12,20,15,1,steel);r(13,27,3,3,light);r(18,24,3,6,light);r(23,22,3,8,light);r(28,18,3,12,light);
  if(opened){r(33,16,3,2,blue);r(12,45,23,1,gold);}break;
 case 'comic-kiosk':
  // ChaddiMan's silhouette: round head, tiny eyes, star shorts and a red cape.
  // Discovery unfurls the cape; the character stays recognisable before discovery.
  r(opened?3:9,25,12,18,ink);r(opened?5:11,26,10,16,red);
  r(opened?0:6,40,14,4,ink);r(opened?2:8,40,12,2,red);
  r(16,25,17,18,ink);r(18,26,13,16,'#ffffff');
  r(13,29,3,9,ink);r(14,30,2,6,'#ffffff');r(33,29,3,8,ink);r(33,30,2,5,'#ffffff');
  r(16,39,17,7,ink);r(18,40,13,5,'#ffffff');r(24,40,1,5,ink);
  for(const sx of [20,28]){r(sx,40,1,4,ink);r(sx-1,41,3,1,ink);r(sx-1,43,1,1,ink);r(sx+1,43,1,1,ink);}
  r(15,5,19,2,ink);r(11,7,27,3,ink);r(9,10,31,12,ink);r(11,22,27,3,ink);r(15,25,19,2,ink);
  r(15,7,19,2,'#ffffff');r(11,10,27,12,'#ffffff');r(15,9,19,14,'#ffffff');r(15,23,19,2,'#ffffff');
  r(21,13,2,5,ink);r(30,13,2,5,ink);r(23,21,1,1,ink);break;
 case 'reactor':
  r(16,5,17,38,paper);r(14,8,2,34,steel);r(33,8,2,34,steel);r(14,4,21,3,steel);r(23,0,2,4,paper);
  for(let i=0;i<6;i++){r(19,10+i*5,11,2,opened?gold:dark);r(22,10+i*5,1,2,steel);r(26,10+i*5,1,2,steel);}
  r(10,37,6,6,steel);r(35,37,5,6,steel);r(7,43,36,3,paper);break;
 case 'board-table':
  r(4,21,40,17,paper);r(6,23,36,13,ink);for(let row=0;row<3;row++)for(let col=0;col<6;col++)r(7+col*6,24+row*4,5,3,col<2?steel:col<4?gold:paper);
  r(5,38,38,3,steel);r(8,41,4,5,steel);r(36,41,4,5,steel);r(10,21,2,4,red);r(34,29,2,4,blue);
  if(opened){r(17,25,2,3,red);r(27,29,2,3,blue);r(23,18,2,3,paper);}break;
 case 'feeling-meter':
  r(11,8,27,32,steel);r(14,11,21,23,paper);r(18,17,3,3,ink);r(27,17,3,3,ink);r(21,24,6,2,ink);r(19,22,2,2,ink);r(27,22,2,2,ink);
  r(16,36,4,2,red);r(23,36,4,2,gold);r(30,36,4,2,blue);r(20,40,9,4,steel);r(15,44,19,2,paper);
  if(opened){r(16,13,2,2,gold);r(32,13,2,2,gold);r(23,25,3,1,blue);}break;
 case 'bookshelf':
  r(7,8,3,38,steel);r(38,8,3,38,steel);for(const y of [9,26,43])r(10,y,28,3,paper);
  for(const y of [14,31]){r(12,y,5,12,red);r(18,y+2,4,10,paper);r(23,y,6,12,blue);r(30,y+3,5,9,gold);r(13,y+3,3,1,paper);}
  if(opened){r(15,4,8,4,paper);r(25,4,8,4,paper);r(23,5,2,3,steel);}break;
 case 'cinema':
  r(4,12,40,33,steel);r(3,8,42,5,paper);r(7,10,34,1,red);r(8,17,32,20,dark);r(11,20,26,14,opened?paper:ink);
  r(22,23,3,7,opened?red:steel);r(25,25,3,3,opened?red:steel);r(8,39,7,6,red);r(20,39,7,6,red);r(32,39,7,6,red);break;
 }
 if(opened){r(42,0,1,12,steel);r(43,1,5,5,blue);r(44,3,1,2,paper);r(45,2,2,1,paper);}
 ctx.restore();
}
