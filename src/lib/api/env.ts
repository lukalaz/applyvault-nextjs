export function getApiBaseUrl(): string {
  const baseUrl = process.env.APPLYVAULT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("APPLYVAULT_API_BASE_URL environment variable is not set");
  }
  return baseUrl.replace(/\/$/, "");
}
