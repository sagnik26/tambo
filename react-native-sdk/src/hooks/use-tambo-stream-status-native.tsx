/**
 * React Native-safe version of useTamboStreamStatus
 * This is a wrapper that re-exports the web version, which should work in RN
 * If issues arise, we can provide a custom implementation here
 */
import {
  useTamboStreamStatus as useTamboStreamStatusWeb,
  type PropStatus,
  type StreamStatus,
} from "@tambo-ai/react";

/**
 * React Native version of useTamboStreamStatus
 * Same functionality as the web version, but ensures compatibility with RN
 *
 * @template Props - Component props type
 * @returns `streamStatus` (overall) and `propStatus` (per-prop) flags
 *
 * @example
 * ```tsx
 * const { streamStatus, propStatus } = useTamboStreamStatus<Props>();
 * if (!streamStatus.isSuccess) return <ActivityIndicator />;
 * return <Card {...props} />;
 * ```
 */
export function useTamboStreamStatus<
  Props extends Record<string, unknown> = Record<string, unknown>,
>(): {
  streamStatus: StreamStatus;
  propStatus: Record<keyof Props, PropStatus>;
} {
  // The web version should work in RN, but we provide this as a safe wrapper
  // If the web version has issues with RN, we can reimplement here
  return useTamboStreamStatusWeb<Props>();
}
