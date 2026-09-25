# Leafyear support site

The public web pages for [Leafyear](https://minhthang2811.github.io/leafyear-support/),
the iPhone app where every leaf is a year. The app's own code is in a private repository;
this one holds only what App Store Connect links to.

## Pages

| Page | English | Vietnamese | App Store Connect field |
|---|---|---|---|
| `index.html` | https://minhthang2811.github.io/leafyear-support/ | https://minhthang2811.github.io/leafyear-support/#vi | Support URL |
| `privacy/index.html` | https://minhthang2811.github.io/leafyear-support/privacy/ | https://minhthang2811.github.io/leafyear-support/privacy/#vi | Privacy Policy URL |

Each page is in English, then Vietnamese, at one address. App Store Connect has a URL
field for each localization, so the Vietnamese one links straight to its half (`#vi`).

- **Support** (`index.html`): what the app does, how to reach us, answers to five
  common questions (changing the birth year or lifespan, another season or hour, the
  hemisphere, the language, starting over), and a short word on privacy.
- **Privacy policy** (`privacy/index.html`): what the app keeps on the iPhone, what it
  never does, crash reports from Apple, deleting your answers, children, changes to
  the policy, and contact.

## Files

| File | What it is |
|---|---|
| `index.html`, `privacy/index.html` | The two pages |
| `style.css` | The one stylesheet, in the app's own design (`Theme.swift`): a warm gold accent, New York for display, and the app's night sky in dark mode |
| `icon.png`, `apple-touch-icon.png`, `favicon.png` | The app icon at 192, 180 and 64 px |
| `seasons.jpg` | The same tree in four seasons: the app repository's `docs/seasons.png`, 1400 px wide |
| `.nojekyll` | Keeps GitHub Pages from running Jekyll over the site |

If the app icon or the scene changes, export these images again from the app
repository.

## Previewing and publishing

Plain HTML with one stylesheet, and no build step. To preview, serve the folder:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000/> and <http://localhost:8000/privacy/>.

GitHub Pages serves `main`, `/`, so a change goes live a minute or so after it lands
on `main`.

## Changing the privacy policy

If the app starts to collect or send any data, update the policy before that version
ships: both halves, and the effective date in each (*Effective …* and *Có hiệu lực từ
…*). Then check that the app's App Privacy answers in App Store Connect still agree.

## History

The app was called Lifetree until September 2026, and this repository
`lifetree-support`. GitHub Pages does not follow a renamed repository, so the old
`/lifetree-support/` addresses no longer serve these pages.
