import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
	// remove non ascii characters
	const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '');
	return asciiString;
}

export function sanitizeFilename(filename: string): string {
	// Replace spaces with hyphens
	let sanitized = filename.replace(/ /g, '-');

	// Remove any characters that are not alphanumeric, hyphens, or periods
	sanitized = sanitized.replace(/[^a-zA-Z0-9-.]/g, '');

	// Ensure the filename does not start or end with a hyphen or period
	sanitized = sanitized.replace(/^-+|-+$|\.-|-.|\.$/g, '');

	return sanitized;
}
