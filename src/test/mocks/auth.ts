import type {
  LoginErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
} from "@/types/auth";

export async function login(payload: LoginRequest, mockScenario?: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(mockScenario ? { "x-mock-scenario": mockScenario } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as
    | LoginSuccessResponse
    | LoginErrorResponse;

  if (!response.ok) {
    throw data;
  }

  return data;
}
