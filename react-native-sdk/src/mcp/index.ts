/**
 * MCP (Model Context Protocol) support for React Native
 * Re-exports from @tambo-ai/react/mcp
 *
 * Note: This requires @modelcontextprotocol/sdk as an optional peer dependency
 */

// Re-export MCP functionality - using direct path to avoid module resolution issues
export {
  MCPTransport,
  useTamboMcpPrompt,
  useTamboMcpPromptList,
  useTamboMcpResource,
  useTamboMcpResourceList,
  isMcpResourceEntry,
  TamboMcpProvider,
  useTamboMcpElicitation,
  useTamboMcpServers,
  useTamboElicitationContext,
} from "@tambo-ai/react/mcp";

export type {
  MCPElicitationHandler,
  MCPHandlers,
  MCPSamplingHandler,
  ElicitationRequestedSchema,
  PrimitiveSchemaDefinition,
  TamboElicitationRequest,
  TamboElicitationResponse,
  ListPromptEntry,
  ListPromptItem,
  ListResourceEntry,
  ListResourceItem,
  ConnectedMcpServer,
  FailedMcpServer,
  McpServer,
  ProviderMCPHandlers,
  McpServerInfo,
  NormalizedMcpServerInfo,
} from "@tambo-ai/react/mcp";
