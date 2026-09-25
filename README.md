# Leafyear support site

The public web pages for [Leafyear](https://minhthang2811.github.io/leafyear-support/),
the iPhone app where every leaf is a year. The app's own code is in a private repository;
this one holds only what App Store Connect links to:

| Page | URL | App Store Connect field |
|---|---|---|
| `index.html` | https://minhthang2811.github.io/leafyear-support/ | Support URL |
| `privacy/index.html` | https://minhthang2811.github.io/leafyear-support/privacy/ | Privacy Policy URL |

Each page is in English, then Vietnamese (`#vi`), so the Vietnamese localization can
link straight to its half.

Plain HTML with one stylesheet: no build step, and `.nojekyll` keeps GitHub Pages from
running Jekyll over it. Served by GitHub Pages from `main`, `/`.

If the app starts to collect or send any data, update the privacy policy and its
effective date before that version ships.

The app was called Lifetree until September 2026, and this repository
`lifetree-support`. GitHub Pages does not follow a renamed repository, so the old
`/lifetree-support/` addresses no longer serve these pages.
