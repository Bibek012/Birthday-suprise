import type { GalleryPhoto, TimelineEntry } from "@/types";

// ---------------------------------------------------------------------------
// EDIT ME: this is the one file you need to touch to personalize the site.
// ---------------------------------------------------------------------------

export const RECIPIENT_NAME = "Ananya";

export const WELCOME_SUBLINE = "Someone made you something. Tap in when you're ready.";

export const HERO_MESSAGE =
  "Another year of your laugh, your chaos, and the way you make ordinary days feel like plot twists worth living for.";

export const ROMANTIC_MESSAGES: string[] = [
  "You have a way of turning Tuesdays into main character moments.",
  "I keep every voice note. Even the ones where you're just narrating your lunch.",
  "If today is any indication of the year ahead, we're all in trouble — the good kind.",
];

export const TIMELINE: TimelineEntry[] = [
  {
    date: "The Beginning",
    title: "The day you were born",
    description:
      "The world got its favorite person. Everyone else just didn't know it yet.",
  },
  {
    date: "Somewhere In Between",
    title: "The years you grew into you",
    description:
      "Every version of you was worth knowing. This one is my favorite so far.",
  },
  {
    date: "Right Now",
    title: "Today",
    description:
      "One more candle, one more chapter, one more reason to celebrate you loudly.",
  },
];

// Drop photo files into /public/photos and list them here in order.
// Using placeholder gradients until real photos are added.
export const GALLERY: GalleryPhoto[] = [
  { src: "/photos/photo-1.jpg", caption: "That afternoon we got lost on purpose" },
  { src: "/photos/photo-2.jpg", caption: "Your laugh, mid-sentence, as usual" },
  { src: "/photos/photo-3.jpg", caption: "The trip we still talk about" },
  { src: "/photos/photo-4.jpg", caption: "A very normal Tuesday, somehow iconic" },
];

// Background music — drop an mp3 into /public/music and update the path.
export const MUSIC_SRC = "/music/birthday-theme.mp3";
