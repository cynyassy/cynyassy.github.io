export const fonts = ['Teko', 'Mukta', 'Khand', 'Hind', 'Kalam', 'Yatra One'] as const;
export type FontName = typeof fonts[number];
export type Language = 'both' | 'hi' | 'en';
export type TypeRole = 'display' | 'heading' | 'subheading' | 'body' | 'note';
export type TypeSettings = Record<TypeRole, FontName>;
export const presets: {name: string; settings: TypeSettings}[] = [
  {name: 'Editorial', settings: {display: 'Teko', heading: 'Khand', subheading: 'Mukta', body: 'Mukta', note: 'Kalam'}},
  {name: 'Notebook', settings: {display: 'Khand', heading: 'Mukta', subheading: 'Hind', body: 'Hind', note: 'Kalam'}},
  {name: 'Playful', settings: {display: 'Yatra One', heading: 'Teko', subheading: 'Khand', body: 'Mukta', note: 'Kalam'}},
];
export const palette = [
  {name: 'Sindoor', value: '#de5240'}, {name: 'Marigold', value: '#fbcc64'},
  {name: 'Nourish', value: '#458284'}, {name: 'Pavitra', value: '#edbaa6'},
  {name: 'Connect', value: '#fa8757'}, {name: 'Rebalance', value: '#d4953b'},
] as const;
export const typeSamples: {role: TypeRole; label: string; size: string; hi: string; en: string}[] = [
  {role: 'display', label: 'H1 / Display', size: '112 / 56', hi: 'बातचीत से शुरुआत', en: 'Starting with a conversation'},
  {role: 'heading', label: 'H2 / Section', size: '64 / 40', hi: 'उत्तर प्रदेश की यात्राएँ', en: 'Travelling through Uttar Pradesh'},
  {role: 'subheading', label: 'H3 / Subheading', size: '32 / 28', hi: 'काम करने वाले लोग', en: 'The people doing the work'},
  {role: 'body', label: 'Body / Reading', size: '22 / 20', hi: 'साल २०१६ में यूनिसेफ़ ने मुझे एसएमनेट के काम की कहानी लिखने का काम दिया। मैंने उत्तर प्रदेश की यात्रा की, लोगों से बातचीत की और कार्यक्रम की बैठकों में हिस्सा लिया।', en: 'In 2016, UNICEF commissioned me to document SMNet’s contribution to polio eradication in India. I travelled across Uttar Pradesh, interviewed people involved in the programme and attended local meetings.'},
  {role: 'note', label: 'Note / Handwritten', size: '28 / 24', hi: 'इस काम में समय लगता है।', en: 'This work takes time.'},
];
// Location labels are drawn from the recording inventory. Shahjahanpur was
// confirmed by Shashank on 17 November 2026. No travel order is implied.
export const places = [
  {id: 'meerut', en: 'Meerut', hi: 'मेरठ', note: 'Meeting recordings and conversations about the everyday work behind the programme.'},
  {id: 'bijnor', en: 'Bijnor', hi: 'बिजनौर', note: 'Meeting recordings. A place to revisit the different working contexts described in the archive.'},
  {id: 'bareilly', en: 'Bareilly', hi: 'बरेली', note: 'Several meetings and conversations, including discussion of local communication and coordination.'},
  {id: 'pilibhit', en: 'Pilibhit', hi: 'पीलीभीत', note: 'A meeting recording named for this location. An entry point for a later, checked fieldwork scene.'},
  {id: 'badaun', en: 'Badaun', hi: 'बदायूँ', note: 'A conversation that revisits programme activities through photographs and recollection.'},
  {id: 'shahjahanpur', en: 'Shahjahanpur', hi: 'शाहजहाँपुर', note: 'The recording location was confirmed as Shahjahanpur. A stop to develop through the fieldwork recollections.'},
  {id: 'gautam-buddh-nagar', en: 'Gautam Buddh Nagar', hi: 'गौतम बुद्ध नगर', note: 'Bisrakh meeting recordings, including detailed discussion of records and fieldwork.'},
] as const;
export type PlaceId = typeof places[number]['id'];
export function fontWeight(font: FontName, role: TypeRole): number {
  if (font === 'Yatra One') return 400;
  if (role === 'body' || role === 'note') return font === 'Khand' ? 500 : 400;
  if (font === 'Hind') return 600;
  return role === 'subheading' && font === 'Mukta' ? 600 : 700;
}
