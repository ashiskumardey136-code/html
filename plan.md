# AshisDigitalHub AI Automation — Implementation Plan

## Product scope
A responsive one-page promotional website for AshisDigitalHub. It positions the business as a fast, reliable technology partner for blog account setup, advertising video promotion, professional account settings, Android app setup, AI automation system setup, and technical support. The page is optimized for visitors arriving from ads or social media and uses a simple consultation form as its conversion path.

## Design direction
- **Design movement:** Editorial cybernetic / Swiss-tech marketing: rigorous type, offset columns, thin rule lines, signal markers, and confident dark surfaces.
- **Core principles:** Clear before clever; show the system behind the service; make speed and trust visible; keep every section moving toward consultation.
- **Color philosophy:** Ink-black and graphite create a secure, professional base. Electric lime is the ownable “signal” color that suggests automation in motion. Cobalt blue adds a calm technical layer for data and reliability. Warm paper-white keeps long-form copy readable.
- **Layout paradigm:** A left-anchored editorial rail with asymmetrical split sections, oversized numerals, and horizontal information bands rather than centered card grids.
- **Signature elements:** Lime “LIVE SYSTEM” status pills; oversized outlined section numbers; a recurring orbital ring / signal-line motif behind key moments.
- **Interaction philosophy:** Buttons feel like system commands, cards reveal a small “what happens next” line on hover, and the form gives immediate inline feedback rather than sending visitors to a dead end.
- **Animation:** Slow orbital drift, staggered reveal on scroll, subtle scanline shimmer in status strips, and restrained hover translation. Motion stays fast and functional, never decorative for its own sake.
- **Typography system:** Space Grotesk for display and navigation; IBM Plex Mono for metadata, labels, and the process language. Strong 72–96px display headlines collapse to 44px on mobile.
- **Brand essence:** AshisDigitalHub is the practical AI automation partner for creators and growing businesses that need the digital work set up correctly and kept moving. Personality: precise, energetic, dependable.
- **Brand voice:** Direct, encouraging, technical without jargon. Example lines: “Your digital operations, switched on.” and “Build the system once. Win back the hours.”
- **Wordmark / mark:** A compact “ADH” signal glyph made from three staggered bars, paired with a wide wordmark. The bars imply setup → automation → growth.
- **Signature brand color:** Signal Lime `#D7FF4F`.

## Project structure
- `index.html` — page structure, metadata, navigation, service/process/trust/consultation sections.
- `styles.css` — responsive visual system, layout, motion, and accessibility states.
- `app.js` — nav toggle, scroll reveal, dynamic year, and inline consultation feedback.
- `server.js` — small dependency-free static server for the configured port.
- `public/manus-routes.json` — route manifest for the single-page site.
- `index.html` Apps section — Android setup pathway plus the supplied official iOS bundle link.
- `app.config.ts` — project logo metadata for the WebDev checkpoint.
- `TODO.md` — outcome-based acceptance items.

## Runtime and delivery
Use a dependency-free Node static server on port `3000`, listening on `0.0.0.0` for Preview. The site does not request a backend or database because this first version only needs a static marketing experience and a client-side inquiry interaction. The page will be checked through host diagnostics, HTTP route verification, and code inspection before checkpointing.
