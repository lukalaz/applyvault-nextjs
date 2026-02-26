import { Container, Typography, Stack, Paper, Skeleton } from "@mui/material";

export default function JobApplicationsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Job Applications
      </Typography>

      <Stack spacing={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Paper key={i} sx={{ p: 2 }}>
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={20} />
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
