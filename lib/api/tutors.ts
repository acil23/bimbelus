import { apiClient } from "@/lib/api/client";
import type {
  CreateTutorEducationInput,
  CreateTutorExperienceInput,
  CreateTutorInput,
  Tutor,
  TutorEducation,
  TutorExperience,
  TutorMutationResult,
  UpdateTutorEducationInput,
  UpdateTutorExperienceInput,
  UpdateTutorInput,
} from "@/lib/api/types";

export async function getTutors(): Promise<Tutor[]> {
  return apiClient<Tutor[]>("/api/tutors");
}

export async function getTutorBySlug(
  slug: string,
): Promise<Tutor> {
  return apiClient<Tutor>(
    `/api/tutors/slug/${encodeURIComponent(slug)}`,
  );
}

export async function createTutor(
  data: CreateTutorInput,
): Promise<TutorMutationResult> {
  return apiClient<TutorMutationResult>("/api/tutors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTutor(
  id: string,
  data: UpdateTutorInput,
): Promise<TutorMutationResult> {
  return apiClient<TutorMutationResult>(
    `/api/tutors/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteTutor(
  id: string,
): Promise<TutorMutationResult> {
  return apiClient<TutorMutationResult>(
    `/api/tutors/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function createTutorEducation(
  tutorId: string,
  data: CreateTutorEducationInput,
): Promise<TutorEducation> {
  return apiClient<TutorEducation>(
    `/api/tutors/${tutorId}/educations`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateTutorEducation(
  educationId: string,
  data: UpdateTutorEducationInput,
): Promise<TutorEducation> {
  return apiClient<TutorEducation>(
    `/api/tutor-educations/${educationId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteTutorEducation(
  educationId: string,
): Promise<TutorEducation> {
  return apiClient<TutorEducation>(
    `/api/tutor-educations/${educationId}`,
    {
      method: "DELETE",
    },
  );
}

export async function createTutorExperience(
  tutorId: string,
  data: CreateTutorExperienceInput,
): Promise<TutorExperience> {
  return apiClient<TutorExperience>(
    `/api/tutors/${tutorId}/experiences`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateTutorExperience(
  experienceId: string,
  data: UpdateTutorExperienceInput,
): Promise<TutorExperience> {
  return apiClient<TutorExperience>(
    `/api/tutor-experiences/${experienceId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteTutorExperience(
  experienceId: string,
): Promise<TutorExperience> {
  return apiClient<TutorExperience>(
    `/api/tutor-experiences/${experienceId}`,
    {
      method: "DELETE",
    },
  );
}