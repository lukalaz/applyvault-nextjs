import { jobApplicationsApi } from "@/lib/api/jobApplications";
import { ApiError } from "@/lib/api/errors";
import { notFound } from "next/navigation";
import JobApplicationEditPageContent from "./edit-form";

type Props = { params: Promise<{ id: string }> };

export default async function JobApplicationEditPage({ params }: Props) {
  const { id } = await params;

  let item;
  try {
    item = await jobApplicationsApi.getById(id);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }

  return <JobApplicationEditPageContent item={item} id={id} />;
}
