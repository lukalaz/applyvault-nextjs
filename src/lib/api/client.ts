import { ApiError, type ApiProblemDetails } from "./errors";

function getBaseUrl(): string {
  const baseUrl = process.env.APPLYVAULT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing env var APPLYVAULT_API_BASE_URL");
  }
  return baseUrl.replace(/\/$/, "");
}

async function readProblemDetailsSafe(
  res: Response,
): Promise<ApiProblemDetails | undefined> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;

  try {
    const json = (await res.json()) as unknown;
    if (json && typeof json === "object") return json as ApiProblemDetails;
  } catch {
    // ignore
  }
  return undefined;
}

type FetchJsonOptions = RequestInit & {
  // Next.js caching controls
  next?: { revalidate?: number; tags?: string[] };
};

export async function fetchJson<T>(
  path: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const problem = await readProblemDetailsSafe(res);
    const msg =
      problem?.title ||
      problem?.detail ||
      `Request failed: ${res.status} ${res.statusText}`;
    throw new ApiError(msg, res.status, problem);
  }

  // 204 No Content handling (I do not have 204 responses on the backend that this app hits, but this is just in case)
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
