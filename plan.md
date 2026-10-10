# AshisDigitalHub AI Automation — Implementation Plan

## Product scope
A responsive one-page promotional website for AshisDigitalHub. It positions the business as a fast, reliable technology partner for blog account setup, advertising video promotion, professional account settings, AI automation system setup, and technical support. The page is optimized for visitors arriving from ads or social media and uses a simple consultation form as its conversion path.

## Updated design direction
- **Design movement:** Premium orange editorial-tech: high-contrast typography, controlled information bands, precision rules, and a confident, regulated feel.
- **Core principles:** Clear before clever; make standards visible; use one strong accent consistently; move every section toward consultation.
- **Color philosophy:** Orange is the only active brand accent, expressing momentum, action, and commercial energy. Charcoal anchors the interface with authority, while warm cream surfaces keep service information readable without introducing a competing accent color.
- **Layout paradigm:** A left-anchored editorial rail with asymmetrical split sections, oversized numerals, controlled cards, and horizontal assurance bands rather than a generic centered grid.
- **Signature elements:** Orange live-status dots, orange outlined section numbers, precision orbital rings, and compact “HIGH-STANDARD SETUP” / “CONTROLLED ACCESS” information bands.
- **Interaction philosophy:** Buttons feel like clear system commands; cards reveal their next step on hover; the consultation form provides immediate inline feedback instead of a dead end.
- **Animation:** Slow orbital drift, staggered reveal on scroll, subtle marquee movement, and restrained hover translation. Motion stays fast and functional, never decorative for its own sake.
- **Typography system:** Space Grotesk for display and navigation; IBM Plex Mono for metadata, labels, and process language. Large display type collapses cleanly to mobile without sacrificing the hierarchy.
- **Brand essence:** AshisDigitalHub is the practical high-standard AI automation partner for creators and growing businesses that need digital work set up correctly and kept moving. Personality: precise, energetic, dependable.
- **Brand voice:** Direct, encouraging, and technical without jargon. Example lines: “Smart systems, built to standard.” and “Fast setup. Clear controls. Built for momentum.”
- **Wordmark / mark:** A compact ADH signal glyph made from three staggered bars, paired with a wide wordmark. The bars imply setup → automation → growth.
- **Signature brand color:** Signal Orange `#FF7A18`.

## Project structure
- `index.html` — page structure, metadata, navigation, service/process/trust/consultation sections.
- `styles.css` — responsive orange visual system, layout, motion, and accessibility states.
- `app.js` — nav toggle, scroll reveal, dynamic year, and inline consultation feedback.
- `server.js` — small dependency-free static server for the configured port.
- `public/manus-routes.json` — route manifest for the single-page site.
- `public/favicon.svg` and `app.config.ts` — orange project branding metadata.
- `TODO.md` — outcome-based acceptance items.

## Runtime and delivery
Use a dependency-free Node static server on port `3000`, listening on `0.0.0.0` for Preview. The site does not request a backend or database because this version only needs a static marketing experience and a client-side inquiry interaction. The page is checked through host diagnostics, HTTP route verification, responsive Preview inspection, and code inspection before checkpointing.
