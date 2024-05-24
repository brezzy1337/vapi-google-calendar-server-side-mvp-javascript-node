export const envConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? ``,
  },
  vapi: {
    baseUrl: process.env.VAPI_BASE_URL ?? "https://api.vapi.ai",
    apiKey: process.env.VAPI_API_KEY ?? "",
  },
  google: {
    projectId: process.env.GOOGLE_PROJECT_ID ?? "",
    location: process.env.GOOGLE_LOCATION ?? "",
    agentId: process.env.GOOGLE_AGENT_ID ?? "",
  }
};
