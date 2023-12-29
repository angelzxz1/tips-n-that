import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}

export function getFirstHeading(markdown: string): string | null {
    const match = markdown.match(/^#\s+(.+)$/m);

    // If a match is found, return the text of the heading
    if (match && match[1]) {
        return match[1];
    } else {
        // No heading found
        return null;
    }
}
