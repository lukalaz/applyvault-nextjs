"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import type { LoginRequest } from "@/types/auth";

type LoginFormProps = {
  onSubmit: (values: LoginRequest) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          required
          fullWidth
          autoComplete="email"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          required
          fullWidth
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isFormValid || isLoading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign in"
          )}
        </Button>
      </Stack>
    </Box>
  );
}
