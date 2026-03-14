import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import LoginForm from "@/components/forms/LoginForm";

describe("LoginForm", () => {
  it("renders email, password and submit button", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("submits email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "demo@applyvault.dev");
    await user.type(screen.getByLabelText(/password/i), "demo123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "demo@applyvault.dev",
      password: "demo123",
    });
  });

  it("shows an error message when submit fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi
      .fn()
      .mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "demo@applyvault.dev");
    await user.type(screen.getByLabelText(/password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
