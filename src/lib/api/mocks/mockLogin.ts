// src/lib/api/mocks/mockLogin.ts
import type {
  LoginErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
} from "@/lib/api/types/auth";

export type MockLoginResult =
  | {
      status: 200;
      body: LoginSuccessResponse;
    }
  | {
      status: 401 | 403 | 423 | 429 | 500;
      body: LoginErrorResponse;
    };

type MockScenario =
  | "success"
  | "invalid-credentials"
  | "unverified-email"
  | "locked-account"
  | "rate-limited"
  | "server-error";

function resolveScenario(
  request: LoginRequest,
  forcedScenario?: string | null,
): MockScenario {
  if (forcedScenario) {
    return forcedScenario as MockScenario;
  }

  switch (request.email) {
    case "demo@applyvault.dev":
      return request.password === "demo123" ? "success" : "invalid-credentials";
    case "unverified@applyvault.dev":
      return "unverified-email";
    case "locked@applyvault.dev":
      return "locked-account";
    case "ratelimit@applyvault.dev":
      return "rate-limited";
    case "server@applyvault.dev":
      return "server-error";
    default:
      return "invalid-credentials";
  }
}

export async function mockLogin(
  request: LoginRequest,
  forcedScenario?: string | null,
): Promise<MockLoginResult> {
  const scenario = resolveScenario(request, forcedScenario);

  await new Promise((resolve) => setTimeout(resolve, 700));

  switch (scenario) {
    case "success":
      return {
        status: 200,
        body: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          user: {
            id: "user-1",
            email: request.email,
            firstName: "Luka",
            lastName: "Demo",
          },
        },
      };

    case "unverified-email":
      return {
        status: 403,
        body: {
          code: "EMAIL_NOT_VERIFIED",
          message: "Your email address has not been verified yet.",
        },
      };

    case "locked-account":
      return {
        status: 423,
        body: {
          code: "ACCOUNT_LOCKED",
          message: "Your account is temporarily locked.",
        },
      };

    case "rate-limited":
      return {
        status: 429,
        body: {
          code: "TOO_MANY_ATTEMPTS",
          message: "Too many login attempts. Please try again later.",
        },
      };

    case "server-error":
      return {
        status: 500,
        body: {
          code: "INTERNAL_ERROR",
          message: "Something went wrong on the server.",
        },
      };

    case "invalid-credentials":
    default:
      return {
        status: 401,
        body: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password.",
        },
      };
  }
}
