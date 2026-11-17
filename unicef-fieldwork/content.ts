import type {ExcerptCandidate} from '../src/field-notes-lab/archive-types';

// Editorial references only. Interview text is served by the private local bridge.
export const candidates:ExcerptCandidate[]=[
  {id:'listening',recordingId:'UNICEF-14',cityId:'meerut',start:1222,end:1360,title:'Approaching a family',question:'What does the speaker say about listening before raising vaccination? Confirm the sequence, wording and voice.',status:'awaiting-review'},
  {id:'concerns',recordingId:'UNICEF-14',cityId:'meerut',start:1950,end:2088,title:'Carrying neighbourhood concerns upwards',question:'Which concerns and roles are described? Check what was done and who did it before making an attribution.',status:'awaiting-review'},
  {id:'years',recordingId:'UNICEF-11',cityId:null,start:1478,end:1512,title:'Staying involved over the years',question:'Confirm the years, paid and unpaid work, and speaker identity. Luckypura has not been placed on the map.',status:'awaiting-review'},
  {id:'patience',recordingId:'UNICEF-02',cityId:'bareilly',start:7800,end:7920,title:'Learning patience',question:'What is being recalled about difficult encounters? Confirm whose experience this is and avoid generalising from one account.',status:'awaiting-review'},
  {id:'gatherings',recordingId:'UNICEF-24',cityId:'badaun',start:3000,end:3240,title:'Communication through local gatherings',question:'Check the specific events, location and who organised them. Do not attribute programme design to Shashank.',status:'awaiting-review'},
  {id:'independence',recordingId:'UNICEF-14',cityId:'meerut',start:3240,end:3315,title:'Changes in everyday independence',question:'Confirm the examples and voices. Present these as personal accounts, not a measured programme outcome.',status:'awaiting-review'},
];

export type StoryChapter={id:string;title:string;word:string;wordMeaning:string;accent:'teal'|'ochre'|'red'};
export const chapters:StoryChapter[]=[
  {id:'listening-to-families',title:'Listening to families',word:'सुनना',wordMeaning:'to listen',accent:'teal'},
  {id:'keeping-going',title:'Keeping the work going',word:'समय',wordMeaning:'time',accent:'ochre'},
  {id:'what-changed',title:'What the work changed',word:'बदलाव',wordMeaning:'change',accent:'red'},
];

export const reflection=[
 'On the drive home from Aligarh, I was relieved to be getting off the road. I wanted my own bed, my bathroom and the comforts I had been missing. But I kept thinking about the people I had met.',
 'I had spent a few weeks travelling and listening. They had given years of their lives to this work. Sitting across from them, I remember being in awe of how passionately they spoke about the people in their communities.',
 'Living in the city, I had taken a lot for granted. These visits made me realise how much people depend on one another: a neighbour’s kindness, someone willing to help, someone who keeps showing up because they care.',
 'I remember thinking that if I had even a little of their dedication to other people, I might do something useful for this country.',
 'That experience stayed with me. It was part of what eventually led to Cynyassy, and the idea of giving through my work.',
 'Revisiting these recordings ten years later, I wish I had found a way to acknowledge these people sooner. What I remember most is their generosity, and how humbling it was to be welcomed into their lives.',
];
