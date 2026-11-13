"""Deterministic screenshot crops and the static homepage share card.
Original project evidence is never modified. Run from the app root.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'src/connected-home/assets'
ASSETS.mkdir(exist_ok=True)
coffee=Image.open(ROOT/'src/brick-trail/assets/brew-tracker.webp').convert('RGB')
coffee=coffee.crop((108,100,950,592))
coffee.resize((600,351),Image.Resampling.LANCZOS).save(ASSETS/'coffee-focus.webp',quality=86,method=6)
docs=Image.open(ROOT/'src/assets/algotest-case-study/documentation-focus.webp').convert('RGB')
docs.resize((600,round(docs.height*600/docs.width)),Image.Resampling.LANCZOS).save(ASSETS/'algotest-focus.webp',quality=86,method=6)
canvas=Image.new('RGB',(1200,630),'white');draw=ImageDraw.Draw(canvas)
regular='/System/Library/Fonts/Supplemental/Arial.ttf'
bold='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
def font(size,weight=False):return ImageFont.truetype(bold if weight else regular,size)
ink='#353535';blue='#3f88c5';red='#d00000'
draw.text((54,38),'cynyassy',font=font(36,True),fill=ink)
draw.text((55,137),'SHASHANK SHARMA',font=font(14,True),fill='#626262')
def line(parts,y):
 x=54
 for text,colour in parts:
  draw.text((x,y),text,font=font(48,True),fill=colour)
  x+=draw.textlength(text,font=font(48,True))
line([('I ',ink),('build products',blue)],187)
line([('and the ',ink),('stories',red)],246)
line([('around them.',ink)],305)
draw.text((55,404),'Designer, developer and storyteller.',font=font(20),fill=ink)
draw.text((55,552),'cynyassy.github.io',font=font(17,True),fill=ink)
# A small connected composition uses the same work as the homepage.
centres=[(746,188),(1030,199),(752,450),(1033,438)]
for a,b in [(0,1),(0,2),(1,3),(2,3),(0,3)]:draw.line([centres[a],centres[b]],fill='#d9e0e6',width=2)
items=[('src/cynyassy/assets/decide-04.webp','ChaddiMan',-7,(635,98)),('src/connected-home/assets/coffee-focus.webp','Indian Coffee Stories',6,(920,109)),('src/assets/perspectives/thesis/final-board.webp','Perspectives',5,(641,359)),('src/connected-home/assets/algotest-focus.webp','AlgoTest',-5,(920,349))]
for path,label,angle,(x,y) in items:
 pic=Image.open(ROOT/path).convert('RGBA');pic.thumbnail((190,140),Image.Resampling.LANCZOS)
 card=Image.new('RGBA',(214,164),'white');card.alpha_composite(pic,((214-pic.width)//2,(164-pic.height)//2))
 ImageDraw.Draw(card).rectangle((0,0,213,163),outline='#d5d5d5',width=1)
 rotated=card.rotate(angle,resample=Image.Resampling.BICUBIC,expand=True)
 canvas.paste(rotated,(x-(rotated.width-214)//2,y-(rotated.height-164)//2),rotated)
 draw.text((x+107,y+185),label,font=font(14,True),fill=ink,anchor='mt')
out=ROOT/'public/og/homepage.jpg';out.parent.mkdir(exist_ok=True)
canvas.save(out,quality=88,optimize=True)
for p in [*ASSETS.glob('*.webp'),out]:print(p.relative_to(ROOT),p.stat().st_size)
