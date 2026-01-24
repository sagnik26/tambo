import { useTamboClient } from "@tambo-ai/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { createFileFromBlob } from "../adapters/web-compat";

export interface UseTamboVoiceNativeOptions {
  /**
   * Called when recording starts
   * Implement this to start audio recording in your app
   */
  onStartRecording?: () => Promise<void>;

  /**
   * Called when recording stops
   * Should return the recorded audio as a Blob (web) or { uri: string } (RN)
   */
  onStopRecording?: () => Promise<Blob | { uri: string }>;

  /**
   * Called if there's an error accessing the microphone
   */
  onMediaAccessError?: (error: string) => void;
}

/**
 * React Native version of useTamboVoice
 * Uses platform-specific audio recording (expo-av, react-native-voice, etc.)
 *
 * Users must provide their own audio recording implementation via the options
 *
 * @example
 * ```tsx
 * import { Audio } from 'expo-av';
 *
 * const { startRecording, stopRecording, isRecording, transcript } = useTamboVoiceNative({
 *   onStartRecording: async () => {
 *     await Audio.requestPermissionsAsync();
 *     // Start your recording...
 *   },
 *   onStopRecording: async () => {
 *     // Stop recording and return URI
 *     return { uri: 'file:///path/to/recording.webm' };
 *   },
 * });
 * ```
 */
export function useTamboVoiceNative(options?: UseTamboVoiceNativeOptions) {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaAccessError, setMediaAccessError] = useState<string | null>(null);
  const client = useTamboClient();

  const transcriptionMutation = useMutation<
    string,
    Error,
    Blob | { uri: string }
  >({
    mutationFn: async (audioData: Blob | { uri: string }) => {
      let file: File;

      if ("uri" in audioData) {
        // React Native/Expo - fetch from URI
        const response = await fetch(audioData.uri);
        const blob = await response.blob();
        // Use polyfill for Expo compatibility (File constructor not available in RN)
        file = createFileFromBlob(blob, "recording.webm", "audio/webm");
      } else {
        // Web Blob - use polyfill for consistency
        file = createFileFromBlob(audioData, "recording.webm", "audio/webm");
      }

      return await client.beta.audio.transcribe({ file });
    },
    onSuccess: (transcription: string) => {
      setTranscript(transcription);
    },
  });

  const startRecording = useCallback(async () => {
    if (isRecording) return;

    setTranscript(null);
    setMediaAccessError(null);
    transcriptionMutation.reset();

    try {
      setIsRecording(true);

      if (options?.onStartRecording) {
        await options.onStartRecording();
      }
    } catch (error) {
      setIsRecording(false);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start recording";
      setMediaAccessError(errorMessage);
      options?.onMediaAccessError?.(errorMessage);
    }
  }, [isRecording, options, transcriptionMutation]);

  const stopRecording = useCallback(async () => {
    if (!isRecording) return;

    try {
      setIsRecording(false);

      if (options?.onStopRecording) {
        const audioData = await options.onStopRecording();
        transcriptionMutation.mutate(audioData);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to stop recording";
      setMediaAccessError(errorMessage);
      options?.onMediaAccessError?.(errorMessage);
    }
  }, [isRecording, options, transcriptionMutation]);

  return {
    startRecording,
    stopRecording,
    isRecording,
    mediaAccessError,
    isTranscribing: transcriptionMutation.isPending,
    transcript,
    transcriptionError: transcriptionMutation.error?.message ?? null,
  };
}
