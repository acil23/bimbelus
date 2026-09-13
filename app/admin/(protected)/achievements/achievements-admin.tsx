"use client";

import { useState } from "react";

import {
  createAchievement,
  deleteAchievement,
  getAchievements,
  updateAchievement,
} from "@/lib/api/achievements";

import type { Achievement } from "@/lib/api/types";

type AchievementsAdminProps = {
  initialAchievements: Achievement[];
};

export default function AchievementsAdmin({
  initialAchievements,
}: AchievementsAdminProps) {
  const [achievements, setAchievements] = useState(
    initialAchievements,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshAchievements() {
    const latestAchievements = await getAchievements();
    setAchievements(latestAchievements);
  }

  async function handleCreateTestAchievement() {
    try {
      setLoading(true);
      setError(null);

      await createAchievement({
        student_name: "C6 Test Student",
        title: "Test Achievement",
        student_school: "C6 Test School",
        destination: "C6 Test Destination",
        subject: "Testing",
        achievement_type: "OTHER",
        year: 2026,
        image_url: null,
        is_featured: false,
        display_order: 99,
        description:
          "Temporary achievement for C-6.3 CRUD testing",
        competition_name: null,
        competition_level: null,
        is_active: true,
      });

      await refreshAchievements();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create achievement",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateAchievement(
    achievement: Achievement,
  ) {
    try {
      setLoading(true);
      setError(null);

      await updateAchievement(achievement.id, {
        title: "C6 Updated Achievement",
        description:
          "Updated during C-6.3 CRUD testing",
      });

      await refreshAchievements();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update achievement",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAchievement(
    achievement: Achievement,
  ) {
    const confirmed = window.confirm(
      `Nonaktifkan achievement "${achievement.title}" untuk ${achievement.student_name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteAchievement(achievement.id);

      await refreshAchievements();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete achievement",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <button
        type="button"
        onClick={handleCreateTestAchievement}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : "Create Test Achievement"}
      </button>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {achievements.length === 0 ? (
        <p>No achievements.</p>
      ) : (
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>
              <article>
                <h2>{achievement.title}</h2>

                <p>
                  Student:{" "}
                  {achievement.student_name}
                </p>

                <p>
                  School:{" "}
                  {achievement.student_school ?? "-"}
                </p>

                <p>
                  Destination:{" "}
                  {achievement.destination ?? "-"}
                </p>

                <p>
                  Subject:{" "}
                  {achievement.subject ?? "-"}
                </p>

                <p>
                  Type:{" "}
                  {achievement.achievement_type}
                </p>

                <p>
                  Year: {achievement.year}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleUpdateAchievement(
                      achievement,
                    )
                  }
                  disabled={loading}
                >
                  Test Update Achievement
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAchievement(
                      achievement,
                    )
                  }
                  disabled={loading}
                >
                  Test Delete Achievement
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}