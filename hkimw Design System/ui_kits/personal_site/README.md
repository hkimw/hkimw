# UI Kit — hkimw personal site

High-fidelity recreation of the Docusaurus portfolio at https://hkimw.github.io/hkimw/.

- `index.html` — full click-through prototype: Home → Blog → Papers → Projects → Chatbot.
- `kit.css` — all visual rules, ported from `src/css/custom.css` in the source repo and rewritten against this system's tokens.
- `Navbar.jsx` — glass sticky navbar with gradient brand mark + language + GitHub icon.
- `Hero.jsx` — gradient hero (clip-path diagonal, dot-grid overlay, avatar + CTA).
- `Home.jsx` — `SectionTitle`, `SkillsGrid`, `NavCardsGrid` (gradient-border hover), `ContactLinks`.
- `ProjectCard.jsx` — filter chips + `ProjectCard` + `ProjectsGrid`.
- `Blog.jsx` — sticky `BlogSidebar` (categories rail), `BlogPostCard`, `BlogList`.
- `Papers.jsx` — `PaperCard` (year/venue/authors/tags/abstract toggle/PDF|arXiv|DOI|Code), `EmptyState`, `ChatbotCard`, `ChatbotComingSoon`.

Persisted route is stored in `localStorage` as `hk_route`.
