"use client";

import { useState } from "react";

import {
  createTutor,
  createTutorEducation,
  createTutorExperience,
  deleteTutor,
  deleteTutorEducation,
  deleteTutorExperience,
  getTutors,
  updateTutor,
  updateTutorEducation,
  updateTutorExperience,
} from "@/lib/api/tutors";

import type { Tutor } from "@/lib/api/types";

type TutorsAdminProps = {
  initialTutors: Tutor[];
};

export default function TutorsAdmin({
  initialTutors,
}: TutorsAdminProps) {
  const [tutors, setTutors] = useState(initialTutors);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshTutors() {
    const latestTutors = await getTutors();
    setTutors(latestTutors);
  }

  async function handleCreateTestTutor() {
    try {
      setLoading(true);
      setError(null);

      await createTutor({
        name: "C6 Test Tutor",
        slug: `c6-test-tutor-${Date.now()}`,
        title: "Test Tutor",
        specialization: "Testing",
        bio: "Temporary tutor for C-6.2 CRUD testing",
        is_active: true,
        display_order: 99,
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create tutor",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTutor(tutor: Tutor) {
    try {
      setLoading(true);
      setError(null);

      await updateTutor(tutor.id, {
        bio: "Updated during C-6.2 CRUD testing",
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update tutor",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTutor(tutor: Tutor) {
    const confirmed = window.confirm(
      `Nonaktifkan tutor "${tutor.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteTutor(tutor.id);

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete tutor",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateEducation(tutor: Tutor) {
    try {
      setLoading(true);
      setError(null);

      await createTutorEducation(tutor.id, {
        institution: "C6 Test University",
        field_of_study: "Computer Science",
        start_year: 2020,
        end_year: 2024,
        description: "Temporary education for C-6.2 testing",
        display_order: tutor.tutor_educations.length + 1,
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create education",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateEducation(
    educationId: string,
  ) {
    try {
      setLoading(true);
      setError(null);

      await updateTutorEducation(educationId, {
        institution: "C6 Updated University",
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update education",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEducation(
    educationId: string,
    institution: string,
  ) {
    const confirmed = window.confirm(
      `Hapus education "${institution}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteTutorEducation(educationId);

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete education",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateExperience(tutor: Tutor) {
    try {
      setLoading(true);
      setError(null);

      await createTutorExperience(tutor.id, {
        organization: "C6 Test Organization",
        position: "Test Position",
        start_year: 2024,
        end_year: 2025,
        description: "Temporary experience for C-6.2 testing",
        display_order: tutor.tutor_experiences.length + 1,
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create experience",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateExperience(
    experienceId: string,
  ) {
    try {
      setLoading(true);
      setError(null);

      await updateTutorExperience(experienceId, {
        organization: "C6 Updated Organization",
      });

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update experience",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteExperience(
    experienceId: string,
    organization: string,
  ) {
    const confirmed = window.confirm(
      `Hapus experience "${organization}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteTutorExperience(experienceId);

      await refreshTutors();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete experience",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <button
        type="button"
        onClick={handleCreateTestTutor}
        disabled={loading}
      >
        {loading ? "Processing..." : "Create Test Tutor"}
      </button>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {tutors.map((tutor) => (
        <article key={tutor.id}>
          <h2>{tutor.name}</h2>

          <p>Slug: {tutor.slug}</p>

          <p>Title: {tutor.title ?? "-"}</p>

          <p>
            Specialization: {tutor.specialization ?? "-"}
          </p>

          <p>Bio: {tutor.bio ?? "-"}</p>

          <button
            type="button"
            onClick={() => handleUpdateTutor(tutor)}
            disabled={loading}
          >
            Test Update Tutor
          </button>

          <button
            type="button"
            onClick={() => handleDeleteTutor(tutor)}
            disabled={loading}
          >
            Test Delete Tutor
          </button>

          <hr />

          <h3>Education</h3>

          {tutor.tutor_educations.length === 0 ? (
            <p>No education.</p>
          ) : (
            <ul>
              {tutor.tutor_educations.map((education) => (
                <li key={education.id}>
                  <strong>
                    {education.institution}
                  </strong>

                  <p>
                    Field:{" "}
                    {education.field_of_study ?? "-"}
                  </p>

                  <p>
                    Period:{" "}
                    {education.start_year ?? "-"} -{" "}
                    {education.end_year ?? "-"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateEducation(
                        education.id,
                      )
                    }
                    disabled={loading}
                  >
                    Test Update Education
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteEducation(
                        education.id,
                        education.institution,
                      )
                    }
                    disabled={loading}
                  >
                    Test Delete Education
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() =>
              handleCreateEducation(tutor)
            }
            disabled={loading}
          >
            Test Create Education
          </button>

          <hr />

          <h3>Experience</h3>

          {tutor.tutor_experiences.length === 0 ? (
            <p>No experience.</p>
          ) : (
            <ul>
              {tutor.tutor_experiences.map((experience) => (
                <li key={experience.id}>
                  <strong>
                    {experience.organization}
                  </strong>

                  <p>
                    Position:{" "}
                    {experience.position ?? "-"}
                  </p>

                  <p>
                    Period:{" "}
                    {experience.start_year ?? "-"} -{" "}
                    {experience.end_year ?? "-"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateExperience(
                        experience.id,
                      )
                    }
                    disabled={loading}
                  >
                    Test Update Experience
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteExperience(
                        experience.id,
                        experience.organization,
                      )
                    }
                    disabled={loading}
                  >
                    Test Delete Experience
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() =>
              handleCreateExperience(tutor)
            }
            disabled={loading}
          >
            Test Create Experience
          </button>
        </article>
      ))}
    </section>
  );
}