"use client";

import { useId, useState } from "react";
import type { Achievement, Program, Tutor } from "@/lib/api/types";
import { categoryLabels, achievementLabels } from "@/lib/ui/format";
import { ProgramCard } from "./program-card";
import { TutorCard } from "./tutor-card";
import { AchievementTicket } from "./achievement-ticket";
import { EmptyState } from "@/components/ui/empty-state";

type Props =
  | { kind: "programs"; items: Program[] }
  | { kind: "tutors"; items: Tutor[] }
  | { kind: "achievements"; items: Achievement[] };

export function Catalog(props: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const id = useId();

  const labels =
    props.kind === "programs"
      ? categoryLabels
      : props.kind === "achievements"
        ? achievementLabels
        : {};

  const query = search.trim().toLocaleLowerCase("id-ID");

  const matches = (...values: (string | number | null | undefined)[]) =>
    values.some((value) =>
      String(value ?? "").toLocaleLowerCase("id-ID").includes(query),
    );

  const cards =
    props.kind === "programs"
      ? props.items
          .filter(
            (program) =>
              (!filter || program.category === filter) &&
              matches(
                program.name,
                program.description,
                categoryLabels[program.category],
              ),
          )
          .map((program) => <ProgramCard key={program.id} program={program} />)
      : props.kind === "tutors"
        ? props.items
            .filter((tutor) => matches(tutor.name, tutor.specialization, tutor.bio))
            .map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)
        : props.items
            .filter(
              (achievement) =>
                (!filter || achievement.achievement_type === filter) &&
                matches(
                  achievement.title,
                  achievement.student_name,
                  achievement.student_school,
                  achievement.destination,
                  achievement.year,
                ),
            )
            .map((achievement) => (
              <AchievementTicket key={achievement.id} achievement={achievement} />
            ));

  const searchLabel =
    props.kind === "programs"
      ? "program belajar"
      : props.kind === "tutors"
        ? "nama atau spesialisasi tutor"
        : "prestasi, siswa, atau tahun";

  const filterOptions = [["", "Semua"], ...Object.entries(labels)];

  return (
    <div>
      <div className="toolbar">
        <div className="field search-field">
          <label htmlFor={id}>Cari {searchLabel}</label>
          <input
            id={id}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ketik kata kunci…"
          />
        </div>

        {(search || filter) && (
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("");
            }}
          >
            Reset filter
          </button>
        )}
      </div>

      {Object.keys(labels).length > 0 && (
        <div className="filter-chips" role="group" aria-label="Filter kategori">
          {filterOptions.map(([key, label]) => (
            <button
              type="button"
              key={key}
              className="filter-chip"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <p className="results-count" role="status">
        {cards.length} hasil ditemukan
      </p>

      {cards.length ? (
        <div className="grid-3">{cards}</div>
      ) : (
        <EmptyState
          title="Belum ada hasil yang cocok"
          description="Coba kata kunci lain atau hapus filter pencarian."
        />
      )}
    </div>
  );
}
