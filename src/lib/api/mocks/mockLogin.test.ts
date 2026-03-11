import { describe, expect, it } from "vitest";
import { mockLogin } from "./mockLogin";
import type { LoginErrorResponse } from "@/lib/api/types/auth";

function expectError(body: unknown): LoginErrorResponse {
  expect(body).toHaveProperty("code");
  return body as LoginErrorResponse;
}

describe("mockLogin", () => {
  it("returns success for demo user", async () => {
    const result = await mockLogin({
      email: "demo@applyvault.dev",
      password: "demo123",
    });

    expect(result.status).toBe(200);
    expect("accessToken" in result.body).toBe(true);
  });

  it("returns invalid credentials for wrong password", async () => {
    const result = await mockLogin({
      email: "demo@applyvault.dev",
      password: "wrong",
    });

    expect(result.status).toBe(401);
    expect(expectError(result.body).code).toBe("INVALID_CREDENTIALS");
  });

  it("returns unverified email scenario", async () => {
    const result = await mockLogin({
      email: "unverified@applyvault.dev",
      password: "whatever",
    });

    expect(result.status).toBe(403);
    expect(expectError(result.body).code).toBe("EMAIL_NOT_VERIFIED");
  });

  it("returns locked account scenario", async () => {
    const result = await mockLogin({
      email: "locked@applyvault.dev",
      password: "whatever",
    });

    expect(result.status).toBe(423);
    expect(expectError(result.body).code).toBe("ACCOUNT_LOCKED");
  });

  it("returns rate limited scenario", async () => {
    const result = await mockLogin({
      email: "ratelimit@applyvault.dev",
      password: "whatever",
    });

    expect(result.status).toBe(429);
    expect(expectError(result.body).code).toBe("TOO_MANY_ATTEMPTS");
  });

  it("returns server error scenario", async () => {
    const result = await mockLogin({
      email: "server@applyvault.dev",
      password: "whatever",
    });

    expect(result.status).toBe(500);
    expect(expectError(result.body).code).toBe("INTERNAL_ERROR");
  });

  it("supports forced scenario override", async () => {
    const result = await mockLogin(
      { email: "demo@applyvault.dev", password: "demo123" },
      "server-error",
    );

    expect(result.status).toBe(500);
    expect(expectError(result.body).code).toBe("INTERNAL_ERROR");
  });
});
