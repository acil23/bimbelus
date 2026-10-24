"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, RotateCcw, BookOpen, Filter } from "lucide-react";
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
  const shouldReduce = useReducedMotion();

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

  const isUnfiltered = !search && !filter;

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
          .map((program, idx) => ({
            key: program.id,
            wide: isUnfiltered && idx === 0 && props.items.length > 1,
            node: (
              <ProgramCard
                program={program}
                featured={isUnfiltered && idx === 0 && props.items.length > 1}
              />
            ),
          }))
      : props.kind === "tutors"
        ? props.items
            .filter((tutor) => matches(tutor.name, tutor.specialization, tutor.bio))
            .map((tutor) => ({
              key: tutor.id,
              wide: false,
              node: <TutorCard tutor={tutor} />,
            }))
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
            .map((achievement) => ({
              key: achievement.id,
              wide: false,
              node: <AchievementTicket achievement={achievement} />,
            }));

  const searchLabel =
    props.kind === "programs"
      ? "program belajar"
      : props.kind === "tutors"
        ? "nama atau spesialisasi tutor"
        : "prestasi, siswa, atau tahun";

  const filterOptions = [["", "Semua"], ...Object.entries(labels)];

  return (
    <div>
      {/* Unified Academic Search & Filter Deck */}
      <div className="toolbar">
        <div className="field search-field">
          <label htmlFor={id} className="inline-flex items-center gap-2">
            <BookOpen size={14} className="text-amber-400" aria-hidden="true" />
            <span>Cari {searchLabel}</span>
          </label>
          <div className="relative">
            <input
              id={id}
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ketik kata kunci pencarian…"
              className="pl-10"
            />
            <Search
              size={17}
              aria-hidden="true"
              className="
                pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2
                text-slate-500
              "
            />
          </div>
        </div>

        {(search || filter) && (
          <motion.button
            whileHover={shouldReduce ? undefined : { scale: 1.02 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
            className="btn btn-outline"
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("");
            }}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Reset filter
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {Object.keys(labels).length > 0 ? (
          <div className="filter-chips !mb-0" role="group" aria-label="Filter kategori">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#4B5563] mr-1">
              <Filter size={13} className="text-[#2E8BC0]" aria-hidden="true" />
              Kategori:
            </span>
            {filterOptions.map(([key, label]) => (
              <motion.button
                whileHover={shouldReduce ? undefined : { y: -1 }}
                whileTap={shouldReduce ? undefined : { scale: 0.96 }}
                type="button"
                key={key}
                className="filter-chip"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </motion.button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <p className="results-count !mb-0 flex items-center gap-2" role="status">
          <span className="status-dot" aria-hidden="true" />
          <span>{cards.length} hasil ditemukan</span>
        </p>
      </div>

      {cards.length ? (
        <motion.div layout={!shouldReduce} className="grid-3">
          <AnimatePresence mode="popLayout">
            {cards.map(({ key, wide, node }) => (
              <motion.div
                key={key}
                layout={!shouldReduce}
                initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
                animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
                exit={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`h-full ${wide ? "md:col-span-2" : ""}`}
              >
                {node}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState
          title="Belum ada hasil yang cocok"
          description="Coba kata kunci lain atau hapus filter pencarian."
        />
      )}
    </div>
  );
}
