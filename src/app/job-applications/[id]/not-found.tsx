import Link from "next/link";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Job application not found
      </Typography>
      <Typography sx={{ opacity: 0.8, mb: 2 }}>
        The item may have been deleted or the link is wrong.
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button component={Link} href="/job-applications" variant="contained">
          Back to list
        </Button>
      </Stack>
    </Container>
  );
}
