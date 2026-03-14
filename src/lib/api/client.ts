import { getApiBaseUrl } from "./env";
import { ApiError, ApiProblemDetails } from "./errors";

// Disable TLS certificate verification for local development with self-signed certs
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

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

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

type FetchOptions = Omit<FetchJsonOptions, "method" | "body">;

export const api = {
  get<T>(path: string, options?: FetchOptions) {
    return fetchJson<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options?: FetchOptions) {
    return fetchJson<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  put<T>(path: string, body: unknown, options?: FetchOptions) {
    return fetchJson<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },
  patch<T>(path: string, body: unknown, options?: FetchOptions) {
    return fetchJson<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  delete<T>(path: string, options?: FetchOptions) {
    return fetchJson<T>(path, { ...options, method: "DELETE" });
  },
};
