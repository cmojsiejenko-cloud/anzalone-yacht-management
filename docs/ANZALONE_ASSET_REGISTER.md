# Anzalone Asset Register

**Date:** 14 October 2026  
**Updated by:** Agent 03 — cinematic media  
**Image root:** `public/images/`  
**Registry:** `src/lib/images.ts`  
**Sequence:** `src/lib/media.ts`  
**Player:** `src/components/media/CinematicBackground.tsx`  
**Renderer:** `src/components/ui/images/ResponsiveImage.tsx`

Pixel sizes were read with `sharp` after the files were written. Production `next/image` is configured for AVIF and WebP (`next.config.ts`). Those variants are generated on request. They are not stored as extra files. Static export (`STATIC_EXPORT=1`) serves the JPEG unoptimized.

No video file exists. No video generation tool is available in this environment. Do not describe the still crossfade as a completed film.

## License and provenance

| Group | Source | May it be called Anzalone work? |
|-------|--------|----------------------------------|
| `cinematic-*.jpg` | Generated in this session by the image tool. No stock license, no photographer, no client release | No. Lifestyle and concept stills only |
| `yacht-management-hero.jpg`, `brokerage-prep.jpg` | Earlier synthetic files. They were PNG bytes with a `.jpg` name. Agent 03 re-encoded them as real JPEG. Original PNG bytes are in `archive/retired-stills/` | No. Atmospheric stills only |
| `anzalone-founder.jpg` | Synthetic portrait. Still PNG bytes named `.jpg`. Not rendered | No. Do not publish |
| Files in `archive/retired-stills/` | Earlier synthetic stills removed from `public/` | No |

People in the new stills wear a plain light polo, navy shorts, and white shoes, with no logo. That is concept wardrobe. It is not an Anzalone uniform and those figures are not employees.

## Visible files

| Key | File | Pixels | Bytes | Mobile crop | Used by |
|-----|------|--------|------:|-------------|--------|
| `cruise` | `cinematic-01-cruise.jpg` | 1280×720 | 154,482 | 576×720 | Homepage sequence, frame 1 |
| `aftDeck` | `cinematic-02-aft-deck.jpg` | 1280×720 | 138,370 | 576×720 | Homepage sequence, frame 2, and Life on the water |
| `preparation` | `cinematic-03-preparation.jpg` | 1280×720 | 138,614 | 576×720 | Homepage sequence, frame 3, the field-services feature, and `/field-services` |
| `craft` | `cinematic-05-craft.jpg` | 1280×720 | 97,999 | 576×720 | Homepage sequence, frame 4, and `/maintenance-detailing` |
| `departure` | `cinematic-06-departure.jpg` | 1280×720 | 181,532 | 576×720 | Homepage sequence, frame 5, and Life on the water |
| `flybridge` | `cinematic-flybridge.jpg` | 1280×720 | 137,654 | 576×720 | `/captain-crew-services` |
| `refitJoinery` | `cinematic-refit-joinery.jpg` | 1280×720 | 108,699 | 576×720 | `/refit-custom-work` |
| `yachtManagementHero` | `yacht-management-hero.jpg` | 1536×1024 | 261,836 | 819×1024 | `/yacht-management` |
| `brokeragePrep` | `brokerage-prep.jpg` | 1536×1024 | 258,284 | 819×1024 | `/brokerage-support` |

Mobile crops are center 4:5 extracts of the same frame. `ResponsiveImage` shows the mobile file below the `sm` breakpoint and the wide file from `sm` up. Heroes are `alt=""` because the page `h1` carries the text. The registry alt text is kept for non-decorative use and must stay descriptive. It must not say the yacht, the job, or the person belongs to Anzalone.

The generator’s output ceiling for these frames was 1280×720. `next/image` does not upscale past that. A 1440px-wide screen is therefore slightly soft. Do not claim 4K.

## Unpublished on purpose

| File | Why it stays off the page |
|------|---------------------------|
| `public/images/anzalone-founder.jpg` | Synthetic portrait. `usePlaceholder: true`. The about page uses the CSS frame. The homepage no longer has a founder column |
| `public/images/anzalone-truck.jpg` | Not present. Registry entry `anzaloneTruck` stays `usePlaceholder: true`. About omits the vehicle section until a real photo is approved |
| `archive/retired-stills/marina-vessel-check.jpg` | Clipboard portrait that read as a staff photo |
| `archive/retired-stills/captain-services.jpg` | Stock-style bridge briefing in dress whites. Not the concept wardrobe, and easy to misread as employees |
| `archive/retired-stills/refit-custom-work.jpg` | Dusty joinery scene with a worker in work clothes |
| `archive/retired-stills/detailing-before-after.jpg` | Split frame whose “before” half is a visibly worn hull |
| `archive/retired-stills/*.source.png` | PNG originals of the two stills that remain visible, kept so the JPEG conversion can be checked |
| `cinematic-helm.jpg` | Generated and rejected. It read as a smaller day boat, not a large motor yacht. It was not copied into `public/` |

`/images/marina-vessel-check.jpg` returns 404. That is intended.

## Playback

`CinematicBackground` crossfades the five homepage frames about every 5.6 seconds (about 28 seconds for the loop). It is muted-capable video when a file exists:

- `heroVideoSrc` in `src/lib/media.ts` is `null`
- Expected file, when the owner has one: `public/video/hero.mp4`
- `muted`, `loop`, `playsInline`, `preload="metadata"`, poster set to the first still
- No audio. No controls over the headline
- `prefers-reduced-motion: reduce` shows the first still only and does not mount the video
- A video error drops back to the stills
- The scrim and `z-20` headline stay above the media

`public/video/.gitkeep` holds the folder. There is no mp4.

## Missing video — generation-ready shot list

20–35 seconds. Natural camera, slow, no music required for the file itself, no voice, no logos, no readable hull names, no cheap or worn boats. White motor yacht in the Princess class. If people appear: light polo, navy shorts, white shoes, seen from behind or at a distance, no name tags.

1. **Cruise (about 5s).** Low three-quarter bow, yacht underway on deep blue tropical water, distant green coast, soft wake.
2. **Aft deck (about 5s).** Sun across an empty teak aft deck, pale cushions, coastline. No people.
3. **Preparation (about 6s).** Two figures in the plain wardrobe above, preparing lines and cushions at a premium marina before arrival. Faces are not the subject.
4. **Truck (about 5s).** Do not generate this shot. See the truck specification below. Omit the shot until a real photograph or a real video plate exists.
5. **Craft (about 5s).** Close pass across polished gelcoat, a stainless cleat, and teak. Hands only if needed. No face.
6. **Departure (about 6s).** Stern leaving the marina for open water. End on the horizon.

Deliver `public/video/hero.mp4`, H.264, no audio track, 1920×1080 or wider, and set `heroVideoSrc` to `"/video/hero.mp4"`. Until that file is in the repo, leave the constant `null`.

## Truck specification — not generated

Searched the repository. There is no truck photograph, no Paulie artwork, and no logo file. The only marks in code are the wordmark and a gold “A” drawn in `src/app/icon.tsx`. That “A” is not a truck logo.

Do not invent a vehicle, a color, a model, or door lettering. A generated truck with made-up “Anzalone” or “Paulie” type would be a fabricated brand.

Needed from the owner before this shot can exist:

- A photograph of the actual pickup, three-quarter front, in daylight
- The same truck at the marina, if that is the scene
- A close frame of the real door lettering, sharp enough to read
- Confirmation of color and any mark that must not be redrawn

Suggested filename once those exist: `public/images/anzalone-truck.jpg`, with `usePlaceholder: true` until the owner accepts the file. “Paulie” appears only as lettering in that photograph.

## Uniforms

The concept wardrobe in the new stills is not company kit. A real uniform photograph is still required before any caption says the clothing is Anzalone’s. Do not add a logo to the generated figures.

## How to add a real file

1. Place the file at the `src` path in `siteImages`.
2. Set `width` and `height` from the file, not from a guess.
3. Write alt text that describes the picture and does not claim a client, a staff member, or a result.
4. Set `usePlaceholder` to `false` only after the owner accepts that file.
5. For video, add `public/video/hero.mp4` and set `heroVideoSrc`.
6. Run `npm run build`.
