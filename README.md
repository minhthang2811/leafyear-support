# Leafyear support site

The public web pages for [Leafyear](https://minhthang2811.github.io/leafyear-support/),
the iPhone and iPad app where every leaf is a year. The app's own code is in a private
repository; this one holds only what App Store Connect links to.

## Pages

| Page | English | Vietnamese | App Store Connect field |
|---|---|---|---|
| `index.html` | https://minhthang2811.github.io/leafyear-support/ | https://minhthang2811.github.io/leafyear-support/#vi | Support URL |
| `privacy/index.html` | https://minhthang2811.github.io/leafyear-support/privacy/ | https://minhthang2811.github.io/leafyear-support/privacy/#vi | Privacy Policy URL |

Each page holds English, then Vietnamese, at one address. App Store Connect has a URL
field for each localization, so the Vietnamese one links straight to its half (`#vi`).
`site.js` shows one language at a time: the one the address names (`#vi`, or any anchor
inside the Vietnamese half, such as `#vi-delete`), or else the browser's language.
Without JavaScript both halves show, one after the other.

- **Support** (`index.html`): the app's screens, what the journal holds, help in three
  groups (the tree, the journal, widgets and Siri), how to reach us, and the policy in
  one line.
- **Privacy policy** (`privacy/index.html`): the policy at a glance, then sixteen
  numbered sections with a table of contents. It covers what Guideline 5.1.1(i) asks
  for (what is collected and how it is used, third parties, retention and deletion, and
  withdrawing consent) and 5.1.3 for Apple Health.

## Files

| File | What it is |
|---|---|
| `index.html`, `privacy/index.html` | The two pages |
| `style.css` | The one stylesheet, in the app's own design (`Theme.swift`): a warm gold accent, New York for display, capsule actions, radius-28 cards, and the app's night sky in dark mode |
| `site.js` | The language switch and the table of contents that follows the reader. It stores nothing |
| `icons.svg` | The icons, as one sprite (adapted from Lucide, ISC License) |
| `images/*.jpg` | The app's screens, 660 px wide: `tree-autumn`, `this-week`, `year` and `loved-one`, and the same four with a `vi-` prefix in Vietnamese |
| `images/og.jpg` | The 1200 × 630 card shown when a page is shared |
| `icon.png`, `apple-touch-icon.png`, `favicon.png` | The app icon at 192, 180 and 64 px |
| `.nojekyll` | Keeps GitHub Pages from running Jekyll over the site |

The pages load nothing from other sites (no web fonts, scripts or analytics), so
reading the privacy policy tells no one.

### Taking the screens again

The screens come from the app's Release build on the clean test simulator, with the
status bar at 9:41 (`xcrun simctl status_bar … override --time 9:41`) and a demo
journal that lives only in memory:

```
-profile.birthYear 1994 -profile.lifespan 85 -scene.followsRealSky NO -scene.previewSeason autumn -scene.previewHour 17 -scene.previewWeather clear -journal.demo YES -journal.inMemory YES
```

Add `-AppleLanguages (vi) -AppleLocale vi_VN` for the Vietnamese set. Capture with
`xcrun simctl io … screenshot`, then
`sips -s format jpeg -s formatOptions 78 --resampleWidth 660`.

## Previewing and publishing

Plain HTML with one stylesheet, and no build step. To preview, serve the folder:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000/> and <http://localhost:8000/privacy/>.

GitHub Pages serves `main`, `/`, so a change goes live a minute or so after it lands
on `main`.

## Changing the privacy policy

If the app starts to collect, send or keep any new data, update the policy before that
version ships: both halves, and the effective date in each (*Effective …* and *Có hiệu
lực từ …*). Then check that the app's App Privacy answers in App Store Connect and its
`PrivacyInfo.xcprivacy` files still agree.

## History

The app was called Lifetree until September 2026, and this repository
`lifetree-support`. GitHub Pages does not follow a renamed repository, so the old
`/lifetree-support/` addresses no longer serve these pages.

The policy was rewritten on 8 October 2026 for the journal (iCloud, Apple Health,
weather where you are, photos and Face ID). The first version, from 26 September 2026,
said the app never connected to the internet, which stopped being true once the journal
synced through iCloud.
