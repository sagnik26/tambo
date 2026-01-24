/**
 * @tambo-ai/react-native
 *
 * React Native SDK for Tambo AI - Generative UI
 *
 * This package wraps @tambo-ai/react and provides React Native-specific
 * implementations for web-only features.
 *
 * Most of the SDK works in React Native without changes. This package:
 * - Re-exports all compatible functionality from @tambo-ai/react
 * - Provides RN-specific implementations for web-only features
 * - Offers platform adapters for seamless integration
 */

// Re-export everything from @tambo-ai/react (most code works in RN)
export * from "@tambo-ai/react";

// Override web-specific exports with RN versions
export { useTamboVoiceNative as useTamboVoice } from "./hooks/use-tambo-voice-native";
export type { UseTamboVoiceNativeOptions } from "./hooks/use-tambo-voice-native";

// Re-export RN-compatible context helpers from @tambo-ai/react
// Note: currentPageContextHelper is web-only, but currentTimeContextHelper works in RN
export { currentTimeContextHelper } from "@tambo-ai/react";

// Export RN-specific context helpers
export {
  createCurrentRouteContextHelper,
  currentRouteContextHelper,
} from "./context-helpers";

// Export platform adapter utilities
export {
  getPlatformAdapter,
  setPlatformAdapter,
  type PlatformAdapter,
} from "./adapters/platform-adapter";

// Export web compatibility utilities
export {
  createFileFromBlob,
  isReactNative,
  isWeb,
} from "./adapters/web-compat";

// Re-export all types from @tambo-ai/react (they're already exported above, but explicit for clarity)
export type {
  PropStatus,
  StreamStatus,
  TamboComponent,
  TamboThread,
  TamboThreadMessage,
  TamboTool,
} from "@tambo-ai/react";
