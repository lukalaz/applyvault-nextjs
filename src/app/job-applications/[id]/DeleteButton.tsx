"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { deleteJobApplicationAction } from "../actions";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteJobApplicationAction(id);
    } catch (e) {
      console.error("Failed to delete:", e);
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
