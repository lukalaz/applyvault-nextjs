"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useToast } from "@/hooks";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { deleteJobApplicationAction } from "../actions";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteJobApplicationAction(id);

    if (result.success) {
      toastSuccess("Application deleted!");
      router.push("/job-applications");
    } else {
      toastError(result.error);
      setIsDeleting(false);
      setOpen(false);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        disabled={isDeleting}
      >
        Delete
      </Button>

      <ConfirmDialog
        open={open}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        confirmText="Delete"
        confirmColor="error"
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
