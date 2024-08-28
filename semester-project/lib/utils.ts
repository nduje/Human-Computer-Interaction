import clsx from "clsx";
import { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const colors: Record<string, string> = {
  "Electric Guitars": "bg-green-500",
  "Acoustic Guitars": "bg-blue-500",
  "Basses": "bg-yellow-500",
  "Electronic Drums": "bg-green-500",
  "Acoustic Drums": "bg-blue-500",
  "Sticks and Mallets": "bg-red-500",
  "Cymbals": "bg-yellow-500",
  "Keyboards": "bg-green-500",
  "Synthesizers": "bg-blue-500",
  "Accordions": "bg-yellow-500",
  "Pianos": "bg-red-500",
  "String Instruments": "bg-green-500",
  "Wind Instruments": "bg-blue-500",
  "Percussion": "bg-yellow-500",
  "DJ Equipment": "bg-green-500",
  "Amplifiers": "bg-blue-500",
  "Microphones": "bg-yellow-500",
  "Speakers": "bg-red-500",
  "Pedals": "bg-purple-500",
  "Rock": "bg-green-500",
  "Pop": "bg-blue-500",
  "Heavy Metal": "bg-yellow-500",
  "Jazz & Blues": "bg-red-500",
  "Hip Hop & Rap": "bg-purple-500"
};