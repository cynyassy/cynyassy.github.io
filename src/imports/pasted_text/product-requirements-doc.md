PRODUCT REQUIREMENTS DOCUMENT

Project: Cynyassy Interactive Portfolio
Owner: Shashank Sharma
Platform: Static site (GitHub Pages)
Primary Build Tool: Figma Make → Static export / manual HTML-CSS-JS

1. PRODUCT INTENT
Core Thesis

This portfolio is not a gallery. It is a guided exploration of a multidisciplinary mind.

It must communicate:

This person thinks in systems
This person executes across domains
This person can translate complexity into clarity
This person can both design and build

The user should leave with:

“This person will solve problems I didn’t even know how to frame.”

Target Users
Primary
Hiring managers (product, design, strategy)
Founders
Creative leads
Secondary
Collaborators
Agencies
Curious audience from Cynyassy
Success Criteria

Within 30–60 seconds, a user should understand:

What Shashank does
Why he is different
Where to click next

Within 2–3 minutes:

See proof of work
Understand thinking process
Feel confident reaching out
2. EXPERIENCE STRATEGY
Narrative Structure

The site follows a layered reveal:

Curiosity → Clarity → Depth → Proof → Contact
Positioning Statement (Hero Copy Direction)

Shashank is not introduced by job title.

He is introduced by capability:

A storyteller, systems thinker, and builder of things that work.

This line anchors everything.

3. INFORMATION ARCHITECTURE
Homepage Structure
1. Hero (identity + entry points)

2. Skills Network (core differentiator)

3. About (beliefs + thinking)

4. Clients & Collaborations (credibility)

5. Interactive Play (personality)

6. Featured Work (proof)

7. How I Work (process)

8. Current Focus (recency)

9. Contact (conversion)
4. KEY FEATURES
4.1 HERO SECTION
Objective

Immediate identity + intrigue + direction

Requirements
Title:
Cynyassy / Shashank Sharma
Subtext:
1-line positioning (see above)
Visual:
Black and white comic scene
Minimal motion (subtle)
Interaction:
Clickable elements (entry points to skill clusters)
4.2 SKILLS NETWORK (CORE FEATURE)
Objective

Demonstrate multidimensional capability in a single visual system

Structure

Center Node

“Shashank / Cynyassy”

Primary Clusters

Design
Systems / Product
Tech
Storytelling
Growth

Secondary Nodes
(3–5 per cluster)

Interaction Logic
Hover (cluster):
highlight connections
reveal sub-skills
Hover (sub-skill):
tooltip with short explanation
Click (cluster):
navigate to detailed page
Strategic Role

This replaces:

long skill lists
resume-style thinking

It shows:

integration > fragmentation

4.3 ABOUT SECTION
Objective

Translate personality into professional clarity

Structure

3 blocks:

What I care about
How I think
What I build
Tone
simple
reflective
precise

Avoid:

buzzwords
long paragraphs
4.4 CLIENTS & COLLABORATIONS
Objective

Establish credibility quickly

Format

Horizontal carousel

Content
Teach For India
Slam Out Loud
UNICEF
Kama Ayurveda
Studio Lotus
Bahrisons
Tara India Research Press
Red Ink Literary Agency
Clementine UK
Interaction
hover → reveal role/context
subtle scale animation
4.5 INTERACTIVE PLAY SECTION
Objective

Humanize the portfolio

Example Interaction
floating balloons / objects
click → reveals:
beliefs
quirks
short thoughts
Strategic Role

Transforms:

skilled professional → memorable individual

4.6 FEATURED WORK
Objective

Proof of capability

Format

2–4 highlighted projects

Each includes:

visual (comic or diagram)
problem
approach
outcome
Key Projects (Suggested)
Coffee Tools (backend system)
AlgoTest (growth + systems)
Board Game (systems thinking)
Cynyassy (content platform)
4.7 HOW I WORK
Objective

Show structured thinking

Format

Simple process diagram

Observe → Frame → Design → Build → Iterate
Strategic Role

Signals:

reliability
repeatability
clarity
4.8 CURRENT FOCUS
Objective

Show momentum

Content
current projects
active learning
ongoing experiments
4.9 CONTACT
Objective

Conversion

Content
email
simple CTA

Example:

Let’s build something interesting.

5. VISUAL SYSTEM
Color
Primary: black + white
Accent: 1 color only (used sparingly)
Rules
color = meaning
no decorative color
Typography
clean sans-serif for readability
optional expressive headings (light comic feel)
Layout
high whitespace
slightly imperfect alignment (human feel)
Motion
subtle
intentional
never distracting
6. ILLUSTRATION SYSTEM (CRITICAL)
Objective

Use illustration as narrative, not decoration

Guidelines
1. Every section gets 1 visual idea
Hero → character scene
Skills → network diagram
About → comic strip or panels
Work → visual metaphors
2. Style consistency
black ink lines
minimal shading
slightly imperfect
3. Where to insert illustrations
backgrounds (low opacity)
section dividers
tooltips
hover states
4. Interaction with illustrations
hover → small animation
click → expand detail
scroll → reveal elements
5. Asset pipeline
create in:
Procreate / iPad / Illustrator
export:
SVG (preferred)
PNG (fallback)
optimize:
small file size
fast load
7. FIGMA MAKE MASTER PROMPT

Use this as a base system prompt:

Design an interactive portfolio website for a multidisciplinary designer and builder.

Style:

Black and white comic-inspired design
Minimal, clean, high whitespace
One accent color used only for interaction

Structure:

Hero with central identity and subtle motion
Skills network with a central node and connected skill clusters
About section with short, structured content blocks
Clients carousel with hover descriptions
Interactive play section with clickable elements revealing insights
Featured work cards with visual + problem + outcome
Process section with a simple flow diagram
Contact section with clear CTA

Interaction:

Hover states across all elements
Smooth transitions (200–300ms)
Scroll-based reveals
Clickable navigation between sections

Illustrations:

Integrate black-and-white illustrations in each section
Use them to guide storytelling
Keep them lightweight and consistent

Constraints:

Must remain clean and readable
Avoid clutter and over-animation
Prioritize clarity over visual complexity
8. TECH CONSTRAINTS (GITHUB PAGES)
Requirements
static HTML
CSS
vanilla JS
Recommended approach
SVG for skills network
CSS transitions for hover
minimal JS for interactivity
Folder structure
/portfolio
  ├── index.html
  ├── styles.css
  ├── script.js
  ├── assets/
9. RISKS & GUARDRAILS
Risk 1: Over-design

Solution:

reduce elements
prioritize clarity
Risk 2: Too many skills

Solution:

cap clusters at 5
cap sub-skills at 5
Risk 3: Interaction confusion

Solution:

clear affordances
obvious click targets
Risk 4: Style inconsistency

Solution:

strict illustration rules
consistent line language
10. FINAL POSITIONING

This portfolio should not feel like:

a resume
a gallery
a designer template

It should feel like:

a clear, thoughtful system built by someone who understands both ideas and execution.

If done right, the takeaway is simple:

This is someone you can trust with complex problems.