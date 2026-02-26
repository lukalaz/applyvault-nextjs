"use client";

import { Container, Typography, Button, Stack } from "@mui/material";

export default function JobApplicationsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Failed to load job applications
        </Typography>
        <Typography color="textSecondary">
          Please try again or contact support.
        </Typography>
        <Button variant="contained" onClick={() => reset()}>
          Retry
        </Button>
      </Stack>
    </Container>
  );
}
