# @tambo-ai/react-native

React Native SDK for Tambo AI - Generative UI for React Native and Expo apps.

This package wraps `@tambo-ai/react` and provides React Native-compatible implementations for features that were web-only in the original SDK. **Fully compatible with Expo** (both Expo Go and custom development builds).

**This package is for mobile apps (iOS/Android) only.** For web apps, use `@tambo-ai/react` instead.

## Installation

```bash
npm install @tambo-ai/react-native @tambo-ai/react
# or
yarn add @tambo-ai/react-native @tambo-ai/react
```

### Expo Compatibility

This package is **fully compatible with Expo**:

- ✅ Works with Expo Go (managed workflow)
- ✅ Works with custom development builds
- ✅ No native code compilation required
- ✅ Uses Expo-compatible APIs (fetch, Blob, etc.)

**Note**: For voice recording, you'll need to install `expo-av` or another Expo-compatible audio library.

## Quick Start

```tsx
import {
  TamboProvider,
  useTamboThread,
  useTamboThreadInput,
} from "@tambo-ai/react-native";
import { z } from "zod/v4";

// Register your components (same as web)
const components = [
  {
    name: "Graph",
    description: "Displays data as charts",
    component: Graph,
    propsSchema: z.object({
      data: z.array(z.object({ name: z.string(), value: z.number() })),
      type: z.enum(["line", "bar", "pie"]),
    }),
  },
];

function App() {
  return (
    <TamboProvider apiKey={process.env.TAMBO_API_KEY} components={components}>
      <ChatInterface />
    </TamboProvider>
  );
}

function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  return (
    <View>
      {thread.messages.map((message) => (
        <View key={message.id}>
          {/* Render message content */}
          {message.renderedComponent}
        </View>
      ))}
      <TextInput value={value} onChangeText={setValue} />
      <Button onPress={() => submit()} disabled={isPending} title="Send" />
    </View>
  );
}
```

## React Native-Specific Features

### Voice Recording

The React Native version of `useTamboVoice` requires you to provide your own audio recording implementation. Here's an example using Expo AV:

```tsx
import { useTamboVoice } from "@tambo-ai/react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

function VoiceButton() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const { startRecording, stopRecording, isRecording, transcript } =
    useTamboVoice({
      onStartRecording: async () => {
        // Request permissions
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // Start recording
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        setRecording(newRecording);
      },
      onStopRecording: async () => {
        if (!recording) return { uri: "" };

        // Stop and get URI
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        return { uri: uri || "" };
      },
    });

  return (
    <Button
      onPress={isRecording ? stopRecording : startRecording}
      title={isRecording ? "Stop" : "Record"}
    />
  );
}
```

### Navigation Context

Provide route context using React Navigation:

```tsx
import { useRoute } from "@react-navigation/native";
import { createCurrentRouteContextHelper } from "@tambo-ai/react-native";

function App() {
  const route = useRoute();
  const routeHelper = createCurrentRouteContextHelper(route);

  return (
    <TamboProvider
      apiKey={process.env.TAMBO_API_KEY}
      components={components}
      contextHelpers={{
        currentRoute: routeHelper,
      }}
    >
      <YourApp />
    </TamboProvider>
  );
}
```

## What Works Out of the Box

Most of the SDK works in React Native without changes:

- ✅ All providers (`TamboProvider`, `TamboClientProvider`, etc.)
- ✅ All hooks (`useTamboThread`, `useTamboThreadInput`, etc.)
- ✅ Component registration and rendering
- ✅ Tool registration and execution
- ✅ MCP integration
- ✅ Thread management
- ✅ Streaming responses
- ✅ Interactable components

## Platform Adapters

Use platform adapters for custom platform-specific behavior:

```tsx
import { setPlatformAdapter } from "@tambo-ai/react-native";

setPlatformAdapter({
  isReactNative: true,
  isWeb: false,
  getCurrentLocation: () => ({
    route: "HomeScreen",
  }),
  // ... other adapters
});
```

## Differences from Web Version

1. **Voice Recording**: Requires custom implementation (expo-av, react-native-voice, etc.)
2. **Context Helpers**: Use `createCurrentRouteContextHelper` instead of `currentPageContextHelper`
3. **File Handling**: Uses URI-based file handling instead of File API

## Documentation

- [Full Documentation](https://docs.tambo.co)
- [API Reference](https://docs.tambo.co/api-reference)
- [React Native Guide](https://docs.tambo.co/guides/react-native)

## License

MIT License - see [LICENSE](../LICENSE) for details.
