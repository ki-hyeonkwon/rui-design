import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import pkg from "../package.json" with { type: "json" };

export const server = new McpServer({
  name: "rui",
  version: pkg.version,
  capabilities: {
    prompts: {},
    resources: {},
    tools: {},
  },
});
