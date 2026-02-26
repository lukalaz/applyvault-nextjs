import { Container, Stack, Paper, Skeleton } from "@mui/material";

export default function JobApplicationDetailsLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="rectangular" width={100} height={32} />
      </Stack>

      <Paper sx={{ p: 2 }}>
        <Stack spacing={1.2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="text" width="80%" height={20} />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}
