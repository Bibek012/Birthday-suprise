export interface GalleryPhoto {
  src: string;
  caption: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export interface LocationPayload {
  latitude: number;
  longitude: number;
  address: string | null;
}

export type LocationStatus =
  | "idle"
  | "requesting"
  | "resolving"
  | "sending"
  | "success"
  | "denied"
  | "error";
