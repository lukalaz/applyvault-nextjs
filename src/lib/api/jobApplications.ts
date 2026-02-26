import { fetchJson } from "./client";
import type {
  JobApplicationResponseDto,
  CreateJobApplicationRequestDto,
  UpdateJobApplicationRequestDto,
} from "@/domain/jobApplications";

const TAG_LIST = "job-applications";
const tagItem = (id: string) => `job-application:${id}`;

export const jobApplicationsApi = {
  async getAll() {
    return fetchJson<JobApplicationResponseDto[]>("/api/job-applications", {
      next: { revalidate: 60, tags: [TAG_LIST] },
    });
  },

  async getById(id: string) {
    return fetchJson<JobApplicationResponseDto>(`/api/job-applications/${id}`, {
      next: { revalidate: 60, tags: [TAG_LIST, tagItem(id)] },
    });
  },

  async create(dto: CreateJobApplicationRequestDto) {
    return fetchJson<JobApplicationResponseDto>("/api/job-applications", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  async update(id: string, dto: UpdateJobApplicationRequestDto) {
    return fetchJson<JobApplicationResponseDto>(`/api/job-applications/${id}`, {
      method: "PUT",
      body: JSON.stringify(dto),
    });
  },

  async remove(id: string) {
    return fetchJson<void>(`/api/job-applications/${id}`, {
      method: "DELETE",
    });
  },

  tags: {
    list: TAG_LIST,
    item: tagItem,
  },
};
