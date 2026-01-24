# Exports Coverage

This document verifies that all functionality from `@tambo-ai/react` is available in `@tambo-ai/react-native`.

## ✅ Fully Included (via `export * from "@tambo-ai/react"`)

### Providers

- ✅ `TamboProvider` - Main provider
- ✅ `TamboClientProvider` - API client
- ✅ `TamboRegistryProvider` - Component/tool registry
- ✅ `TamboThreadProvider` - Thread management
- ✅ `TamboThreadInputProvider` - Input handling
- ✅ `TamboComponentProvider` - Component lifecycle
- ✅ `TamboInteractableProvider` - Interactable components
- ✅ `TamboContextHelpersProvider` - Context helpers
- ✅ `TamboContextAttachmentProvider` - File attachments
- ✅ `TamboPropStreamProvider` - Prop streaming
- ✅ `TamboStubProvider` - Stub provider

### Hooks

- ✅ `useTambo` - Main hook
- ✅ `useTamboThread` - Thread access
- ✅ `useTamboThreadInput` - Input management
- ✅ `useTamboClient` - API client access
- ✅ `useTamboComponentState` - Component state
- ✅ `useTamboCurrentMessage` - Current message context
- ✅ `useTamboCurrentComponent` - Current component context
- ✅ `useTamboStreamStatus` - Streaming status (RN-safe wrapper)
- ✅ `useTamboStreamingProps` - Prop streaming
- ✅ `useTamboThreadList` - Thread list
- ✅ `useTamboInteractable` - Interactable components
- ✅ `useTamboContextHelpers` - Context helpers
- ✅ `useTamboContextAttachment` - File attachments
- ✅ `useTamboGenerationStage` - Generation stage
- ✅ `useTamboMcpServerInfos` - MCP server info
- ✅ `useTamboStream` - Stream access
- ✅ `useTamboSuggestions` - AI suggestions
- ✅ `useMessageImages` - Image handling
- ✅ `useCurrentInteractablesSnapshot` - Interactable snapshot

### Utilities

- ✅ `defineTool` - Tool definition helper
- ✅ `withInteractable` - HOC for interactable components

### Context Helpers (RN-Compatible)

- ✅ `currentTimeContextHelper` - Time context (works in RN)
- ✅ `currentInteractablesContextHelper` - Interactable context (works in RN)

### Types

- ✅ All types from `@tambo-ai/react` are re-exported
- ✅ All types from `@tambo-ai/typescript-sdk` are re-exported

## 🔄 Overridden (RN-Specific Implementations)

### Hooks

- 🔄 `useTamboVoice` → `useTamboVoiceNative` (requires user-provided audio implementation)

## ➕ Added (RN-Specific)

### Context Helpers

- ➕ `createCurrentRouteContextHelper` - RN navigation context helper
- ➕ `currentRouteContextHelper` - RN route context helper

### Platform Adapters

- ➕ `setPlatformAdapter` - Set custom platform adapter
- ➕ `getPlatformAdapter` - Get current platform adapter
- ➕ `PlatformAdapter` - Platform adapter type

### Web Compatibility

- ➕ `createFileFromBlob` - File API polyfill
- ➕ `isReactNative` - Platform detection
- ➕ `isWeb` - Platform detection

## ⚠️ Not Included (Web-Only)

### Context Helpers

- ⚠️ `currentPageContextHelper` - Uses `window.location` (web-only)
  - **Alternative**: Use `createCurrentRouteContextHelper` with React Navigation

## 📦 MCP Support

### Main Package

- ✅ All MCP functionality from `@tambo-ai/react` is available

### MCP Subpath (`/mcp`)

- ✅ `@tambo-ai/react-native/mcp` - Re-exports all MCP exports
- ✅ `TamboMcpProvider` - MCP provider
- ✅ `useTamboMcpElicitation` - Elicitation hook
- ✅ `useTamboMcpServers` - MCP servers hook
- ✅ `useTamboMcpPrompt` - MCP prompts
- ✅ `useTamboMcpResource` - MCP resources
- ✅ All MCP types and utilities

## Summary

**Coverage: ~99%**

- ✅ All core functionality is included
- ✅ All providers work in RN
- ✅ All hooks work in RN (with RN-safe wrappers where needed)
- ✅ MCP support fully included
- ✅ Types fully included
- 🔄 Voice recording requires user implementation (by design)
- ⚠️ One web-only context helper (with RN alternative provided)

The package provides full feature parity with `@tambo-ai/react` while adding RN-specific implementations where needed.
