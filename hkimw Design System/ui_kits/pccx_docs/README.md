# UI Kit — pccx documentation

Lower-fidelity reference for the Sphinx (PyData theme) pccx NPU documentation at https://github.com/hkimw/pccx.

The source is plain Sphinx HTML — not React — so this kit focuses on the visual rules so new pccx-flavored artifacts stay on-brand:

- **Mono surfaces**, PyData default palette + a green active accent (`#3ddc84` dark / `#008577` light).
- **FontAwesome icons** (`fa-brands fa-github`, `fa-solid fa-user`) in the navbar via the theme's `icon_links`.
- **Shields.io badges** are the status system: `|License| |Architecture| |Target| |Precision|`.
- **Mermaid + Graphviz** diagrams inline. Transparent backgrounds in both themes.
- **No emoji** in docs bodies — keep the voice specification-grade.

Use the tokens in `colors_and_type.css` for primary hues; use the IBM Plex Mono font for code samples to match the brand mono.

Not a React component kit — use the personal-site kit as the component starting point, restyle for pccx per the rules above.
