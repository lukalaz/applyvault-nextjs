import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "../page";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

function mockFetchResponse({
  ok,
  status,
  body,
}: {
  ok: boolean;
  status: number;
  body: unknown;
}) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status,
      json: async () => body,
    }),
  );
}

async function fillAndSubmit({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), email);
  await user.type(screen.getByLabelText(/password/i), password);
  await user.click(screen.getByRole("button", { name: /sign in/i }));
}

describe("LoginPage integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits valid credentials and redirects to job applications", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: {
          id: "user-1",
          email: "demo@applyvault.dev",
          firstName: "Luka",
          lastName: "Demo",
        },
      },
    });

    render(<LoginPage />);

    await fillAndSubmit({
      email: "demo@applyvault.dev",
      password: "demo123",
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/job-applications");
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it.each([
    {
      name: "invalid credentials",
      email: "demo@applyvault.dev",
      password: "wrongpass",
      status: 401,
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password.",
    },
    {
      name: "unverified email",
      email: "unverified@applyvault.dev",
      password: "whatever",
      status: 403,
      code: "EMAIL_NOT_VERIFIED",
      message: "Your email address has not been verified yet.",
    },
    {
      name: "locked account",
      email: "locked@applyvault.dev",
      password: "whatever",
      status: 423,
      code: "ACCOUNT_LOCKED",
      message: "Your account is temporarily locked.",
    },
    {
      name: "rate limited",
      email: "ratelimit@applyvault.dev",
      password: "whatever",
      status: 429,
      code: "TOO_MANY_ATTEMPTS",
      message: "Too many login attempts. Please try again later.",
    },
    {
      name: "server error",
      email: "server@applyvault.dev",
      password: "whatever",
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Something went wrong on the server.",
    },
  ])(
    "shows the correct API error for $name",
    async ({ email, password, status, code, message }) => {
      mockFetchResponse({
        ok: false,
        status,
        body: {
          code,
          message,
        },
      });

      render(<LoginPage />);

      await fillAndSubmit({ email, password });

      expect(await screen.findByText(message)).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    },
  );
});
