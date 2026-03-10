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
import { ApplicationStatus, getStatusLabel } from "@/domain/jobApplications";
import { useState } from "react";
import { createJobApplicationAction } from "./actions";

export default function JobApplicationCreateForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);
    try {
      await createJobApplicationAction(formData);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        New Application
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
              fullWidth
              required
              disabled={isSubmitting}
            />
            <TextField
              label="Company"
              name="company"
              fullWidth
              required
              disabled={isSubmitting}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              required
              disabled={isSubmitting}
            />
            <FormControlLabel
              control={<Checkbox name="isRemote" />}
              label="Remote"
            />
            <TextField
              label="Referral"
              name="referral"
              fullWidth
              disabled={isSubmitting}
            />
            <TextField
              label="Contact Person"
              name="contactPerson"
              fullWidth
              disabled={isSubmitting}
            />
            <TextField
              label="Compensation Range"
              name="compensationRange"
              fullWidth
              disabled={isSubmitting}
            />
            <TextField
              label="Date Applied"
              name="dateApplied"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />
            <TextField
              label="Last Touch"
              name="lastTouch"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />
            <Select
              name="status"
              defaultValue={ApplicationStatus.Applied}
              fullWidth
              disabled={isSubmitting}
            >
              {Object.entries(ApplicationStatus).map(([key, value]) =>
                typeof value === "number" ? (
                  <MenuItem key={key} value={value}>
                    {getStatusLabel(value)}
                  </MenuItem>
                ) : null,
              )}
            </Select>
            <TextField
              label="Next Action"
              name="nextAction"
              fullWidth
              disabled={isSubmitting}
            />
            <TextField
              label="Next Action Date"
              name="nextActionDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isSubmitting}
            />
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
            />
            <TextField
              label="Link"
              name="link"
              type="url"
              fullWidth
              disabled={isSubmitting}
            />
            <Stack direction="row" spacing={1}>
              <Link href="/job-applications">
                <Button variant="outlined" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Create"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
