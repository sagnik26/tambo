/**
 * Web compatibility layer for React Native
 * Provides polyfills for web APIs that don't exist in RN
 */

/**
 * Polyfill for File API in React Native
 * Converts a Blob to a File-like object that works with the SDK
 * @param blob - The blob to convert
 * @param filename - The filename for the file
 * @param mimeType - Optional MIME type
 * @returns A File-like object
 */
export function createFileFromBlob(
  blob: Blob,
  filename: string,
  mimeType?: string,
): File {
  // In React Native, we can't create real File objects
  // Return a File-like object that works with the SDK
  const file = Object.assign(blob, {
    name: filename,
    lastModified: Date.now(),
    webkitRelativePath: "",
    type: mimeType || blob.type,
  }) as File;

  return file;
}

/**
 * Check if running in React Native environment
 * @returns true if running in React Native
 */
export function isReactNative(): boolean {
  return (
    typeof navigator !== "undefined" && navigator.product === "ReactNative"
  );
}

/**
 * Check if running in web environment
 * @returns true if running in web browser
 */
export function isWeb(): boolean {
  return typeof window !== "undefined" && !isReactNative();
}
