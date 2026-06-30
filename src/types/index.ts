export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface VideoMemory {
  id: string;
  src: string;
  thumbnail?: string;
  title: string;
}

export interface MessageData {
  voiceMessageSrc?: string;
  digitalLetter: string[];
  reasons: string[];
  futureDreams: string[];
  finalMessage: string;
}
