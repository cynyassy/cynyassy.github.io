type FieldNoteId='inspection'|'magistrate';
// Field notes distinguish a witnessed recollection from an unverified story heard on the trip.
const notes:Record<FieldNoteId,{title:string;label:string;paragraphs:string[]}>= {
 inspection:{title:'An inspection visit',label:'From my field notes · a recollection',paragraphs:[
  'I was invited to sit in on a meeting before a polio drive. I remember it being in either Badaun or Pilibhit. Of the hour we spent there, roughly thirty to forty minutes went into choosing a water purifier for the district magistrate’s office. The officials had their phones out, comparing options. I sat quietly, surprised. I had expected a different discussion.',
  'The next morning, I joined a health official on an inspection visit. Outside a house near the village health centre, two men were sitting on a cot while a child played nearby. The official asked whether the child had received polio drops. They said yes.',
  'At the centre, two women I remember as ASHA workers said they had gone from house to house telling people about the drive, but hardly anyone was coming. There were very few entries in the register.',
  'From the centre, we could still see the men and the child. The official called out, asking them to bring the child for the drops. One of the men sent the child inside the house. Then they told us the child wasn’t home: the child had gone to the grandmother’s house.',
  'We had been due to visit several centres. After that one, the official took me back to my hotel. I thought he seemed embarrassed, although I couldn’t know why he ended the visits there.',
  'That moment stayed with me. A drive had been organised, workers were waiting and a senior official was standing nearby. There was still a gap between arranging vaccination and a family being willing to take part. It helped me understand why SMNet’s work with communities mattered.',
 ]},
 magistrate:{title:'The magistrate on a motorcycle',label:'A story I was told · not independently verified',paragraphs:[
  'During the trip, I was told about a young district magistrate who sometimes went out on a Royal Enfield, without the usual official convoy.',
  'In the account I heard, he arrived at a school early one morning and found children there, but hardly any staff. Teachers appeared after he began making calls. The principal arrived later. He was told that children came for the midday meal, while little teaching was taking place.',
  'The story continued with the suspension of school staff and the magistrate’s transfer shortly afterwards. In the version I was told, the principal was said to be married to a cousin of the chief minister at the time. I haven’t independently confirmed that relationship or any connection between it and the transfer.',
  'I was told that when he left, villagers lay in the road in front of his car, asking him to stay.',
 ]},
};
export function FieldNote({id}:{id:FieldNoteId}){
 const note=notes[id];
 return <aside className="uf-field-note" id={`field-note-${id}`} aria-labelledby={`field-note-title-${id}`}><p className="uf-field-note-label">{note.label}</p><h3 id={`field-note-title-${id}`}>{note.title}</h3><div>{note.paragraphs.map((text,index)=><p key={index}>{text}</p>)}</div></aside>;
}
