# AGENTS.md

Detailed guidance for Claude Code agents working with the React Native SDK package.

## Project Overview

This is the **@tambo-ai/react-native** package - a React Native wrapper for the Tambo AI React SDK. It provides React Native-specific implementations for web-only features while reusing the majority of the code from `@tambo-ai/react`.

## Essential Commands

```bash
# Development
npm run build           # Build both CJS and ESM outputs
npm run test            # Run Jest tests
npm run lint            # ESLint code checking
npm run check-types      # TypeScript type checking
npm run clean           # Remove build artifacts
```

## Architecture Overview

### Wrapper Pattern

This package uses a wrapper pattern:

- **Re-exports** most functionality from `@tambo-ai/react` (which works in RN)
- **Overrides** web-specific features with RN implementations
- **Provides** platform adapters for seamless integration

### Key Files

- `src/index.ts` - Main entry point, re-exports and overrides
- `src/hooks/use-tambo-voice-native.tsx` - RN voice recording implementation
- `src/context-helpers/current-route-context-helper.ts` - RN navigation context
- `src/adapters/platform-adapter.ts` - Platform detection and routing
- `src/adapters/web-compat.ts` - Web API polyfills for RN

## Development Patterns

### Adding New RN-Specific Features

1. Create the implementation in the appropriate directory
2. Export it from `src/index.ts` (override if needed)
3. Document usage in README.md

### Platform Detection

Use the platform adapter utilities:

```typescript
import { isReactNative, isWeb } from "@tambo-ai/react-native";

if (isReactNative()) {
  // RN-specific code
} else if (isWeb()) {
  // Web-specific code
}
```

### Voice Recording

The RN voice hook requires users to provide their own audio recording implementation. This is intentional - we don't want to force a specific audio library dependency.

## Testing

- Unit tests alongside source files (`.test.ts`/`.test.tsx`)
- Mock `@tambo-ai/react` when testing RN-specific code
- Test platform adapter functionality

## Important Notes

- **Do not modify `@tambo-ai/react`** - this package wraps it
- **Keep dependencies minimal** - rely on `@tambo-ai/react` for most functionality
- **Document RN-specific requirements** - users need to provide some implementations
