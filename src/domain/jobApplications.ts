export enum ApplicationStatus {
  Unknown = 0,
  Applied = 1,
  Screening = 2,
  Interview = 3,
  Offer = 4,
  Rejected = 5,
  Accepted = 6,
  Archived = 7,
}

export type JobApplicationResponseDto = {
  id: string; // uuid
  company: string | null;
  role: string | null;
  location: string | null;
  isRemote: boolean;
  referral: string | null;
  contactPerson: string | null;
  dateApplied: string | null; // ISO datetime
  status: ApplicationStatus;
  compensationRange: string | null;
  lastTouch: string | null;
  nextAction: string | null;
  nextActionDate: string | null;
  notes: string | null;
  link: string | null;
};

export type CreateJobApplicationRequestDto = Omit<
  JobApplicationResponseDto,
  "id"
>;
export type UpdateJobApplicationRequestDto = Omit<
  JobApplicationResponseDto,
  "id"
>;

export function getStatusLabel(status: ApplicationStatus): string {
  switch (status) {
    case ApplicationStatus.Applied:
      return "Applied";
    case ApplicationStatus.Screening:
      return "Screening";
    case ApplicationStatus.Interview:
      return "Interview";
    case ApplicationStatus.Offer:
      return "Offer";
    case ApplicationStatus.Rejected:
      return "Rejected";
    case ApplicationStatus.Accepted:
      return "Accepted";
    case ApplicationStatus.Archived:
      return "Archived";
    default:
      return "Unknown";
  }
}
