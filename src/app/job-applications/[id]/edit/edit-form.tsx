"use client";

import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { ApiError } from "@/lib/api/errors";
import {
  ApplicationStatus,
  getStatusLabel,
  JobApplicationResponseDto,
} from "@/domain/jobApplications";
import { updateJobApplicationAction } from "./actions";
import { useState } from "react";

type Props = {
  item: JobApplicationResponseDto;
  id: string;
};

export default function JobApplicationEditPageContent({ item, id }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);
    try {
      await updateJobApplicationAction(id, formData);
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Edit: {item.role}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form action={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Role"
              name="role"
              defaultValue={item.role ?? ""}
              fullWidth
              required
              disabled={isSubmitting}
            />

            <TextField
              label="Company"
              name="company"
              defaultValue={item.company ?? ""}
              fullWidth
              required
              disabled={isSubmitting}
            />

            <TextField
              label="Location"
              name="location"
              defaultValue={item.location ?? ""}
              fullWidth
              required
              disabled={isSubmitting}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="isRemote"
                  defaultChecked={item.isRemote}
                  disabled={isSubmitting}
                />
              }
              label="Remote"
            />

            <TextField
              label="Referral"
              name="referral"
              defaultValue={item.referral ?? ""}
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="Contact Person"
              name="contactPerson"
              defaultValue={item.contactPerson ?? ""}
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="Compensation Range"
              name="compensationRange"
              defaultValue={item.compensationRange ?? ""}
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="Date Applied"
              name="dateApplied"
              type="date"
              defaultValue={item.dateApplied ?? ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />

            <TextField
              label="Last Touch"
              name="lastTouch"
              type="date"
              defaultValue={item.lastTouch ?? ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />

            <Select
              name="status"
              defaultValue={item.status}
              fullWidth
              disabled={isSubmitting}
            >
              {Object.entries(ApplicationStatus).map(
                ([key, value]) =>
                  typeof value === "number" && (
                    <MenuItem key={key} value={value}>
                      {getStatusLabel(value)}
                    </MenuItem>
                  ),
              )}
            </Select>

            <TextField
              label="Next Action"
              name="nextAction"
              defaultValue={item.nextAction ?? ""}
              fullWidth
              disabled={isSubmitting}
            />

            <TextField
              label="Next Action Date"
              name="nextActionDate"
              type="date"
              defaultValue={item.nextActionDate ?? ""}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />

            <TextField
              label="Notes"
              name="notes"
              defaultValue={item.notes ?? ""}
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
            />

            <TextField
              label="Link"
              name="link"
              type="url"
              defaultValue={item.link ?? ""}
              fullWidth
              disabled={isSubmitting}
            />

            <Stack direction="row" spacing={1}>
              <Link href={`/job-applications/${id}`}>
                <Button variant="outlined" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
