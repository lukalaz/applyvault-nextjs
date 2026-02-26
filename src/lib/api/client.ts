import { getApiBaseUrl } from "./env";
import { ApiError, ApiProblemDetails } from "./errors";

async function readProblemDetailsSafe(
  res: Response,
): Promise<ApiProblemDetails | undefined> {
  try {
    return (await res.json()) as ApiProblemDetails;
  } catch {
    return undefined;
  }
}

export type FetchJsonOptions = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

export async function fetchJson<T>(
  path: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(path, baseUrl).toString();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const problem = await readProblemDetailsSafe(response);
    const message =
      problem?.title || problem?.detail || `HTTP ${response.status}`;
    throw new ApiError(message, response.status, problem);
  }

  return response.json() as Promise<T>;
}
