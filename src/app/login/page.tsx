"use client";

import { Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import type { LoginRequest } from "@/types/auth";

async function loginRequest(values: LoginRequest) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("applyvault.mock.token", data.accessToken);
}

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(values: LoginRequest) {
    await loginRequest(values);
    router.push("/job-applications");
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" fontWeight={700}>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A quick mock flow for login to demonstrate handling of API
              responses before we have a real backend.
            </Typography>
          </div>

          <LoginForm onSubmit={handleLogin} />
        </Stack>
      </Paper>
    </Container>
  );
}
