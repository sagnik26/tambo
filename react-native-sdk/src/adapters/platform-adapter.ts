/**
 * Platform adapter to detect and handle platform-specific APIs
 * This allows the RN SDK to work with web-only code from @tambo-ai/react
 */

export interface PlatformAdapter {
  isReactNative: boolean;
  isWeb: boolean;

  /**
   * Get current location/route information
   * For web: returns window.location
   * For RN: returns route information from navigation
   */
  getCurrentLocation?: () => { url?: string; title?: string; route?: string };

  /**
   * Audio recording function
   * Returns a Blob (web) or { uri: string } (RN)
   */
  recordAudio?: () => Promise<Blob | { uri: string }>;

  /**
   * Create a File from a Blob
   * Web: native File API
   * RN: polyfill implementation
   */
  createFile?: (blob: Blob, filename: string, mimeType?: string) => File;
}

let adapter: PlatformAdapter | null = null;

/**
 * Set a custom platform adapter (useful for testing or custom implementations)
 * @param newAdapter - The platform adapter to use
 */
export function setPlatformAdapter(newAdapter: PlatformAdapter): void {
  adapter = newAdapter;
}

/**
 * Get the current platform adapter
 * Auto-detects platform if no custom adapter is set
 * @returns The current platform adapter
 */
export function getPlatformAdapter(): PlatformAdapter {
  if (adapter) {
    return adapter;
  }

  // Auto-detect platform
  const isRN =
    typeof navigator !== "undefined" && navigator.product === "ReactNative";
  const isWeb = typeof window !== "undefined" && !isRN;

  return {
    isReactNative: isRN,
    isWeb: isWeb,
    getCurrentLocation: isWeb
      ? () => ({
          url: window.location.href,
          title: document.title,
        })
      : undefined,
  };
}
