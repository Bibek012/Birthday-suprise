HEAD
# A Little Surprise For You 💗

A premium, mobile-first birthday surprise site: welcome screen → tap-to-open
gift box → animated "Happy Birthday" reveal → cake → swipeable photo
gallery → timeline of messages → an optional, fully-consensual location
share → share/replay.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
and Supabase.

## 1. Install

```bash
npm install
```

## 2. Personalize

Everything you're likely to want to change lives in **`lib/content.ts`**:

- `RECIPIENT_NAME` — who it's for
- `HERO_MESSAGE`, `ROMANTIC_MESSAGES` — the words
- `TIMELINE` — the three timeline entries
- `GALLERY` — captions + photo paths
- `MUSIC_SRC` — path to the background track

Then drop your real files in:

- `public/photos/photo-1.jpg` … `photo-4.jpg` (replace the placeholders — add
  more and extend the `GALLERY` array if you like)
- `public/music/birthday-theme.mp3` (see `public/music/README.txt`)
- `public/icons/icon-192.png` / `icon-512.png` — replace with your own icon
  if you want a custom PWA install icon

## 3. Set up Supabase (for the location feature)

The location feature is fully optional for the visitor and only activates
if they tap "Share My Location" — see [Privacy & the location
feature](#privacy--the-location-feature) below.

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` from this repo. It
   creates a `birthday_locations` table with Row Level Security enabled,
   and a policy that allows the public (anon) key to **insert only** —
   never to read, update, or delete.
3. Copy `.env.local.example` to `.env.local` and fill in your project URL
   and anon key (Project Settings → API). The service role key is
   optional but recommended for the API route — never expose it with a
   `NEXT_PUBLIC_` prefix.

If you skip this setup entirely, the rest of the site still works — the
location card will just show an error if someone taps "Share My Location,"
same as any other optional feature failing gracefully.

## 4. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use your browser's
device toolbar (or an actual phone) to preview — everything is designed
mobile-first.

## 5. Deploy

Any Next.js host works (Vercel is the path of least resistance):

```bash
npx vercel
```

Add the same environment variables from `.env.local` in your hosting
provider's dashboard. HTTPS is required for the Geolocation API to work in
production — Vercel (and most hosts) provide this by default.

## Privacy & the location feature

This was built to be transparent by design, not just by policy:

- Location is **never** requested on page load. The prompt only fires when
  the visitor explicitly taps **"Share My Location."**
- The card states plainly why it's asked: *"This helps personalize your
  birthday experience."*
- If the browser permission is denied, the site continues normally and
  never re-prompts automatically.
- Only latitude, longitude, a reverse-geocoded address string, and a
  server-generated timestamp are stored — no device info, no IP, no
  tracking identifiers.
- The Supabase table's Row Level Security policy allows the public key to
  **insert** rows but not read, update, or delete them — so even the
  client-side code has no way to browse stored locations.
- All requests go over HTTPS in production.

If you're sending this to someone, you may still want to mention the
location feature to them separately — asking nicely in the UI is good
practice, but it's not a substitute for context between people who know
each other.

## Project structure

```
app/
  page.tsx              — orchestrates the full experience (state machine)
  api/location/route.ts — validates + stores location data
  layout.tsx            — fonts, metadata, PWA wiring
components/
  WelcomeScreen.tsx      GiftBox.tsx            HappyBirthdayTitle.tsx
  Cake.tsx               PhotoGallery.tsx       Timeline.tsx
  LocationShare.tsx      MusicPlayer.tsx        ShareButton.tsx
  ReplayButton.tsx       FloatingHearts.tsx     ServiceWorkerRegister.tsx
lib/
  content.ts    — all personalization content (edit this first)
  confetti.ts   — canvas-confetti presets
  supabaseClient.ts
supabase/schema.sql — table + RLS policy
public/
  manifest.json, sw.js, icons/, photos/, music/
```

## Performance & PWA notes

- Fonts are loaded via `next/font` (self-hosted, no layout shift).
- The service worker (`public/sw.js`) precaches the shell and uses a
  cache-first strategy for static assets, network-only for `/api/*`, so
  location requests are always fresh.
- `prefers-reduced-motion` is respected globally in `app/globals.css`.
- Images should be compressed/optimized before adding to `public/photos`
  (aim under ~300KB each) to keep first load fast on mobile networks.

# Birthday-suprise
 25811fe20e46d3db8ceebac768a73ff6b6749873
