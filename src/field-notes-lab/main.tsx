import { useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import { FieldMap } from './FieldMap';
import { fonts, fontWeight, palette, presets, typeSamples, type FontName, type Language, type TypeRole, type TypeSettings } from './data';
import './fonts.css';
import './study.css';

function typeStyle(font: FontName, role: TypeRole): CSSProperties {return {fontFamily: `'${font}', sans-serif`, fontWeight: fontWeight(font, role)};}
function Bilingual({hi, en, language}: {hi: string; en: string; language: Language}) {
  return <>{language !== 'en' && <span lang="hi" className="fl-hi">{hi}</span>}{language !== 'hi' && <span lang="en" className="fl-en">{en}</span>}</>;
}
function Study() {
  const [language, setLanguage] = useState<Language>('both');
  const [settings, setSettings] = useState<TypeSettings>(presets[0].settings);
  const [scale, setScale] = useState(1);
  const [noteFont, setNoteFont] = useState<FontName>('Yatra One');
  const [coloured, setColoured] = useState(true);
  const changeFont = (role: TypeRole, font: FontName) => setSettings(current => ({...current, [role]: font}));
  const currentPreset = presets.find(preset => Object.keys(preset.settings).every(key => preset.settings[key as TypeRole] === settings[key as TypeRole]))?.name;
  return <div className="field-lab" style={{'--fl-scale': scale} as CSSProperties}>
    <a className="fl-skip" href="#type">Skip to type controls</a><PortfolioHeader/>
    <main>
      <header className="fl-intro">
        <div className="fl-intro-top"><p className="fl-kicker">A local experiment / UNICEF · SMNet</p><a href="/projects/interaction-playground.html">Other experiments ↗</a></div>
        <div className="fl-hero-grid"><div><h1 style={typeStyle('Teko', 'display')}><span lang="hi">बातचीत</span><span lang="en">Conversations.</span></h1><p className="fl-intro-description">A Hindi & English type study for the fieldwork story.</p></div><aside className="fl-hero-note"><span className="fl-note-mark" aria-hidden="true">↙</span><p lang="hi">शब्दों को भी<br/>थोड़ी जगह दें।</p><span>Give the words some room.</span></aside></div>
        <div className="fl-study-nav"><nav aria-label="Studies"><a href="#type">01 / Type</a><a href="#reading">02 / Reading</a><a href="#map">03 / Map</a><a href="#play">04 / Play</a></nav><fieldset className="fl-segments"><legend>Sample language</legend>{([['both','Both'],['hi','हिन्दी'],['en','English']] as const).map(([value,label]) => <button type="button" key={value} aria-pressed={language === value} onClick={() => setLanguage(value)} lang={value === 'hi' ? 'hi' : 'en'}>{label}</button>)}</fieldset></div>
        <div className="fl-palette"><div><p className="fl-kicker">Borrowing from RESET</p><p>Sindoor, marigold, teal and peach. White stays white.</p></div><div className="fl-swatches" aria-label="Project RESET palette">{palette.map(item => <span key={item.name} title={`${item.name}: ${item.value}`} style={{background: item.value}}><span className="fl-sr-only">{item.name} {item.value}</span></span>)}</div></div>
      </header>

      <section className="fl-section" id="type" aria-labelledby="type-heading"><div className="fl-section-top"><p className="fl-kicker">01 / Type hierarchy</p><span className="fl-font-note">Six locally hosted Google Fonts</span></div><div className="fl-type-heading"><div><h2 id="type-heading">A different voice<br/>for each part.</h2><p>Change a family. Compare a pairing. Keep the body easy to read.</p></div><div className="fl-type-controls"><fieldset className="fl-segments"><legend>Starting combinations</legend>{presets.map(preset => <button type="button" key={preset.name} aria-pressed={currentPreset === preset.name} onClick={() => setSettings({...preset.settings})}>{preset.name}</button>)}</fieldset><label className="fl-scale-label" htmlFor="fl-type-scale">Type size <output>{Math.round(scale * 100)}%</output><input id="fl-type-scale" type="range" min="0.85" max="1.2" step="0.05" value={scale} onChange={event => setScale(Number(event.target.value))}/></label></div></div>
        <div className="fl-type-table">{typeSamples.map(sample => <div className={`fl-type-row fl-role-${sample.role}`} key={sample.role}><div className="fl-type-meta"><label htmlFor={`font-${sample.role}`}>{sample.label}</label><select id={`font-${sample.role}`} value={settings[sample.role]} onChange={event => changeFont(sample.role, event.target.value as FontName)}>{fonts.map(font => <option key={font}>{font}</option>)}</select><span>{sample.size} px · desktop / mobile</span></div><p className="fl-type-sample" style={typeStyle(settings[sample.role], sample.role)}><Bilingual hi={sample.hi} en={sample.en} language={language}/></p></div>)}</div>
        <p className="fl-study-caption">Type samples use my recollections and newly written layout text. These are not interview quotations.</p>
      </section>

      <section className="fl-section" id="reading" aria-labelledby="reading-heading"><div className="fl-section-top"><p className="fl-kicker">02 / Reading test</p><span className="fl-font-note">{settings.heading} + {settings.body} + {settings.note}</span></div><div className="fl-reading-title"><h2 id="reading-heading" style={typeStyle(settings.heading, 'heading')}><Bilingual hi="उत्तर प्रदेश में, २०१६" en="Uttar Pradesh, 2016" language={language}/></h2><p className="fl-hand-note" style={typeStyle(settings.note, 'note')}><Bilingual hi="पहले सुनना। फिर लिखना।" en="Listen first. Then write." language={language}/></p></div>
        <div className={`fl-reading-columns ${language !== 'both' ? 'is-single' : ''}`} style={typeStyle(settings.body, 'body')}>
          {language !== 'en' && <div lang="hi"><p className="fl-reading-label">हिन्दी</p><p>साल २०१६ में यूनिसेफ़ ने मुझे एसएमनेट के काम की कहानी लिखने का काम दिया। मैं उत्तर प्रदेश गया, कार्यक्रम से जुड़े लोगों से बातचीत की और स्थानीय बैठकों में हिस्सा लिया।</p><p>इस अनुभव में मुझे सबसे ज़्यादा याद रहा कि इस काम में कितना समय और मेहनत लगी थी। लोगों ने इसे पूरा करने में अपनी ज़िंदगी के कई साल लगाए थे।</p></div>}
          {language !== 'hi' && <div lang="en"><p className="fl-reading-label">English</p><p>In 2016, UNICEF commissioned me to document SMNet’s contribution to polio eradication in India. I travelled across Uttar Pradesh, interviewed people involved in the programme and attended local meetings.</p><p>What stayed with me was the amount of effort it took, how long it took, and the people who had devoted their working lives to making it happen.</p></div>}
        </div>
        <div className="fl-reading-foot"><span>From my recollection / मेरे अनुभव से</span><span>One story, two reading rhythms.</span></div>
      </section>

      <FieldMap language={language}/>

      <section className="fl-section fl-play-section" id="play" aria-labelledby="play-heading"><div className="fl-section-top"><p className="fl-kicker">04 / A little more expression</p><span className="fl-font-note">Yatra One / Kalam / Teko</span></div><div className="fl-play-heading"><h2 id="play-heading">Some words can<br/>take up more space.</h2><fieldset className="fl-segments"><legend>Word treatment</legend><button type="button" aria-pressed={coloured} onClick={() => setColoured(true)}>RESET colours</button><button type="button" aria-pressed={!coloured} onClick={() => setColoured(false)}>Ink only</button></fieldset></div>
        <div className={`fl-word-poster ${coloured ? 'is-coloured' : ''}`}><span className="fl-poster-label">A word to try / एक शब्द</span><p lang="hi" style={typeStyle(noteFont, 'display')}>समय</p><span className="fl-poster-time" lang="en">time</span><span className="fl-poster-note" lang="hi">इस काम में समय लगता है।</span><div className="fl-poster-rule" aria-hidden="true"/></div>
        <div className="fl-poster-controls"><div className="fl-segments" role="group" aria-label="Poster font">{(['Yatra One','Kalam','Teko'] as const).map(font => <button type="button" key={font} aria-pressed={noteFont === font} onClick={() => setNoteFont(font)}>{font}</button>)}</div><p>A short typographic pause between longer passages.</p></div>
      </section>

      <section className="fl-section fl-font-library" id="fonts" aria-labelledby="fonts-heading"><div className="fl-section-top"><p className="fl-kicker">The font shelf</p><a href="/fonts/field-notes/sources.json">Files & sources ↗</a></div><h2 id="fonts-heading">Six families to work with.</h2><div className="fl-font-cards">{fonts.map(font => <article key={font}><p lang="hi" style={typeStyle(font, 'display')}>{({Teko:'बातचीत',Mukta:'कहानी',Khand:'यात्राएँ',Hind:'लोग',Kalam:'यादें','Yatra One':'समय'} as Record<FontName,string>)[font]}</p><div><h3>{font}</h3><a href={`https://fonts.google.com/specimen/${font.replaceAll(' ','+')}`} target="_blank" rel="noreferrer">Google Fonts ↗</a></div><a className="fl-license" href={`/fonts/field-notes/${font.toLowerCase().replaceAll(' ','')}-OFL.txt`}>Open Font License</a></article>)}</div></section>
      <footer className="fl-footer"><a href="/#projects">← Back to the portfolio</a><p>Typography and map studies. A separate experiment, not the finished case study.</p></footer>
    </main>
  </div>;
}
createRoot(document.getElementById('root')!).render(<Study/>);
