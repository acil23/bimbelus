import Link from "next/link";
import { Trophy, ArrowUpRight } from "lucide-react";
import type { Achievement } from "@/lib/api/types";
import { achievementLabels } from "@/lib/ui/format";
import { Media } from "@/components/ui/media";
export function AchievementTicket({ achievement }: { achievement: Achievement }) { return <article className="card card-hover"><Media src={achievement.image_url} alt={achievement.student_name} /><div className="card-body"><div className="actions"><span className="badge badge-gold"><Trophy size={13} aria-hidden="true" />&nbsp;{achievementLabels[achievement.achievement_type] ?? achievement.achievement_type}</span>{achievement.year != null && <span className="small muted">{achievement.year}</span>}</div><h3>{achievement.title}</h3><p><strong>{achievement.student_name}</strong>{achievement.student_school && <><br />{achievement.student_school}</>}</p>{achievement.destination && <span className="badge">{achievement.destination}</span>}<Link href={`/prestasi/${achievement.id}`} className="text-link">Baca ceritanya <ArrowUpRight size={17} aria-hidden="true" /></Link></div></article>; }
