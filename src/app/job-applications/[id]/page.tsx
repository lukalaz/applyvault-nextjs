import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { getStatusLabel } from "@/domain/jobApplications";
import { jobApplicationsApi } from "@/lib/api/jobApplications";

type Props = { params: Promise<{ id: string }> };

export default async function JobApplicationDetailsPage({ params }: Props) {
  const { id } = await params;

  let x;
  try {
    x = await jobApplicationsApi.getById(id);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" fontWeight={800}>
          {x.role ?? "(No role)"}
        </Typography>
        <Chip label={getStatusLabel(x.status)} />
      </Stack>

      <Paper sx={{ p: 2 }}>
        <Stack spacing={1.2}>
          <Typography>
            <b>Company:</b> {x.company ?? "-"}
          </Typography>
          <Typography>
            <b>Location:</b> {x.location ?? "-"} {x.isRemote ? "(Remote)" : ""}
          </Typography>
          <Typography>
            <b>Referral:</b> {x.referral ?? "-"}
          </Typography>
          <Typography>
            <b>Contact:</b> {x.contactPerson ?? "-"}
          </Typography>
          <Typography>
            <b>Compensation:</b> {x.compensationRange ?? "-"}
          </Typography>
          <Typography>
            <b>Next action:</b> {x.nextAction ?? "-"}{" "}
            {x.nextActionDate ? `(${x.nextActionDate})` : ""}
          </Typography>
          <Typography>
            <b>Notes:</b> {x.notes ?? "-"}
          </Typography>

          {x.link && (
            <Typography>
              <b>Link:</b>{" "}
              <a href={x.link} target="_blank" rel="noreferrer">
                Open
              </a>
            </Typography>
          )}

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Link href="/job-applications">
              <Button variant="outlined">Back</Button>
            </Link>
            <Link href={`/job-applications/${id}/edit`}>
              <Button variant="contained">Edit</Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
