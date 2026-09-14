"use client";
import type { Achievement } from "@/lib/api/types";
import { ResourceManager } from "@/components/admin/resource-manager";
export default function AchievementsAdmin({initialAchievements}:{initialAchievements:Achievement[]}) { return <ResourceManager resource="achievements" initialItems={initialAchievements} />; }
