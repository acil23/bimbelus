"use client";
import type { Tutor } from "@/lib/api/types";
import { ResourceManager } from "@/components/admin/resource-manager";
export default function TutorsAdmin({initialTutors}:{initialTutors:Tutor[]}) { return <ResourceManager resource="tutors" initialItems={initialTutors} />; }
