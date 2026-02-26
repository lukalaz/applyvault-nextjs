"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { jobApplicationsApi } from "@/lib/api/jobApplications";
import {
  UpdateJobApplicationRequestDto,
  ApplicationStatus,
} from "@/domain/jobApplications";
import { ApiError } from "@/lib/api/errors";

export async function updateJobApplicationAction(
  id: string,
  formData: FormData,
) {
  const dto: UpdateJobApplicationRequestDto = {
    role: (formData.get("role") as string) || "",
    company: (formData.get("company") as string) || "",
    location: (formData.get("location") as string) || "",
    isRemote: formData.get("isRemote") === "on",
    referral: (formData.get("referral") as string) || null,
    contactPerson: (formData.get("contactPerson") as string) || null,
    compensationRange: (formData.get("compensationRange") as string) || null,
    dateApplied: (formData.get("dateApplied") as string) || null,
    lastTouch: (formData.get("lastTouch") as string) || null,
    status: parseInt(formData.get("status") as string, 10) as ApplicationStatus,
    nextAction: (formData.get("nextAction") as string) || null,
    nextActionDate: (formData.get("nextActionDate") as string) || null,
    notes: (formData.get("notes") as string) || null,
    link: (formData.get("link") as string) || null,
  };

  try {
    await jobApplicationsApi.update(id, dto);
    revalidatePath("/job-applications");
    revalidatePath(`/job-applications/${id}`);
    redirect(`/job-applications/${id}`);
  } catch (e) {
    if (e instanceof ApiError) {
      throw new Error(e.message);
    }
    throw e;
  }
}
