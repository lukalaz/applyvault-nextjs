import Link from "next/link";
import {
  Container,
  Typography,
  Stack,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { getStatusLabel } from "@/domain/jobApplications";
import { jobApplicationsApi } from "@/lib/api/jobApplications";

export default async function JobApplicationsPage() {
  const items = await jobApplicationsApi.getAll();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={800}>
          Job Applications
        </Typography>
        <Link href="/job-applications/new" passHref>
          <Button variant="contained">New Application</Button>
        </Link>
      </Stack>

      <Stack spacing={2}>
        {items.map((x) => (
          <Paper key={x.id} sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h6" fontWeight={700}>
                  <Link
                    href={`/job-applications/${x.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {x.role ?? "(No role)"}
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {x.company ?? "(No company)"} ·{" "}
                  {x.location ?? "Unknown location"}{" "}
                  {x.isRemote ? "· Remote" : ""}
                </Typography>
              </div>

              <Chip label={getStatusLabel(x.status)} />
            </Stack>
          </Paper>
        ))}

        {items.length === 0 && (
          <Paper sx={{ p: 2 }}>
            <Typography>No job applications yet.</Typography>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
