"use client";

import { Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function JobApplicationDetailsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Failed to load job application
        </Typography>
        <Typography color="textSecondary">
          Please try again or go back to the list.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" component={Link} href="/job-applications">
            Back to List
          </Button>
          <Button variant="contained" onClick={() => reset()}>
            Retry
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
