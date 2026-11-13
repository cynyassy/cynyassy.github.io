# Brick Trail homepage

The local portfolio homepage is now Brick Trail. The existing project pages keep their design. This is a local release, not a deployment. Meteor Archive and the dated concept gallery remain separate experiments.

## Run and build

From `Interactive_Portfolio_Design`:

```sh
npm run dev -- --host 127.0.0.1 --port 5187
npm run typecheck:brick-trail
npm run build
npm run preview -- --host 127.0.0.1 --port 5192
```

The homepage enters through `src/main.tsx` and `src/app/App.tsx`. Its CSS is scoped under `.brick-home`; the former shared homepage stylesheet is no longer imported at the root. Existing case-study entry points still import their own styles. The old homepage section components remain in the source for reference but are not loaded by this homepage.

## Responsibilities

- `BrickHomepage.tsx` owns navigation, mode controls, accessible project blocks, dialogs, the ten-project list, About and contact. `ProjectArtifact.tsx` renders the existing preview concepts with bundled artwork and transcript text.
- `controller.ts` mounts one canvas loop, routes input to the active mode, coordinates saves/previews and pauses, and releases listeners, animation frames and observers on disposal.
- `explore.ts` owns room position and discovery state. `runner.ts` owns arcade rules and its score store. `physics.ts` shares jump constants and vertical movement. `renderer.ts` shares the sprites and draws each scene. React renders the interactive block overlays from the same camera positions used by Canvas.
- `skills.ts` owns the Boot.dev-backed skill descriptions and the repeatable question-mark brick. `data.ts` owns the eight stable project IDs, project copy and trail geometry. Portfolio case studies use local URLs; Emotion Identifier and the other standalone destinations retain their established external URLs.

Artwork and sprites are copied into this source module and resolved through Vite asset imports. Neither the built homepage nor its artwork depends on serving the artifact gallery. No new dependencies were added. Audio uses the existing public audio layer, loaded after the React controls mount so there is one mute button.

## Rules and saved state

Explore my work is the default. All project links remain available regardless of play. Opening unique previews adds discoveries; repeats do not. The main trail and Bonus Content each retain a position. The completion message appears at eight discoveries.

Endless run starts only on Start run. The character moves automatically on continuous ground. Space, Up, tapping the canvas or Jump triggers the same jump as exploration, with no midair jump. Three opening seconds are clear. Speed starts at 210 world units/second and increases by 2 per active second without a ceiling. Barriers (wide/low), crates and rocks (narrow/tall) use distinct shapes and colours and do not repeat immediately. Flying drones join after the ground-obstacle introduction. Hold Down / S or the Duck button to crouch underneath; release to stand. Optional bonus bricks occupy separate safe encounter slots and award 50 points when struck from below. Jumping is disabled while holding Duck. Gaps allow a full jump plus 0.35 seconds after the preceding encounter clears the player, adjusted for predicted arrival speed. At high speeds, hazards spawn beyond the viewport when necessary and a short next-action cue appears up to 1.25 seconds before contact. One collision ends a run. Score is floor(distance / 10) + brick bonuses.

Runner state pauses on mode changes, previews, hidden tabs, window blur, a fully offscreen game, or a simulation frame gap above 0.25 seconds. Resume is explicit. Simulation uses 1/120-second substeps and swept collision checks. Mode switching keeps the paused run during the visit. Leaving/reloading records it as ended; refresh does not restore active gameplay. Terminal events record once.

Storage keys:

- `cynyassy:brick-trail:progress:v1`: existing discoveries, room and safe standing positions, including reset epochs. Existing same-origin saves remain compatible.
- `cynyassy:brick-trail:runner:v1`: best and last five runs, separate from discoveries. Records are validated, deduplicated and written only at run end. New records include a bonus total; old records without it count as zero bonus and remain compatible.
- `cynyassy:sound`: existing shared sound preference.

Blocked storage falls back to memory with a visible notice. Reset saved progress requires confirmation and leaves runner scores and sound intact. Storage is origin-specific: the prototypes on port 5190, homepage on port 5187, built review on port 5192 and published domain have separate saves. There is no backend, account or shared leaderboard.

## Focused verification

Passed scoped TypeScript check and production build. Temporary checks outside the source tree covered all eight reachable block collisions; the three-second opening; one-hit failure; score calculation; duplicate end events; pause/retry; a deterministic two-minute run through maximum speed; compatible room saves; cross-tab reset; independent score persistence; corrupt/blocked storage; one animation loop; observer/listener cleanup; and visibility, offscreen, mode and project pauses. A renderer check confirmed that reduced motion freezes decorative parallax while essential game motion remains.

Browser review of the built homepage covered all eight previews and completion, room switching, physical keyboard walking/jumping into AlgoTest, modal focus, runner collision and saved result, mode-switch pause, score retention after refresh, and confirmed discovery reset leaving best score intact. The review used a separate local origin for destructive reset checks. Existing user progress on the prototype origin was not reset.

Inspected 1366×768 and 1440×900 desktop, plus 390×844 and 320×740 mobile layouts. Narrow layouts had no horizontal overflow. Mobile navigation sits below the name; scene and explanations may scroll vertically. Touch controls have at least 44-pixel targets. Representative screenshots are in `docs/brick-trail-review/` at the portfolio root.

Limits: desktop browser emulation is not a physical-phone test. Browser zoom shortcuts did not change the in-app browser viewport, so enlarged-text review still needs a browser with working zoom. Reduced motion was checked in code and an isolated renderer check, not by changing the user's OS preference. This was not a full accessibility audit or a fresh live check of external websites. Case-study contents and deployment were not changed.

Publishing remains a separate request. Recheck the deployment repository before using the existing synchronisation script, which uses `rsync --delete`. The next design phase carries the approved homepage language into case studies after this homepage is reviewed.

## Skill brick and speed feedback

The main trail has a repeatable question-mark brick at x=470. Hit it from below or activate its accessible button. Each hit displays the next skill name above the brick. The name rises and fades over one second; long names wrap and stay inside the scene. There is no coin or skill-description banner below the game. Screen readers receive the skill name through a separate visually hidden status. The 25 descriptions cover the user’s engineering physics degree and robotics minor at DTU, MFA in Design at SVA, game/service design and thesis Perspectives, writing/illustration, 100K+ comic audience, published book, interaction design and Boot.dev subjects/projects. Education and creative-work facts were supplied directly by the user; the Boot.dev screenshots were supplied on 30 October 2026. The web-readable profile was also consulted; its cached count was older, so no live course count or ranking is claimed in the UI. Descriptions lead with concrete capabilities and work. The About section presents the education, comic audience and book roles directly.

Skills reveal once each, then cycle as revisits. This collection is in memory for the visit and does not change the project meter or runner scores. Confirmed trail reset also resets the current skill sequence. Reduced motion shows the skill name in a fixed position for one second, then removes it. A focused model check covered repeated physical hits, the 25-item cycle and main-trail-only collision.

The runner HUD now shows speed as a multiplier of the 210-unit starting pace. It rises through 1.57× at 60 active seconds, 2.14× at 120 seconds and 3.86× at five minutes, then keeps increasing. Encounter spacing and advance cues adapt to speed; score and speed never advance while paused.

The legacy `#featured-work`/`#work` anchors are retained at the project list. A mount-time hash scroll restores cross-page anchor navigation after React renders the homepage.

## Visual gallery and mobile simplification · 31 October 2026

The eight direct-access projects now have image-led covers and one accessible link per card. Titles, short summaries, concise roles and descriptive destinations replace the previous preview/open button pair. The game retains the original preview dialogs. Covers reuse actual comics, documentation, book covers, product imagery and Design Adventure artwork. Perspectives uses its existing illustrated characters with a board illustration; Film Festival Friday uses an original SVG clapperboard, not an invented film still. All raster images below the game load lazily. New optimised WebP assets total about 158 KB for documentation, two books and portrait.

The first mobile review identified too many competing labels, a portrait consuming most of the initial About screen, cramped three-column facts, and repeated contact prompts. Mobile now shows an image, one proof line, title, short description and one action. Category/index/explored labels, repeated role text and the duplicate title arrow are hidden at mobile widths. About uses a small portrait with name, a short heading, full educational background and readable fact rows. Contact uses one short heading, a full-width email action and two secondary links. Desktop keeps the spacious two-column composition, with the refinements recorded below.

Screenshots include `gallery-mobile-before.png`, `about-mobile-before.png`, `contact-mobile-before.png`, `gallery-mobile-after.png` and `about-mobile-after.png` under the root `docs/brick-trail-review/`. Initial gallery checks at 390 px and 320 px showed no horizontal overflow and verified visible keyboard focus on the entire card. Further revised mobile screenshots retain the same single-column layout and readable content. These are desktop browser emulations, not a real-device test.

Desktop diagnosis captured at 1366×768 and 1440×900:

- Gallery spacing is comfortable, but categories, index, explored state, proof badges, role text and duplicate arrows dilute the primary hierarchy. Simplify the metadata before changing the grid.
- Covers have a shared aspect ratio but inconsistent internal scale and framing. Prefer a common inset and fewer nested frames while preserving each project's actual artwork.
- The About photo is visually dominant; a smaller portrait aligned with the text would make credentials easier to scan.
- The contact panel repeats its invitation across an eyebrow, large headline, sentence and character caption. A heading, email action and secondary links would be sufficient.

Evidence: `gallery-desktop-diagnosis-1366.png`, `about-desktop-diagnosis-1366.png`, `contact-desktop-diagnosis-1440.png`. These diagnosis screenshots document the state before the desktop refinement below. Scoped TypeScript and the multipage production build pass. No dependencies, game rules, storage formats, case-study styling or deployment changed in this gallery pass.


## Desktop refinement · 31 October 2026

Applied the desktop recommendations without changing the game. Project cards now show one plain proof line, a title, short summary, concise role and one destination. Removed the category/index/explored row and duplicate title arrow. Covers share a 24 px desktop inset (18 px at intermediate widths); extra browser chrome, image shadows and book rotations were removed. The portrait is capped at 340 px and top-aligned with the About heading. Contact now has one short invitation, email action and two secondary links. Mobile retains its existing simplified layout.

Scoped TypeScript and the production build passed. Visual review at 1366×768 and 1440×900 covered the gallery artwork, card hierarchy, About alignment and contact. All eight card links remain; no broken images or horizontal overflow were found. A 390×844 About/contact spot-check retained the small portrait, readable fact rows and full-width email action, with no horizontal overflow. This is focused browser emulation, not a physical-phone or full accessibility audit.

Evidence in the root `docs/brick-trail-review/`: `gallery-desktop-refined-1440.png`, `gallery-desktop-refined-1366.png`, `about-desktop-refined-1366.png`, `about-desktop-refined-1440.png` and `about-mobile-desktop-refinement-check-390.png`. No dependencies, gameplay, save formats, case-study pages or deployment were changed.

## Playable gallery and runner variety · 1 November 2026

The eight exploration bricks now sit above original pixel landmarks. Discovery permanently changes the matching landmark. Real project images remain in previews and Selected Work. The retired screenshot-gallery loader was removed during the November cleanup; project IDs, discoveries and asset-backed previews remain intact.

The runner adds low-flying drones, grounded crouching, safe optional 50-point bricks, a burst/score popup and the existing discovery cue. Ground encounters come first, bonus slots become eligible after six active seconds, and drones after eight. Encounter positions still give at least a one-second approach at the supported narrow viewport. Bricks do not share a slot with a lethal obstacle. Crouch clears on release, blur, pause and terminal outcomes; it does not change the air hitbox. Reduced motion removes burst movement while retaining a static score acknowledgement.

Focused checks and screenshots: `docs/brick-trail-gallery-runner/` at the portfolio root. The 90-second seeded physics check covers all four obstacle types, 14 bonus hits, the 330 speed cap, score composition, duplicate finish protection, pause and legacy score records. No broad suite or dependency was added.


## Frame scheduling and overlays

The controller owns a wakeable animation loop. Physics and canvas drawing stay separate from `SceneView` notifications. `overlay.ts` positions accessible DOM controls from the same `SceneLayout` returned by the renderer, avoiding page-wide React updates during movement. Idle, blocked, off-screen and hidden states stop continuous work; input, resizing, asset readiness and visibility changes wake it. Runner HUD notifications are limited to 10 Hz during ordinary play, with immediate phase/action feedback. Exploration saves are skipped when the saved snapshot has not changed.


## Uncapped runner speed, 2 November 2026

Removed the former 330-unit ceiling. Constant acceleration continues at 2 units/s², with analytically integrated travel. Encounter spacing predicts speed after the preceding obstacle clears the full player width. Unchanged jump and Duck physics remain clearable. A non-flashing Jump/Duck/optional-bonus cue protects reaction time when an encounter crosses a narrow viewport quickly. The controller publishes cues through its existing 10 Hz HUD path. Existing best scores and save formats remain. Older verification notes about a speed cap describe the earlier release.

## Shared content and homepage composition

Project identity and context-specific copy live in `src/shared/project-catalogue.ts`; `ProjectId` is derived from its keys. The catalogue imports no artwork or game logic. `data.ts` combines catalogue content with stable game IDs, room positions, landmarks and physics-world data. Selected Work reads `project.card`; the connected introduction reads `project.hero`; playground aliases read `project.playground`. Keep different summaries intentional, rather than introducing another metadata array.

`BrickHomepage` requires an `introduction` React node. Production supplies ConnectedHero; the noindex comparison entry supplies its controls plus ConnectedHero. The retired floating-art implementation and its original introduction styles remain under `src/hero-drawings/`, outside the active import path.
