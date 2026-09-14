"use client";
import { useEffect,useState } from "react";
import { getCurrentUser,type AuthUser } from "@/lib/api/auth";
import { initials } from "@/lib/ui/format";
export default function AdminUserInfo() {
 const [user,setUser] = useState<AuthUser | null>(null);
 useEffect(()=>{let mounted=true;async function load(){try {const current=await getCurrentUser();if(mounted)setUser(current);} catch {if(mounted)setUser(null);}}void load();return()=>{mounted=false;};},[]);
 return <div className="admin-user"><span className="avatar" aria-hidden="true">{user ? initials(user.name) : "YS"}</span><div><strong className="small">{user?.name ?? "Admin Bimbel YS"}</strong><small>{user?.email ?? "Content Studio"}</small></div></div>;
}
