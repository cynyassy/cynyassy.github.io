# Four Names

A three-review game at `/projects/school-decision.html`, integrated as the portfolio’s ninth project. The homepage card and More to Explore schoolhouse brick open this same route. Run the existing Vite dev server on port 5187 for local review.

## Modules

- `state.ts`: reducer, 40-pupil roster, four-name quota, irreversible lists, three rounds, report/research transitions, chapter and reset.
- `rounds.ts`: authored July 2014, November 2014 and March 2015 reviews and their four-pupil intakes.
- `students.json` / `content.ts`: 48 fictional pupil reports, fixed exam snapshots, authored follow-up notes and six research cards. Exam changes are not a learning model. Household earnings and later events are fictional drafts, not observed records or wage data.
- `session.ts`: validated same-tab `sessionStorage` recovery under `cynyassy:four-names:v2`. Reflection is excluded. Storage failure leaves a working memory-only game. A restored unconfirmed modal returns to selection for a fresh confirmation. Bump this key when changing grade snapshots or rules, because archived marks are reconstructed from the versioned content.
- `main.tsx`: page, native confirmation and archive dialogs, report reader, original code-drawn artwork, debrief and research chapter.
- `school.css`: page-scoped pixel artwork/framing with readable Helvetica/Arial typography, responsive rules and reduced-motion overrides. No downloaded font or new dependency.

## Journey

Briefing → choose four → confirm → four reports → two research notes → next review. The next review removes the submitted four and adds four new pupils. All remaining pupils retain their identities and have fixed marks for that review. The third review ends in a twelve-name debrief and a source-linked chapter about classroom and institutional responses. Submitted files can be reopened without changing the decision. Direct research access is available before playing.

No timer, moral score, reward sound, leaderboard, accounts, analytics or backend. No portfolio discoveries/scores/save keys are touched. The existing shared Sound preference and header remain compatible.

Verification: [three-round record](../../../docs/school-decision-game/three-round-verification.md). Content remains fictional draft material for owner review. Physical-phone and participant checks remain pending. GitHub Pages publication follows the portfolio’s existing sync/build workflow.
